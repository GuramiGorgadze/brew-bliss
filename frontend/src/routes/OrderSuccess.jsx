import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { InstagramCarousel } from '../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslation();
  const { useFakeLoader } = useLoader();
  const { refreshCart } = useCart();

  useEffect(() => useFakeLoader(), []);

  useEffect(() => {
    if (!state?.fromCheckout) {
      navigate('/', { replace: true });
      return;
    }
    refreshCart();
  }, []);

  return (
    <div className="not-found">
      <div className="not-found__body">
        <svg
          className="order-success__check"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="order-success__check-circle"
            cx="50"
            cy="50"
            r="45"
          />
          <polyline
            className="order-success__check-tick"
            points="25,52 42,68 75,35"
          />
        </svg>
        <h3 className="not-found__heading">{t('orderSuccess.heading')}</h3>
        <p className="not-found__text">{t('orderSuccess.text')}</p>
        <button
          onClick={() => navigate('/products', { replace: true })}
          className="landing-banner__btn landing-banner__btn--orange not-found__btn"
        >
          {t('orderSuccess.btn')}
        </button>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default OrderSuccess;
