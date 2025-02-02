import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  Link,
  InputBaseComponentProps,
} from "@mui/material";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../store/sign/slice/sign.slice.ts";
import { useNavigate } from "react-router-dom";

type FormData = {
  idInstance: string;
  apiTokenInstance: string;
};

type Field = {
  name: keyof FormData;
  label: string;
  inputProps?: InputBaseComponentProps;
};

const fields: Field[] = [
  {
    name: "idInstance",
    label: "idInstance",
  },
  {
    name: "apiTokenInstance",
    label: "apiTokenInstance",
    inputProps: {
      maxLength: 50,
    },
  },
];

const schema = yup.object().shape({
  idInstance: yup.string().min(1).required(),
  apiTokenInstance: yup.string().length(50).required(),
});

const SignPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(login(data));
    navigate("/chats");
  };

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh" px={2}>
      <Stack maxWidth="320px" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h1" textAlign="center" mb={2}>
          Для использования приложения введите данные с{" "}
          <Link color="#3B9702" href="https://green-api.com" target="_blank">
            GREEN-API
          </Link>
        </Typography>
        {fields.map((fieldConfig) => (
          <Box key={fieldConfig.name} mb={2} width="100%">
            <Controller
              name={fieldConfig.name}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label={fieldConfig.label}
                  variant="outlined"
                  sx={{
                    ".MuiFormLabel-root.Mui-focused ": { color: "#3B9702 !important" },
                    ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#3B9702 !important",
                    },
                  }}
                  fullWidth
                  error={!!errors[fieldConfig.name]}
                  helperText={errors[fieldConfig.name] ? errors[fieldConfig.name]?.message : ""}
                  inputProps={fieldConfig.inputProps}
                />
              )}
            />
          </Box>
        ))}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            bgcolor: "#3B9702",
          }}
        >
          Установить
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignPage;
