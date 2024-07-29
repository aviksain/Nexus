import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { channelStatsType, channelVideosType } from "../../Types/dashboard";

type DashboardState = {
  status: boolean;
  channelStats: channelStatsType;
  channelVideos: channelVideosType[];
};

const initialState: DashboardState = {
  status: false,
  channelStats: {
    totalVideos: 0,
    totalViews: 0,
    totalSubscribers: 0,
    totalLikes: 0,
  },
  channelVideos: [
    {
      isPublished: false,
      thumbnail: "",
      title: "",
      likes: 0,
      createdAt: "",
      _id: "",
      description: ""
    },
  ],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateChannelStats: (state, action: PayloadAction<channelStatsType>) => {
      state.status = true;
      state.channelStats = action.payload;
    },
    updateChannelVideos: (state, action: PayloadAction<channelVideosType[]>) => {
      state.status = true;
      state.channelVideos = action.payload;
    },
    insertAVideo: (state, action) => {
      state.channelStats.totalVideos += 1;
      state.channelVideos.unshift(action.payload);
    },
    deleteChannelVideo: (state, action: PayloadAction<string>) => {
      state.status = true;
      state.channelStats.totalVideos -= 1;
      state.channelVideos = state.channelVideos.filter(
        (video) => video._id !== action.payload
      );
    },
    togglePublishStatus: (state, action: PayloadAction<string>) => {
      const video = state.channelVideos.find((v) => v._id === action.payload);
      if (video) {
        video.isPublished = !video.isPublished;
      }
    },
  },
});

export const {
  updateChannelStats,
  updateChannelVideos,
  togglePublishStatus,
  deleteChannelVideo,
  insertAVideo
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
