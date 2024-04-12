import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy,
    sortType,
    userId,
  } = req.query;
  //TODO: get all videos based on query, sort, pagination

  /*
		Steps ->
		1. check the userid 
		2. Search the videos which match the title and description
		3. show those videos which isPublished is true
    4. get the ownerDetails of every video
    5. sort the videos based on the sortType
    6. Apply pagination by aggregatePaginate
	*/

  if (!userId || !isValidObjectId(userId)) {
    throw new ApiError(400, "UserId must be a valid userid");
  }

  const videoAggregate = Video.aggregate(
    [
      {
        $search: {
          index: "search-videos",
          text: {
            query: query,
            path: ["title", "description"],
          },
        },
      },
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $match: {
          isPublished: true,
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
                username: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          owner: {
            $first: "$owner"
          }
        }
      },
      {
        $sort: {
          [sortBy]: sortType === "asc" ? 1 : -1,
        },
      },
    ]
  );

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const video = await Video.aggregatePaginate(videoAggregate, options);

  return res
    .status(200)
    .json(new ApiResponse(200, video, "All videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

  if (!title || !description) {
    throw new ApiError(400, "title and description required");
  }

  const videoFileLocalPath = req.files?.videoFile[0].path;

  if (!videoFileLocalPath) {
    throw new ApiError(400, "video file is required");
  }

  const thumbnailLocalPath = req.files?.thumbnail[0].path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "thumbnail is required");
  }

  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  const owner = req.user?._id;

  console.log(videoFile);

  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    title,
    description,
    duration: videoFile.duration / 60,
    views: 0,
    isPublished: false,
    owner,
  });

  // console.log(video);

  if (!video) {
    throw new ApiError(400, "Something went wrong while uploding the video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video uploded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "video featched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const { title, description } = req.body;

  const thumbnailLocalPath = req.file?.path;

  if (!title && !description && !thumbnailLocalPath) {
    throw new ApiError(400, "title or description or thumbnail required");
  }

  const video = await Video.findById(videoId);

  if (video?.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(
      400,
      "You can't update the video as you are not owner of it"
    );
  }

  const currTitle = title && title.trim() !== "" ? title.trim() : video.title;

  const currDescription =
    description && description.trim() !== ""
      ? description.trim()
      : video.description;

  let currThumbnail;
  // If no new thumbnail provided, use the existing one
  if (!thumbnailLocalPath) {
    currThumbnail = video.thumbnail;
  } else {
    // If a new thumbnail is provided, delete the old one from Cloudinary and upload the new one
    await deleteFromCloudinary(video.thumbnail);
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    currThumbnail = uploadedThumbnail.url;
  }

  video.title = currTitle;
  video.description = currDescription;
  video.thumbnail = currThumbnail;

  const updateVideo = await video.save({ validateBeforeSave: false });

  if (!updateVideo) {
    throw new ApiError(400, "Failed to update video");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video details updated succesfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId);

  if (video?.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(
      400,
      "You can't delete the video as you are not owner of it"
    );
  }

  await deleteFromCloudinary(video.thumbnail);
  await deleteFromCloudinary(video.videoFile, "video");

  const result = await Video.deleteOne({ _id: videoId });

  if (!result) {
    throw new ApiError(400, "Unable to delete video");
  }

  return res.status(200).json(200, {}, "Video deleted succesfully");
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  const video = await Video.findById(videoId);

  if (video?.owner.toString() !== req.user?._id.toString()) {
    throw new ApiError(
      400,
      "You can't toggle the video as you are not owner of it"
    );
  }

  const toggle = await Video.findByIdAndUpdate(
    video?._id,
    {
      $set: {
        isPublished: !video?.isPublished,
      },
    },
    { new: true }
  );

  if (!toggle) {
    throw new ApiError(400, "Failed to toggle the video");
  }

  return res.status(200).json(
    200,
    {
      isPublished: toggle.isPublished,
    },
    "toggled the video successfully"
  );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
