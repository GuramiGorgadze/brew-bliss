import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../api/api';
import { PageTitle } from '../components';
import { useUserData } from '../context/UserContext.jsx';

function Login() {
  const { login } = useUserData();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  const schema = yup.object({
    email: yup
      .string()
      .required(t('login.validation.emailRequired'))
      .email(t('login.validation.emailInvalid')),
    password: yup
      .string()
      .required(t('login.validation.passwordRequired'))
      .min(8, t('login.validation.passwordMin')),
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
      login(data.data);
      navigate('/account');
    } catch (error) {
      setError('root.serverError', {
        message: error.response?.data?.message || t('login.validation.serverError'),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="auth-wrapper">
      <PageTitle pageName={t('login.pageTitle')} />

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

          <p className="auth__form__forgot-password">{t('login.form.forgotPassword')}</p>

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
      <div />
    </div>
  );
}

export default Login;
