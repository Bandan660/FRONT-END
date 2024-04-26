import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer_types";
import { User } from "../../types/types";

const initialState: UserReducerInitialState = {
  user: null,
  isLoading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>): void => {
      state.isLoading = false;
      state.user = action.payload;
    },
    userNotExist: (state): void => {
      state.isLoading = false;
      state.user = null;
    },
  },
});

export const { userExist, userNotExist } = userReducer.actions;
