import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function SaleBanner() {
  const { t, i18n } = useTranslation();

  return (
    <div className="sale-banner">
      <div className="sale-banner__left">
        <span className="sale-banner__left__paragraph-wrapper">
          <h5 className="sale-banner__left__paragraph-wrapper__paragraph">
            {t('saleBanner.limitedTime')}
          </h5>
          <div className="sale-banner__left__paragraph-wrapper__line"></div>
        </span>

        <h2 className="sale-banner__left__title">{t('saleBanner.title')}</h2>

        <Link to="/products">
          <button className="sale-banner__left__btn">{t('saleBanner.shopSale')}</button>
        </Link>
      </div>
    </div>
  );
}

export default SaleBanner;
