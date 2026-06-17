import React, { useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../context/UserContext';
import { useCurrency, currencies } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import cartIcon from '../assets/icons/cart-icon.svg';
import profileIcon from '../assets/icons/profile-icon.svg';
import wishlistIcon from '../assets/icons/wishlist-icon.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import logo from '../assets/logo.webp';
import clsx from 'clsx';
import flagEN from '../assets/flags/flag-en.png';
import flagFR from '../assets/flags/flag-fr.png';
import flagDE from '../assets/flags/flag-de.png';

const languages = [
  { code: 'en', label: 'English', flag: flagEN },
  { code: 'fr', label: 'français', flag: flagFR },
  { code: 'de', label: 'Deutsch', flag: flagDE },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const { activeCurrency, changeCurrency } = useCurrency();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const langDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.resolvedLanguage) || languages[0];

  const { loggedIn } = useUserData();

  const navigate = useNavigate();

  const closeSearch = () => {
    setSearchClosing(true);
    setTimeout(() => {
      setSearchOpen(false);
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
              <NavLink to="/">{t('navbar.home')}</NavLink>
            </li>
            <li className="navbar__nav-item">
              <NavLink to="/products">{t('navbar.product')}</NavLink>
            </li>
            <li className="navbar__nav-item">
              <NavLink to="/about">{t('navbar.about')}</NavLink>
            </li>
            <li className="navbar__nav-item">
              <NavLink to="/contact">{t('navbar.contact')}</NavLink>
            </li>
            <li className="navbar__nav-item">
              <NavLink to="/team">{t('navbar.team')}</NavLink>
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
          <button className="navbar__mobile-hidden">
            <Link
              to="/wishlist"
              className="navbar__wishlist-link"
            >
              {wishlistCount > 0 && <p className="navbar__cart-badge">{wishlistCount}</p>}
              <img
                src={wishlistIcon}
                draggable="false"
              />
            </Link>
          </button>
          <Link
            to="/cart"
            className="navbar__profile-link"
          >
            <button>
              {cartCount > 0 && <p className="navbar__cart-badge">{cartCount}</p>}
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
          <Link to="/cart">
            <i className="bi bi-cart3"></i>
          </Link>
          <Link
            to="/"
            onClick={() => setSearchOpen(true)}
          >
            <i className="bi bi-search"></i>
          </Link>
          <Link to="/wishlist">
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
                  <div>
                    <i className="bi bi-people"></i> {t('drawer.account')}
                  </div>
                </div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/"
              >
                <div className="drawer__link">{t('drawer.home')}</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/products"
              >
                <div className="drawer__link">{t('drawer.shop')}</div>
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

              <div className="drawer__link">
                <div
                  className="top-bar__language-custom"
                  ref={langDropdownRef}
                >
                  <button
                    className="dropdown-trigger"
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    type="button"
                  >
                    <img
                      src={currentLanguage.flag}
                      alt=""
                      className="flag-img"
                    />
                    <span>{currentLanguage.label}</span>
                    <span className={clsx('arrow', { open: isLangOpen })}>
                      <i className="bi bi-chevron-down"></i>
                    </span>
                  </button>

                  {isLangOpen && (
                    <ul className="dropdown-options language">
                      {languages.map((lang) => (
                        <li
                          key={lang.code}
                          className={clsx('dropdown-option', {
                            active: i18n.resolvedLanguage === lang.code,
                          })}
                          onClick={() => {
                            i18n.changeLanguage(lang.code);
                            localStorage.setItem('lang', lang.code);
                            setIsLangOpen(false);
                          }}
                        >
                          <img
                            src={lang.flag}
                            alt=""
                            className="flag-img"
                          />
                          <span>{lang.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div
                  className="top-bar__language-custom"
                  ref={currencyDropdownRef}
                >
                  <button
                    className="dropdown-trigger"
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    type="button"
                  >
                    <span>{activeCurrency.label}</span>
                    <span className={clsx('arrow', { open: isCurrencyOpen })}>
                      <i className="bi bi-chevron-down"></i>
                    </span>
                  </button>

                  {isCurrencyOpen && (
                    <ul className="dropdown-options">
                      {currencies.map((curr) => (
                        <li
                          key={curr.code}
                          className={clsx('dropdown-option', {
                            active: activeCurrency.code === curr.code,
                          })}
                          onClick={() => {
                            changeCurrency(curr.code);
                            setIsCurrencyOpen(false);
                          }}
                        >
                          <span>{curr.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
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
