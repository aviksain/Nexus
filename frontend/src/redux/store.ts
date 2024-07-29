import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  channelSlice,
  dashboardSlice,
  videosSlice,
  tweetSlice,
  subscriptionSlice,
  commentSlice
} from "./slices/index";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videosSlice,
    dashboard: dashboardSlice,
    channel: channelSlice,
    tweet: tweetSlice,
    subscription: subscriptionSlice,
    comment: commentSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
