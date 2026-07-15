import {ReactNode} from 'react';
import type {Metadata} from 'next';
import { StoreProvider } from '../store/StoreProvider';
import {Roboto} from 'next/font/google';
import './globals.css';

const roboto = Roboto({subsets: ['latin'], weight: ['400', '700', '900']});

export const metadata: Metadata = {
  title: 'DISPATCH — Message Board',
  description: 'DISPATCH — Message Board, technical task for Future Media',
  keywords: ['DISPATCH', 'Message Board', 'Future Media', 'technical task'],
  authors: [{name: 'Larin Dmytro'}],
  creator: 'Larin Dmytro',
  publisher: 'Larin Dmytro',
  metadataBase: new URL('https://larindmitry.github.io/'),
  alternates: {
    canonical: '/future_media_tech',
  },
  openGraph: {
    title: 'DISPATCH — Message Board',
    description: 'DISPATCH — Message Board, technical task for Future Media',
    url: 'https://larindmitry.github.io/future_media_tech',
    siteName: 'DISPATCH — Message Board',
    images: [
      {
        url: '/future_media_tech/logo.png',
        width: 512,
        height: 512,
        alt: 'DISPATCH — Message Board',
      },
    ],
    locale: 'en_EN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/future_media_tech/manifest.json',
  icons: {
    icon: '/future_media_tech/favicon.ico',
    shortcut: '/future_media_tech/favicon.ico',
  },
};

const RootLayout = ({children}: Readonly<{children: ReactNode}>) => (
  <html lang="en">
    <body className={roboto.className}>
      <StoreProvider>{children}</StoreProvider>
    </body>
  </html>
);

export default RootLayout;
