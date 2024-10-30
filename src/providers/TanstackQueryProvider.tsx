'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface TanstackQueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function TanstackQueryProvider({
  children,
}: TanstackQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
