import React from 'react';
import { useTranslation } from 'react-i18next';
import ShippingIcon from '../../assets/icons/shipping-icon.svg';
import GiftIcon from '../../assets/icons/gift-icon.svg';
import WarrantyIcon from '../../assets/icons/warranty-icon.svg';
import ReturnIcon from '../../assets/icons/return-icon.svg';

function StoreFeatures() {
  const { t, i18n } = useTranslation();

  const features = [
    {
      id: 1,
      imgSrc: ShippingIcon,
      title: t('storeFeatures.shipping.title'),
      description: t('storeFeatures.shipping.description'),
    },
    {
      id: 2,
      imgSrc: GiftIcon,
      title: t('storeFeatures.gift.title'),
      description: t('storeFeatures.gift.description'),
    },
    {
      id: 3,
      imgSrc: WarrantyIcon,
      title: t('storeFeatures.warranty.title'),
      description: t('storeFeatures.warranty.description'),
    },
    {
      id: 4,
      imgSrc: ReturnIcon,
      title: t('storeFeatures.returns.title'),
      description: t('storeFeatures.returns.description'),
    },
  ];

  return (
    <section className="store-features">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="feature-card"
        >
          <div className="feature-card__image-wrapper">
            <img
              src={feature.imgSrc}
              alt=""
              className="feature-card__img"
            />
          </div>
          <div className="feature-card__content">
            <h3 className="feature-card__title">{feature.title}</h3>
            <p className="feature-card__text">{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StoreFeatures;
