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
import toast from 'react-hot-toast';
import ShinyText from '../components/sections/reactBits/ShinyText';
import BlurText from '../components/sections/reactBits/BlurText';

function Footer() {
  const { t, i18n } = useTranslation();
  const { userData } = useUserData();
  const [email, setEmail] = useState('');
  const [openSection, setOpenSection] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    if (userData?.email) {
      setEmail(userData.email);
    }
  }, [userData]);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleSubscribe = async () => {
    if (isSubscribing) return;
    if (!email.trim()) {
      toast.error(t('footer.newsletter.toast.validationError'));
      return;
    }
    setIsSubscribing(true);
    const toastId = toast.loading(t('footer.newsletter.toast.loading'), { duration: 8000 });
    try {
      await api.newsletter(email);
      toast.success(t('footer.newsletter.toast.success'), { id: toastId });
    } catch {
      toast.error(t('footer.newsletter.toast.error'), { id: toastId });
    } finally {
      setIsSubscribing(false);
    }
  };

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
          <h4 className="footer__links-title">
            <BlurText
              text={t('footer.sections.websiteLinks')}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          </h4>
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
          <h4 className="footer__links-title">
            <BlurText
              text={t('footer.sections.ourCompany')}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          </h4>
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
          <h4 className="footer__newsletter-title">
            <BlurText
              text={t('footer.newsletter.title')}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          </h4>
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
              disabled={isSubscribing}
            >
              {t('footer.newsletter.button')}
            </button>
          </div>
          <h5 className="footer__newsletter-follow">
            <ShinyText
              text={t('footer.socials.followUs')}
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
          </h5>
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

        <div className="footer__mobile-accordion">
          <button
            className="footer__mobile-header"
            onClick={() => toggleSection('company')}
          >
            <h2>
              <BlurText
                text={t('footer.sections.ourCompany')}
                delay={100}
                animateBy="words"
                direction="top"
                className="text-2xl mb-8"
              />
            </h2>
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
            <h2>
              <BlurText
                text={t('footer.sections.customerService')}
                delay={100}
                animateBy="words"
                direction="top"
                className="text-2xl mb-8"
              />
            </h2>
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
            <h2>
              <BlurText
                text={t('footer.newsletter.title')}
                delay={100}
                animateBy="words"
                direction="top"
                className="text-2xl mb-8"
              />
            </h2>
            <i
              className={`bi bi-chevron-down footer__mobile-icon ${openSection === 'newsletter' ? 'is-open' : ''}`}
            ></i>
          </button>
          <div
            className={`footer__mobile-content ${openSection === 'newsletter' ? 'is-open' : ''}`}
          >
            <p className="footer__newsletter-desc">
              <ShinyText
                text={t('footer.newsletter.description')}
                speed={2}
                delay={0}
                color="#92949f"
                shineColor="#ffffff"
                spread={100}
                direction="left"
                yoyo={true}
                pauseOnHover={false}
                disabled={false}
              />
            </p>
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
                disabled={isSubscribing}
              >
                {t('footer.newsletter.button')}
              </button>
            </div>
            <h5 className="footer__newsletter-follow">
              <ShinyText
                text={t('footer.socials.followUs')}
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
            </h5>
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
          <span className="orange">
            <ShinyText
              text={t('footer.bottom.brandName')}
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
          </span>
          {t('footer.bottom.copyrightAfter')}{' '}
          <span className="orange">
            <ShinyText
              text={t('footer.bottom.poweredBy')}
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
          </span>
          .
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
