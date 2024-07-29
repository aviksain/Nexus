import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  status: boolean;
  videos: Array<any>;
  video: any;
  isSubscribed: boolean;
}

const initialState: CounterState = {
  status: false,
  videos: [],
  video: {},
  isSubscribed: false,

};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    updateVideos: (state, action: PayloadAction<Array<any>>) => {
      state.status = true;
      state.videos = [...state.videos, ...action.payload];
    },
    deleteAVideo: (state, action) => {
      state.videos = state.videos.filter((prev) => prev._id !== action.payload);
    },
    deleteAllVideos: (state) => {
      state.videos = [];
    },
    updateVideo: (state, action) => {
      state.video = action.payload;
    },
    toggleSubscription: (state) => {
      state.isSubscribed = !state.isSubscribed;
      console.log('New state:', state.isSubscribed);
    },
    toggleLike:(state) => {
      state.video.isLiked ? state.video.likes -= 1 : state.video.likes +=1;
      state.video.isLiked = !state.video.isLiked;
    },
    reset: (state) => {
      state.videos =  [];
      state.video =  {};
      state.isSubscribed = false;
    }
  },
});

export const {
  updateVideos,
  deleteAVideo,
  updateVideo,
  deleteAllVideos,
  toggleSubscription,
  toggleLike,
  reset
} = videoSlice.actions;

export default videoSlice.reducer;
