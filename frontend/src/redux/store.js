import { configureStore } from "@reduxjs/toolkit";
import branchReducer from "./branchSlice";
import categoryReducer from "./catogorySlice";
import vendorReducer from "./vendorSlice";

const store = configureStore({
  reducer: {
    vendors: vendorReducer,
    branches: branchReducer,
    categories: categoryReducer,
  },
});

export default store;
