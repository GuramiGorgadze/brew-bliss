import React from 'react';
import clsx from 'clsx';
import GridWrap from '../../assets/icons/grid-wrap.svg?react';
import GridList from '../../assets/icons/grid-list.svg?react';
import { useTranslation } from 'react-i18next';

function Toolbar({ count, view, onViewChange, onSortChange, originalProducts }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="toolbar">
      <div className="toolbar__views">
        <button
          className={clsx('toolbar__view-btn', view === 'grid-wrap' && 'toolbar__view-btn--active')}
          onClick={() => onViewChange('grid-wrap')}
        >
          <GridWrap />
        </button>
        <button
          className={clsx('toolbar__view-btn', view === 'grid-list' && 'toolbar__view-btn--active')}
          onClick={() => onViewChange('grid-list')}
        >
          <GridList />
        </button>
        {originalProducts.length === count && (
          <span className="toolbar__count">{t('productList.productsCount', { count })}</span>
        )}
        {originalProducts.length > count && (
          <span className="toolbar__count">
            {t('productList.productsFiltered', {
              filtered: count,
              total: originalProducts.length,
            })}
          </span>
        )}
      </div>

      <div className="toolbar__sort">
        <label htmlFor="sort">{t('toolbar.sortBy')}</label>
        <select
          id="sort"
          defaultValue="most-relevant"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="most-relevant">{t('toolbar.mostRelevant')}</option>
          <option value="title-asc">{t('toolbar.titleAsc')}</option>
          <option value="title-desc">{t('toolbar.titleDesc')}</option>
          <option value="price-asc">{t('toolbar.priceAsc')}</option>
          <option value="price-desc">{t('toolbar.priceDesc')}</option>
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
