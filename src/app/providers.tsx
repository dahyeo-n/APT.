'use client';

import React, { useEffect, useState } from 'react';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

import { ProviderProps } from '@/types/layoutPropsTypes';

import LoadingWrapper from '@/components/LoadingWrapper';

import '../styles/globals.css';

const QueryProviders = ({ children }: ProviderProps) => {
  const [isMount, setMount] = useState(false);
  const queryClient = React.useRef(new QueryClient()).current;

  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <LoadingWrapper>{children}</LoadingWrapper>
          </RecoilRoot>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default QueryProviders;
