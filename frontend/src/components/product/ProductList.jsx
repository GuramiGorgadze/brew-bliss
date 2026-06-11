import React, { useState, useMemo } from 'react';
import { Product, Toolbar, FilterSection } from '..';
import searchIcon from '../../assets/icons/search-icon.svg';
import useProductFilter from '../../hooks/useProductFilter';
import deleteIcon from '../../assets/icons/x-icon.svg';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

function ProductList({ originalProducts = [] }) {
  const { t, i18n } = useTranslation();

  const [view, setView] = useState('grid-wrap');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterClosing, setFilterClosing] = useState(false);

  const { products, filters, updateFilter, updateFilters, resetFilters } =
    useProductFilter(originalProducts);

  const closeFilter = () => {
    setFilterClosing(true);
    setTimeout(() => {
      setFilterOpen(false);
      setFilterClosing(false);
    }, 300);
  };

  const filterStats = useMemo(() => {
    let inStock = 0;
    let outOfStock = 0;
    const categoryCounts = { stout: 0, ipa: 0, alcohol: 0, citrus: 0, lager: 0 };

    originalProducts.forEach((p) => {
      if (p?.available) {
        inStock++;
      } else {
        outOfStock++;
      }
      p.tags?.forEach((tag) => {
        const normalizedTag = tag.toLowerCase();
        if (normalizedTag in categoryCounts) categoryCounts[normalizedTag]++;
      });
    });

    return { stockCounts: { inStock, outOfStock }, categoryCounts };
  }, [originalProducts]);

  const activeFilters = useMemo(() => {
    const active = [];
    if (filters.search)
      active.push({
        key: 'search',
        label: t('productList.filterSearch', { value: filters.search }),
      });
    if (filters.category)
      active.push({
        key: 'category',
        label: t('productList.filterCategory', { value: filters.category }),
      });
    if (filters.inStock) active.push({ key: 'inStock', label: t('productList.filterInStock') });
    if (filters.outOfStock)
      active.push({ key: 'outOfStock', label: t('productList.filterOutOfStock') });
    if (filters.minPrice || filters.maxPrice)
      active.push({ key: 'price', label: t('productList.filterPriceRange') });
    return active;
  }, [filters, t]);

  return (
    <div className="product-list">
      <div className="product-list-left">
        <FilterSection
          updateFilter={updateFilter}
          updateFilters={updateFilters}
          filters={filters}
          stockCounts={filterStats.stockCounts}
          categoryCounts={filterStats.categoryCounts}
          isDrawer={false}
        />
        <div className="filter-section__search mobile-show">
          <input
            type="text"
            placeholder={t('filterSection.searchPlaceholder')}
          />
          <button className="filter-section__search-btn">
            <img
              src={searchIcon}
              alt={t('filterSection.searchAlt')}
              draggable="false"
            />
          </button>
        </div>
      </div>

      <div className="product-list-right">
        <div
          className="mobile-filter"
          onClick={() => setFilterOpen(true)}
        >
          <div className="left">
            <i className="bi bi-funnel"></i>
            <p>{t('productList.filterAndSort')}</p>
          </div>
          <div className="right">
            {originalProducts.length === products.length ? (
              <span className="toolbar__count">
                {t('productList.productsCount', { count: products.length })}
              </span>
            ) : (
              <span className="toolbar__count">
                {t('productList.productsFiltered', {
                  filtered: products.length,
                  total: originalProducts.length,
                })}
              </span>
            )}
          </div>
        </div>

        <Toolbar
          count={products.length}
          originalProducts={originalProducts}
          view={view}
          onViewChange={setView}
          onSortChange={(sort) => updateFilter('sort', sort)}
        />

        <div className="active-filters-badges">
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="filter-badge"
              onClick={() => {
                if (filter.key === 'price') {
                  updateFilters({ minPrice: '', maxPrice: '' });
                } else {
                  updateFilter(
                    filter.key,
                    filter.key === 'search' || filter.key === 'category' ? '' : false
                  );
                }
              }}
            >
              {filter.label}
              <button
                type="button"
                className="clear-single-filter-btn"
              >
                <img
                  src={deleteIcon}
                  alt=""
                />
              </button>
            </div>
          ))}
          {activeFilters.length > 0 && (
            <div
              className="filter-badge"
              onClick={resetFilters}
            >
              {t('productList.removeAll')}
              <button
                type="button"
                className="clear-single-filter-btn"
              >
                <img
                  src={deleteIcon}
                  alt=""
                />
              </button>
            </div>
          )}
        </div>

        <div className={`product-cards-wrapper product-cards-wrapper--${view}`}>
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="nothing-found-wrapper">
            <h2 className="nothing-found-wrapper__title">
              {t('productList.noProductsFound')} <br />
              {t('productList.useFewerFilters')}{' '}
              <span
                className="clear-all-btn"
                onClick={resetFilters}
              >
                {t('productList.clearAll')}
              </span>
            </h2>
          </div>
        )}
      </div>

      {filterOpen && (
        <>
          <div
            className={clsx('filter-drawer-backdrop', {
              'filter-drawer-backdrop--closing': filterClosing,
            })}
            onClick={closeFilter}
          />
          <button
            className="filter-drawer-close"
            onClick={closeFilter}
          >
            <i className="bi bi-x-lg"></i>
          </button>

          <div className={clsx('filter-drawer', { 'filter-drawer--closing': filterClosing })}>
            <div className="filter-drawer__title">
              <h2>{t('productList.filterAndSortTitle')}</h2>
            </div>

            <div className="filter-drawer__info">
              <div className="filter-drawer__quantity">
                {originalProducts.length === products.length ? (
                  <span className="toolbar__count">
                    {t('productList.productsCount', { count: products.length })}
                  </span>
                ) : (
                  <span className="toolbar__count">
                    {t('productList.productsFiltered', {
                      filtered: products.length,
                      total: originalProducts.length,
                    })}
                  </span>
                )}
              </div>

              <FilterSection
                updateFilter={updateFilter}
                updateFilters={updateFilters}
                filters={filters}
                stockCounts={filterStats.stockCounts}
                categoryCounts={filterStats.categoryCounts}
                isDrawer={true}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductList;
