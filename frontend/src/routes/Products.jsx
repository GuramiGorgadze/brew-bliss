import React from 'react'
import wing1 from '../assets/breadcrumicon1.webp'
import wing2 from '../assets/breadcrumicon2.webp'
import heroBanner from "../assets/Hero_Banner.webp";
import ProductList from '../components/ProductList';

function Products() {
  return (
    <>
      <div className='title-wrapper' style={{ backgroundImage: `url(${heroBanner})` }}>
        <div className="title">
          <img src={wing1} alt="" />
          <p>Products</p>
          <img src={wing2} alt="" />
        </div>
      </div>

      <ProductList />
    </>

  )
}

export default Products