import { configureStore } from "@reduxjs/toolkit";
import signSlice from "./sign/slice/sign.slice";
import contactSlice from "./contacts/slice/contacts.slice.ts";

const store = configureStore({
  reducer: {
    sign: signSlice.reducer,
    contacts: contactSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
