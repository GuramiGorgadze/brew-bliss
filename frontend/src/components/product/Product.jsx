import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

function Product({ product }) {
  const image = product.image;
  const variant = product.variants?.[0];

  const price = Number(variant?.price || 0);

  const compareAtPrice = Number(variant?.compare_at_price);

  const hasDiscount = compareAtPrice && compareAtPrice > price;

  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const navigate = useNavigate();

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="product-card__img-wrapper">
        {image && (
          <img
            src={product.image}
            alt={product.title}
          />
        )}

        {discountPercent > 0 && <span className="product-card__discount">-{discountPercent}%</span>}
      </div>

      <div className="product-card-info-wrapper">
        <div className="product-card__info">
          <h3 className="product-card__title">{product.title}</h3>

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
              ({product.reviews?.length || 0} {product.reviews?.length === 1 ? 'Review' : 'Reviews'}
              )
            </p>
          </div>

          <div className="product-card__price">
            ${price.toFixed(2)}
            {hasDiscount && (
              <span className="product-card__old-price">${compareAtPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <button className="product-card__btn">Add To Cart</button>
      </div>
    </div>
  );
}

export default Product;
