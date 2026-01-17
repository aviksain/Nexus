import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/*
storing the 
  videoFile-url, thumbnail, title, description, duration, views, isPublished, owner
*/

const schemaObj = {
  videoPublicId: {
    type: String, // cloudinary public_id for video (used for delete + HLS generation)
    required: true,
  },
  videoHlsUrl: {
    type: String, // .m3u8 url
    default: null,
  },
  videoFile: {
    type: "string", // cloudinary-url
    required: true
  },
  thumbnail: {
    type: "string", // cloudinary-url
    required: true
  },
  thumbnailPublicId: {
    type: String, // cloudinary public_id for thumbnail
    required: true,
  },
  title: {
    type: "string", 
    required: true
  },
  description: {
    type: "string",
    required: true
  },
  duration: {
    type: "Number",
    required: true
  },
  views: {
    type: "Number",
    default: 0
  },
  isPublished: {
    type: "boolean",
    default: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}


const videoSchema = new Schema(schemaObj, {timestamps: true});

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = model("Video", videoSchema);



