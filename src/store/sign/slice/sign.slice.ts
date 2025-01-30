import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: !!(sessionStorage.getItem("idInstance") && sessionStorage.getItem("apiTokenInstance")),
  idInstance: sessionStorage.getItem("idInstance") || "",
  apiTokenInstance: sessionStorage.getItem("apiTokenInstance") || "",
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
      sessionStorage.setItem("idInstance", idInstance);
      sessionStorage.setItem("apiTokenInstance", apiTokenInstance);
    },
    logout: (state) => {
      state.isLogin = false;
      state.idInstance = "";
      state.apiTokenInstance = "";
      sessionStorage.removeItem("idInstance");
      sessionStorage.removeItem("apiTokenInstance");
    },
  },
});

export const { login, logout } = signSlice.actions;

export default signSlice;
