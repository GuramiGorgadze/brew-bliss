import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoader } from '../context/LoaderContext';
import { InstagramCarousel, PageTitle, ProductList } from '../components';
import * as api from '../api/api';

function Products() {
  const [originalProducts, setOriginalProducts] = useState([]);
  const { useDataLoader } = useLoader();
  const { t, i18n } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await useDataLoader(api.getProducts);

      if (data?.data) {
        setOriginalProducts(data.data);
        setReady(true);
      } else if (data.err) {
        console.log(data.err);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <>
      <PageTitle
        pageName={t('products.pageTitle')}
        ready={ready}
      />
      <ProductList originalProducts={originalProducts} />
      <InstagramCarousel />
    </>
  );
}

export default Products;
