import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext'
import { PageTitle } from '../components';
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
      <PageTitle pageName="Products" />

      <ProductList originalProducts={originalProducts} userSearch={userSearch} />
    </>
  );
}

export default Products;