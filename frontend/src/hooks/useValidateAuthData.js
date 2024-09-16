import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useValidateAuthData(schema) {
  const _schema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Your name must be at least 2 characters long.")
      .max(16, "Your name must be at most 16 characters long.")
      .required("You must provide a name."),

    password: yup
      .string()
      .min(6, "Your password must be at least 6 characters long.")
      .max(12, "Your password must be at most 12 characters long.")
      .required("You must provide a password."),

    email: yup.string().email("This is not a valid email.").notRequired(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema || _schema),
  });

  return { handleSubmit, register, errors, reset };
}
