import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useLoader } from "../context/LoaderContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../api/api";
import { PageTitle } from "../components";
import { useUserData } from "../context/UserContext.jsx";

function Login() {
  const { login } = useUserData();

  const navigate = useNavigate();

  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      const data = await loginUser(formData.email, formData.password);
      login(data.data)
      navigate("/account");
    } catch (error) {
      setError("root.serverError", {
        message: error.response?.data?.message || "Something went wrong",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="auth-wrapper">
      <PageTitle pageName="Login"></PageTitle>

      <div className="auth">
        <h2 className="auth__title">Log In</h2>
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth__form__item">
            <label className="auth__form__item__label" htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              maxLength={30}
              id="email"
              className={clsx("auth__form__item__input", {
                error: errors.email?.message,
              })}
              {...register("email")}
            />
            <p className="auth__form__item__error">{errors.email?.message}</p>
          </div>

          <div className="auth__form__item">
            <label className="auth__form__item__label" htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              maxLength={30}
              id="password"
              className={clsx("auth__form__item__input", {
                error: errors.password?.message,
              })}
              {...register("password")}
            />
            <p className="auth__form__item__error">
              {errors.password?.message}
            </p>
          </div>

          <p className="auth__form__forgot-password">Forgot your password ?</p>

          <p className="auth__error">{errors.root?.serverError?.message}</p>

          <button className="auth__form__submit" type="submit">
            Login
          </button>

          <Link to="/register">
            <button type="button" className="auth__form__register">
              Create New Account
            </button>
          </Link>
        </form>
      </div>
      <div />
    </div>
  );
}

export default Login;
