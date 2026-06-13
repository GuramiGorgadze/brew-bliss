import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/logo.webp';
import Facebook from '../assets/icons/facebook-icon.svg';
import Twitter from '../assets/icons/twitter-icon.svg';
import Instagram from '../assets/icons/instagram-icon.svg';
import TikTok from '../assets/icons/tiktok-icon.svg';
import { useUserData } from '../context/UserContext.jsx';
import * as api from '../api/api';
import Amazon from '../assets/payments/amazon.svg';
import ApplePay from '../assets/payments/apple-pay.svg';
import Mastercard from '../assets/payments/mastercard.svg';
import PayPal from '../assets/payments/paypal.svg';
import Visa from '../assets/payments/visa.svg';

function Footer() {
  const { t, i18n } = useTranslation();
  const { userData } = useUserData();
  const [email, setEmail] = useState('');
  const [openSection, setOpenSection] = useState(null);
  const [subStatus, setSubStatus] = useState('normal');

  useEffect(() => {
    if (userData?.email) {
      setEmail(userData.email);
    }
  }, [userData]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleSubscribe = async () => {
    if (!email.trim()) return;
    setSubStatus('loading');
    try {
      await api.newsletter(email);
      setSubStatus('success');
      setTimeout(() => setSubStatus('normal'), 4000);
    } catch {
      setSubStatus('error');
      setTimeout(() => setSubStatus('normal'), 4000);
    }
  };

  const subLabel = {
    normal: t('footer.newsletter.button.normal'),
    loading: t('footer.newsletter.button.loading'),
    success: t('footer.newsletter.button.success'),
    error: t('footer.newsletter.button.error'),
  }[subStatus];

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img
            className="footer__brand-logo"
            src={Logo}
            alt={t('footer.brand.logoAlt')}
          />
          <p className="footer__brand-slogan">{t('footer.brand.slogan')}</p>

          <div className="footer__contact">
            <p className="footer__contact-info">
              {t('footer.contact.addressLabel')}{' '}
              <span className="grey">{t('footer.contact.addressValue')}</span>
            </p>
            <p className="footer__contact-info">
              {t('footer.contact.phoneLabel')}{' '}
              <span className="grey">{t('footer.contact.phoneValue')}</span>
            </p>
            <p className="footer__contact-info">
              {t('footer.contact.emailLabel')}{' '}
              <span className="grey">{t('footer.contact.emailValue')}</span>
            </p>
          </div>
        </div>

        <div className="footer__links">
          <h4 className="footer__links-title">{t('footer.sections.websiteLinks')}</h4>
          <Link
            className="footer__links-item"
            to="/"
          >
            {t('footer.links.home')}
          </Link>
          <Link
            className="footer__links-item"
            to="/account"
          >
            {t('footer.links.myAccount')}
          </Link>

          <Link
            className="footer__links-item"
            to="/cart"
          >
            {t('footer.links.cart')}
          </Link>

          <Link
            className="footer__links-item"
            to="/wishlist"
          >
            {t('footer.links.wishlist')}
          </Link>
        </div>

        <div className="footer__links">
          <h4 className="footer__links-title">{t('footer.sections.ourCompany')}</h4>
          <Link
            className="footer__links-item"
            to="/products"
          >
            {t('footer.links.products')}
          </Link>
          <Link
            className="footer__links-item"
            to="/about"
          >
            {t('footer.links.aboutUs')}
          </Link>
          <Link
            className="footer__links-item"
            to="/contact"
          >
            {t('footer.links.contactUs')}
          </Link>
          <Link
            className="footer__links-item"
            to="/team"
          >
            {t('footer.links.ourTeam')}
          </Link>
        </div>

        <div className="footer__newsletter">
          <h4 className="footer__newsletter-title">{t('footer.newsletter.title')}</h4>
          <p className="footer__newsletter-desc">{t('footer.newsletter.description')}</p>
          <div className="footer__newsletter-form">
            <div className="footer__newsletter-form--input">
              <i className="bi bi-envelope"></i>
              <input
                className="footer__newsletter-input"
                type="text"
                placeholder={t('footer.newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="footer__newsletter-btn"
              onClick={handleSubscribe}
              disabled={subStatus === 'loading' || subStatus === 'success'}
            >
              {subLabel}
            </button>
          </div>
          <h5 className="footer__newsletter-follow">{t('footer.socials.followUs')}</h5>
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
                alt={t('footer.socials.facebookAlt')}
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
                alt={t('footer.socials.twitterAlt')}
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
                alt={t('footer.socials.instagramAlt')}
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
                alt={t('footer.socials.tiktokAlt')}
              />
            </a>
          </div>
        </div>

        {/* Mobile Accordions */}
        <div className="footer__mobile-accordion">
          <button
            className="footer__mobile-header"
            onClick={() => toggleSection('company')}
          >
            <h2>{t('footer.sections.ourCompany')}</h2>
            <i
              className={`bi bi-chevron-down footer__mobile-icon ${openSection === 'company' ? 'is-open' : ''}`}
            ></i>
          </button>
          <div className={`footer__mobile-content ${openSection === 'company' ? 'is-open' : ''}`}>
            <Link
              className="footer__links-item"
              to="/about"
            >
              {t('footer.links.aboutUs')}
            </Link>
            <Link
              className="footer__links-item"
              to="/team"
            >
              {t('footer.links.ourTeam')}
            </Link>
            <Link
              className="footer__links-item"
              to="/contact"
            >
              {t('footer.links.contactUs')}
            </Link>
            <Link
              className="footer__links-item"
              to="/"
            >
              {t('footer.links.home')}
            </Link>
            <Link
              className="footer__links-item"
              to="/products"
            >
              {t('footer.links.products')}
            </Link>
          </div>
        </div>

        <div className="footer__mobile-accordion">
          <button
            className="footer__mobile-header"
            onClick={() => toggleSection('service')}
          >
            <h2>{t('footer.sections.customerService')}</h2>
            <i
              className={`bi bi-chevron-down footer__mobile-icon ${openSection === 'service' ? 'is-open' : ''}`}
            ></i>
          </button>
          <div className={`footer__mobile-content ${openSection === 'service' ? 'is-open' : ''}`}>
            <Link
              className="footer__links-item"
              to="/account"
            >
              {t('footer.links.myAccount')}
            </Link>
            <Link
              className="footer__links-item"
              to="/contact"
            >
              {t('footer.links.contactUs')}
            </Link>
            <Link
              className="footer__links-item"
              to=""
            >
              {t('footer.links.returns')}
            </Link>
            <Link
              className="footer__links-item"
              to=""
            >
              {t('footer.links.faq')}
            </Link>
          </div>
        </div>

        <div className="footer__mobile-accordion">
          <button
            className="footer__mobile-header"
            onClick={() => toggleSection('newsletter')}
          >
            <h2>{t('footer.newsletter.title')}</h2>
            <i
              className={`bi bi-chevron-down footer__mobile-icon ${openSection === 'newsletter' ? 'is-open' : ''}`}
            ></i>
          </button>
          <div
            className={`footer__mobile-content ${openSection === 'newsletter' ? 'is-open' : ''}`}
          >
            <p className="footer__newsletter-desc">{t('footer.newsletter.description')}</p>
            <div className="footer__newsletter-form">
              <div className="footer__newsletter-form--input">
                <i className="bi bi-envelope"></i>
                <input
                  className="footer__newsletter-input"
                  type="text"
                  placeholder={t('footer.newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className="footer__newsletter-btn"
                onClick={handleSubscribe}
                disabled={subStatus === 'loading' || subStatus === 'success'}
              >
                {subLabel}
              </button>
            </div>
            <h5 className="footer__newsletter-follow">{t('footer.socials.followUs')}</h5>
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
                  alt={t('footer.socials.facebookAlt')}
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
                  alt={t('footer.socials.twitterAlt')}
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
                  alt={t('footer.socials.instagramAlt')}
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
                  alt={t('footer.socials.tiktokAlt')}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__copyright">
          {t('footer.bottom.copyrightBefore')}{' '}
          <span className="orange">{t('footer.bottom.brandName')}</span>
          {t('footer.bottom.copyrightAfter')}{' '}
          <span className="orange">{t('footer.bottom.poweredBy')}</span>.
        </div>
        <div className="footer__cards">
          <img
            src={Amazon}
            alt={t('footer.payments.amazonAlt')}
          />
          <img
            src={ApplePay}
            alt={t('footer.payments.applePayAlt')}
          />
          <img
            src={Mastercard}
            alt={t('footer.payments.mastercardAlt')}
          />
          <img
            src={PayPal}
            alt={t('footer.payments.paypalAlt')}
          />
          <img
            src={Visa}
            alt={t('footer.payments.visaAlt')}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
