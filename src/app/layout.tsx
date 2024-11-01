import type { Metadata } from 'next';

import NextUIAndThemesProvider from '@/providers/NextUIProvider';
import TanstackQueryandRecoilProvider from '@/providers/TanstackQueryandRecoilProvider';

import LoadingWrapper from '@/components/LoadingWrapper';

import '../styles/globals.css';
import localFont from 'next/font/local';

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

export const metadata: Metadata = {
  title: 'APT.',
  description:
    '🇰🇷 한국의 술게임인 아파트 게임을 하고, 게임 결과를 공유할 수 있는 서비스',
  icons: {
    icon: '/images/APTFavicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body
        className={`${GmarketSansTTFLight.variable} ${GmarketSansTTFMedium.variable} ${GmarketSansTTFBold.variable} antialiased`}
      >
        <NextUIAndThemesProvider>
          <TanstackQueryandRecoilProvider>
            <LoadingWrapper>{children}</LoadingWrapper>
          </TanstackQueryandRecoilProvider>
        </NextUIAndThemesProvider>
      </body>
    </html>
  );
}
