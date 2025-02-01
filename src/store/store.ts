import { configureStore } from "@reduxjs/toolkit";
import signSlice from "./sign/slice/sign.slice";
import contactSlice from "./contacts/slice/contacts.slice.ts";
import { messagesApi } from "./messages/api/messages.api.ts";

const store = configureStore({
  reducer: {
    sign: signSlice.reducer,
    contacts: contactSlice.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
