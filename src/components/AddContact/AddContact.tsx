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
    .matches(/^\d{11}$/, "Некорректный номер телефона")
    .required(),
});

const AddContact = ({ handleClose, open }: { handleClose: () => void; open: boolean }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const { phone } = data;
    dispatch(addContact({ phone }));
    handleClose();
    reset();
    navigate(`/chats/${phone}`);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      event.target.value = value;
    } else {
      event.target.value = value.replace(/\D/g, "");
    }
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
                inputProps={{
                  maxLength: 11,
                }}
                sx={{
                  ".MuiFormLabel-root.Mui-focused ": { color: "#3B9702 !important" },
                  ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3B9702 !important",
                  },
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handlePhoneChange(e);
                  field.onChange(e);
                }}
              />
            )}
          />
        </Box>
        <Button type="submit" variant="contained" sx={{ bgcolor: "#3B9702" }}>
          Добавить
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddContact;
