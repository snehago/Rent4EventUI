import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any= {
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login : (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout : (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
