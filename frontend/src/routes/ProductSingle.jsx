import React, { useState, useEffect } from "react";
import { PageTitle, InstagramPromo } from "../components";
import { useLoader } from "../context/LoaderContext";
import { useParams } from "react-router-dom";
import * as api from "../api/api";
import ShippingIcon from "../assets/icons/shipping-icon-white.svg";
import clsx from "clsx";
import DeliveryIcon from "../assets/icons/delivery-icon.svg";
import ReturnIcon from "../assets/icons/return-icon-single.svg";
import Magnifier from "react-magnifier";
import Facebook from "../assets/icons/facebook-icon.svg";
import Twitter from "../assets/icons/twitter-icon.svg";
import Instagram from "../assets/icons/instagram-icon.svg";
import TikTok from "../assets/icons/tiktok-icon.svg";

function ProductSingle() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(
    singleProduct?.variants[0],
  );
  const [quantity, setQuantity] = useState(1);
  const { useDataLoader } = useLoader();
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleProductData = async () => {
      const data = await useDataLoader(() => api.getProductById(id));

      if (data?.data) {
        setSingleProduct(data.data);
        setSelectedVariant(
          data.data.variants.find((v) => v.available) ?? data.data.variants[0],
        );
      } else if (data?.err) {
        setError(data.err);
      }
    };

    fetchSingleProductData();
  }, [id]);

  const getDeliveryRange = () => {
    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() + 3);
    end.setDate(end.getDate() + 7);

    const fmt = (date) =>
      date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    return `${fmt(start)} - ${fmt(end)}`;
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: singleProduct._id,
      title: singleProduct.title,
      tags: singleProduct.tags,
      image: singleProduct.image,
      variant: selectedVariant,
      quantity,
    };

    console.log(cartItem);
  };

  return (
    <div className="product-page">
      <PageTitle pageName={singleProduct?.title} />
      <div className="product-page__inner">
        <div className="product-page__gallery">
          {singleProduct?.image && (
            <Magnifier
              zoomFactor={0.9}
              mgBorderWidth={0}
              className="product-page__gallery-image"
              src={singleProduct.image}
              alt={singleProduct.title}
            />
          )}
        </div>

        <div className="product-page__details">
          <h1 className="product-page__title">{singleProduct?.title}</h1>
          <p className="product-page__reviews">
            {Array.from({ length: 5 }, (_, i) => (
              <i
                key={i}
                className={clsx("bi", {
                  "bi-star-fill": i < Math.floor(singleProduct?.rating),
                  "bi-star-half":
                    i === Math.floor(singleProduct?.rating) &&
                    singleProduct?.rating % 1 >= 0.5,
                  "bi-star":
                    i >= Math.floor(singleProduct?.rating) &&
                    !(
                      i === Math.floor(singleProduct?.rating) &&
                      singleProduct?.rating % 1 >= 0.5
                    ),
                })}
              />
            ))}
            ({singleProduct?.reviews.length || 0}{" "}
            {singleProduct?.reviews.length === 1 ? "Review" : "Reviews"})
          </p>

          <h6 className="product-page__price">
            ${selectedVariant?.price ?? singleProduct?.variants[0].price}
          </h6>

          <div className="product-page__shipping">
            <img
              className="product-page__shipping-icon"
              src={ShippingIcon}
              alt=""
            />
            <div className="product-page__shipping-line"></div>
          </div>

          <h5 className="product-page__promo">
            Spend $
            {Math.max(0, 500 - selectedVariant?.price * quantity).toFixed(2)}{" "}
            more and get{" "}
            <span className="product-page__promo-highlight">
              Free Shipping !
            </span>
          </h5>

          <p className="product-page__description-label">Description</p>
          <p className="product-page__description">
            {singleProduct?.description}
          </p>

          <div className="product-page__size">
            <h5 className="product-page__size-heading">
              Bottle Size:{" "}
              <span className="product-page__size-value">
                {selectedVariant?.size ?? "—"}
              </span>
            </h5>

            <div className="product-page__size-options">
              {singleProduct?.variants.map((variant) => (
                <button
                  key={variant.size}
                  className={clsx("product-page__size-btn", {
                    "product-page__size-btn--active":
                      selectedVariant?.size === variant.size,
                    "product-page__size-btn--disabled": !variant.available,
                  })}
                  onClick={() =>
                    variant.available && setSelectedVariant(variant)
                  }
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-page__divider"></div>

          <div className="product-page__meta">
            <h2 className="product-page__meta-item">
              Availability:{" "}
              {singleProduct?.available && (
                <span className="product-page__meta-item--instock">
                  In Stock
                </span>
              )}
              {!singleProduct?.available && (
                <span className="product-page__meta-item--outOfStock">
                  Unavailable
                </span>
              )}
            </h2>
            <h2 className="product-page__meta-item">
              Tags:{" "}
              <span className="product-page__tag">
                {singleProduct?.tags.join(", ")}
              </span>
            </h2>
          </div>

          <div className="product-page__quantity">
            <p className="product-page__quantity-label">Quantity:</p>
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
              >
                Add to Cart
              </button>
              <button className="product-page__btn product-page__btn--primary">
                Buy it now
              </button>
            </div>
          )}

          {!singleProduct?.available && (
            <div className="product-page__actions">
              <button className="product-page__btn product-page__btn--dark sold-out">
                Sold Out
              </button>
            </div>
          )}

          <div className="product-page__divider"></div>

          <div className="product-page__additional-info">
            <div className="product-page__additional-info-item">
              <img src={DeliveryIcon} alt="" />
              <p className="product-page__additional-info-text">
                Estimated Delivery:{" "}
                <span className="product-page__additional-info-text--dark">
                  {getDeliveryRange()}
                </span>
              </p>
            </div>
            <div className="product-page__additional-info-item">
              <img src={ReturnIcon} alt="" />
              <p className="product-page__additional-info-text">
                Return within 90 days of purchase. Taxes are non-refundable.
              </p>
            </div>
          </div>

          <div className="product-page__share-container">
            <h2 className="product-page__share-container__text">Share: </h2>
            <a href="https://www.facebook.com/" target="blank">
              <img
                className="product-page__share-container__img"
                src={Facebook}
                alt=""
              />
            </a>
            <a href="https://x.com/" target="blank">
              <img
                className="product-page__share-container__img"
                src={Twitter}
                alt=""
              />
            </a>
            <a href="https://www.instagram.com/" target="blank">
              <img
                className="product-page__share-container__img"
                src={Instagram}
                alt=""
              />
            </a>
            <a href="https://tikok.com/" target="blank">
              <img
                className="product-page__share-container__img"
                src={TikTok}
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      <InstagramPromo />
    </div>
  );
}

export default ProductSingle;
