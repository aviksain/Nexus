import mongoose, { createConnection } from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const totalViews = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  const totalVideos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $count: "totalVideos",
    },
  ]);

  const totalSubscribers = await Subscription.countDocuments({
    channel: new mongoose.Types.ObjectId(req.user?._id),
  });

  const totalLikes = await Like.aggregate([
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videoData",
      },
    },
    {
      $match: {
        "videoData.owner": new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $count: "totalLikes",
    },
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalViews: totalViews[0].totalViews,
        totalVideos: totalVideos[0].totalVideos,
        totalSubscribers,
        totalLikes: totalLikes[0].totalLikes,
      },
      "Channel Stats fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const channelVideos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: {
          $size: "$likes",
        },
      },
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        isPublished: 1,
        createdAt: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        },
        likes: 1
      }
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, channelVideos, "Channel Videos fetched successfully")
    );
});

export { getChannelStats, getChannelVideos };
