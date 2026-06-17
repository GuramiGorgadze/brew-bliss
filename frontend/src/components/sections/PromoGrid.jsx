import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import wing1 from '../../assets/wing1.png';
import wing2 from '../../assets/wing2.png';
import promoBackground1 from '../../assets/promo-background1.webp';
import promoBackground2 from '../../assets/promo-background2.webp';
import promoBackground3 from '../../assets/promo-background3.webp';
import BlurText from './reactBits/BlurText';
import ShinyText from './reactBits/ShinyText';

function PromoGrid() {
  const { t, i18n } = useTranslation();

  return (
    <div className="promo-grid">
      <div
        className="promo-grid__card"
        style={{ backgroundImage: `url(${promoBackground1})` }}
      >
        <div className="promo-grid__title-container">
          <img
            src={wing1}
            alt=""
            className="promo-grid__wing"
          />
          <p className="promo-grid__tagline">
            {' '}
            <ShinyText
              text={t('PromoGrid.card1.tagline')}
              speed={2}
              delay={0}
              color="#0e0e0e"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={true}
              pauseOnHover={false}
              disabled={false}
            />
          </p>
          <img
            src={wing2}
            alt=""
            className="promo-grid__wing"
          />
        </div>

        <h2 className="promo-grid__heading">
          {' '}
          <BlurText
            text={t('PromoGrid.card1.heading')}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </h2>

        <Link to="/products">
          <button className="promo-grid__button promo-grid__button--grey">
            {t('PromoGrid.shopNow')}
          </button>
        </Link>
      </div>

      <div
        className="promo-grid__card"
        style={{ backgroundImage: `url(${promoBackground2})` }}
      >
        <div className="promo-grid__title-container">
          <img
            src={wing1}
            alt=""
            className="promo-grid__wing"
          />
          <p className="promo-grid__tagline">
            {' '}
            <ShinyText
              text={t('PromoGrid.card2.tagline')}
              speed={2}
              delay={0}
              color="#0e0e0e"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={true}
              pauseOnHover={false}
              disabled={false}
            />
          </p>
          <img
            src={wing2}
            alt=""
            className="promo-grid__wing"
          />
        </div>

        <h2 className="promo-grid__heading">
          {' '}
          <BlurText
            text={t('PromoGrid.card2.heading')}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </h2>

        <Link to="/products">
          <button className="promo-grid__button promo-grid__button--grey">
            {t('PromoGrid.shopNow')}
          </button>
        </Link>
      </div>

      <div
        className="promo-grid__card"
        style={{ backgroundImage: `url(${promoBackground3})` }}
      >
        <div className="promo-grid__title-container">
          <img
            src={wing1}
            alt=""
            className="promo-grid__wing"
          />
          <p className="promo-grid__tagline">
            {' '}
            <ShinyText
              text={t('PromoGrid.card3.tagline')}
              speed={2}
              delay={0}
              color="#0e0e0e"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={true}
              pauseOnHover={false}
              disabled={false}
            />
          </p>
          <img
            src={wing2}
            alt=""
            className="promo-grid__wing"
          />
        </div>

        <h2 className="promo-grid__heading">
          {' '}
          <BlurText
            text={t('PromoGrid.card3.heading')}
            delay={100}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8"
          />
        </h2>

        <Link to="/products">
          <button className="promo-grid__button promo-grid__button--grey">
            {t('PromoGrid.shopSale')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PromoGrid;
