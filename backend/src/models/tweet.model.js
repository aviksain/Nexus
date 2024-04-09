import {Schema, model} from 'mongoose';

const tweetSchema = new Schema({
  owner: {
    type: Schema.type.ObjectId,
    ref: "User"
  },
  content: {
    type: "string",
    required: true
  },
},{timestamps: true})

export const Tweet = model("Tweet",tweetSchema); 