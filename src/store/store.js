import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
//Below the store is configured to be used in the application.
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
