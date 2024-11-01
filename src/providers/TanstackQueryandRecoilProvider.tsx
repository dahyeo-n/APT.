'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

interface ProviderProps {
  children: ReactNode;
}

export default function TanstackQueryandRecoilProvider({
  children,
}: ProviderProps) {
  const queryClient = React.useRef(new QueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );
}
