import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartIcon from '../assets/icons/cart-icon.svg'
import profileIcon from '../assets/icons/profile-icon.svg'
import searchIcon from '../assets/icons/search-icon.svg'
import logo from '../assets/logo.webp'
import clsx from 'clsx'

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchClosing, setSearchClosing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  const closeSearch = () => {
    setSearchClosing(true)
    setTimeout(() => {
      setSearchOpen(false)
      setSearchClosing(false)
    }, 300)
  }

  const handleSearchSubmit = () => {
     if (!searchQuery.trim()) return;
     navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
     setSearchQuery('')
     closeSearch()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit()
    if (e.key === 'Escape') setSearchOpen(false)
  }

  return (
    <>
      <nav className='navbar'>
        <div className="navbar__brand">
          <Link to="/"><img src={logo} alt="Company Logo" draggable="false" /></Link>
        </div>

        <div className="navbar__nav">
          <ul>
            <li className='navbar__nav-item'><Link to="/">HOME</Link></li>
            <li className='navbar__nav-item'><Link to="/products">PRODUCT</Link></li>
            <li className='navbar__nav-item'><Link to="/">SHOP</Link></li>
            <li className='navbar__nav-item'><Link to="/">BLOG</Link></li>
            <li className='navbar__nav-item'><Link to="/">PAGES</Link></li>
          </ul>
        </div>

        <div className="navbar__actions">
          <button onClick={() => setSearchOpen(true)}>
            <img src={searchIcon} alt="" draggable="false" />
          </button>
          <button><Link to="/account"><img src={profileIcon} alt="" draggable="false" /></Link></button>
          <button><img src={cartIcon} alt="" draggable="false" /></button>
        </div>
      </nav>

      {searchOpen && (
        <div className={clsx('search-overlay', { 'search-overlay--closing': searchClosing })}>
          <div className="search-overlay__content" onClick={(e) => e.stopPropagation()}>
            <button className="search-overlay__close" onClick={closeSearch}>✕</button>
            <h2 className="search-overlay__title">WHAT ARE YOU LOOKING FOR?</h2>
            <div className="search-overlay__input-wrapper">
              <input
                type="text"
                placeholder="Search for products ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="search-overlay__btn" onClick={handleSearchSubmit}>
                <img src={searchIcon} alt="Search" draggable="false" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar