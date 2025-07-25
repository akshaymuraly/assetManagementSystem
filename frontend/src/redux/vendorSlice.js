import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendors",
  initialState: [],
  reducers: {
    setVendors: (state, action) => action.payload,
    addVendor: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setVendors, addVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
