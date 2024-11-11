import { META } from '@/constants/metadata';
import { generateMetadataProps, Metadata } from '@/types/metadataTypes';

export const getMetadata = (metadataProps?: generateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | APT.` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? asPath : '';
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: META.siteName,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    verification: {
      google: META.googleVerification,
      other: {
        'naver-site-verification': META.naverVerification,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
    icons: META.icons,
  };

  return metadata;
};
