import type { Metadata } from 'next';
import localFont from 'next/font/local';
import QueryProviders from '@/app/providers';

import { MetadataProps } from '@/types/layoutPropsTypes';

import { getMetadata } from '@/lib/getMetadata';

const GmarketSansTTFLight = localFont({
  src: './fonts/GmarketSansTTFLight.ttf',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const GmarketSansTTFMedium = localFont({
  src: './fonts/GmarketSansTTFMedium.ttf',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const GmarketSansTTFBold = localFont({
  src: './fonts/GmarketSansTTFBold.ttf',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export async function generateMetadata(
  props: MetadataProps
): Promise<Metadata> {
  const { params } = props;
  return getMetadata(params);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <meta
          name='google-site-verification'
          content='4GpnpC50_46JD5NKq3x1cr4nS8p6JY60cr7a3xBbQvc'
        />
        <meta
          name='naver-site-verification'
          content='14299dd46c22b70e509a255225c402bfdb54b202'
        />
      </head>
      <body
        className={`${GmarketSansTTFLight.variable} ${GmarketSansTTFMedium.variable} ${GmarketSansTTFBold.variable} antialiased`}
      >
        <QueryProviders>{children}</QueryProviders>
      </body>
    </html>
  );
}
