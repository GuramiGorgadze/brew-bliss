import React, { useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import promotionBanner from '../assets/promotion-banner.avif'

function FilterSection({ updateFilter }) {
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    setSearchQuery('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit()
  }


  const handleAvailability = (key, checked) => {
    updateFilter(key, checked)
  }

  const handlePrice = (key, value) => {
    updateFilter(key, value)
  }

  return (
    <div className='filter-section'>
      <div className="filter-section__search">
        <input
          type="text"
          placeholder="Search Here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="filter-section__search-btn" onClick={handleSearchSubmit}>
          <img src={searchIcon} alt="Search" draggable="false" />
        </button>
      </div>

      <div className="filter-section__categories">
        <h1>Product Categories</h1>
        <ul>
          {['Beer', 'Wisky', 'Wheat Beer', 'Non-Alcoholic Beer', 'IPA (India Pale Ale)'].map(cat => (
            <li key={cat}>
              <Link className="filter-section__category-link">
                <span className="filter-section__category-name">{cat}</span>
                <p>(12)</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section__availability">
        <div className="filter-section__section-header">
          <div className="filter-section__toggle" onClick={() => setAvailabilityOpen(prev => !prev)}>
            <span className='filter-section__toggle-icon'>{availabilityOpen ? '–' : '+'}</span>
            <h1>AVAILABILITY</h1>
          </div>
        </div>

        {availabilityOpen && (
          <div className="filter-section__options">
            <div className='filter-section__option'>
              <label className="filter-section__checkbox">
                <input
                  type="checkbox"
                  onChange={(e) => handleAvailability('inStock', e.target.checked)}
                />
                <span className="filter-section__checkmark"></span>
              </label>
              <p>In Stock (9)</p>
            </div>

            <div className='filter-section__option'>
              <label className="filter-section__checkbox">
                <input
                  type="checkbox"
                  onChange={(e) => handleAvailability('outOfStock', e.target.checked)}
                />
                <span className="filter-section__checkmark"></span>
              </label>
              <p>Out of Stock (6)</p>
            </div>
          </div>
        )}

        <span className='filter-section__divider'></span>
      </div>

      <div className="filter-section__price">
        <div className="filter-section__section-header">
          <div className="filter-section__toggle" onClick={() => setPriceOpen(prev => !prev)}>
            <span className='filter-section__toggle-icon'>{priceOpen ? '–' : '+'}</span>
            <h1>PRICE</h1>
          </div>
        </div>

        {priceOpen && (
          <>
            <p className="filter-section__highest-price">The Highest Price Is <span>$200.00</span></p>
            <div className="filter-section__price-inputs">
              <span>$</span>
              <input
                className='filter-section__price-input'
                type="number"
                placeholder='From'
                onChange={(e) => handlePrice('minPrice', e.target.value)}
              />
              <input
                className='filter-section__price-input'
                type="number"
                placeholder='To'
                onChange={(e) => handlePrice('maxPrice', e.target.value)}
              />
            </div>
          </>
        )}

        <span className='filter-section__divider'></span>
      </div>

      <div className="filter-section__promotion">
        <img src={promotionBanner} alt="" />
      </div>
    </div>
  )
}

export default FilterSection