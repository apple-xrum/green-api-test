import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AddContact } from "../index.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { logout } from "../../store/sign/slice/sign.slice.ts";
import { clearContacts } from "../../store/contacts/slice/contacts.slice.ts";

const Contacts = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearContacts());
  };

  return (
    <Stack>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          zIndex: 2,
          left: "15px",
          bottom: "15px",
          bgcolor: "#3B9702",
        }}
        onClick={handleLogout}
      >
        Выйти
      </Button>
      <AddContact handleClose={handleClose} open={open} />
      <Stack borderRight="3px solid #e9e9e9" width="250px" height="100%">
        <List
          sx={{
            height: "calc(100% - 60px)",
            "::-webkit-scrollbar": {
              width: "8px",
              backgroundColor: "transparent",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#3B9702",
              borderRadius: "4px",
            },
            overflowY: "auto",
          }}
          subheader={
            <ListSubheader
              component="div"
              sx={{
                py: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Чаты</Typography>
              <AddCircleIcon
                onClick={handleClickOpen}
                fontSize="large"
                sx={{
                  fill: "#3B9702",
                  transition: "opacity 100ms ease-in-out",
                  cursor: "pointer",
                  ":hover": {
                    opacity: 0.8,
                  },
                }}
              />
            </ListSubheader>
          }
        >
          {contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <ListItem key={contact} disablePadding>
                <ListItemButton onClick={() => navigate(`/chats/${contact}`)}>
                  <ListItemText primary={contact} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText secondary="Пусто" />
            </ListItem>
          )}
        </List>
      </Stack>
    </Stack>
  );
};

export default Contacts;
