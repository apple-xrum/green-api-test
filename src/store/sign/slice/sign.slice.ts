import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: !!(localStorage.getItem("idInstance") && localStorage.getItem("apiTokenInstance")),
  idInstance: localStorage.getItem("idInstance") || "",
  apiTokenInstance: localStorage.getItem("apiTokenInstance") || "",
};

const signSlice = createSlice({
  name: "sign",
  initialState,
  reducers: {
    login: (state, action) => {
      const { idInstance, apiTokenInstance } = action.payload;
      state.isLogin = true;
      state.idInstance = idInstance;
      state.apiTokenInstance = apiTokenInstance;
      localStorage.setItem("idInstance", idInstance);
      localStorage.setItem("apiTokenInstance", apiTokenInstance);
    },
    logout: (state) => {
      state.isLogin = false;
      state.idInstance = "";
      state.apiTokenInstance = "";
      localStorage.removeItem("idInstance");
      localStorage.removeItem("apiTokenInstance");
    },
  },
});

export const { login, logout } = signSlice.actions;

export default signSlice;
