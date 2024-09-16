import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useValidateAuthData from "../../hooks/useValidateAuthData";

export default function Auth({
  title,
  action,
  sendAuthData,
  children,
  withEmailField,
}) {
  const { handleSubmit, errors, register, reset } = useValidateAuthData();

  return (
    <form
      action={action}
      method="POST"
      className="auth-card"
      onSubmit={handleSubmit(sendAuthData)}
    >
      <div className="form-top">
        <h1>{title}</h1>
      </div>

      <div className="wrap-input">
        <label htmlFor="name">Nom utilisateur</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="ex : John Doe"
          {...register("name", {
            required: true,
            minLength: 2,
            maxLength: 16,
          })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="wrap-input">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="text"
          name="password"
          placeholder="Gardez-le secret"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      {withEmailField && (
        <div className="wrap-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="ex : johndoe@gmail.com"
            {...register("email", { required: false })}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
      )}

      {children}
    </form>
  );
}
