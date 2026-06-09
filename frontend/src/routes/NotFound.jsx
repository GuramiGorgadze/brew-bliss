import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { InstagramCarousel } from '../components';
import wing1 from '../assets/breadcrumicon1.webp';
import wing2 from '../assets/breadcrumicon2.webp';
import { useNavigate } from 'react-router-dom';
import heroBanner from '../assets/Hero_Banner.webp';
import notFoundImg from '../assets/not-found-img.webp';

function NotFound() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  return (
    <div className="not-found">
      <div
        className="title-wrapper"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="title">
          <img
            src={wing1}
            alt=""
          />
          <p>{t('notFound.code')}</p>
          <img
            src={wing2}
            alt=""
          />
        </div>
      </div>

      <div className="not-found__body">
        <img
          className="not-found__image"
          src={notFoundImg}
          alt=""
        />
        <h3 className="not-found__heading">{t('notFound.heading')}</h3>
        <p className="not-found__text">{t('notFound.text')}</p>
        <button
          onClick={() => navigate('/')}
          className="landing-banner__btn landing-banner__btn--orange not-found__btn"
        >
          {t('notFound.btn')}
        </button>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default NotFound;
