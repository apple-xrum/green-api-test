import { Box, Typography } from "@mui/material";

type MessageProps = {
  type: "incoming" | "outgoing";
  idMessage: string;
  timestamp: number;
  textMessage: string;
  senderName?: string;
};

const Message: React.FC<MessageProps> = ({ type, senderName, textMessage }) => {
  return (
    <Box
      sx={{
        maxWidth: "300px",
        width: "fit-content",
        minWidth: "100px",
        ml: type === "outgoing" ? "auto" : null,
        p: 1,
        borderRadius: 2,
        bgcolor: type === "outgoing" ? "#1976d2" : "#dbe4ee",
      }}
    >
      <Typography variant="caption">{senderName || "Вы"}</Typography>
      <Typography variant="body1">{textMessage}</Typography>
    </Box>
  );
};

export default Message;
