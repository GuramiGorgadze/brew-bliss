import React, { useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { InstagramPromo } from '../components';
import wing1 from '../assets/breadcrumicon1.webp';
import wing2 from '../assets/breadcrumicon2.webp';
import { useNavigate } from 'react-router-dom'
import heroBanner from '../assets/Hero_Banner.webp';
import notFoundImg from '../assets/not-found-img.webp'

function NotFound() {
  const navigate = useNavigate()

  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  return (
    <div className="not-found">
      <div className="title-wrapper" style={{ backgroundImage: `url(${heroBanner})` }}>
        <div className="title">
          <img src={wing1} alt="" />
          <p>404</p>
          <img src={wing2} alt="" />
        </div>
      </div>

      <div className="not-found__body">
        <img className="not-found__image" src={notFoundImg} alt="" />
        <h3 className="not-found__heading">Sorry, We Can't Find That Page!</h3>
        <p className="not-found__text">
          It seems this page has moved or doesn't exist. Head back to our <br />
          homepage, or reach out if you need help!
        </p>
        <button
          onClick={() => navigate("/")}
          className="landing-banner__btn landing-banner__btn--orange not-found__btn"
        >
          Back To Homepage
        </button>
      </div>

      <InstagramPromo />
    </div>
  )
}

export default NotFound