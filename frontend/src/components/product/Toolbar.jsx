import React from 'react';
import clsx from 'clsx';
import GridWrap from '../../assets/icons/grid-wrap.svg?react';
import GridList from '../../assets/icons/grid-list.svg?react';

function Toolbar({ count, view, onViewChange, onSortChange, originalProducts }) {
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
          <span className="toolbar__count">{count} Products</span>
        )}
        {originalProducts.length > count && (
          <span className="toolbar__count">
            {count} of {originalProducts.length} Products
          </span>
        )}
      </div>

      <div className="toolbar__sort">
        <label htmlFor="sort">Sort By:</label>
        <select
          id="sort"
          defaultValue="most-relevant"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="most-relevant">Most relevant</option>
          <option value="title-asc">Alphabetically, A–Z</option>
          <option value="title-desc">Alphabetically, Z–A</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
        </select>
      </div>
    </div>
  );
}

export default Toolbar;
