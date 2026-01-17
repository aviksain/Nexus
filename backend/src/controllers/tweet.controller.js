import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet

  if (!req.user?._id) {
    throw new ApiError(400, "You can't tweet as you are not authorized");
  }

  const { content } = req.body;

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }

  const tweet = await Tweet.create({
    owner: req.user?._id,
    content,
  });

  if (!tweet) {
    throw new ApiError(500, "Failed to create tweet");
  }

  const responseData = {
    "_id": tweet._id,
    "owner": {
      "_id": req.user?._id,
      "fullname": req.user.fullname,
      "avatar": req.user.avatar
    },
    "content": tweet.content,
    "updatedAt": tweet.updatedAt,
    "likesCnt": 0,
    "isLiked": false,
  }

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets

  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  if (!req.user?._id) {
    throw new ApiError(400, "Needed to login to see tweets");
  }

  const tweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              fullname: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCnt: {
          $size: "$likes",
        },
        owner: {
          $first: "$owner",
        },
        isLiked: {
          $cond: {
            if: { $in: [req.user?._id, "$likes.likedBy"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        owner: 1,
        content: 1,
        updatedAt: 1,
        likesCnt: 1,
        isLiked: 1,
      },
    },
    {
      $sort: {
        updatedAt: -1,
      },
    },
  ]);

  if (!tweets) {
    throw new ApiError(500, "Unable to featch tweets");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "tweets featched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet

  const { tweetId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(400, "Tweet not found");
  }

  if (req.user?._id.toString() !== tweet.owner.toString()) {
    throw new ApiError(400, "You can't update the tweet");
  }

  if (content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedTweet) {
    throw new ApiError(400, "Falied to update tweet");
  }

  const responseData = {
    "_id": updatedTweet._id,
    "owner": {
      "_id": req.user?._id,
      "fullname": req.user.fullname,
      "avatar": req.user.avatar
    },
    "content": updatedTweet.content,
    "updatedAt": updatedTweet.updatedAt,
    "likesCnt": updatedTweet.likesCnt,
    "isLiked": updatedTweet.isLiked
  }

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "tweets updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new ApiError(400, "Tweet not found");
  }

  if (req.user?._id.toString() !== tweet.owner.toString()) {
    throw new ApiError(400, "You can't delete the tweet");
  }

  await Tweet.findByIdAndDelete(tweetId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
