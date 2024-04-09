import { Schema, model } from "mongoose";

/*
  {
    subscriber: _id (_id from user collection)
    channel: _id (_id from user collection)
  }
*/

const subscriptionSchema = new Schema(
  {
    // who is subscribing
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // which channel subscriber is subscribing
    channel: { 
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = model("Subscription", subscriptionSchema);
