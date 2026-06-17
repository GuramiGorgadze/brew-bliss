import { useState, useEffect } from 'react';
import * as api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { useLocation } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useUserData } from '../context/UserContext.jsx';
import toast from 'react-hot-toast';

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
  const { userData } = useUserData();
  const { useDataLoader } = useLoader();
  const { state } = useLocation();
  const note = state?.note || '';
  const { formatPrice, activeCurrency } = useCurrency();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;

  const getVariant = (item) => item.productId.variants.find((v) => v.size === item.variantSize);
  const getSubtotal = (item) => (getVariant(item)?.price ?? 0) * item.quantity;

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);
  const freeShippingThreshold = 500 * activeCurrency.rate;
  const shipping =
    total * activeCurrency.rate >= freeShippingThreshold
      ? t('checkout.shippingFree')
      : formatPrice(10);

  const schema = yup.object({
    email: yup
      .string()
      .required(t('checkout.validation.emailRequired'))
      .email(t('checkout.validation.emailInvalid')),

    country: yup.string().required(t('checkout.validation.countryRequired')),

    firstName: yup.string().max(30, t('checkout.validation.firstNameMax')),

    lastName: yup
      .string()
      .required(t('checkout.validation.lastNameRequired'))
      .max(30, t('checkout.validation.lastNameMax')),

    address: yup.string().required(t('checkout.validation.addressRequired')),

    apartment: yup.string(),

    city: yup.string().required(t('checkout.validation.cityRequired')),

    zip: yup.string(),

    cardNumber: yup
      .string()
      .required(t('checkout.validation.cardNumberRequired'))
      .matches(/^\d{4} \d{4} \d{4} \d{4}$/, t('checkout.validation.cardNumberInvalid')),

    expirationDate: yup
      .string()
      .required(t('checkout.validation.expirationDateRequired'))
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, t('checkout.validation.expirationDateInvalid')),

    securityCode: yup
      .string()
      .required(t('checkout.validation.securityCodeRequired'))
      .matches(/^\d{3,4}$/, t('checkout.validation.securityCodeInvalid')),

    nameOnCard: yup.string().required(t('checkout.validation.nameOnCardRequired')),
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!userData) return;
    reset({
      email: userData.email ?? '',
      firstName: userData.address?.firstName ?? '',
      lastName: userData.address?.lastName ?? '',
      country: userData.address?.country ?? '',
      address: userData.address?.address ?? '',
      apartment: userData.address?.address2 ?? '',
      city: userData.address?.city ?? '',
      zip: userData.address?.zip ?? '',
    });
  }, [userData]);

  const onSubmit = async (formData) => {
    const toastId = toast.loading(t('checkout.processing'));
    try {
      const payload = {
        cardNumber: formData.cardNumber,
        expirationDate: formData.expirationDate,
        securityCode: formData.securityCode,
        nameOnCard: formData.nameOnCard,
        note,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          country: formData.country,
          address: formData.address,
          address2: formData.apartment,
          city: formData.city,
          zip: formData.zip,
        },
      };

      const res = await api.placeOrder(payload);
      if (res?.data) {
        toast.success(t('checkout.orderSuccess'), { id: toastId });
        navigate('/order-success', { state: { fromCheckout: true } });
      } else {
        throw new Error('Order execution context failed');
      }
    } catch (err) {
      console.error('Order failed:', err);
      toast.error(t('checkout.orderError'), { id: toastId });
    }
  };

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

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);
    value = value.match(/.{1,4}/g)?.join(' ') || '';
    e.target.value = value;
    setValue('cardNumber', value, { shouldValidate: false });
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 4);
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    e.target.value = value;
    setValue('expirationDate', value, { shouldValidate: false });
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="contact">
            <h2 className="contact__title">{t('checkout.contact')}</h2>
            <div className="float-field">
              <input
                className={clsx('float-field__input', { error: errors.email })}
                type="text"
                id="email"
                placeholder=" "
                maxLength={50}
                {...register('email')}
              />
              <label
                className="float-field__label"
                htmlFor="email"
              >
                {t('checkout.emailLabel')}
              </label>
              {errors.email && <p className="float-field__error">{errors.email.message}</p>}
            </div>
          </div>

          <div className="delivery">
            <h2 className="delivery__title">{t('checkout.delivery')}</h2>

            <div className="float-field">
              <input
                className={clsx('float-field__input', { error: errors.country })}
                type="text"
                id="country"
                placeholder=" "
                maxLength={50}
                {...register('country')}
              />
              <label
                className="float-field__label"
                htmlFor="country"
              >
                {t('checkout.countryLabel')}
              </label>
              {errors.country && <p className="float-field__error">{errors.country.message}</p>}
            </div>

            <div className="delivery__row">
              <div className="float-field">
                <input
                  className={clsx('float-field__input', { error: errors.firstName })}
                  type="text"
                  id="firstName"
                  placeholder=" "
                  maxLength={30}
                  {...register('firstName')}
                />
                <label
                  className="float-field__label"
                  htmlFor="firstName"
                >
                  {t('checkout.firstNameLabel')}
                </label>
                {errors.firstName && (
                  <p className="float-field__error">{errors.firstName.message}</p>
                )}
              </div>

              <div className="float-field">
                <input
                  className={clsx('float-field__input', { error: errors.lastName })}
                  type="text"
                  id="lastName"
                  placeholder=" "
                  maxLength={30}
                  {...register('lastName')}
                />
                <label
                  className="float-field__label"
                  htmlFor="lastName"
                >
                  {t('checkout.lastNameLabel')}
                </label>
                {errors.lastName && <p className="float-field__error">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="float-field">
              <input
                className={clsx('float-field__input', { error: errors.address })}
                type="text"
                id="address"
                placeholder=" "
                maxLength={100}
                {...register('address')}
              />
              <label
                className="float-field__label"
                htmlFor="address"
              >
                {t('checkout.addressLabel')}
              </label>
              {errors.address && <p className="float-field__error">{errors.address.message}</p>}
            </div>

            <div className="float-field">
              <input
                className="float-field__input"
                type="text"
                id="apartment"
                placeholder=" "
                maxLength={50}
                {...register('apartment')}
              />
              <label
                className="float-field__label"
                htmlFor="apartment"
              >
                {t('checkout.apartmentLabel')}
              </label>
            </div>

            <div className="delivery__row">
              <div className="float-field">
                <input
                  className={clsx('float-field__input', { error: errors.city })}
                  type="text"
                  id="city"
                  placeholder=" "
                  maxLength={50}
                  {...register('city')}
                />
                <label
                  className="float-field__label"
                  htmlFor="city"
                >
                  {t('checkout.cityLabel')}
                </label>
                {errors.city && <p className="float-field__error">{errors.city.message}</p>}
              </div>

              <div className="float-field">
                <input
                  className="float-field__input"
                  type="text"
                  id="zip"
                  placeholder=" "
                  maxLength={10}
                  {...register('zip')}
                />
                <label
                  className="float-field__label"
                  htmlFor="zip"
                >
                  {t('checkout.zipLabel')}
                </label>
              </div>
            </div>
          </div>

          <div className="payment">
            <h2 className="payment__title">{t('checkout.payment')}</h2>

            <div className="float-field">
              <input
                className={clsx('float-field__input', { error: errors.cardNumber })}
                type="text"
                id="cardNumber"
                placeholder=" "
                maxLength={19}
                {...register('cardNumber')}
                onChange={handleCardNumberChange}
              />
              <label
                className="float-field__label"
                htmlFor="cardNumber"
              >
                {t('checkout.cardNumberLabel')}
              </label>
              <i className="bi bi-lock float-field__icon" />
              {errors.cardNumber && (
                <p className="float-field__error">{errors.cardNumber.message}</p>
              )}
            </div>

            <div className="payment__row">
              <div className="float-field">
                <input
                  className={clsx('float-field__input', { error: errors.expirationDate })}
                  type="text"
                  id="expirationDate"
                  placeholder=" "
                  maxLength={5}
                  {...register('expirationDate')}
                  onChange={handleExpirationDateChange}
                />
                <label
                  className="float-field__label"
                  htmlFor="expirationDate"
                >
                  {t('checkout.expirationDateLabel')}
                </label>
                {errors.expirationDate && (
                  <p className="float-field__error">{errors.expirationDate.message}</p>
                )}
              </div>

              <div className="float-field">
                <input
                  className={clsx('float-field__input', { error: errors.securityCode })}
                  type="text"
                  id="securityCode"
                  placeholder=" "
                  maxLength={4}
                  {...register('securityCode')}
                />
                <label
                  className="float-field__label"
                  htmlFor="securityCode"
                >
                  {t('checkout.securityCodeLabel')}
                </label>
                <i className="bi bi-question-circle float-field__icon" />
                {errors.securityCode && (
                  <p className="float-field__error">{errors.securityCode.message}</p>
                )}
              </div>
            </div>

            <div className="float-field">
              <input
                className={clsx('float-field__input', { error: errors.nameOnCard })}
                type="text"
                id="nameOnCard"
                placeholder=" "
                maxLength={50}
                {...register('nameOnCard')}
              />
              <label
                className="float-field__label"
                htmlFor="nameOnCard"
              >
                {t('checkout.nameOnCardLabel')}
              </label>
              {errors.nameOnCard && (
                <p className="float-field__error">{errors.nameOnCard.message}</p>
              )}
            </div>
          </div>

          <button
            className="checkout__left--btn"
            type="submit"
            disabled={isSubmitting}
          >
            {t('checkout.payNow')}
          </button>
        </form>
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
                    <span className="left__quantity">{item.quantity}</span>
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
            <p>
              {t('checkout.subtotal')} · {totalQty} {t('checkout.items')}
            </p>
            <p>{formatPrice(total)}</p>
          </div>

          <div className="checkout__right--row">
            <p>{t('checkout.shipping')}</p>
            <p>{shipping}</p>
          </div>

          {note && (
            <div className="checkout__right--note">
              <p>{t('checkout.note')}</p>
              <p>{note}</p>
            </div>
          )}

          <div className="checkout__right--row">
            <h6>{t('checkout.total')}</h6>
            <h6>
              <span>{activeCurrency.code}</span>
              {formatPrice(total + (shipping === t('checkout.shippingFree') ? 0 : 10))}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
