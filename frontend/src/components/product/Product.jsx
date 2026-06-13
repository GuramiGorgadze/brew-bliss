import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import * as api from '../../api/api';
import QuickAddModal from './QuickAddModal';
import toast from 'react-hot-toast';

function Product({ product }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);

  const localize = (field, lang) => field?.[lang] ?? field?.en ?? '';

  const { wishlistedIds, add, remove } = useWishlist();
  const wishlisted = wishlistedIds.has(product._id);

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

  const title = localize(product.title, lang);

  const image = product.image;
  const variant = product.variants?.[0];
  const price = Number(variant?.price || 0);
  const compareAtPrice = Number(variant?.compare_at_price);
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-card__img-wrapper">
        {image && (
          <img
            src={product.image}
            alt={title}
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
        {discountPercent > 0 && <span className="product-card__discount">-{discountPercent}%</span>}
      </div>

      <div className="product-card-info-wrapper">
        <div className="product-card__info">
          <h3
            className="product-card__title"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            {title}
          </h3>
          <p className="product-card__size">{variant?.size}</p>
          <div className="product-card__stars">
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
              {product.reviews?.length === 1 ? t('productCard.review') : t('productCard.reviews')}
            </p>
          </div>
          <div className="product-card__price">
            {formatPrice(price)}
            {hasDiscount && (
              <span className="product-card__old-price">{formatPrice(compareAtPrice)}</span>
            )}
          </div>
        </div>
        <button
          className="product-card__btn"
          onClick={() => setShowModal(true)}
        >
          {t('productCard.addToCart')}
        </button>
      </div>

      {showModal && (
        <QuickAddModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Product;
