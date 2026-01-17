import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tweetType } from "../../Types/dashboard";

type tweetState = {
  channelTweets: tweetType[];
};

const initialState: tweetState = {
  channelTweets: [],
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    updateTweet: (state, action: PayloadAction<tweetType[]>) => {
      state.channelTweets = [...action.payload, ...state.channelTweets];
    },
    deleteTweet: (state, action: PayloadAction<string>) => {
      state.channelTweets = state.channelTweets.filter(
        (tweet) => tweet._id !== action.payload
      );
    },
    toggleLike: (state,action) => {
      state.channelTweets.map((tweet) => {
        if(tweet._id === action.payload) {
          tweet.isLiked ? tweet.likesCnt -= 1 : tweet.likesCnt += 1;
          tweet.isLiked = !tweet.isLiked;
        }
      })
    },
    reset:(state) => {
      state.channelTweets= []
    }
  },
});

export const { updateTweet, deleteTweet, toggleLike, reset } = tweetSlice.actions;

export default tweetSlice.reducer;
