import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrency, currencies } from '../context/CurrencyContext';
import clsx from 'clsx';
import phoneIcon from '../assets/icons/phone-icon.svg';
import flagEN from '../assets/flags/flag-en.png';
import flagFR from '../assets/flags/flag-fr.png';
import flagDE from '../assets/flags/flag-de.png';

const languages = [
  { code: 'en', label: 'English', flag: flagEN },
  { code: 'fr', label: 'français', flag: flagFR },
  { code: 'de', label: 'Deutsch', flag: flagDE },
];

function TopBar() {
  const { t, i18n } = useTranslation();
  const { activeCurrency, changeCurrency } = useCurrency();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const langDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.resolvedLanguage) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target)) {
        setIsCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="top-bar">
      <div className="top-bar__contact">
        <img
          src={phoneIcon}
          alt={t('topbar.phoneIconAlt')}
          draggable="false"
        />
        <p>(995) 557 70 40 22</p>
      </div>

      <div className="top-bar__promo">
        <p>{t('topbar.promoMessage')}</p>
      </div>

      <div className="top-bar__region">
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

        <div className="top-bar__divider"></div>

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
                  className={clsx('dropdown-option', { active: activeCurrency.code === curr.code })}
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
    </div>
  );
}

export default TopBar;
