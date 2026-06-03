import React from 'react';
import { Link } from 'react-router-dom';

function SaleBanner() {
  return (
    <div className="promo-section2">
      <div className="promo-section2__left">
        <span className="promo-section2__left__paragraph-wrapper">
          <h5 className="promo-section2__left__paragraph-wrapper__paragraph">Limited Time only!</h5>
          <div className="promo-section2__left__paragraph-wrapper__line"></div>
        </span>

        <h2 className="promo-section2__left__title">
          Pour More, Pay Less, <br />
          Beer at -20% Off!
        </h2>

        <Link to="/products">
          <button className="promo-section2__left__btn">Shop Sale</button>
        </Link>
      </div>
    </div>
  );
}

export default SaleBanner;
