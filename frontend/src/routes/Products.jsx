import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { InstagramCarousel, PageTitle, ProductList } from '../components';
import * as api from '../api/api';

function Products() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const { useDataLoader } = useLoader();
  const { t, i18n } = useTranslation();

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
      <PageTitle pageName={t('products.pageTitle')} />
      <ProductList originalProducts={originalProducts} />
      <InstagramCarousel />
    </>
  );
}

export default Products;
