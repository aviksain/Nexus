import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video Id");
  }

  const pipeline = [
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
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
              username: 1,
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
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "comment",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: {
          $size: "$likes",
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
      $sort: {
        createdAt: -1,
      },
    },
  ];

  const comments = Comment.aggregate(pipeline);

  /*
    Note : we can also do the pagination like this without aggregatePaginate

    const totalItems = comments.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedComments = comments.slice(startIndex, startIndex + limit);

    const response = {
      totalItems,
      totalPages,
      currentPage: Number(page),
      data: paginatedComments,
    };
  */

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10)
  };

  
  const commentPaginate = await Comment.aggregatePaginate(comments, options);
  return res
    .status(200)
    .json(new ApiResponse(200, commentPaginate, "Comments fetched successfully"));
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { content } = req.body;

  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid video Id");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (!content && content === undefined && content.trim() === "") {
    throw new ApiError(400, "Comment is required");
  }

  const comment = await Comment.create({
    content: content,
    video: videoId,
    owner: req.user?._id,
  });

  if (!comment) {
    throw new ApiError(403, "Falied to create comment");
  }

  const response = {
    _id: comment._id,
    content: comment.content,
    video: videoId,
    owner: {
      _id: req.user?._id,
      avatar: req.user?.avatar,
      fullname: req.user?.fullname,
      username: req.user?.username
    },
    "createdAt": comment.createdAt,
    "updatedAt": comment.updatedAt,
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Comment Created successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment

  const { commentId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Not a valid Comment id");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(403, "Comment not found");
  }

  if (req.user?._id.toString() !== comment.owner?.toString()) {
    throw new ApiError(400, "You are not the owner of this comment");
  }

  if (!content && content === undefined && content.trim() === "") {
    throw new ApiError(400, "Comment is required");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    comment._id,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedComment) {
    throw new ApiError(400, "Falied to update comment");
  }

  const response = {
    _id: updatedComment._id,
    content: updatedComment.content,
    video: updatedComment.video,
    owner: {
      _id: req.user?._id,
      avatar: req.user?.avatar,
      fullname: req.user?.fullname,
      username: req.user?.username
    },
    "createdAt": updatedComment.createdAt,
    "updatedAt": updatedComment.updatedAt,
  }

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "Not a valid Comment id");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(403, "Comment not found");
  }

  if (req.user?._id.toString() !== comment.owner?.toString()) {
    throw new ApiError(400, "You are not the owner of this comment");
  }

  const deleteComment = await Comment.findByIdAndDelete(commentId);

  if (!deleteComment) {
    throw new ApiError(400, "Failed to delete Comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteComment, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
