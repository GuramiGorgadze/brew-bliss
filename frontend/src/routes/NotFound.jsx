import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { InstagramCarousel, PageTitle } from '../components';
import wing1 from '../assets/breadcrumicon1.webp';
import wing2 from '../assets/breadcrumicon2.webp';
import { useNavigate } from 'react-router-dom';
import heroBanner from '../assets/Hero_Banner.webp';
import notFoundImg from '../assets/not-found-img.webp';

function NotFound() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { useFakeLoader } = useLoader();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    useFakeLoader();
    setReady(true);
  }, []);

  return (
    <div className="not-found">
      <PageTitle
        pageName={t('notFound.code')}
        ready={ready}
      />

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
