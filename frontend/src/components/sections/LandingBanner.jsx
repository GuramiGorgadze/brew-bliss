import React from 'react';
import wing1 from '../../assets/wing1.png';
import wing2 from '../../assets/wing2.png';
import landingBeer from '../../assets/landing-beer.webp';
import heroBanner from '../../assets/Hero_Banner.webp';

function LandingBanner() {
  return (
    <div
      className="landing-banner"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="landing-banner__left">
        <div className="landing-banner__new-arrival laptop">
          <img
            src={wing1}
            alt=""
            className="landing-banner__wing"
          />
          <p>NEW ARRIVAL</p>
          <img
            src={wing2}
            alt=""
            className="landing-banner__wing"
          />
        </div>

        <h2 className="landing-banner__title">Discover Flavors, One Bottle at a Time!</h2>
        <p className="landing-banner__text">
          Explore the rich and diverse world of beer, savoring unique flavors crafted to perfection,
          one bottle at a time!
        </p>

        <div className="landing-banner__actions">
          <button className="landing-banner__btn landing-banner__btn--orange">Shop Sale</button>
          <button className="landing-banner__btn landing-banner__btn--grey">Our Collections</button>
        </div>
      </div>

      <div className="landing-banner__right">
        <div className="landing-banner__new-arrival mobile">
          <img
            src={wing1}
            alt=""
            className="landing-banner__wing"
          />
          <p>NEW ARRIVAL</p>
          <img
            src={wing2}
            alt=""
            className="landing-banner__wing"
          />
        </div>
        <img
          className="landing-banner__image"
          src={landingBeer}
          alt=""
        />
      </div>
    </div>
  );
}

export default LandingBanner;
