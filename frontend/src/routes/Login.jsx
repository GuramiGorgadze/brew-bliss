import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser, forgotPassword } from '../api/api';
import { PageTitle } from '../components';
import { useUserData } from '../context/UserContext.jsx';

function Login() {
  const { login } = useUserData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { useFakeLoader } = useLoader();

  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => useFakeLoader(), []);

  const loginSchema = yup.object({
    email: yup
      .string()
      .required(t('login.validation.emailRequired'))
      .email(t('login.validation.emailInvalid')),
    password: yup
      .string()
      .required(t('login.validation.passwordRequired'))
      .min(8, t('login.validation.passwordMin')),
  });

  const resetSchema = yup.object({
    resetEmail: yup
      .string()
      .required(t('login.validation.emailRequired'))
      .email(t('login.validation.emailInvalid')),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    setError: setResetError,
    formState: { errors: resetErrors },
  } = useForm({
    resolver: yupResolver(resetSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const data = await loginUser(formData.email, formData.password);
      login(data.data);
      navigate('/account');
    } catch (error) {
      setError('root.serverError', {
        message: error.response?.data?.message || t('login.validation.serverError'),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onResetSubmit = async (formData) => {
    try {
      await forgotPassword(formData.resetEmail);
      setResetEmail(formData.resetEmail);
      setResetSent(true);
    } catch (error) {
      setResetError('root.serverError', {
        message: error.response?.data?.message || t('login.validation.serverError'),
      });
    }
  };

  return (
    <div className="auth-wrapper">
      <PageTitle pageName={t('login.pageTitle')} />

      {!showResetForm ? (
        <div className="auth">
          <h2 className="auth__title">{t('login.title')}</h2>
          <form
            className="auth__form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="auth__form__item">
              <label
                className="auth__form__item__label"
                htmlFor="email"
              >
                {t('login.form.emailLabel')} <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder={t('login.form.emailPlaceholder')}
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
                {t('login.form.passwordLabel')} <span className="required">*</span>
              </label>
              <input
                type="password"
                placeholder={t('login.form.passwordPlaceholder')}
                maxLength={30}
                id="password"
                className={clsx('auth__form__item__input', { error: errors.password?.message })}
                {...register('password')}
              />
              <p className="auth__form__item__error">{errors.password?.message}</p>
            </div>

            <p
              className="auth__form__forgot-password"
              onClick={() => setShowResetForm(true)}
            >
              {t('login.form.forgotPassword')}
            </p>

            <p className="auth__error">{errors.root?.serverError?.message}</p>

            <button
              className="auth__form__submit"
              type="submit"
            >
              {t('login.form.submitBtn')}
            </button>

            <Link to="/register">
              <button
                type="button"
                className="auth__form__register"
              >
                {t('login.form.createAccount')}
              </button>
            </Link>
          </form>
        </div>
      ) : resetSent ? (
        <div className="auth">
          <h2 className="auth__title">{t('login.reset.successTitle')}</h2>
          <p className="auth__reset-text">{t('login.reset.successText')}</p>
          <button
            type="button"
            className="auth__form__submit"
            onClick={() => {
              setResetSent(false);
              setShowResetForm(false);
            }}
          >
            {t('login.reset.backToLogin')}
          </button>
        </div>
      ) : (
        <div className="auth">
          <h2 className="auth__title">{t('login.reset.title')}</h2>
          <p className="auth__reset-text">{t('login.reset.subtitle')}</p>
          <form
            className="auth__form"
            onSubmit={handleResetSubmit(onResetSubmit)}
          >
            <div className="auth__form__item">
              <label
                className="auth__form__item__label"
                htmlFor="reset-email"
              >
                {t('login.form.emailLabel')} <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder={t('login.form.emailPlaceholder')}
                maxLength={30}
                id="reset-email"
                className={clsx('auth__form__item__input', {
                  error: resetErrors.resetEmail?.message,
                })}
                {...registerReset('resetEmail')}
              />
              <p className="auth__form__item__error">{resetErrors.resetEmail?.message}</p>
            </div>

            <p className="auth__error">{resetErrors.root?.serverError?.message}</p>

            <button
              className="auth__form__submit"
              type="submit"
            >
              {t('login.reset.submitBtn')}
            </button>

            <button
              type="button"
              className="auth__form__register"
              onClick={() => setShowResetForm(false)}
            >
              {t('login.reset.cancelBtn')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
