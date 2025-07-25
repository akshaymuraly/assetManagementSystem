import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branches",
  initialState: [],
  reducers: {
    setBranches: (state, action) => action.payload,
    addBranch: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBranches, addBranch } = branchSlice.actions;
export default branchSlice.reducer;
