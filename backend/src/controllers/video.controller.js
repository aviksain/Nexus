import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Subscription } from "../models/subscription.model.js";

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

  if (!userId) {
    // fetch all the videos for home page
    console.log(userId);
    const sortOptions = {
      [sortBy]: sortType === "asc" ? 1 : -1,
    };

    const pipeline = [
      {
        $match: {
          isPublished: true,
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
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
            $first: "$owner",
          },
        },
      },
      { $sort: sortOptions },
    ];

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const aggarteVideos = Video.aggregate(pipeline);

    const videos = await Video.aggregatePaginate(aggarteVideos, options);

    return res
      .status(200)
      .json(new ApiResponse(200, videos, "All videos fetched successfully"));
  } else if (userId) {
    // fetch the channel videos
    const sortOptions = {
      [sortBy]: sortType === "asc" ? 1 : -1,
    };

    const pipeline = [
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
          isPublished: true,
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
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
                username: 1,
                _id: 1,
                fullname: 1,
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
      { $sort: sortOptions },
    ];

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const aggarteVideos = Video.aggregate(pipeline);

    const videos = await Video.aggregatePaginate(aggarteVideos, options);

    return res
      .status(200)
      .json(new ApiResponse(200, videos, "All videos fetched successfully"));
  }
});

// const getAllVideos = asyncHandler(async (req, res) => {
//   const {
//     page = 1,
//     limit = 10,
//     query = "",
//     sortBy,
//     sortType,
//     userId,
//   } = req.query;
//   //TODO: get all videos based on query, sort, pagination

//   /*
//   Steps ->
//     1. check the userid
//     2. Search the videos which match the title and description
//     3. show those videos which isPublished is true
//     4. get the ownerDetails of every video
//     5. sort the videos based on the sortType
//     6. Apply pagination by aggregatePaginate
//   */

//   if (!userId || !isValidObjectId(userId)) {
//     throw new ApiError(400, "UserId must be a valid userid");
//   }

//   const videoAggregate = Video.aggregate(
//     [
//       {
//         $search: {
//           index: "search-videos",
//           text: {
//             query: query,
//             path: ["title", "description"],
//           },
//         },
//       },
//       {
//         $match: {
//           isPublished: true,
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "owner",
//           foreignField: "_id",
//           as: "owner",
//           pipeline: [
//             {
//               $project: {
//                 username: 1,
//                 avatar: 1,
//               },
//             },
//           ],
//         },
//       },
//       {
//         $addFields: {
//           owner: {
//             $first: "$owner"
//           }
//         }
//       },
//       {
//         $sort: {
//           [sortBy]: sortType === "asc" ? 1 : -1,
//         },
//       },
//     ]
//   );

//   const options = {
//     page: parseInt(page, 10),
//     limit: parseInt(limit, 10),
//   };

//   const video = await Video.aggregatePaginate(videoAggregate, options);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, video, "All videos fetched successfully"));
// });

// const getAllVideos = asyncHandler(async (req, res) => {
//   const {
//     page = 1,
//     limit = 10,
//     query = "",
//     sortBy = "createdAt",
//     sortType = "asc",
//     userId,
//   } = req.query;

//   // Step 1: Validate userId
//   if(userId !== "" && !isValidObjectId(userId)) {
//     throw new ApiError(400, "UserId must be a valid userid");
//   }

//   // Step 2: Build the query object
//   const queryObj = {
//     isPublished: true,
//     $or: [
//       { title: { $regex: query, $options: "i" } },
//       { description: { $regex: query, $options: "i" } },
//     ],
//   };

//   // Step 3: Set the sort options
//   const sortOptions = {
//     [sortBy]: sortType === "asc" ? 1 : -1,
//   };

//   // Step 4: Fetch the videos
//   const videos = await Video.find(queryObj)
//     .populate({
//       path: 'owner',
//       select: 'username avatar',
//     })
//     .sort(sortOptions)
//     .skip((page - 1) * limit)
//     .limit(parseInt(limit, 10));

//   // Step 5: Get the total count for pagination
//   const totalVideos = await Video.countDocuments(queryObj);

//   // Step 6: Prepare the response
//   const response = {
//     totalItems: totalVideos,
//     totalPages: Math.ceil(totalVideos / limit),
//     currentPage: parseInt(page, 10),
//     items: videos,
//   };

//   // Step 7: Send the response
//   return res.status(200).json(new ApiResponse(200, response, "All videos fetched successfully"));
// });

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

  const videoOwner = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(video.owner),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
      },
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        subscribersCount: 1,
        avatar: 1,
      },
    },
  ]);

  const likes = await Like.countDocuments({ video: videoId });
  const findIsLike = await Like.find({ video: videoId, likedBy: req.user._id });
  const findIsSubscribed = await Subscription.find({
    channel: videoOwner[0]._id,
    subscriber: req.user?._id,
  });

  const isLiked = findIsLike.length > 0;
  const isSubscribed = findIsSubscribed.length > 0;

  const watchHistory = req.user?.watchHistory;

  let newView = video.views;
  if (!watchHistory.includes(videoId)) {
    newView = video.views + 1;
    await User.findByIdAndUpdate(req.user?._id, {
      $addToSet: { watchHistory: videoId },
    });
  }

  await Video.findByIdAndUpdate(video._id, {
    $set: {
      views: newView,
    },
  });

  const responseData = {
    _id: video._id,
    videoFile: video.videoFile,
    thumbnail: video.thumbnail,
    title: video.title,
    description: video.description,
    duration: video.duration,
    views: video.views + 1,
    isPublished: video.isPublished,
    owner: videoOwner[0],
    likes: likes,
    isLiked: isLiked,
    isSubscribed: isSubscribed,
    createdAt: video.createdAt,
    updatedAt: video.updatedAt,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "video featched successfully"));
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
    .json(
      new ApiResponse(200, updateVideo, "Video details updated succesfully")
    );
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
