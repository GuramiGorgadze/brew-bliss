import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.webp';
import Facebook from '../assets/icons/facebook-icon.svg';
import Twitter from '../assets/icons/twitter-icon.svg';
import Instagram from '../assets/icons/instagram-icon.svg';
import TikTok from '../assets/icons/tiktok-icon.svg';
import { useUserData } from '../context/UserContext.jsx';
import Amazon from '../assets/payments/amazon.svg';
import ApplePay from '../assets/payments/apple-pay.svg';
import Mastercard from '../assets/payments/mastercard.svg';
import PayPal from '../assets/payments/paypal.svg';
import Visa from '../assets/payments/visa.svg';

function Footer() {
  const { userData } = useUserData();
  const [email, setEmail] = useState('');
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    if (userData?.email) {
      setEmail(userData.email);
    }
  }, [userData]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img
            className="footer__brand-logo"
            src={Logo}
            alt="logo"
          />
          <p className="footer__brand-slogan">
            We are passionate about crafting the perfect beer experience...
          </p>

          <div className="footer__contact">
            <p className="footer__contact-info">
              Address <span className="grey">67th Avenue, Georgia</span>
            </p>
            <p className="footer__contact-info">
              Phone <span className="grey">(995) 557 70 40 22</span>
            </p>
            <p className="footer__contact-info">
              Email <span className="grey">g.gorgadze111@gmail.com</span>
            </p>
          </div>
        </div>

        <div className="footer__links">
          <h4 className="footer__links-title">Website Links</h4>
          <Link
            className="footer__links-item"
            to="/"
          >
            Home
          </Link>
          <Link
            className="footer__links-item"
            to="/account"
          >
            My Account
          </Link>
          <Link
            className="footer__links-item"
            to="/products"
          >
            Products
          </Link>
          <Link
            className="footer__links-item"
            to=""
          >
            Link
          </Link>
        </div>

        <div className="footer__links">
          <h4 className="footer__links-title">Our Company</h4>
          <Link
            className="footer__links-item"
            to="/about"
          >
            About Us
          </Link>
          <Link
            className="footer__links-item"
            to="/team"
          >
            Our team
          </Link>
          <Link
            className="footer__links-item"
            to="/contact"
          >
            Contact Us
          </Link>
          <Link
            className="footer__links-item"
            to=""
          >
            Link
          </Link>
        </div>

        <div className="footer__newsletter">
          <h4 className="footer__newsletter-title">Sign Up To Newsletter</h4>
          <p className="footer__newsletter-desc">
            Sign up for exclusive updates, new arrivals and More.
          </p>
          <div className="footer__newsletter-form">
            <div className="footer__newsletter-form--input">
              <i className="bi bi-envelope"></i>
              <input
                className="footer__newsletter-input"
                type="text"
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="footer__newsletter-btn">Subscribe</button>
          </div>
          <h5 className="footer__newsletter-follow">Follow Us</h5>
          <div className="footer__socials">
            <a
              className="footer__socials-link"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer__socials-icon"
                src={Facebook}
                alt="Facebook"
              />
            </a>
            <a
              className="footer__socials-link"
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer__socials-icon"
                src={Twitter}
                alt="Twitter"
              />
            </a>
            <a
              className="footer__socials-link"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer__socials-icon"
                src={Instagram}
                alt="Instagram"
              />
            </a>
            <a
              className="footer__socials-link"
              href="https://tiktok.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="footer__socials-icon"
                src={TikTok}
                alt="TikTok"
              />
            </a>
          </div>
        </div>

        <div className="footer__mobile-accordion">
          <button
            className="footer__mobile-header"
            onClick={() => toggleSection('company')}
          >
            <h2>Our Company</h2>
            <i
              className={`bi bi-chevron-down footer__mobile-icon ${openSection === 'company' ? 'is-open' : ''}`}
            ></i>
          </button>
          <div className={`footer__mobile-content ${openSection === 'company' ? 'is-open' : ''}`}>
            <Link
              className="footer__links-item"
              to="/about"
            >
              About Us
            </Link>
            <Link
              className="footer__links-item"
              to="/team"
            >
              Our Team
            </Link>
            <Link
              className="footer__links-item"
              to="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="footer__links-item"
              to="/"
            >
              Home
            </Link>
            <Link
              className="footer__links-item"
              to="/products"
            >
              Products
            </Link>
          </div>
        </div>

        <div className="footer__mobile-accordion">
          <button
            className="footer__mobile-header"
            onClick={() => toggleSection('service')}
          >
            <h2>Customer Service</h2>
            <i
              className={`bi bi-chevron-down footer__mobile-icon ${openSection === 'service' ? 'is-open' : ''}`}
            ></i>
          </button>
          <div className={`footer__mobile-content ${openSection === 'service' ? 'is-open' : ''}`}>
            <Link
              className="footer__links-item"
              to="/account"
            >
              My Account
            </Link>
            <Link
              className="footer__links-item"
              to="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="footer__links-item"
              to=""
            >
              Returns
            </Link>
            <Link
              className="footer__links-item"
              to=""
            >
              FAQ
            </Link>
          </div>
        </div>

        <div className="footer__mobile-accordion">
          <button
            className="footer__mobile-header"
            onClick={() => toggleSection('newsletter')}
          >
            <h2>Sign Up to Newsletter</h2>
            <i
              className={`bi bi-chevron-down footer__mobile-icon ${openSection === 'newsletter' ? 'is-open' : ''}`}
            ></i>
          </button>
          <div
            className={`footer__mobile-content ${openSection === 'newsletter' ? 'is-open' : ''}`}
          >
            <p className="footer__newsletter-desc">
              Sign up for exclusive updates, new arrivals and more.
            </p>
            <div className="footer__newsletter-form">
              <div className="footer__newsletter-form--input">
                <i className="bi bi-envelope"></i>
                <input
                  className="footer__newsletter-input"
                  type="text"
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button className="footer__newsletter-btn">Subscribe</button>
            </div>
            <h5 className="footer__newsletter-follow">Follow Us</h5>
            <div className="footer__socials">
              <a
                className="footer__socials-link"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={Facebook}
                  alt="Facebook"
                />
              </a>
              <a
                className="footer__socials-link"
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={Twitter}
                  alt="Twitter"
                />
              </a>
              <a
                className="footer__socials-link"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={Instagram}
                  alt="Instagram"
                />
              </a>
              <a
                className="footer__socials-link"
                href="https://tiktok.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="footer__socials-icon"
                  src={TikTok}
                  alt="TikTok"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copyright">
          Copyright © <span className="orange">brew bliss Store</span>. All Rights Reserved. Powered
          by <span className="orange">UIPARADOX</span>.
        </div>
        <div className="footer__cards">
          <img
            src={Amazon}
            alt=""
          />
          <img
            src={ApplePay}
            alt=""
          />
          <img
            src={Mastercard}
            alt=""
          />
          <img
            src={PayPal}
            alt=""
          />
          <img
            src={Visa}
            alt=""
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
