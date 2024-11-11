import { ReactNode } from 'react';
import { generateMetadataProps } from './metadataTypes';

export interface ProviderProps {
  children: ReactNode;
}

export interface MetadataProps {
  params: generateMetadataProps;
}
