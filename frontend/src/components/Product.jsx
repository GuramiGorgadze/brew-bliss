import React from "react";

function Product({ product }) {
  const image = product.images?.[0]?.src;
  const variant = product.variants?.[0];

  const price = Number(variant?.price);
  const compareAtPrice = Number(variant?.compare_at_price);

  const hasDiscount = compareAtPrice && compareAtPrice > price;

  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-card__img-wrapper">
        <img src={image} alt={product.title} />

        {discountPercent > 0 && (
          <span className="product-card__discount">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="product-card-info-wrapper">
        <div className="product-card__info">
          <h3 className="product-card__title">{product.title}</h3>

          <p className="product-card__size">
            {product.options?.[0]?.values?.[0]}
          </p>

          <div className="product-card__stars">(1 Review)</div>

          <div className="product-card__price">
            ${price.toFixed(2)}

            {hasDiscount && (
              <span className="product-card__old-price">
                ${compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button className="product-card__btn">Add To Cart</button>
      </div>
    </div>
  );
}

export default Product;