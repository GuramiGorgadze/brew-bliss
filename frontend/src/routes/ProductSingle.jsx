import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { PageTitle, InstagramCarousel, ImageMagnifier, FeaturedCarousel } from '../components';
import { useLoader } from '../context/LoaderContext';
import { useWishlist } from '../context/WishlistContext';
import { useParams } from 'react-router-dom';
import * as api from '../api/api';
import { useCart } from '../context/CartContext';
import ShippingIcon from '../assets/icons/shipping-icon-white.svg';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import clsx from 'clsx';
import DeliveryIcon from '../assets/icons/delivery-icon.svg';
import ReturnIcon from '../assets/icons/return-icon-single.svg';
import Facebook from '../assets/icons/facebook-icon.svg';
import Twitter from '../assets/icons/twitter-icon.svg';
import Instagram from '../assets/icons/instagram-icon.svg';
import TikTok from '../assets/icons/tiktok-icon.svg';
import toast from 'react-hot-toast';
import { useUserData } from '../context/UserContext.jsx';
import BlurText from '../components/sections/reactBits/BlurText';
import ShinyText from '../components/sections/reactBits/ShinyText';

function ProductSingle() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const { useDataLoader } = useLoader();
  const { id } = useParams();
  const [isWishlisting, setIsWishlisting] = useState(false);
  const [showDocOptions, setShowDocOptions] = useState(false);
  const docPopoverRef = useRef(null);
  const { loggedIn } = useUserData();
  const [ready, setReady] = useState(false);
  const { refreshCart } = useCart();

  useEffect(() => {
    if (!showDocOptions) return;
    const handleClickOutside = (e) => {
      if (docPopoverRef.current && !docPopoverRef.current.contains(e.target)) {
        setShowDocOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDocOptions]);
  const [isDocVisible, setIsDocVisible] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false);

  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const localize = (field, lang) => field?.[lang] ?? field?.en ?? '';

  const { wishlistedIds, add, remove } = useWishlist();
  const wishlisted = singleProduct ? wishlistedIds.has(singleProduct._id) : false;

  const FreeShipping = 500;
  const [cartStatus, setCartStatus] = useState('');
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const nearBottom =
        window.innerHeight + scrolled >= document.documentElement.scrollHeight - 100;
      setIsDocVisible(scrolled > 500 && !nearBottom);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmitReview = async () => {
    if (isSubmittingReview) return;

    if (!loggedIn) {
      toast.error(t('auth.loginToReview'), {
        icon: <i className="bi bi-exclamation-circle-fill" />,
      });
      return;
    }

    if (!newReview.rating || !newReview.comment.trim()) {
      toast.error(t('productSingle.reviewForm.validationError'));
      return;
    }
    setIsSubmittingReview(true);
    const toastId = toast.loading(t('productSingle.reviewForm.submitting'));
    try {
      const data = await useDataLoader(() =>
        api.addReview(singleProduct._id, {
          rating: newReview.rating,
          comment: newReview.comment.trim(),
        })
      );
      if (data?.data) {
        setSingleProduct((prev) => ({
          ...prev,
          reviews: [...prev.reviews, data.data],
        }));
        setNewReview({ rating: 0, comment: '' });
        toast.success(t('productSingle.reviewForm.success'), { id: toastId });
      } else if (data?.err) {
        throw new Error(data.err);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
      toast.error(t('productSingle.reviewForm.error'), { id: toastId });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const { formatPrice, activeCurrency } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleProductData = async () => {
      const data = await useDataLoader(() => api.getProductById(id));
      if (data?.data) {
        setSingleProduct(data.data);
        setSelectedVariant(data.data.variants.find((v) => v.available) ?? data.data.variants[0]);
        setReady(true);
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

  const handleWishlistToggle = async () => {
    if (!singleProduct || isWishlisting) return;

    if (!loggedIn) {
      toast.error(t('auth.loginToWishlist'), {
        icon: <i className="bi bi-exclamation-circle-fill" />,
      });
      return;
    }

    setIsWishlisting(true);
    const toastId = toast.loading(t('productCard.wishlistLoading'));
    try {
      if (wishlisted) {
        await api.removeFromWishlist(singleProduct._id);
        remove(singleProduct._id);
        toast(t('productCard.removedFromWishlist'), { id: toastId });
      } else {
        await api.addToWishlist(singleProduct._id);
        add(singleProduct._id);
        toast.success(t('productCard.addedToWishlist'), { id: toastId });
      }
    } catch (err) {
      console.error('Wishlist error:', err.message);
      toast.error(t('productCard.wishlistError'), { id: toastId });
    } finally {
      setIsWishlisting(false);
    }
  };

  const basePrice = selectedVariant?.price ?? singleProduct?.variants[0]?.price ?? 0;
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

  const formatReviewDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  };

  const handleAddToCart = async () => {
    if (isAdding) return;

    if (!loggedIn) {
      toast.error(t('auth.loginToAddToCart'), {
        icon: <i className="bi bi-exclamation-circle-fill" />,
      });
      return;
    }

    setIsAdding(true);
    const toastId = toast.loading(t('productSingle.actions.adding'));
    try {
      await api.addToCart(singleProduct._id, selectedVariant.size, quantity);
      await refreshCart();
      toast.success(t('productSingle.actions.addedToCart'), { id: toastId });
    } catch (err) {
      console.error('Failed to add to cart:', err);
      toast.error(t('productSingle.actions.addToCartError'), { id: toastId });
    } finally {
      setIsAdding(false);
    }
  };

  const handleCheckoutNow = async () => {
    if (isAdding) return;
    if (!loggedIn) {
      toast.error(t('auth.loginToAddToCart'), {
        icon: <i className="bi bi-exclamation-circle-fill" />,
      });
      return;
    }
    setIsAdding(true);
    const toastId = toast.loading(t('productSingle.actions.adding'));
    try {
      await api.addToCart(singleProduct._id, selectedVariant.size, quantity);
      await refreshCart();
      toast.success(t('productSingle.actions.addedToCart'), { id: toastId });
      navigate('/checkout');
    } catch (err) {
      toast.error(t('productSingle.actions.addToCartError'), { id: toastId });
    } finally {
      setIsAdding(false);
    }
  };

  const title = localize(singleProduct?.title, lang);
  const description = localize(singleProduct?.description, lang);
  const tags = singleProduct?.tags?.[lang] ?? singleProduct?.tags?.en ?? [];

  if (!ready || !singleProduct) {
    return null;
  }

  return (
    <div className="product-page">
      <PageTitle
        pageName={title}
        ready={ready}
      />
      <div className="product-page__inner">
        <div className="product-page__gallery">
          {singleProduct?.image && (
            <ImageMagnifier
              src={singleProduct.image}
              alt={title}
              zoom={3}
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

        <div className="product-page__details">
          <h1 className="product-page__title">
            {' '}
            <BlurText
              text={title}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          </h1>

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

          <p className="product-page__description-label">
            {' '}
            <ShinyText
              text={t('productSingle.descriptionLabel')}
              speed={2}
              delay={0}
              color="#696969"
              shineColor="#ffffff"
              spread={100}
              direction="left"
              yoyo={true}
              pauseOnHover={false}
              disabled={false}
            />
          </p>
          <p className="product-page__description">{description}</p>

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
              {t('productSingle.tags')} <span className="product-page__tag">{tags.join(', ')}</span>
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
            <div className="product-page__additional-info-item">
              <img
                src={ReturnIcon}
                alt=""
              />
              <p className="product-page__additional-info-text">
                <ShinyText
                  text={t('productSingle.delivery.returnPolicy')}
                  speed={2}
                  delay={0}
                  color="#696969"
                  shineColor="#ffffff"
                  spread={100}
                  direction="left"
                  yoyo={true}
                  pauseOnHover={false}
                  disabled={false}
                />
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

      <div className={clsx('product-page__doc', { 'product-page__doc--visible': isDocVisible })}>
        <div className="left">
          <img
            src={singleProduct?.image}
            alt=""
          />
          <div className="left__info">
            <p>{title}</p>
            <div className="price">{formatPrice(basePrice)}</div>
          </div>
        </div>

        <div className="right">
          <div
            className="doc-popover-wrapper"
            ref={docPopoverRef}
          >
            {showDocOptions && (
              <div className="doc-popover">
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
              </div>
            )}
            <i
              className="bi bi-sliders2"
              onClick={() => setShowDocOptions((prev) => !prev)}
            />
          </div>

          <div className="product-page__quantity-control doc-control">
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

          {singleProduct?.available && (
            <div>
              <button
                className="product-page__btn product-page__btn--primary"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {t('productSingle.actions.addToCart')}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="product-page__user-reviews">
        <h2 className="title">Reviews:</h2>

        <button
          className="review-form__toggle"
          onClick={() => setShowReviewForm((prev) => !prev)}
        >
          {t('productSingle.reviewForm.writeReview')}
          <i className={clsx('bi bi-chevron-down', showReviewForm ? 'rotate' : '')} />
        </button>

        <div className={clsx('review-form', { 'review-form--open': showReviewForm })}>
          <div className="review-form__inner">
            <div className="review-form__stars">
              {Array.from({ length: 5 }, (_, i) => {
                const starValue = i + 1;
                const filled = (hoverRating || newReview.rating) >= starValue;
                return (
                  <i
                    key={i}
                    className={clsx('bi', filled ? 'bi-star-fill' : 'bi-star', 'review-form__star')}
                    onClick={() => setNewReview((prev) => ({ ...prev, rating: starValue }))}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                );
              })}
            </div>

            <textarea
              className="review-form__textarea"
              placeholder={t('productSingle.reviewForm.placeholder')}
              value={newReview.comment}
              onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
            />

            <div className="review-form__info">
              <Trans
                i18nKey="productSingle.reviewForm.dataInfo"
                components={{
                  terms: (
                    <span
                      className="hover"
                      onClick={() => {}}
                    />
                  ),
                  privacy: (
                    <span
                      className="hover"
                      onClick={() => {}}
                    />
                  ),
                  content: (
                    <span
                      className="hover"
                      onClick={() => {}}
                    />
                  ),
                }}
              />
            </div>

            <button
              className="review-form__btn"
              onClick={handleSubmitReview}
              disabled={isSubmittingReview}
            >
              {t('productSingle.reviewForm.submit')}
            </button>
          </div>
        </div>

        <div className="product-page__divider"></div>

        {singleProduct?.reviews.map((review) => (
          <div
            className="review"
            key={review._id ?? review.reviewer}
          >
            <p className="review__rating">
              <div className="review__rating--stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <i
                    key={i}
                    className={clsx('bi', {
                      'bi-star-fill': i < Math.floor(review?.rating),
                      'bi-star-half': i === Math.floor(review?.rating) && review?.rating % 1 >= 0.5,
                      'bi-star':
                        i >= Math.floor(review?.rating) &&
                        !(i === Math.floor(review?.rating) && review?.rating % 1 >= 0.5),
                    })}
                  />
                ))}
              </div>
              <p className="review__rating--date">{formatReviewDate(review.createdAt)}</p>
            </p>

            <div className="review__user">
              <i className="bi bi-person review__user--icon"></i>
              <h6 className="review__user--name">{review.reviewer}</h6>
            </div>

            <p className="review__comment">{review.comment}</p>
            <div className="product-page__divider"></div>
          </div>
        ))}
      </div>
      <FeaturedCarousel isOnHome={false} />
      <InstagramCarousel />
    </div>
  );
}

export default ProductSingle;
