import { ChatPage, SignPage } from "../pages";

export const PRIVATE_PAGES = [
  {
    path: "/login",
    component: SignPage,
  },
];

export const PUBLIC_PAGES = [
  {
    path: "/chats/*",
    component: ChatPage,
  },
];
