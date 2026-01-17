import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video id");
  }

  const existingLike = await Like.findOne({
    video: videoId,
    likedBy: req.user?._id,
  });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Like removed from video"));
  } else {
    const newLike = await Like.create({
      video: videoId,
      likedBy: req.user?._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, newLike, "Like added to the video"));
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment id");
  }

  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: req.user?._id,
  });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Like removed from comment"));
  } else {
    const newLike = await Like.create({
      comment: commentId,
      likedBy: req.user?._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, newLike, "Like added to the comment"));
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet id");
  }

  const existingLike = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user?._id,
  });

  if (existingLike) {
    await Like.findByIdAndDelete(existingLike?._id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Like removed from tweet"));
  } else {
    const newLike = await Like.create({
      tweet: tweetId,
      likedBy: req.user?._id,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, newLike, "Like added to the tweet"));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const likedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(req.user?._id),
        video: { $exists: true },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "video",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    fullname: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
          {
            $match: {
              isPublished: true,
            }
          }
        ],
      },
    },
    {
      $match: {
        "video.isPublished": true // Ensure the video is published
      }
    },
    {
      $project: {
        video: 1,
        likedBy: 1,
      },
    },
  ]);

  if (!likedVideos) {
    throw new ApiError(400, "Failed to fetch videos");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, likedVideos, "Video fetched succesfully"));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
