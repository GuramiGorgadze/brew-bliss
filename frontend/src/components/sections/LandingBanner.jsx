import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import wing1 from '../../assets/wing1.png';
import wing2 from '../../assets/wing2.png';
import landingBeer from '../../assets/landing-beer.webp';
import heroBanner from '../../assets/Hero_Banner.webp';
import BlurText from './reactBits/BlurText';
import ShinyText from './reactBits/ShinyText';

function LandingBanner() {
  const { t, i18n } = useTranslation();

  return (
    <div
      className="landing-banner"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="landing-banner__left">
        <div className="landing-banner__new-arrival laptop">
          <img
            src={wing1}
            alt=""
            className="landing-banner__wing"
          />
          <p>{t('landingBanner.newArrival')}</p>
          <img
            src={wing2}
            alt=""
            className="landing-banner__wing"
          />
        </div>

        <h2 className="landing-banner__title">
          <BlurText
            text={t('landingBanner.title')}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </h2>
        <p className="landing-banner__text">
          {' '}
          <ShinyText
            text={t('landingBanner.text')}
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={true}
            pauseOnHover={true}
            disabled={false}
          />
        </p>

        <div className="landing-banner__actions">
          <Link to="./products">
            <button className="landing-banner__btn landing-banner__btn--orange">
              {t('landingBanner.shopSale')}
            </button>
          </Link>
          <Link to="./products">
            <button className="landing-banner__btn landing-banner__btn--grey">
              {t('landingBanner.collections')}
            </button>
          </Link>
        </div>
      </div>

      <div className="landing-banner__right">
        <div className="landing-banner__new-arrival mobile">
          <img
            src={wing1}
            alt=""
            className="landing-banner__wing"
          />
          <p>{t('landingBanner.newArrival')}</p>
          <img
            src={wing2}
            alt=""
            className="landing-banner__wing"
          />
        </div>
        <img
          className="landing-banner__image"
          src={landingBeer}
          alt=""
        />
      </div>
    </div>
  );
}

export default LandingBanner;
