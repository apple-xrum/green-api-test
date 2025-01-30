import { configureStore } from "@reduxjs/toolkit";
import signSlice from "./sign/slice/sign.slice";

const store = configureStore({
  reducer: {
    sign: signSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
