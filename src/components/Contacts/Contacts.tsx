import {
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
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

const Contacts = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AddContact handleClose={handleClose} open={open} />
      <Stack borderRight="2px solid #1976d2" width="250px" height="100vh">
        <List
          subheader={
            <ListSubheader
              component="div"
              sx={{
                my: "10px",
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
                  fill: "#1976d2",
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
    </>
  );
};

export default Contacts;
