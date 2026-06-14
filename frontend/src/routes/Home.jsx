import React, { useEffect } from 'react';
import {
  LandingBanner,
  PromoGrid,
  BrandCarousel,
  SaleBanner,
  InstagramCarousel,
  StoreFeatures,
  ArrivalsCarousel,
  FeaturedCarousel,
} from '../components';
import { useLoader } from '../context/LoaderContext';

function home() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  return (
    <>
      <LandingBanner />
      <FeaturedCarousel isOnHome={true} />
      <PromoGrid />
      <ArrivalsCarousel />
      <StoreFeatures />
      <BrandCarousel />
      <SaleBanner />
      <InstagramCarousel />
    </>
  );
}

export default home;
