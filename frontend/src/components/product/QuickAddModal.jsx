import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import * as api from '../../api/api';
import clsx from 'clsx';
import ShippingIcon from '../../assets/icons/shipping-icon-white.svg';

function QuickAddModal({ product, onClose }) {
  const { t } = useTranslation();
  const { formatPrice, activeCurrency } = useCurrency();
  const navigate = useNavigate();

  const { wishlistedIds, add, remove } = useWishlist();
  const wishlisted = product ? wishlistedIds.has(product._id) : false;

  const FreeShipping = 500;

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.available) ?? product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartStatus, setCartStatus] = useState('');
  const overlayRef = useRef(null);

  useEffect(() => {
    const fetchCartTotal = async () => {
      try {
        const data = await api.getCart();
        if (data?.data) {
          const total = data.data.reduce((sum, item) => {
            const variant = item.productId.variants.find((v) => v.size === item.variantSize);
            return sum + (variant?.price ?? 0) * item.quantity;
          }, 0);
          setCartTotal(total);
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };
    fetchCartTotal();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleWishlistToggle = async () => {
    if (!product) return;
    try {
      if (wishlisted) {
        await api.removeFromWishlist(product._id);
        remove(product._id);
      } else {
        await api.addToWishlist(product._id);
        add(product._id);
      }
    } catch (err) {
      console.error('Wishlist error:', err.message);
    }
  };

  const basePrice = selectedVariant?.price ?? product.variants[0]?.price ?? 0;
  const combinedTotal = cartTotal + basePrice * quantity;
  const dynamicFreeShipping = FreeShipping * activeCurrency.rate;
  const remaining = Math.max(0, dynamicFreeShipping - combinedTotal * activeCurrency.rate);
  const progress = Math.min(
    100,
    ((combinedTotal * activeCurrency.rate) / dynamicFreeShipping) * 100
  );

  const getDeliveryRange = () => {
    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() + 3);
    end.setDate(end.getDate() + 7);
    const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const handleAddToCart = async () => {
    try {
      setCartStatus('loading');
      await api.addToCart(product._id, selectedVariant.size, quantity);
      setCartStatus('');
      navigate(0);
    } catch (err) {
      setCartStatus('');
      console.error('Failed to add to cart:', err);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="quick-add-modal__overlay"
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="quick-add-modal">
        <div className="quick-add-modal__header">
          <span className="quick-add-modal__title">{t('productCard.quickAdd')}</span>
          <button
            className="quick-add-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        <div className="quick-add-modal__body">
          <div className="quick-add-modal__image-wrap">
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="quick-add-modal__image"
                onClick={() => navigate(`/products/${product._id}`)}
              />
            )}

            <i
              onClick={handleWishlistToggle}
              className={clsx('bi wishlist', {
                'bi-check-lg': wishlisted,
                'bi-heart': !wishlisted,
              })}
            />
          </div>

          <div className="quick-add-modal__details">
            <h2
              className="quick-add-modal__product-title"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              {product.title}
            </h2>

            <p className="product-page__reviews">
              {Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={clsx('bi', {
                    'bi-star-fill': i < Math.floor(product?.rating),
                    'bi-star-half': i === Math.floor(product?.rating) && product?.rating % 1 >= 0.5,
                    'bi-star':
                      i >= Math.floor(product?.rating) &&
                      !(i === Math.floor(product?.rating) && product?.rating % 1 >= 0.5),
                  })}
                />
              ))}
              ({product.reviews?.length || 0}{' '}
              {product.reviews?.length === 1 ? t('productCard.review') : t('productCard.reviews')})
            </p>

            <h6 className="product-page__price">{formatPrice(basePrice)}</h6>

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
                  {t('productSingle.shipping.spendMore', {
                    amount: formatPrice(remaining / activeCurrency.rate),
                  })}{' '}
                  <span className="product-page__promo-highlight">
                    {t('productSingle.shipping.freeShipping')}
                  </span>
                </>
              )}
            </h5>

            <div className="product-page__size">
              <h5 className="product-page__size-heading">
                {t('productSingle.bottleSize')}{' '}
                <span className="product-page__size-value">{selectedVariant?.size ?? '—'}</span>
              </h5>
              <div className="product-page__size-options">
                {product.variants.map((variant) => (
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

            <p className="product-page__additional-info-text">
              {t('productSingle.delivery.label')}{' '}
              <span className="product-page__additional-info-text--dark">{getDeliveryRange()}</span>
            </p>

            {product.available ? (
              <div className="product-page__actions">
                <button
                  className="product-page__btn product-page__btn--dark"
                  onClick={handleAddToCart}
                  disabled={cartStatus !== ''}
                >
                  {cartStatus === 'loading'
                    ? t('productSingle.actions.adding')
                    : t('productSingle.actions.addToCart')}
                </button>
                <button className="product-page__btn product-page__btn--primary">
                  {t('productSingle.actions.buyNow')}
                </button>
              </div>
            ) : (
              <div className="product-page__actions">
                <button
                  className="product-page__btn product-page__btn--dark sold-out"
                  disabled
                >
                  {t('productSingle.actions.soldOut')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default QuickAddModal;
