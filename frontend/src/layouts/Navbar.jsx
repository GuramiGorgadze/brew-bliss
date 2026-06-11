import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../context/UserContext';
import cartIcon from '../assets/icons/cart-icon.svg';
import profileIcon from '../assets/icons/profile-icon.svg';
import searchIcon from '../assets/icons/search-icon.svg';
// import * as api from '../api/api';
import logo from '../assets/logo.webp';
import clsx from 'clsx';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  // const [cartCount, setCartCount] = useState(0);

  const { loggedIn } = useUserData();

  const navigate = useNavigate();

  const closeSearch = () => {
    setSearchClosing(true);
    setTimeout(() => {
      searchOpen(false);
      setSearchClosing(false);
    }, 300);
  };

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 300);
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
    closeSearch();
    closeMenu();
  };

  // useEffect(() => {
  //   api.getCart().then((data) => {
  //     if (data?.data) setCartCount(data.data.length);
  //   });
  // }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
    if (e.key === 'Escape') closeSearch();
  };

  return (
    <>
      <nav className="navbar">
        <div
          className="navbar__hamburger"
          onClick={() => setMenuOpen(true)}
        >
          <i className="bi bi-list"></i>
        </div>

        <div className="navbar__brand">
          <Link to="/">
            <img
              src={logo}
              alt={t('navbar.logoAlt')}
              draggable="false"
            />
          </Link>
        </div>

        <div className="navbar__nav">
          <ul>
            <li className="navbar__nav-item">
              <Link to="/">{t('navbar.home')}</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/products">{t('navbar.product')}</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/about">{t('navbar.about')}</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/contact">{t('navbar.contact')}</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/">{t('navbar.pages')}</Link>
            </li>
          </ul>
        </div>

        <div className="navbar__actions">
          <button
            className="navbar__mobile-hidden"
            onClick={() => setSearchOpen(true)}
          >
            <img
              src={searchIcon}
              alt={t('navbar.searchIconAlt')}
              draggable="false"
            />
          </button>
          <button className="navbar__mobile-hidden">
            <Link
              to="/account"
              className="navbar__profile-link"
            >
              {loggedIn && <i className="bi bi-check-lg navbar__user-check"></i>}

              <img
                src={profileIcon}
                alt={t('navbar.profileIconAlt')}
                draggable="false"
              />
            </Link>
          </button>
          <Link
            to="/cart"
            className="navbar__profile-link"
          >
            <button>
              {/* {cartCount > 0 && <p className="navbar__cart-badge">{cartCount}</p>} */}
              <img
                src={cartIcon}
                alt={t('navbar.cartIconAlt')}
                draggable="false"
              />
            </button>
          </Link>
        </div>

        <div className="navbar__doc">
          <Link to="/">
            <i className="bi bi-house"></i>
          </Link>
          <Link to="/products">
            <i className="bi bi-shop"></i>
          </Link>
          <Link to="/">
            <i className="bi bi-cart3"></i>
          </Link>
          <Link
            to="/"
            onClick={() => setSearchOpen(true)}
          >
            <i className="bi bi-search"></i>
          </Link>
          <Link to="/">
            <i className="bi bi-heart"></i>
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <>
          <div
            className={clsx('drawer-backdrop', { 'drawer-backdrop--closing': menuClosing })}
            onClick={closeMenu}
          />
          <div className={clsx('drawer', { 'drawer--closing': menuClosing })}>
            <button
              className="drawer__close"
              onClick={closeMenu}
            >
              {t('drawer.close')} <i className="bi bi-x-lg"></i>
            </button>
            <div className="search-overlay__input-wrapper drawer__input">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="search-overlay__btn"
                onClick={handleSearchSubmit}
              >
                <img
                  src={searchIcon}
                  alt={t('search.buttonAlt')}
                  draggable="false"
                />
              </button>
            </div>

            <div className="drawer__links">
              <Link
                onClick={closeMenu}
                to="/login"
              >
                <div className="drawer__link">
                  <i className="bi bi-people"></i> {t('drawer.account')}
                </div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/"
              >
                <div className="drawer__link">{t('navbar.home')}</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/products"
              >
                <div className="drawer__link">{t('navbar.product')}</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/"
              >
                <div className="drawer__link">{t('drawer.wishlist', { count: 0 })}</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/about"
              >
                <div className="drawer__link">{t('drawer.aboutUs')}</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/contact"
              >
                <div className="drawer__link">{t('drawer.contactUs')}</div>
              </Link>
              <div className="drawer__divider"></div>
            </div>
          </div>
        </>
      )}

      {searchOpen && (
        <div className={clsx('search-overlay', { 'search-overlay--closing': searchClosing })}>
          <div
            className="search-overlay__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="search-overlay__close"
              onClick={closeSearch}
            >
              ✕
            </button>
            <h2 className="search-overlay__title">{t('search.heading')}</h2>
            <div className="search-overlay__input-wrapper">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="search-overlay__btn"
                onClick={handleSearchSubmit}
              >
                <img
                  src={searchIcon}
                  alt={t('search.buttonAlt')}
                  draggable="false"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
