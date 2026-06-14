import { useState, useEffect } from 'react';
import * as api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { useLocation } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';

const localize = (field, lang) => {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] ?? field.en ?? '';
};

const localizeTags = (tags, lang) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return tags[lang] ?? tags.en ?? [];
};

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const { useDataLoader } = useLoader();
  const { state } = useLocation();
  const note = state?.note || '';
  const { formatPrice, activeCurrency } = useCurrency();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const getVariant = (item) => item.productId.variants.find((v) => v.size === item.variantSize);
  const getSubtotal = (item) => (getVariant(item)?.price ?? 0) * item.quantity;

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);
  const freeShippingThreshold = 500 * activeCurrency.rate;
  const shipping = total * activeCurrency.rate >= freeShippingThreshold ? 'FREE' : formatPrice(10);

  useEffect(() => {
    const fetchCart = async () => {
      const data = await useDataLoader(api.getCart);
      if (data?.data) {
        setCartItems(data.data.map((item) => ({ ...item, quantity: item.quantity })));
      } else if (data?.err) {
        console.log(data.err);
      }
    };
    fetchCart();
  }, []);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div className="contact">
          <h2 className="contact__title">Contact</h2>
          <div className="float-field">
            <input
              className="float-field__input"
              type="text"
              id="email"
              placeholder=" "
            />
            <label
              className="float-field__label"
              htmlFor="email"
            >
              Email or mobile phone number
            </label>
          </div>
        </div>

        <div className="delivery">
          <h2 className="delivery__title">Delivery</h2>

          <div className="float-field">
            <input
              className="float-field__input"
              type="text"
              id="country"
              placeholder=" "
            />
            <label
              className="float-field__label"
              htmlFor="country"
            >
              Country / Region
            </label>
          </div>

          <div className="delivery__row">
            <div className="float-field">
              <input
                className="float-field__input"
                type="text"
                id="firstName"
                placeholder=" "
              />
              <label
                className="float-field__label"
                htmlFor="firstName"
              >
                First name (optional)
              </label>
            </div>
            <div className="float-field">
              <input
                className="float-field__input"
                type="text"
                id="lastName"
                placeholder=" "
              />
              <label
                className="float-field__label"
                htmlFor="lastName"
              >
                Last name
              </label>
            </div>
          </div>

          <div className="float-field">
            <input
              className="float-field__input"
              type="text"
              id="address"
              placeholder=" "
            />
            <label
              className="float-field__label"
              htmlFor="address"
            >
              Address
            </label>
          </div>

          <div className="float-field">
            <input
              className="float-field__input"
              type="text"
              id="apartment"
              placeholder=" "
            />
            <label
              className="float-field__label"
              htmlFor="apartment"
            >
              Apartment, suite, etc. (optional)
            </label>
          </div>

          <div className="delivery__row">
            <div className="float-field">
              <input
                className="float-field__input"
                type="text"
                id="city"
                placeholder=" "
              />
              <label
                className="float-field__label"
                htmlFor="city"
              >
                City
              </label>
            </div>
            <div className="float-field">
              <input
                className="float-field__input"
                type="text"
                id="zip"
                placeholder=" "
              />
              <label
                className="float-field__label"
                htmlFor="zip"
              >
                Postal code (optional)
              </label>
            </div>
          </div>
        </div>

        <div className="payment">
          <h2 className="payment__title">Payment</h2>
          <div className="float-field">
            <input
              className="float-field__input"
              type="text"
              id="number"
              placeholder=" "
            />
            <label
              className="float-field__label"
              htmlFor="number"
            >
              Card number
            </label>

            <i className="bi bi-lock float-field__icon" />
          </div>

          <div className="payment__row">
            <div className="float-field">
              <input
                className="float-field__input"
                type="text"
                id="firstName"
                placeholder=" "
              />
              <label
                className="float-field__label"
                htmlFor="firstName"
              >
                Expiration date (MM / YY)
              </label>
            </div>
            <div className="float-field">
              <input
                className="float-field__input"
                type="text"
                id="lastName"
                placeholder=" "
              />
              <label
                className="float-field__label"
                htmlFor="lastName"
              >
                Security code
              </label>
              <i className="bi bi-question-circle float-field__icon" />
            </div>
          </div>
          <div className="float-field">
            <input
              className="float-field__input"
              type="text"
              id="number"
              placeholder=" "
            />
            <label
              className="float-field__label"
              htmlFor="number"
            >
              Name on card
            </label>
          </div>
        </div>

        <button className="checkout__left--btn">Pay Now</button>
      </div>

      <div className="checkout__right">
        <div className="wrapper">
          {cartItems.map((item) => {
            const variant = getVariant(item);
            const productId = item.productId._id.toString();
            const title = localize(item.productId.title, lang);
            const tags = localizeTags(item.productId.tags, lang);

            return (
              <div
                key={`${productId}-${item.variantSize}`}
                className="checkout__right--product"
              >
                <div className="left">
                  <div className="left__img-wrapper">
                    <img
                      src={item.productId.image}
                      alt={title}
                      onClick={() => navigate(`/products/${productId}`)}
                      className="left__img"
                    />
                    <span className="left__quantity"> {item.quantity}</span>
                  </div>

                  <div className="left__info">
                    <p className="left__info--title">{title}</p>
                    <p className="left__info--desc">
                      {item.variantSize} / {tags.join(', ')}
                    </p>
                  </div>
                </div>

                <h5 className="right-price">{formatPrice(variant?.price ?? 0)}</h5>
              </div>
            );
          })}
          <div className="checkout__right--row">
            <p>Subtotal · {totalQty} items</p>
            <p>{formatPrice(total)}</p>
          </div>

          <div className="checkout__right--row">
            <p>Shipping</p>
            <p>{shipping}</p>
          </div>

          <div className="checkout__right--row">
            <h6>Total</h6>
            <h6>
              <span>{activeCurrency.code}</span>
              {formatPrice(total + (shipping === 'FREE' ? 0 : 10))}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
