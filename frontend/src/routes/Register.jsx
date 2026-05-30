import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useLoader } from "../context/LoaderContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../api/api";
import { PageTitle } from "../components";
import { useUserData } from "../context/UserContext.jsx";

function Register({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { login } = useUserData();

  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  const schema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .max(30, "First name must not exceed 30 characters"),

    lastName: yup
      .string()
      .required("Last name is required")
      .max(30, "Last name must not exceed 30 characters"),

    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain an uppercase letter")
      .matches(/\d/, "Password must contain a number")
      .matches(/[!@#$%^&*()?|<>]/, "Password must contain a special character"),

    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
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
      const data = await registerUser(
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.firstName,
        formData.lastName,
      );
      login(data.data);
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
      <PageTitle pageName="Register"></PageTitle>

      <div className="auth">
        <h2 className="auth__title">Create an account</h2>
        <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth__form__item">
            <label className="auth__form__item__label" htmlFor="firstName">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              maxLength={30}
              id="firstName"
              className={clsx("auth__form__item__input", {
                error: errors.firstName?.message,
              })}
              {...register("firstName")}
            />
            <p className="auth__form__item__error">
              {errors.firstName?.message}
            </p>
          </div>

          <div className="auth__form__item">
            <label className="auth__form__item__label" htmlFor="lastName">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              maxLength={30}
              id="lastName"
              className={clsx("auth__form__item__input", {
                error: errors.lastName?.message,
              })}
              {...register("lastName")}
            />
            <p className="auth__form__item__error">
              {errors.lastName?.message}
            </p>
          </div>

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

          <div className="auth__form__item">
            <label className="auth__form__item__label" htmlFor="password">
              Confirm Password <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              maxLength={30}
              id="confirmPassword"
              className={clsx("auth__form__item__input", {
                error: errors.confirmPassword?.message,
              })}
              {...register("confirmPassword")}
            />
            <p className="auth__form__item__error">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <p className="auth__error">{errors.root?.serverError?.message}</p>

          <button className="auth__form__submit" type="submit">
            Create New Account
          </button>

          <Link to="/login">
            <button type="button" className="auth__form__register">
              Login
            </button>
          </Link>
        </form>
      </div>
      <div />
    </div>
  );
}

export default Register;
