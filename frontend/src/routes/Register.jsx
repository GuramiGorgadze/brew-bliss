import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser, googleAuth } from '../api/api';
import { PageTitle } from '../components';
import { useUserData } from '../context/UserContext.jsx';

function Register() {
  const navigate = useNavigate();
  const { login } = useUserData();
  const { t } = useTranslation();

  const { useFakeLoader } = useLoader();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useFakeLoader();
    setReady(true);
  }, []);

  const schema = yup.object({
    firstName: yup
      .string()
      .required(t('register.validation.firstNameRequired'))
      .max(30, t('register.validation.firstNameMax')),

    lastName: yup
      .string()
      .required(t('register.validation.lastNameRequired'))
      .max(30, t('register.validation.lastNameMax')),

    email: yup
      .string()
      .required(t('register.validation.emailRequired'))
      .email(t('register.validation.emailInvalid')),

    password: yup
      .string()
      .required(t('register.validation.passwordRequired'))
      .min(8, t('register.validation.passwordMin'))
      .matches(/[A-Z]/, t('register.validation.passwordUppercase'))
      .matches(/\d/, t('register.validation.passwordNumber'))
      .matches(/[!@#$%^&*()?|<>]/, t('register.validation.passwordSpecial')),

    confirmPassword: yup
      .string()
      .required(t('register.validation.confirmPasswordRequired'))
      .oneOf([yup.ref('password')], t('register.validation.confirmPasswordMatch')),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
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
        formData.lastName
      );
      login(data.data);
      navigate('/account');
    } catch (error) {
      setError('root.serverError', {
        message: error.response?.data?.message || t('register.validation.serverError'),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="auth-wrapper">
      <PageTitle
        pageName={t('register.pageTitle')}
        ready={ready}
      />

      <div className="auth">
        <h2 className="auth__title">{t('register.title')}</h2>
        <form
          className="auth__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="auth__form__item">
            <label
              className="auth__form__item__label"
              htmlFor="firstName"
            >
              {t('register.form.firstNameLabel')} <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder={t('register.form.firstNamePlaceholder')}
              maxLength={30}
              id="firstName"
              className={clsx('auth__form__item__input', { error: errors.firstName?.message })}
              {...register('firstName')}
            />
            <p className="auth__form__item__error">{errors.firstName?.message}</p>
          </div>

          <div className="auth__form__item">
            <label
              className="auth__form__item__label"
              htmlFor="lastName"
            >
              {t('register.form.lastNameLabel')} <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder={t('register.form.lastNamePlaceholder')}
              maxLength={30}
              id="lastName"
              className={clsx('auth__form__item__input', { error: errors.lastName?.message })}
              {...register('lastName')}
            />
            <p className="auth__form__item__error">{errors.lastName?.message}</p>
          </div>

          <div className="auth__form__item">
            <label
              className="auth__form__item__label"
              htmlFor="email"
            >
              {t('register.form.emailLabel')} <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder={t('register.form.emailPlaceholder')}
              maxLength={30}
              id="email"
              className={clsx('auth__form__item__input', { error: errors.email?.message })}
              {...register('email')}
            />
            <p className="auth__form__item__error">{errors.email?.message}</p>
          </div>

          <div className="auth__form__item">
            <label
              className="auth__form__item__label"
              htmlFor="password"
            >
              {t('register.form.passwordLabel')} <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder={t('register.form.passwordPlaceholder')}
              maxLength={30}
              id="password"
              className={clsx('auth__form__item__input', { error: errors.password?.message })}
              {...register('password')}
            />
            <p className="auth__form__item__error">{errors.password?.message}</p>
          </div>

          <div className="auth__form__item">
            <label
              className="auth__form__item__label"
              htmlFor="confirmPassword"
            >
              {t('register.form.confirmPasswordLabel')} <span className="required">*</span>
            </label>
            <input
              type="password"
              placeholder={t('register.form.confirmPasswordPlaceholder')}
              maxLength={30}
              id="confirmPassword"
              className={clsx('auth__form__item__input', {
                error: errors.confirmPassword?.message,
              })}
              {...register('confirmPassword')}
            />
            <p className="auth__form__item__error">{errors.confirmPassword?.message}</p>
          </div>

          <p className="auth__error">{errors.root?.serverError?.message}</p>

          <button
            className="auth__form__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('register.form.submittingBtn') : t('register.form.submitBtn')}
          </button>

          <Link to="/login">
            <button
              type="button"
              className="auth__form__register"
            >
              {t('register.form.loginBtn')}
            </button>
          </Link>

          <button
            type="button"
            className="auth__form__google"
            onClick={googleAuth}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            {t('login.form.continueWithGoogle')}
          </button>
        </form>
      </div>
      <div />
    </div>
  );
}

export default Register;
