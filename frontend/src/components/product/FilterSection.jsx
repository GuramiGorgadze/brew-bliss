import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import searchIcon from '../../assets/icons/search-icon.svg';
import promotionBanner from '../../assets/promotion-banner.avif';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useTranslation } from 'react-i18next';

function FilterSection({
  updateFilter,
  filters,
  updateFilters,
  stockCounts,
  categoryCounts,
  isDrawer,
}) {
  const { t } = useTranslation();

  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState(filters.search);

  const [localPrice, setLocalPrice] = useState([
    Number(filters.minPrice) || 0,
    Number(filters.maxPrice) || 200,
  ]);

  useEffect(() => {
    setLocalPrice([Number(filters.minPrice) || 0, Number(filters.maxPrice) || 200]);
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    setSearchQuery(filters.search);
  }, [filters.search]);

  const handleSearchSubmit = () => {
    updateFilter('search', searchQuery.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const handlePrice = (key, value) => {
    updateFilter(key, value);
  };

  const handleSliderChange = (values) => {
    setLocalPrice(values);
  };

  const handleSliderAfterChange = (values) => {
    updateFilters({ minPrice: values[0], maxPrice: values[1] });
  };

  const handleCategoryClick = (e, cat) => {
    e.preventDefault();
    if (filters.category === cat) {
      updateFilter('category', '');
    } else {
      updateFilter('category', cat);
    }
  };

  return (
    <div
      className={clsx('filter-section', {
        'filter-hidden': !isDrawer,
      })}
    >
      <div
        className={clsx('filter-section__search', {
          'filter-hidden': isDrawer,
        })}
      >
        <input
          type="text"
          placeholder={t('filterSection.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="filter-section__search-btn"
          onClick={handleSearchSubmit}
        >
          <img
            src={searchIcon}
            alt={t('filterSection.searchAlt')}
            draggable="false"
          />
        </button>
      </div>

      <div
        className={clsx('filter-section__categories', {
          'filter-hidden': isDrawer,
        })}
      >
        <h1>{t('filterSection.productCategories')}</h1>
        <ul>
          {['stout', 'ipa', 'alcohol', 'citrus', 'lager'].map((cat) => {
            const isActive = filters.category === cat;
            const count = categoryCounts?.[cat] || 0;

            return (
              <li key={cat}>
                <a
                  onClick={(e) => handleCategoryClick(e, cat)}
                  className={clsx('filter-section__category-link', {
                    'filter-section__category-link__active': isActive,
                  })}
                >
                  <span
                    className="filter-section__category-name"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {cat}
                  </span>
                  <p>({count})</p>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="filter-section__availability">
        <div className="filter-section__section-header">
          <div
            className="filter-section__toggle"
            onClick={() => setAvailabilityOpen((prev) => !prev)}
          >
            <span className="filter-section__toggle-icon">{availabilityOpen ? '–' : '+'}</span>
            <h1>{t('filterSection.availability')}</h1>
          </div>
        </div>

        {availabilityOpen && (
          <div className="filter-section__options">
            <div className="filter-section__option">
              <label className="filter-section__checkbox">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => updateFilter('inStock', e.target.checked)}
                />
                <span className="filter-section__checkmark"></span>
              </label>
              <p>{t('filterSection.inStock', { count: stockCounts.inStock })}</p>
            </div>

            <div className="filter-section__option">
              <label className="filter-section__checkbox">
                <input
                  type="checkbox"
                  checked={filters.outOfStock}
                  onChange={(e) => updateFilter('outOfStock', e.target.checked)}
                />
                <span className="filter-section__checkmark"></span>
              </label>
              <p>{t('filterSection.outOfStock', { count: stockCounts.outOfStock })}</p>
            </div>
          </div>
        )}
        <span className="filter-section__divider"></span>
      </div>

      <div className="filter-section__price">
        <div className="filter-section__section-header">
          <div
            className="filter-section__toggle"
            onClick={() => setPriceOpen((prev) => !prev)}
          >
            <span className="filter-section__toggle-icon">{priceOpen ? '–' : '+'}</span>
            <h1>{t('filterSection.price')}</h1>
          </div>
        </div>

        {priceOpen && (
          <>
            <p className="filter-section__highest-price">
              {t('filterSection.highestPrice')} <span>$200.00</span>
            </p>

            <div className="filter-section__slider-container">
              <Slider
                range
                min={0}
                max={200}
                value={localPrice}
                onChange={handleSliderChange}
                onChangeComplete={handleSliderAfterChange}
                trackStyle={[{ backgroundColor: '#FF9E00', height: 8 }]}
                handleStyle={[
                  {
                    borderColor: '#FF9E00',
                    backgroundColor: '#FFF',
                    height: 16,
                    width: 16,
                    marginLeft: 8,
                    borderRadius: 3,
                    marginTop: -4,
                    opacity: 1,
                  },
                  {
                    borderColor: '#FF9E00',
                    backgroundColor: '#FFF',
                    height: 16,
                    width: 16,
                    borderRadius: 3,
                    marginLeft: -8,
                    marginTop: -4,
                    opacity: 1,
                  },
                ]}
                railStyle={{ backgroundColor: '#E5E5E5', height: 8 }}
              />
            </div>

            <div className="filter-section__price-inputs">
              <span>$</span>
              <input
                className="filter-section__price-input"
                type="number"
                placeholder={t('filterSection.priceFrom')}
                value={filters.minPrice}
                onChange={(e) => handlePrice('minPrice', e.target.value)}
              />
              <input
                className="filter-section__price-input"
                type="number"
                placeholder={t('filterSection.priceTo')}
                value={filters.maxPrice}
                onChange={(e) => handlePrice('maxPrice', e.target.value)}
              />
            </div>
          </>
        )}
        <span className="filter-section__divider"></span>
      </div>

      <div className="filter-section__promotion">
        <img
          src={promotionBanner}
          alt=""
        />
      </div>
    </div>
  );
}

export default FilterSection;
