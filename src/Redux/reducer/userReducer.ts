import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginState } from "../../Types/reducer_types";
import { User } from "../../Types/types";

const initialState: LoginState = {
  isLoading: false,
  error: null,
  user: null,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = userReducer.actions;
export default userReducer.reducer;
