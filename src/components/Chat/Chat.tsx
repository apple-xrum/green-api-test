import { useLocation } from "react-router-dom";
import { Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useDeleteNotificationMutation,
  useGetMessagesMutation,
  useGetNotificationMutation,
  useSendMessageMutation,
} from "../../store/messages/api/messages.api.ts";
import Message from "./Message/Message.tsx";

type FormData = {
  message: string;
};

const schema = yup.object().shape({
  message: yup.string().min(1).required(),
});

const phoneNumberRegex = /^\d{11}$/;

type MessageType = {
  type: "incoming" | "outgoing";
  idMessage: string;
  timestamp: number;
  chatId: string;
  textMessage: string;
  typeMessage?: string;
  senderId?: string;
  senderName?: string;
  senderContactName?: string;
  deletedMessageId?: string;
  editedMessageId?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
};

type NotificationType = {
  receiptId: number;
  body: {
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      chatName: string;
      sender: string;
      senderName: string;
      senderContactName: string;
    };
    instanceData: {
      wid: string;
    };
    messageData: {
      textMessageData: {
        textMessage: string;
      };
    };
  };
};

const Chat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const location = useLocation();
  const [phone, setPhone] = useState("");

  const [getMessages, { isLoading: gettingMessages }] = useGetMessagesMutation();
  const [sendMessages, { isLoading: sendingMessage }] = useSendMessageMutation();
  const [getNotification] = useGetNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const currentPhone = location.pathname.split("/").pop();
    if (currentPhone && phoneNumberRegex.test(currentPhone)) {
      setPhone(currentPhone);
    } else {
      setPhone("");
      setMessages([]);
    }
  }, [location]);

  useEffect(() => {
    if (!phone) return;

    getMessages({
      chatId: `${phone}@c.us`,
    }).then((res) => {
      if (res.data) {
        const resMessage = res.data as MessageType[];
        setMessages(resMessage);
      } else {
        setMessages([]);
      }
    });
  }, [phone]);

  useEffect(() => {
    if (phone === "") return;
    let isFetching = false;
    let isFirst = true;

    const intervalGetNotifyAction = () => {
      if (isFirst) {
        isFirst = false;
        return;
      }
      if (isFetching) return;
      isFetching = true;
      getNotification({}).then((res) => {
        isFetching = false;
        if (!res || !res.data) return;
        const { receiptId, body } = res.data as NotificationType;
        deleteNotification({ receiptId });

        const { idMessage, messageData, senderData, timestamp, instanceData } = body;

        if (!idMessage || !messageData || !messageData.textMessageData || !senderData) return;
        if (senderData.chatId !== `${phone}@c.us`) return;

        const newMessage: MessageType = {
          idMessage,
          textMessage: messageData.textMessageData.textMessage,
          type: senderData.sender !== instanceData.wid ? "incoming" : "outgoing",
          senderName: senderData.sender !== instanceData.wid ? senderData.senderName : "",
          chatId: senderData.chatId,
          timestamp,
        };
        setMessages([newMessage, ...messages]);
      });
    };

    intervalGetNotifyAction();

    const intervalNotifyMessage = setInterval(() => {
      intervalGetNotifyAction();
    }, 1000);

    return () => clearInterval(intervalNotifyMessage);
  }, [messages]);

  const onSubmit = (data: FormData) => {
    const body = {
      ...data,
      chatId: `${phone}@c.us`,
    };
    sendMessages(body).then((res) => {
      if (res.data) {
        const { idMessage } = res.data as { idMessage: string };

        const message: MessageType = {
          type: "outgoing",
          idMessage: idMessage,
          textMessage: data.message,
          timestamp: Date.now() / 1000,
          chatId: `${phone}@c.us`,
        };
        setMessages([message, ...messages]);
      }
    });
    reset();
  };

  if (phone === "") {
    return (
      <Stack width="100%" height="100vh" justifyContent="center" alignItems="center">
        <Typography variant="h3" textAlign="center" m={2}>
          Выберите чат
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack width="100%" height="100vh" justifyContent="space-between" zIndex={1}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          py: 2,
          px: 3,
        }}
      >
        <Typography variant="h4">{phone}</Typography>
      </Paper>
      <Stack
        direction="column-reverse"
        height="100%"
        px={3}
        rowGap={3}
        sx={{
          "::-webkit-scrollbar": {
            width: "12px",
            backgroundColor: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#1976d2",
            borderRadius: "6px",
          },
          overflowY: "auto",
        }}
      >
        {!gettingMessages ? (
          messages.map((message) => <Message key={message.idMessage} {...message} />)
        ) : (
          <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Stack>
        )}
      </Stack>
      <Paper
        elevation={3}
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
          py: 2,
          px: 3,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="Сообщение..."
              size="small"
              variant="outlined"
              fullWidth
              error={!!errors.message}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={sendingMessage}
          loading={sendingMessage}
        >
          Отправить
        </Button>
      </Paper>
    </Stack>
  );
};

export default Chat;
