import React from 'react';
import wing1 from '../../assets/breadcrumicon1.webp';
import wing2 from '../../assets/breadcrumicon2.webp';
import heroBanner from '../../assets/Hero_Banner.webp';

function PageTitle({ pageName }) {
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
        <p>{pageName}</p>
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
