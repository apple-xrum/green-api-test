import { Box, Typography } from "@mui/material";

type MessageProps = {
  type: "incoming" | "outgoing";
  idMessage: string;
  timestamp: number;
  textMessage: string;
  senderName?: string;
};

const dateOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const Message: React.FC<MessageProps> = ({ type, senderName, textMessage, timestamp }) => {
  return (
    <Box
      sx={{
        maxWidth: "400px",
        width: "fit-content",
        minWidth: "100px",
        ml: type === "outgoing" ? "auto" : null,
        p: 1,
        borderRadius: 2,
        bgcolor: type === "outgoing" ? "#1976d2" : "#464646",
      }}
    >
      <Typography variant="caption" color="#fff">
        {senderName || "Вы"}
      </Typography>
      <Typography variant="body1" color="#fff">
        {textMessage}
      </Typography>
      <Typography variant="body2" color="#fff" textAlign="right">
        {new Date(timestamp * 1000).toLocaleString("ru-RU", dateOptions).split(",").join("")}
      </Typography>
    </Box>
  );
};

export default Message;
