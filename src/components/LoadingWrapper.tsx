'use client';

import React, { useEffect, useState } from 'react';

import InitialLoadingScreen from '@/components/InitialLoadingScreen';
import Navbar from './Navbar';
import Footer from './Footer';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper = ({ children }: LoadingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');

    if (hasLoadedBefore) {
      setIsLoading(false);
    } else {
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
