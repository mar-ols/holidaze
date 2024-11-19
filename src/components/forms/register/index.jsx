import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CtaButton } from "../../../styles/styled-components/buttons";
import { useFetch } from "../../api/constant";
import { useEffect, useState } from "react";

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
    name: yup
      .string()
      .required("Please enter a username")
      .min(3, "Username must be at least 3 characters"),
    password: yup
      .string()
      .required("Please enter a password")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();

function RegisterForm({ onSuccess }) {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isVenueManager, setIsVenueManager] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    data: registerData,
    isLoading: isRegistering,
    isError: isRegisterError,
    fetchData: registerFetch,
  } = useFetch("https://v2.api.noroff.dev/auth/register", "POST");

  const {
    data: loginData,
    isLoading: isLoggingIn,
    isError: isLoginError,
    fetchData: loginFetch,
  } = useFetch("https://v2.api.noroff.dev/auth/login", "POST");

  const onSubmit = async (formData) => {
    setUserCredentials({ email: formData.email, password: formData.password });

    await registerFetch({
      email: formData.email,
      name: formData.name,
      password: formData.password,
      venueManager: isVenueManager,
    });
  };

  useEffect(() => {
    if (registerData) {
      loginFetch({
        email: userCredentials.email,
        password: userCredentials.password,
      });
    }

    if (isRegisterError) {
      console.error("Registration error:", isRegisterError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerData, isRegisterError]);

  useEffect(() => {
    if (loginData) {
      localStorage.setItem("profile", JSON.stringify(loginData));
      onSuccess();
    } else if (isLoginError) {
      setLoginError("Login failed. Please check your credentials.");
    }
  }, [loginData, isLoginError, onSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email:*</label>
      <input
        type="email"
        id="email"
        name="email"
        className="form-control"
        {...register("email", { required: true })}
      />
      <p>{errors.email?.message}</p>

      <label htmlFor="name">Username:*</label>
      <input
        type="text"
        id="name"
        name="name"
        className="form-control"
        {...register("name", { required: true, minLength: 3 })}
      />
      <p className="warn">{errors.name?.message}</p>

      <label htmlFor="password">Password:*</label>
      <input
        type="password"
        id="password"
        name="password"
        className="form-control"
        {...register("password", { required: true, minLength: 8 })}
      />
      <p className="warn">{errors.password?.message}</p>
      <label htmlFor="manager">
        Do you want to register as a venue manager?
      </label>
      <div className="d-flex mb-4">
        <input
          id="manager"
          name="manager"
          className="me-1"
          type="checkbox"
          checked={isVenueManager}
          onChange={(e) => setIsVenueManager(e.target.checked)}
        />
        <span>Yes</span>
      </div>
      <CtaButton type="submit">
        {isRegistering
          ? "Registering..."
          : isLoggingIn
          ? "Logging in..."
          : "Register"}
      </CtaButton>
      {isRegisterError && <p className="error">{isRegisterError}</p>}
      {loginError && <p className="error">{loginError}</p>}
    </form>
  );
}

export { RegisterForm };
