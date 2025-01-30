import { Stack } from "@mui/material";
import { Chat, Contacts } from "../../components";

const ChatPage = () => {
  return (
    <Stack direction="row">
      <Contacts />
      <Chat />
    </Stack>
  );
};

export default ChatPage;
