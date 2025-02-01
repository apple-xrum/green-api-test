import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  contacts: Array<string>;
} = {
  contacts: localStorage.getItem("contacts")
    ? JSON.parse(<string>localStorage.getItem("contacts"))
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
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
    clearContacts: (state) => {
      state.contacts = [];
      localStorage.removeItem("contacts");
    },
  },
});

export const { addContact, clearContacts } = contactSlice.actions;

export default contactSlice;
