'use client';

import React, { useEffect, useState } from 'react';

import { LoadingWrapperProps } from '@/types/loadingWrapperPropsType';

import InitialLoadingScreen from '@/components/InitialLoadingScreen';
import Navbar from './Navbar';
import Footer from './Footer';

const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (!hasLoadedBefore) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasLoadedBefore', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <InitialLoadingScreen />;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LoadingWrapper;
