import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { useUserData } from '../context/UserContext.jsx';
import { InstagramCarousel } from '../components';
import * as api from '../api/api';

import { Link } from 'react-router-dom';

function Account() {
  const { logout, userData } = useUserData();
  const [wishlistCount, setWishlist] = useState(0);
  const { useDataLoader } = useLoader();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const data = await useDataLoader(api.getWishlist);
      if (data?.data) setWishlist(data.data.length);
    };

    fetchData();
  }, []);

  return (
    <div className="account">
      <div className="account__header">
        <h2 className="account__title">{t('account.title')}</h2>
        <div className="account__divider"></div>
      </div>

      <div className="account__body">
        <div className="account__nav">
          <p className="account__nav-welcome">
            <span className="orange">{t('account.welcome')}</span> {userData?.firstName}{' '}
            {userData?.lastName}
          </p>

          <div className="account__nav-links">
            <button className="account__nav-btn active">
              <i className="bi bi-list-ul"></i>
              {t('account.nav.dashboard')}
            </button>
            <button className="account__nav-btn">
              <i className="bi bi-bag-check"></i>
              {t('account.nav.checkout')}
            </button>
            <Link to="/account/address">
              <button className="account__nav-btn">
                <i className="bi bi-geo-alt"></i>
                {t('account.nav.editAddress')}
              </button>
            </Link>
            <Link to="/wishlist">
              <button className="account__nav-btn">
                <i className="bi bi-heart"></i>
                {t('account.nav.viewWishlist')} ({wishlistCount})
              </button>
            </Link>
            <button
              className="account__nav-btn account__nav-btn--logout"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right"></i>
              {t('account.nav.logout')}
            </button>
          </div>
        </div>

        <div className="account__details">
          <h4 className="account__details-title">{t('account.details.title')}</h4>

          <table className="account__table">
            <tbody>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.name')}</th>
                <td className="account__table-data">
                  {userData?.address?.firstName} {userData?.address?.lastName}
                </td>
              </tr>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.country')}</th>
                <td className="account__table-data">{userData?.address?.country}</td>
              </tr>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.email')}</th>
                <td className="account__table-data">{userData?.email}</td>
              </tr>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.phone')}</th>
                <td className="account__table-data">{userData?.address?.phone}</td>
              </tr>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.city')}</th>
                <td className="account__table-data">{userData?.address?.city}</td>
              </tr>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.zip')}</th>
                <td className="account__table-data">{userData?.address?.zip}</td>
              </tr>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.address')}</th>
                <td className="account__table-data">{userData?.address?.address}</td>
              </tr>
              <tr className="account__table-row">
                <th className="account__table-header">{t('account.details.address2')}</th>
                <td className="account__table-data">{userData?.address?.address2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default Account;
