import { createSlice } from "@reduxjs/toolkit";
import {
  subscribersChannelsType,
} from "../../Types/dashboard";
import toast from "react-hot-toast";

type subscriptionState = {
  subscribers: subscribersChannelsType[];
};

const initialState: subscriptionState = {
  subscribers: [],
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    updateSubscribers: (state, action) => {
      state.subscribers = [...state.subscribers, ...action.payload];
    },
    toggleSubscription: (state, action) => {
      state.subscribers.map((subscriber) => {
        if (subscriber.subscriber._id === action.payload) {
          toast.success(
            `${
              subscriber.subscriber.isSubscribed
                ? "Unsubscribed"
                : "Subscribed"
            } to ${subscriber.subscriber.username}`
          );
          subscriber.subscriber.isSubscribed =
            !subscriber.subscriber.isSubscribed;
        }
      });
    },
    reset: (state) => {
      state.subscribers = [];
    },
  },
});

export const { updateSubscribers, toggleSubscription, reset } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
