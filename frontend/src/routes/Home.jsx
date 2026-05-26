import React, { useEffect } from 'react';
import { LandingBanner, PromoSection, BrandCarousel, PromoSection2, InstagramPromo, StoreFeatures } from '../components'
import { useLoader } from '../context/LoaderContext';

function home() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);
  
  return (
    <>
      <LandingBanner />
      <PromoSection />
      <StoreFeatures />
      <BrandCarousel />
      <PromoSection2 />
      <InstagramPromo />
    </>
  )
}

export default home