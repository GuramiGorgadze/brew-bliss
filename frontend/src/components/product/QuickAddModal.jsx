import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import * as api from '../../api/api';
import clsx from 'clsx';
import ShippingIcon from '../../assets/icons/shipping-icon-white.svg';
import toast from 'react-hot-toast';
import BlurText from '../sections/reactBits/BlurText';
import ShinyText from '../sections/reactBits/ShinyText';

function QuickAddModal({ product, onClose }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { formatPrice, activeCurrency } = useCurrency();
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();
  const [isWishlisting, setIsWishlisting] = useState(false);

  const { refreshCart } = useCart();

  const { wishlistedIds, add, remove } = useWishlist();
  const wishlisted = product ? wishlistedIds.has(product._id) : false;

  const localize = (field, lang) => field?.[lang] ?? field?.en ?? '';

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
    if (!product || isWishlisting) return;
    setIsWishlisting(true);
    const toastId = toast.loading(t('productCard.wishlistLoading'));
    try {
      if (wishlisted) {
        await api.removeFromWishlist(product._id);
        remove(product._id);
        toast(t('productCard.removedFromWishlist'), { id: toastId });
      } else {
        await api.addToWishlist(product._id);
        add(product._id);
        toast.success(t('productCard.addedToWishlist'), { id: toastId });
      }
    } catch (err) {
      console.error('Wishlist error:', err.message);
      toast.error(t('productCard.wishlistError'), { id: toastId });
    } finally {
      setIsWishlisting(false);
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
    const fmt = (date) =>
      date.toLocaleDateString(i18n.language, { month: 'short', day: '2-digit' });
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const handleAddToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    const toastId = toast.loading(t('productSingle.actions.adding'));
    try {
      await api.addToCart(product._id, selectedVariant.size, quantity);
      await refreshCart();
      toast.success(t('productSingle.actions.addedToCart'), { id: toastId });
    } catch (err) {
      console.error('Failed to add to cart:', err);
      toast.error(t('productSingle.actions.addToCartError'), {
        id: toastId,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleCheckoutNow = async () => {
    if (isAdding) return;
    setIsAdding(true);
    const toastId = toast.loading(t('productSingle.actions.adding'));
    try {
      await api.addToCart(product._id, selectedVariant.size, quantity);
      await refreshCart();
      toast.success(t('productSingle.actions.addedToCart'), { id: toastId });
      onClose();
      navigate('/checkout');
    } catch (err) {
      toast.error(t('productSingle.actions.addToCartError'), { id: toastId });
    } finally {
      setIsAdding(false);
    }
  };

  const title = localize(product?.title, lang);
  const tags = product?.tags?.[lang] ?? product?.tags?.en ?? [];

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
                alt={title}
                className="quick-add-modal__image"
                onClick={() => navigate(`/products/${product._id}`)}
              />
            )}

            <i
              onClick={handleWishlistToggle}
              className={clsx('bi wishlist', {
                'bi-check-lg': wishlisted,
                'bi-heart': !wishlisted,
                disabled: isWishlisting,
              })}
              style={{ pointerEvents: isWishlisting ? 'none' : 'auto' }}
            />
          </div>

          <div className="quick-add-modal__details">
            {/* BlurText on title — same as ProductSingle's <h1> */}
            <h2
              className="quick-add-modal__product-title"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              <BlurText
                text={title}
                delay={100}
                animateBy="words"
                direction="top"
                className="text-2xl mb-8"
              />
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

            {/* ShinyText on free shipping — same as ProductSingle */}
            <h5 className="product-page__promo">
              {remaining === 0 ? (
                <>
                  {t('productSingle.shipping.congrats')}{' '}
                  <span className="product-page__promo-highlight">
                    <ShinyText
                      text={t('productSingle.shipping.freeShipping')}
                      speed={2}
                      delay={0}
                      color="#fea90c"
                      shineColor="#ffffff"
                      spread={100}
                      direction="left"
                      yoyo={true}
                      pauseOnHover={false}
                      disabled={false}
                    />{' '}
                  </span>
                </>
              ) : (
                <>
                  {t('productSingle.shipping.spendMore', {
                    amount: formatPrice(remaining / activeCurrency.rate),
                  })}{' '}
                  <span className="product-page__promo-highlight">
                    <ShinyText
                      text={t('productSingle.shipping.freeShipping')}
                      speed={2}
                      delay={0}
                      color="#fea90c"
                      shineColor="#ffffff"
                      spread={100}
                      direction="left"
                      yoyo={true}
                      pauseOnHover={false}
                      disabled={false}
                    />{' '}
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

            <div className="product-page__divider"></div>

            <div className="product-page__meta">
              <h2 className="product-page__meta-item">
                {t('productSingle.availability.label')}{' '}
                {product?.available && (
                  <span className="product-page__meta-item--instock">
                    {t('productSingle.availability.inStock')}
                  </span>
                )}
                {!product?.available && (
                  <span className="product-page__meta-item--outOfStock">
                    {t('productSingle.availability.unavailable')}
                  </span>
                )}
              </h2>
              <h2 className="product-page__meta-item">
                {t('productSingle.tags')}{' '}
                <span className="product-page__tag">{tags.join(', ')}</span>
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

            {/* ShinyText on delivery label — same as ProductSingle */}
            <div className="product-page__additional-info-item">
              <p className="product-page__additional-info-text">
                <ShinyText
                  text={t('productSingle.delivery.label')}
                  speed={2}
                  delay={0}
                  color="#696969"
                  shineColor="#ffffff"
                  spread={100}
                  direction="left"
                  yoyo={true}
                  pauseOnHover={false}
                  disabled={false}
                />{' '}
                <span className="product-page__additional-info-text--dark">
                  {getDeliveryRange()}
                </span>
              </p>
            </div>

            {product.available ? (
              <div className="product-page__actions">
                <button
                  className="product-page__btn product-page__btn--dark"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  {t('productSingle.actions.addToCart')}
                </button>
                <button
                  className="product-page__btn product-page__btn--primary"
                  onClick={handleCheckoutNow}
                  disabled={isAdding}
                >
                  {t('productSingle.actions.checkoutNow')}
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
