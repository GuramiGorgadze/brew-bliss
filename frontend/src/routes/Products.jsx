import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext'
import wing1 from '../assets/breadcrumicon1.webp';
import wing2 from '../assets/breadcrumicon2.webp';
import heroBanner from '../assets/Hero_Banner.webp';
import * as api from '../api/api';
import ProductList from '../components/ProductList';

function Products() {
  const [originalProducts, setOriginalProducts] = useState([]);

  const [searchParams] = useSearchParams()
  const userSearch = searchParams.get('search') || ''

  const { loading, useDataLoader } = useLoader();

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await useDataLoader(api.getProducts);
      
      if (data?.data) {
        setOriginalProducts(data.data)
      } else if (data.err) {
        alert(data.err)
      }
    }

    fetchProductsData()
  }, [])

  return (
    <>
      <div className="title-wrapper" style={{ backgroundImage: `url(${heroBanner})` }}>
        <div className="title">
          <img src={wing1} alt="" className='title-wrapper__wing'/>
          <p>Products</p>
          <img src={wing2} alt="" className='title-wrapper__wing'/>
        </div>
      </div>

      <ProductList originalProducts={originalProducts} userSearch={userSearch} />
    </>
  );
}

export default Products;