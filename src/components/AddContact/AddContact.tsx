import { Box, Button, Dialog, DialogTitle, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addContact } from "../../store/contacts/slice/contacts.slice.ts";

type FormData = {
  phone: string;
};

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^(\+\d|\d)\d{10}$/, "Некорректный номер телефона")
    .required(),
});

const AddContact = ({ handleClose, open }: { handleClose: () => void; open: boolean }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    let { phone } = data;
    if (phone[0] == "+") {
      phone = phone.substring(1);
    } else {
      phone = `${Number(phone[0]) - 1}${phone.substring(1)}`;
    }
    dispatch(addContact({ phone }));
    navigate(`/chats/${phone}`);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Новый контакт</DialogTitle>
      <Stack component="form" p={2} spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2} width="100%">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Телефон"
                variant="outlined"
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone?.message : ""}
              />
            )}
          />
        </Box>
        <Button type="submit">Добавить</Button>
      </Stack>
    </Dialog>
  );
};

export default AddContact;
