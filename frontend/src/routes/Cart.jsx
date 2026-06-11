import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { PageTitle, InstagramCarousel } from '../components';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import * as api from '../api/api';
import ShippingIcon from '../assets/icons/shipping-icon-white.svg';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [note, setNote] = useState('');
  const { useDataLoader } = useLoader();
  const { t, i18n } = useTranslation();
  const { formatPrice, activeCurrency } = useCurrency();
  const navigate = useNavigate();

  const freeShippingNumber = 500;

  useEffect(() => {
    const fetchCart = async () => {
      const data = await useDataLoader(api.getCart);
      if (data?.data) {
        setCartItems(data.data.map((item) => ({ ...item, quantity: item.quantity })));
      } else if (data?.err) {
        console(data.err);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (productId, variantSize) => {
    await api.removeFromCart(productId.toString(), variantSize);
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId._id.toString() === productId.toString() &&
            item.variantSize === variantSize
          )
      )
    );
  };

  const handleQuantityChange = async (productId, variantSize, change) => {
    const item = cartItems.find(
      (i) => i.productId._id.toString() === productId.toString() && i.variantSize === variantSize
    );
    const newQuantity = Math.max(1, item.quantity + change);

    setCartItems((prev) =>
      prev.map((i) =>
        i.productId._id.toString() === productId.toString() && i.variantSize === variantSize
          ? { ...i, quantity: newQuantity }
          : i
      )
    );

    try {
      await api.updateCartQuantity(productId.toString(), variantSize, newQuantity);
    } catch (err) {
      console('Full error:', err.response?.status, err.response?.data);
    }
  };

  const getVariant = (item) => item.productId.variants.find((v) => v.size === item.variantSize);

  const getSubtotal = (item) => (getVariant(item)?.price ?? 0) * item.quantity;

  const getOriginalSubtotal = (item) => {
    const variant = getVariant(item);
    return (variant?.compare_at_price ?? variant?.price ?? 0) * item.quantity;
  };

  const total = cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + getOriginalSubtotal(item), 0);
  const totalSaved = originalTotal - total;

  const dynamicFreeShippingThreshold = freeShippingNumber * activeCurrency.rate;
  const remaining = Math.max(0, dynamicFreeShippingThreshold - total * activeCurrency.rate);
  const progress = Math.min(
    100,
    ((total * activeCurrency.rate) / dynamicFreeShippingThreshold) * 100
  );

  return (
    <div className="cart-wrapper">
      <PageTitle pageName={t('cart.pageTitle')} />

      <div className="cart">
        <div className="cart__left">
          <table className="cart__table">
            <tbody>
              <tr className="cart__table-header">
                <th className="cart__table-th">{t('cart.table.product')}</th>
                <th className="cart__table-th">{t('cart.table.quantity')}</th>
                <th className="cart__table-th">{t('cart.table.subtotal')}</th>
                <th className="cart__table-th">{t('cart.table.remove')}</th>
              </tr>

              {cartItems.length === 0 && (
                <tr className="cart__table-empty">
                  <td colSpan={4}>{t('cart.empty')}</td>
                </tr>
              )}

              {cartItems.map((item) => {
                const variant = getVariant(item);
                const productId = item.productId._id.toString();
                return (
                  <tr
                    className="cart__table-row"
                    key={`${productId}-${item.variantSize}`}
                  >
                    <td className="cart__table-td">
                      <div className="cart-item__product">
                        <img
                          className="cart-item__img"
                          src={item.productId.image}
                          alt={item.productId.title}
                          onClick={() => navigate(`/products/${productId}`)}
                        />
                        <div className="cart-item__info">
                          <p
                            className="cart-item__name"
                            onClick={() => navigate(`/products/${productId}`)}
                          >
                            {item.productId.title}
                          </p>
                          <p className="cart-item__size">
                            {t('cart.item.bottleSize')}: {item.variantSize}
                          </p>
                          <p className="cart-item__tags">
                            {t('cart.item.beerVariety')}: {item.productId.tags?.join(', ')}
                          </p>
                          <div className="cart-item__price-row">
                            <p className="cart-item__price">{formatPrice(variant?.price ?? 0)}</p>
                            {variant?.compare_at_price && (
                              <p className="cart-item__original-price">
                                {formatPrice(variant.compare_at_price)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td
                      className="cart__table-td"
                      data-label={t('cart.table.quantity')}
                    >
                      <div className="cart-item__quantity-control">
                        <button
                          className="cart-item__quantity-btn"
                          onClick={() => handleQuantityChange(productId, item.variantSize, -1)}
                        >
                          −
                        </button>
                        <span className="cart-item__quantity-value">{item.quantity}</span>
                        <button
                          className="cart-item__quantity-btn"
                          onClick={() => handleQuantityChange(productId, item.variantSize, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td
                      className="cart__table-td cart__table-td--subtotal"
                      data-label={t('cart.table.subtotal')}
                    >
                      {formatPrice(getSubtotal(item))}
                    </td>

                    <td
                      className="cart__table-td cart__table-td--remove"
                      data-label={t('cart.table.remove')}
                    >
                      <button
                        className="cart-item__remove-btn"
                        onClick={() => handleRemove(productId, item.variantSize)}
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart__note">
            <label
              className="cart__note-label"
              htmlFor="cart-note"
            >
              {t('cart.note.label')}
            </label>
            <textarea
              className="cart__note-textarea"
              id="cart-note"
              placeholder={t('cart.note.placeholder')}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="cart__right">
          <div className="cart__summary">
            <div className="cart__shipping-progress">
              <div className="cart__shipping-progress-track">
                <div className="cart__shipping-progress-line">
                  <div
                    className="cart__shipping-progress-line-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div
                  className="cart__shipping-progress-icon-wrapper"
                  style={{ left: `calc(${progress}% - 12.5px)` }}
                >
                  <img
                    className="cart__shipping-progress-icon"
                    src={ShippingIcon}
                    alt=""
                  />
                </div>
              </div>
              <p className="cart__shipping-progress-label">
                {remaining === 0 ? (
                  <>
                    {t('cart.shipping.congrats')}{' '}
                    <span className="cart__shipping-progress-label--highlight">
                      {t('cart.shipping.freeShipping')}
                    </span>
                  </>
                ) : (
                  <>
                    {t('cart.shipping.spendMore', {
                      amount: formatPrice(remaining / activeCurrency.rate),
                    })}{' '}
                    <span className="cart__shipping-progress-label--highlight">
                      {t('cart.shipping.freeShipping')}
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="divider"></div>

            {totalSaved > 0 && (
              <div className="cart__summary-row">
                <span className="cart__summary-label">{t('cart.summary.youSave')}</span>
                <span className="cart__summary-value">{formatPrice(totalSaved)}</span>
              </div>
            )}

            {totalSaved > 0 && <div className="divider"></div>}

            <div className="cart__summary-row">
              <span className="cart__summary-label">{t('cart.summary.orderTotal')}</span>
              <span className="cart__summary-value green">{formatPrice(total)}</span>
            </div>

            <div className="divider"></div>

            <p className="cart__comment">{t('cart.summary.taxNote')}</p>

            <div className="cart__terms">
              <input
                type="checkbox"
                className="cart__terms--check"
              />
              <p className="cart__terms--text">
                {t('cart.terms.agree')} <span className="terms">{t('cart.terms.link')}</span>
              </p>
            </div>

            <button className="cart__checkout-btn">{t('cart.checkoutBtn')}</button>
          </div>
        </div>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default Cart;
