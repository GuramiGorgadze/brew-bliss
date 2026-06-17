import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BlurText from './reactBits/BlurText';
import ShinyText from './reactBits/ShinyText';

function SaleBanner() {
  const { t, i18n } = useTranslation();

  return (
    <div className="sale-banner">
      <div className="sale-banner__left">
        <span className="sale-banner__left__paragraph-wrapper">
          <h5 className="sale-banner__left__paragraph-wrapper__paragraph">
            <ShinyText
              text={t('saleBanner.limitedTime')}
              speed={2}
              delay={0}
              color="#030303"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={true}
              pauseOnHover={false}
              disabled={false}
            />
          </h5>
          <div className="sale-banner__left__paragraph-wrapper__line"></div>
        </span>

        <h2 className="sale-banner__left__title">
          <BlurText
            text={t('saleBanner.title')}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </h2>

        <Link to="/products">
          <button className="sale-banner__left__btn">{t('saleBanner.shopSale')}</button>
        </Link>
      </div>
    </div>
  );
}

export default SaleBanner;
