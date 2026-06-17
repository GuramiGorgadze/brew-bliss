import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { useUserData } from '../context/UserContext.jsx';
import { InstagramCarousel } from '../components';
import * as api from '../api/api';
import { Link, useSearchParams } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import BlurText from '../components/sections/reactBits/BlurText';
import ShinyText from '../components/sections/reactBits/ShinyText';

const ORDERS_PER_PAGE = 2;

function Account() {
  const { logout, userData } = useUserData();
  const [wishlistCount, setWishlist] = useState(0);
  const [orders, setOrders] = useState([]);
  const { useDataLoader } = useLoader();
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const [searchParams, setSearchParams] = useSearchParams();
  const [ready, setReady] = useState(false);

  const activeTab = searchParams.get('tab') || 'dashboard';

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = totalPages > 0 && rawPage > totalPages ? 1 : rawPage;
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const setTab = (tab) => {
    setSearchParams({ tab });
  };

  const setPage = (page) => {
    setSearchParams({ tab: 'orders', page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      const data = await useDataLoader(api.getWishlist);
      setReady(true);
      if (data?.data) setWishlist(data.data.length);
    };
    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await useDataLoader(api.getOrders);
      setReady(true);
      if (data?.data) setOrders(data.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="account">
      <div className="account__header">
        <h2 className="account__title">
          {' '}
          {ready && (
            <BlurText
              text={t('account.title')}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          )}
        </h2>
        <div className="account__divider"></div>
      </div>

      <div className="account__body">
        <div className="account__nav">
          <p className="account__nav-welcome">
            <span className="orange">
              {' '}
              <ShinyText
                text={t('account.welcome')}
                speed={2}
                delay={0}
                color="#fea90c"
                shineColor="#ffffff"
                spread={100}
                direction="left"
                yoyo={true}
                pauseOnHover={false}
                disabled={false}
              />
            </span>{' '}
            {userData?.firstName} {userData?.lastName}
          </p>

          <div className="account__nav-links">
            <button
              className={`account__nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setTab('dashboard')}
            >
              <i className="bi bi-list-ul"></i>
              {t('account.nav.dashboard')}
            </button>
            <button
              className={`account__nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setTab('orders')}
            >
              <i className="bi bi-bag-check"></i>
              {t('account.nav.orders')}
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
          {activeTab === 'dashboard' && (
            <>
              <h4 className="account__details-title">{t('account.details.title')}</h4>
              <table className="account__table">
                <tbody>
                  <tr className="account__table-row">
                    <th className="account__table-header">{t('account.details.name')}</th>
                    <td className="account__table-data">
                      {userData?.firstName} {userData?.lastName}
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
                    <th className="account__table-header">{t('account.details.addressName')}</th>
                    <td className="account__table-data">
                      {userData?.address?.firstName} {userData?.address?.lastName}
                    </td>
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
            </>
          )}

          {activeTab === 'orders' && (
            <>
              <h4 className="account__details-title">{t('account.orders.title')}</h4>
              {orders.length === 0 ? (
                <p className="account__orders-empty">{t('account.orders.empty')}</p>
              ) : (
                <>
                  <div className="account__orders">
                    {paginatedOrders.map((order, index) => (
                      <div
                        key={order._id}
                        className="account__order"
                      >
                        <div className="account__order-header">
                          <span className="account__order-number">
                            {t('account.orders.order')} #
                            {orders.length - ((currentPage - 1) * ORDERS_PER_PAGE + index)}
                          </span>
                          <span className="account__order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span
                            className={`account__order-status account__order-status--${order.status}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="account__order-items">
                          {order.items.map((item, i) => (
                            <div
                              key={i}
                              className="account__order-item"
                            >
                              <span className="account__order-item-name">
                                {item.title?.[i18n.language] ?? item.title?.en} – {item.variantSize}{' '}
                                × {item.quantity}
                              </span>
                              <span className="account__order-item-price">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="account__order-footer">
                          {order.note && (
                            <span className="account__order-note">
                              {t('account.orders.note')}: {order.note}
                            </span>
                          )}
                          <span className="account__order-total">
                            {t('account.orders.total')}: {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="account__pagination">
                      <button
                        className="account__pagination-btn account__pagination-btn--arrow"
                        disabled={currentPage === 1}
                        onClick={() => setPage(currentPage - 1)}
                      >
                        <i className="bi bi-chevron-left" />
                      </button>

                      {getPageNumbers().map((page, i) =>
                        page === '...' ? (
                          <span
                            key={`ellipsis-${i}`}
                            className="account__pagination-ellipsis"
                          >
                            …
                          </span>
                        ) : (
                          <button
                            key={page}
                            className={`account__pagination-btn ${currentPage === page ? 'active' : ''}`}
                            onClick={() => setPage(page)}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        className="account__pagination-btn account__pagination-btn--arrow"
                        disabled={currentPage === totalPages}
                        onClick={() => setPage(currentPage + 1)}
                      >
                        <i className="bi bi-chevron-right" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <InstagramCarousel />
    </div>
  );
}

export default Account;
