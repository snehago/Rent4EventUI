import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  dates: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addDate: (state, action: PayloadAction<any>) => {
      state.dates = action.payload;
    },
    removeDate: (state) => {
      state.dates = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDate, removeDate } = cartSlice.actions;
export default cartSlice.reducer;
