import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { resetPassword } from '../api/api';
import { PageTitle } from '../components';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { useFakeLoader } = useLoader();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useFakeLoader();
    setReady(true);
  }, []);

  const schema = yup.object({
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await resetPassword(token, formData.password);
      navigate('/login');
    } catch (error) {
      setError('root.serverError', {
        message: error.response?.data?.err || t('login.validation.serverError'),
      });
    }
  };

  return (
    <div className="auth-wrapper">
      <PageTitle
        pageName={t('resetPassword.pageTitle')}
        ready={ready}
      />
      <div className="auth">
        <h2 className="auth__title">{t('resetPassword.title')}</h2>
        <form
          className="auth__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="auth__form__item">
            <label
              className="auth__form__item__label"
              htmlFor="password"
            >
              {t('resetPassword.form.passwordLabel')} <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              maxLength={30}
              placeholder={t('resetPassword.form.passwordPlaceholder')}
              className={clsx('auth__form__item__input', { error: errors.password })}
              {...register('password')}
            />
            <p className="auth__form__item__error">{errors.password?.message}</p>
          </div>

          <div className="auth__form__item">
            <label
              className="auth__form__item__label"
              htmlFor="confirmPassword"
            >
              {t('resetPassword.form.confirmPasswordLabel')} <span className="required">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              maxLength={30}
              placeholder={t('resetPassword.form.confirmPasswordPlaceholder')}
              className={clsx('auth__form__item__input', { error: errors.confirmPassword })}
              {...register('confirmPassword')}
            />
            <p className="auth__form__item__error">{errors.confirmPassword?.message}</p>
          </div>

          <p className="auth__error">{errors.root?.serverError?.message}</p>

          <button
            className="auth__form__submit"
            type="submit"
          >
            {t('resetPassword.form.submitBtn')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
