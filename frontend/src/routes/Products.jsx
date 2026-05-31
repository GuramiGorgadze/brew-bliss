import React, { useState, useEffect } from 'react';
import { useLoader } from '../context/LoaderContext';
import { InstagramPromo, PageTitle } from '../components';
import * as api from '../api/api';
import ProductList from '../components/ProductList';

function Products() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const { useDataLoader } = useLoader();

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await useDataLoader(api.getProducts);
      
      if (data?.data) {
        setOriginalProducts(data.data);
      } else if (data.err) {
        alert(data.err);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <>
      <PageTitle pageName="Products" />
      <ProductList originalProducts={originalProducts} />
      <InstagramPromo />
    </>
  );
}

export default Products;