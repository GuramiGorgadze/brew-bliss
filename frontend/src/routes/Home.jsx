import React, { useEffect } from 'react';
import {
  LandingBanner,
  PromoGrid,
  BrandCarousel,
  SaleBanner,
  InstagramCarousel,
  StoreFeatures,
} from '../components';
import { useLoader } from '../context/LoaderContext';

function home() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  return (
    <>
      <LandingBanner />
      <PromoGrid />
      <StoreFeatures />
      <BrandCarousel />
      <SaleBanner />
      <InstagramCarousel />
    </>
  );
}

export default home;
