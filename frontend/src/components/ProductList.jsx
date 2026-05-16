import React, { useState } from 'react';
import Product from './Product';
import Toolbar from './Toolbar';
import FilterSection from './FilterSection';
import useProductFilter from '../hooks/useProductFilter';

function ProductList({ originalProducts, userSearch }) {
  const [view, setView] = useState('grid-wrap');
  const { products, updateFilter, resetFilters } = useProductFilter(originalProducts, userSearch);

  return (
    <div className="product-list">
      <div className="product-list-left">
        <FilterSection updateFilter={updateFilter} />
      </div>

      <div className="product-list-right">
        <Toolbar
          count={products.length}
          view={view}
          onViewChange={setView}
          onSortChange={(sort) => updateFilter('sort', sort)}
        />

        <div className={`product-cards-wrapper product-cards-wrapper--${view}`}>
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        {products.length == 0 && (
          <>
            <div className="nothing-found-wrapper">
              <h2 className='nothing-found-wrapper__title'>No products found <br />
                Use fewer filters or <span className='clear-all-btn' onClick={resetFilters}>clear all</span></h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;