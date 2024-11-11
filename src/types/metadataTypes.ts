export interface generateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
}

export interface Metadata {
  metadataBase: URL;
  alternates: {
    canonical: string;
  };
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    siteName: string;
    locale: string;
    type: string;
    url: string;
    images: {
      url: string;
    };
  };
  verification: {
    google: string;
    other: {
      'naver-site-verification': string;
    };
  };
  twitter: {
    title: string;
    description: string;
    images: {
      url: string;
    };
  };
  icons: {
    icon: string;
  };
}
