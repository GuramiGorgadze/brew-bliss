import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import phoneIcon from '../assets/icons/phone-icon.svg';
import flagEN from '../assets/flags/flag-en.png';
import flagFR from '../assets/flags/flag-fr.png';
import flagDE from '../assets/flags/flag-de.png';
// import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en', label: 'English', flag: flagEN },
  { code: 'fr', label: 'français', flag: flagFR },
  { code: 'de', label: 'Deutsch', flag: flagDE },
];

function TopBar() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // const navigate = useNavigate();

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.resolvedLanguage) || languages[0];

  const handleLanguageSelect = (code) => {
    // navigate(0);
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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
          alt=""
          draggable="false"
        />
        <p>(995) 557 70 40 22</p>
      </div>

      <div className="top-bar__promo">
        <p>Free Shipping on Orders of $500+</p>
      </div>

      <div className="top-bar__region">
        <div
          className="top-bar__language-custom"
          ref={dropdownRef}
        >
          <button
            className="dropdown-trigger"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <img
              src={currentLanguage.flag}
              alt=""
              className="flag-img"
            />
            <span>{currentLanguage.label}</span>
            <span className={clsx('arrow', { open: isOpen })}>
              <i className="bi bi-chevron-down"></i>
            </span>
          </button>

          {isOpen && (
            <ul className="dropdown-options">
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  className={clsx('dropdown-option', {
                    active: i18n.resolvedLanguage === lang.code,
                  })}
                  onClick={() => handleLanguageSelect(lang.code)}
                >
                  <img
                    src={lang.flag}
                    alt={`${lang.label} flag`}
                    className="flag-img"
                  />
                  <span>{lang.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="top-bar__divider"></div>

        <p>United States(USD $)</p>
      </div>
    </div>
  );
}

export default TopBar;
