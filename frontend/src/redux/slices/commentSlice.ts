import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  totalComment: number;
  videoComments: Array<any>;
}

const initialState: CounterState = {
  totalComment: 0,
  videoComments: [],
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateComment: (state, action) => {
      state.totalComment = action.payload.totalDocs
      state.videoComments = [...action.payload.docs, ...state.videoComments];
    },
    deleteAComment: (state, action) => {
      state.totalComment -= 1
      state.videoComments = state.videoComments.filter(
        (prev) => prev._id !== action.payload
      );
    },
    toggleLike: (state,action) => {
      state.videoComments.map((comment) => {
        if(comment._id === action.payload) {
          comment.isLiked ? comment.likes -= 1 : comment.likes +=1;
          comment.isLiked = !comment.isLiked
        }
      })
    },
    reset:(state) => {
      state.totalComment= 0;
      state.videoComments = [];
    }
  },
});

export const { updateComment, deleteAComment, toggleLike,reset} = commentSlice.actions;

export default commentSlice.reducer;
