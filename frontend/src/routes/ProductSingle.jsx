import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle, InstagramCarousel, ImageMagnifier } from '../components';
import { useLoader } from '../context/LoaderContext';
import { useParams } from 'react-router-dom';
import * as api from '../api/api';
import ShippingIcon from '../assets/icons/shipping-icon-white.svg';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import DeliveryIcon from '../assets/icons/delivery-icon.svg';
import ReturnIcon from '../assets/icons/return-icon-single.svg';
import Facebook from '../assets/icons/facebook-icon.svg';
import Twitter from '../assets/icons/twitter-icon.svg';
import Instagram from '../assets/icons/instagram-icon.svg';
import TikTok from '../assets/icons/tiktok-icon.svg';

function ProductSingle() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);
  const { useDataLoader } = useLoader();
  const { id } = useParams();
  const FreeShipping = 500;
  const [cartStatus, setCartStatus] = useState('');
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleProductData = async () => {
      const data = await useDataLoader(() => api.getProductById(id));
      if (data?.data) {
        setSingleProduct(data.data);
        setSelectedVariant(data.data.variants.find((v) => v.available) ?? data.data.variants[0]);
      } else if (data?.err) {
        setError(data.err);
      }
    };
    fetchSingleProductData();
  }, [id]);

  useEffect(() => {
    const fetchCartTotal = async () => {
      const data = await useDataLoader(api.getCart);
      if (data?.data) {
        const total = data.data.reduce((sum, item) => {
          const variant = item.productId.variants.find((v) => v.size === item.variantSize);
          return sum + (variant?.price ?? 0) * item.quantity;
        }, 0);
        setCartTotal(total);
      }
    };
    fetchCartTotal();
  }, []);

  const combinedTotal = cartTotal + (selectedVariant?.price ?? 0) * quantity;
  const remaining = Math.max(0, FreeShipping - combinedTotal);
  const progress = Math.min(100, (combinedTotal / FreeShipping) * 100);

  const getDeliveryRange = () => {
    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() + 3);
    end.setDate(end.getDate() + 7);
    const fmt = (date) => date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const handleAddToCart = async () => {
    try {
      setCartStatus('loading');
      await api.addToCart(singleProduct._id, selectedVariant.size, quantity);
      setCartStatus('');
      navigate(0);
    } catch (err) {
      setCartStatus('');
      alert('Failed to add to cart:', err);
    }
  };

  return (
    <div className="product-page">
      <PageTitle pageName={singleProduct?.title} />
      <div className="product-page__inner">
        <div className="product-page__gallery">
          {singleProduct?.image && (
            <ImageMagnifier
              src={singleProduct.image}
              alt={singleProduct.title}
              zoom={3}
            />
          )}
        </div>

        <div className="product-page__details">
          <h1 className="product-page__title">{singleProduct?.title}</h1>

          <p className="product-page__reviews">
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                className={clsx('bi', {
                  'bi-star-fill': i < Math.floor(singleProduct?.rating),
                  'bi-star-half':
                    i === Math.floor(singleProduct?.rating) && singleProduct?.rating % 1 >= 0.5,
                  'bi-star':
                    i >= Math.floor(singleProduct?.rating) &&
                    !(i === Math.floor(singleProduct?.rating) && singleProduct?.rating % 1 >= 0.5),
                })}
              />
            ))}
            ({singleProduct?.reviews.length || 0}{' '}
            {singleProduct?.reviews.length === 1
              ? t('productSingle.review')
              : t('productSingle.reviews')}
            )
          </p>

          <h6 className="product-page__price">
            ${selectedVariant?.price ?? singleProduct?.variants[0].price}
          </h6>

          <div className="product-page__shipping">
            <div className="product-page__shipping-track">
              <div className="product-page__shipping-line">
                <div
                  className="product-page__shipping-line-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className="product-page__shipping-icon-wrapper"
                style={{ left: `calc(${progress}% - 12.5px)` }}
              >
                <img
                  className="product-page__shipping-icon"
                  src={ShippingIcon}
                  alt=""
                />
              </div>
            </div>
          </div>

          <h5 className="product-page__promo">
            {remaining === 0 ? (
              <>
                {t('productSingle.shipping.congrats')}{' '}
                <span className="product-page__promo-highlight">
                  {t('productSingle.shipping.freeShipping')}
                </span>
              </>
            ) : (
              <>
                {t('productSingle.shipping.spendMore', { amount: remaining.toFixed(2) })}{' '}
                <span className="product-page__promo-highlight">
                  {t('productSingle.shipping.freeShipping')}
                </span>
              </>
            )}
          </h5>

          <p className="product-page__description-label">{t('productSingle.descriptionLabel')}</p>
          <p className="product-page__description">{singleProduct?.description}</p>

          <div className="product-page__size">
            <h5 className="product-page__size-heading">
              {t('productSingle.bottleSize')}{' '}
              <span className="product-page__size-value">{selectedVariant?.size ?? '—'}</span>
            </h5>
            <div className="product-page__size-options">
              {singleProduct?.variants.map((variant) => (
                <button
                  key={variant.size}
                  className={clsx('product-page__size-btn', {
                    'product-page__size-btn--active': selectedVariant?.size === variant.size,
                    'product-page__size-btn--disabled': !variant.available,
                  })}
                  onClick={() => variant.available && setSelectedVariant(variant)}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-page__divider"></div>

          <div className="product-page__meta">
            <h2 className="product-page__meta-item">
              {t('productSingle.availability.label')}{' '}
              {singleProduct?.available && (
                <span className="product-page__meta-item--instock">
                  {t('productSingle.availability.inStock')}
                </span>
              )}
              {!singleProduct?.available && (
                <span className="product-page__meta-item--outOfStock">
                  {t('productSingle.availability.unavailable')}
                </span>
              )}
            </h2>
            <h2 className="product-page__meta-item">
              {t('productSingle.tags')}{' '}
              <span className="product-page__tag">{singleProduct?.tags.join(', ')}</span>
            </h2>
          </div>

          <div className="product-page__quantity">
            <p className="product-page__quantity-label">{t('productSingle.quantity')}</p>
            <div className="product-page__quantity-control">
              <button
                className="product-page__quantity-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="product-page__quantity-value">{quantity}</span>
              <button
                className="product-page__quantity-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {singleProduct?.available && (
            <div className="product-page__actions">
              <button
                className="product-page__btn product-page__btn--dark"
                onClick={handleAddToCart}
                disabled={cartStatus !== ''}
              >
                {cartStatus === 'loading' && t('productSingle.actions.adding')}
                {cartStatus === '' && t('productSingle.actions.addToCart')}
              </button>
              <button className="product-page__btn product-page__btn--primary">
                {t('productSingle.actions.buyNow')}
              </button>
            </div>
          )}

          {!singleProduct?.available && (
            <div className="product-page__actions">
              <button className="product-page__btn product-page__btn--dark sold-out">
                {t('productSingle.actions.soldOut')}
              </button>
            </div>
          )}

          <div className="product-page__divider"></div>

          <div className="product-page__additional-info">
            <div className="product-page__additional-info-item">
              <img
                src={DeliveryIcon}
                alt=""
              />
              <p className="product-page__additional-info-text">
                {t('productSingle.delivery.label')}{' '}
                <span className="product-page__additional-info-text--dark">
                  {getDeliveryRange()}
                </span>
              </p>
            </div>
            <div className="product-page__additional-info-item">
              <img
                src={ReturnIcon}
                alt=""
              />
              <p className="product-page__additional-info-text">
                {t('productSingle.delivery.returnPolicy')}
              </p>
            </div>
          </div>

          <div className="product-page__share-container">
            <h2 className="product-page__share-container__text">{t('productSingle.share')} </h2>
            <a
              href="https://www.facebook.com/"
              target="blank"
            >
              <img
                className="product-page__share-container__img"
                src={Facebook}
                alt=""
              />
            </a>
            <a
              href="https://x.com/"
              target="blank"
            >
              <img
                className="product-page__share-container__img"
                src={Twitter}
                alt=""
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="blank"
            >
              <img
                className="product-page__share-container__img"
                src={Instagram}
                alt=""
              />
            </a>
            <a
              href="https://tiktok.com/"
              target="blank"
            >
              <img
                className="product-page__share-container__img"
                src={TikTok}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <InstagramCarousel />
    </div>
  );
}

export default ProductSingle;
