import React from 'react'

import { Link } from 'react-router-dom'

import wing1 from '../assets/wing1.png'
import wing2 from '../assets/wing2.png'
import promoBackground1 from "../assets/promo-background1.webp";
import promoBackground2 from "../assets/promo-background2.webp";
import promoBackground3 from "../assets/promo-background3.webp";

function PromoSection() {


  return (
    <div className='promo-section'>
      <div className="promo-section__card" style={{ backgroundImage: `url(${promoBackground1})` }}>
        <div className="promo-section__title-container">
          <img src={wing1} alt="" className="promo-section__wing" />
          <p className="promo-section__tagline">New Release</p>
          <img src={wing2} alt="" className="promo-section__wing" />
        </div>

        <h2 className="promo-section__heading">Be the First to Taste Perfection!</h2>

        <Link to="/products">
          <button className='promo-section__button promo-section__button--grey'>Show Now</button>
        </Link>
      </div>

      <div className="promo-section__card" style={{ backgroundImage: `url(${promoBackground2})` }}>
        <div className="promo-section__title-container">
          <img src={wing1} alt="" className="promo-section__wing" />
          <p className="promo-section__tagline">Holiday Collections</p>
          <img src={wing2} alt="" className="promo-section__wing" />
        </div>

        <h2 className="promo-section__heading">Perfect Brews for Perfect Holidays!</h2>

        <Link to="/products">
          <button className='promo-section__button promo-section__button--grey'>Show Now</button>
        </Link>
      </div>

      <div className="promo-section__card" style={{ backgroundImage: `url(${promoBackground3})` }}>
        <div className="promo-section__title-container">
          <img src={wing1} alt="" className="promo-section__wing" />
          <p className="promo-section__tagline">Limited Time Offer</p>
          <img src={wing2} alt="" className="promo-section__wing" />
        </div>

        <h2 className="promo-section__heading">Hurry! Exclusive Deals Await!</h2>

        <Link to="/products">
          <button className='promo-section__button promo-section__button--grey'>Shop Sale</button>
        </Link>
      </div>
    </div>
  )
}

export default PromoSection