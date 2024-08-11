import { createSlice } from "@reduxjs/toolkit";
import { channelVideosType, user } from "../../Types/dashboard";

type ChannelState = {
  status: boolean;
  userData: user;
  channelVideos: channelVideosType[];
  isSubscribed: boolean;
  isEditing: boolean;
};

const initialState: ChannelState = {
  status: false,
  userData: {
    _id: "",
    avatar: "",
    channelsSubscribedToCount: 0,
    coverImage: "",
    email: "",
    fullname: "",
    isSubscribed: false,
    subscribersCount: 0,
    username: "",
  },
  channelVideos: [],
  isSubscribed: false,
  isEditing: false,
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userData = action.payload;
    },
    updateVideos: (state, action) => {
      state.channelVideos = action.payload;
    },
    toggleSubscription: (state) => {
      state.isSubscribed = !state.isSubscribed;
    },
    toggleEdit: (state) => {
      state.isEditing = !state.isEditing;
    },
    updateCoverImage: (state, action) => {
      state.userData.coverImage = action.payload
    },
    updateAvatar: (state, action) => {
      state.userData.avatar = action.payload
    },
    updatefullname: (state, action) => {
      state.userData.fullname = action.payload
    },
    updateemail: (state, action) => {
      state.userData.email = action.payload
    },
    resetChannelVideos: (state) => {
      state.channelVideos = []
    },
    reset: (state) => {
      state.userData = {
        _id: "",
        avatar: "",
        channelsSubscribedToCount: 0,
        coverImage: "",
        email: "",
        fullname: "",
        isSubscribed: false,
        subscribersCount: 0,
        username: "",
      };
      state.channelVideos = [];
      state.isSubscribed = false;
      state.isEditing = false;
    },
  },
});

export const {
  updateUser,
  updateVideos,
  toggleSubscription,
  toggleEdit,
  updateCoverImage,
  updateAvatar,
  updatefullname,
  updateemail,
  resetChannelVideos,
  reset
} = channelSlice.actions;

export default channelSlice.reducer;
