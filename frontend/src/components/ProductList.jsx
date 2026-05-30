import React, { useState, useMemo } from "react";
import { Product, Toolbar, FilterSection } from "../components";
import useProductFilter from "../hooks/useProductFilter";
import deleteIcon from "../assets/icons/x-icon.svg";

function ProductList({ originalProducts = [] }) {
  const [view, setView] = useState("grid-wrap");
  const { products, filters, updateFilter, updateFilters, resetFilters } =
    useProductFilter(originalProducts);

  const filterStats = useMemo(() => {
    let inStock = 0;
    let outOfStock = 0;
    const categoryCounts = {
      stout: 0,
      ipa: 0,
      alcohol: 0,
      citrus: 0,
      lager: 0,
    };

    originalProducts.forEach((p) => {
      if (p?.available) {
        inStock++;
      } else {
        outOfStock++;
      }

      p.tags?.forEach((tag) => {
        const normalizedTag = tag.toLowerCase();
        if (normalizedTag in categoryCounts) {
          categoryCounts[normalizedTag]++;
        }
      });
    });

    return { stockCounts: { inStock, outOfStock }, categoryCounts };
  }, [originalProducts]);

  const activeFilters = useMemo(() => {
    const active = [];

    if (filters.search) {
      active.push({ key: "search", label: `Search: "${filters.search}"` });
    }
    if (filters.category) {
      active.push({ key: "category", label: `Category: ${filters.category}` });
    }
    if (filters.inStock) {
      active.push({ key: "inStock", label: "In Stock" });
    }
    if (filters.outOfStock) {
      active.push({ key: "outOfStock", label: "Out of Stock" });
    }
    if (filters.minPrice || filters.maxPrice) {
      active.push({ key: "price", label: "Price Range" });
    }

    return active;
  }, [filters]);

  return (
    <div className="product-list">
      <div className="product-list-left">
        <FilterSection
          updateFilter={updateFilter}
          updateFilters={updateFilters}
          filters={filters}
          stockCounts={filterStats.stockCounts}
          categoryCounts={filterStats.categoryCounts}
        />
      </div>

      <div className="product-list-right">
        <Toolbar
          count={products.length}
          originalProducts={originalProducts}
          view={view}
          onViewChange={setView}
          onSortChange={(sort) => updateFilter("sort", sort)}
        />

        <div className="active-filters-badges">
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="filter-badge"
              onClick={() => {
                if (filter.key === "price") {
                  updateFilters({ minPrice: "", maxPrice: "" });
                } else {
                  updateFilter(
                    filter.key,
                    filter.key === "search" || filter.key === "category" ? "" : false,
                  );
                }
              }}
            >
              {filter.label}
              <button type="button" className="clear-single-filter-btn">
                <img src={deleteIcon} alt="" />
              </button>
            </div>
          ))}

          {activeFilters.length > 0 && (
            <div className="filter-badge" onClick={resetFilters}>
              Remove All
              <button type="button" className="clear-single-filter-btn">
                <img src={deleteIcon} alt="" />
              </button>
            </div>
          )}
        </div>

        <div className={`product-cards-wrapper product-cards-wrapper--${view}`}>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="nothing-found-wrapper">
            <h2 className="nothing-found-wrapper__title">
              No products found <br />
              Use fewer filters or{" "}
              <span className="clear-all-btn" onClick={resetFilters}>
                clear all
              </span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;