import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../app/types/user";

export interface UserState {
  user: User | null;
  token: string | null;
}

//@ts-ignore
const user = JSON.parse(localStorage.getItem("user"));

const initialState: UserState = {
  user: user || null,
  token: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<UserState>) => {
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.user = payload.user;
      state.token = payload.token;
    },
    updateToken: (state, { payload }: PayloadAction<{token: string}>) => {
      state.token = payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout, updateToken } = slice.actions;

export default slice.reducer;
