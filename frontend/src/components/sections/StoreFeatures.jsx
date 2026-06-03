import React from 'react';
import ShippingIcon from '../../assets/icons/shipping-icon.svg';
import GiftIcon from '../../assets/icons/gift-icon.svg';
import WarrantyIcon from '../../assets/icons/warranty-icon.svg';
import ReturnIcon from '../../assets/icons/return-icon.svg';

function StoreFeatures() {
  const features = [
    {
      id: 1,
      imgSrc: ShippingIcon,
      title: 'Free Shipping',
      description:
        'Free shipping on every item, delivered to your door, elevate your space with beautiful decor, hassle-free!',
    },
    {
      id: 2,
      imgSrc: GiftIcon,
      title: 'Gift Package',
      description:
        'Gifts that leave a lasting impression, beautifully wrapped in style for every occasion!',
    },
    {
      id: 3,
      imgSrc: WarrantyIcon,
      title: 'One Year Warranty',
      description:
        'Shop with confidence, our one-year warranty backs every jewelry piece, crafted to last and ensure quality.',
    },
    {
      id: 4,
      imgSrc: ReturnIcon,
      title: 'Easy Returns',
      description:
        'Stress-free returns for peace of mind, ensuring your satisfaction with every purchase.',
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
