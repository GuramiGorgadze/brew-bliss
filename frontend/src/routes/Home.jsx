import React, { useEffect } from 'react';
import { LandingBanner, PromoSection } from '../components'
import { useLoader } from '../context/LoaderContext';

function home() {
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);
  
  return (
    <>
      <LandingBanner />
      <PromoSection />

    </>
  )
}

export default home