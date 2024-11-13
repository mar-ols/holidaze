import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CtaButton } from "../../../styles/styled-components/buttons";
import { useFetch } from "../../api/constant";

/* eslint-disable react/prop-types */

const schema = yup
  .object({
    email: yup
      .string()
      .required("Please enter a valid email address")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email format"
      ),
    password: yup
      .string()
      .required("Please enter password")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();

function LoginForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, isLoading, isError, fetchData } = useFetch(
    "https://v2.api.noroff.dev/auth/login?_holidaze=true",
    "POST",
    null,
    null,
    null
  );

  const onSubmit = async (formData) => {
    await fetchData({ email: formData.email, password: formData.password });
    console.log("Login form data submitted:", formData);
  };

  useEffect(() => {
    if (data) {
      console.log("Login successful:", data);
      localStorage.setItem("profile", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.data.accessToken));
      onSuccess();
      window.location.reload();
    }

    if (isError) {
      console.error("Login error:", isError);
    }
  }, [data, isError, onSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email:*</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          {...register("email", {
            required: true,
          })}
        />
        <p>{errors.email?.message}</p>

        <label htmlFor="password">Password:*</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          {...register("password", { required: true, minLength: 8 })}
        />
        <p className="warn">{errors.password?.message}</p>
        <CtaButton type="submit">
          {isLoading ? "Logging in..." : "Login"}
        </CtaButton>
        {isError && <p className="error">{isError}</p>}
      </form>
    </>
  );
}

export { LoginForm };
