import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const channel = await User.findById(channelId);

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  if (channelId.toString() === req.user?._id.toString()) {
    throw new ApiError(400, "You can't subscribe to your channel");
  }

  const existingSub = await Subscription.findOne({
    subscriber: req.user?._id,
    channel: channelId,
  });

  if (existingSub) {
    await Subscription.findByIdAndDelete(existingSub?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Channel Unsubscribed successfully"));
  } else {
    const newLike = await Subscription.create({
      subscriber: req.user?._id,
      channel: channelId,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, newLike, "Channel Subscribed successfully"));
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const channel = await User.findById(channelId);

  if (!channel) {
    throw new ApiError(404, "Channel not found");
  }

  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "userSubscribers", // subscriber count
            },
          },
          {
            $addFields: {
              isSubscribed: {
                $cond: {
                  if: {
                    $in: [
                      new mongoose.Types.ObjectId(req.user?._id),
                      "$userSubscribers.subscriber",
                    ],
                  },
                  then: true,
                  else: false,
                },
              },
              subCnt: {
                $size: "$userSubscribers",
              },
            },
          },
          {
            $project: {
              _id: 1,
              username: 1,
              fullname: 1,
              avatar: 1,
              subCnt: 1,
              isSubscribed: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        subscriber: {
          $first: "$subscriber",
        },
      },
    },
    {
      $project: {
        subscriber: 1,
        channel: 1,
      },
    },
  ]);

  if (!subscribers) {
    throw new ApiError(400, "falied to get subscriber");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, subscribers, "Subscriber fetched successfully"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid subscriberId");
  }

  const subscribedChannels = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channel",
        pipeline: [
          {
            $lookup: {
              from: "Subscriptions",
              localField: "_id",
              foreignField: "subscriber",
              as: "subCnt",
            },
          },
          {
            $addFields: {
              subCnt: {
                $size: "$subCnt",
              },
            },
          },
          {
            $project: {
              username: 1,
              fullname: 1,
              avatar: 1,
              subCnt: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        channel: {
          $first: "$channel",
        },
      },
    },
    {
      $project: {
        subscriber: 1,
        channel: 1,
      },
    },
  ]);

  if (!subscribedChannels) {
    throw new ApiError(400, "Falied to get subscribed channels");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedChannels,
        "Subscribed channels Fetched successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
