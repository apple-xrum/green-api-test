import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  contacts: Array<string>;
} = {
  contacts: sessionStorage.getItem("contacts")
    ? JSON.parse(<string>sessionStorage.getItem("contacts"))
    : [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<{ phone: string }>) => {
      const { phone } = action.payload;
      if (state.contacts.findIndex((contact) => contact === phone) === -1) {
        state.contacts.push(phone);
        sessionStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
  },
});

export const { addContact } = contactSlice.actions;

export default contactSlice;
