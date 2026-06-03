import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cartIcon from '../assets/icons/cart-icon.svg';
import profileIcon from '../assets/icons/profile-icon.svg';
import searchIcon from '../assets/icons/search-icon.svg';
import logo from '../assets/logo.webp';
import clsx from 'clsx';

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

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
              alt="Company Logo"
              draggable="false"
            />
          </Link>
        </div>

        <div className="navbar__nav">
          <ul>
            <li className="navbar__nav-item">
              <Link to="/">HOME</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/products">PRODUCT</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/contact">CONTACT</Link>
            </li>
            <li className="navbar__nav-item">
              <Link to="/">PAGES</Link>
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
              alt=""
              draggable="false"
            />
          </button>
          <button className="navbar__mobile-hidden">
            <Link to="/account">
              <img
                src={profileIcon}
                alt=""
                draggable="false"
              />
            </Link>
          </button>
          <button>
            <img
              src={cartIcon}
              alt=""
              draggable="false"
            />
          </button>
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
              Close <i className="bi bi-x-lg"></i>
            </button>
            <div className="search-overlay__input-wrapper drawer__input">
              <input
                type="text"
                placeholder="Search for products ..."
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
                  alt="Search"
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
                  <i className="bi bi-people"></i> Account
                </div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/"
              >
                <div className="drawer__link">Home</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/products"
              >
                <div className="drawer__link">Products</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/"
              >
                <div className="drawer__link">Wishlist (0)</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/about"
              >
                <div className="drawer__link">About Us</div>
              </Link>
              <div className="drawer__divider"></div>
              <Link
                onClick={closeMenu}
                to="/contact"
              >
                <div className="drawer__link">Contact Us</div>
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
            <h2 className="search-overlay__title">WHAT ARE YOU LOOKING FOR?</h2>
            <div className="search-overlay__input-wrapper">
              <input
                type="text"
                placeholder="Search for products ..."
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
                  alt="Search"
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
