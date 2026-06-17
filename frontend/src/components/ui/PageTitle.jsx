import React from 'react';
import wing1 from '../../assets/breadcrumicon1.webp';
import wing2 from '../../assets/breadcrumicon2.webp';
import heroBanner from '../../assets/Hero_Banner.webp';
import BlurText from '../sections/reactBits/BlurText';

function PageTitle({ pageName, ready = true }) {
  return (
    <div
      className="title-wrapper"
      style={{ backgroundImage: `url(${heroBanner})` }}
    >
      <div className="title">
        <img
          src={wing1}
          alt=""
          className="title-wrapper__wing"
          style={{ marginLeft: '30px' }}
        />
        <p>
          {ready && (
            <BlurText
              key={pageName}
              text={pageName}
              delay={100}
              animateBy="words"
              direction="top"
              className="text-2xl mb-8"
            />
          )}
        </p>
        <img
          src={wing2}
          alt=""
          className="title-wrapper__wing"
          style={{ marginRight: '30px' }}
        />
      </div>
    </div>
  );
}

export default PageTitle;
