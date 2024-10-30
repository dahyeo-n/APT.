'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface TanstackQueryProviderProps {
  children: ReactNode;
}

export default function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  const queryClient = React.useRef(new QueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
