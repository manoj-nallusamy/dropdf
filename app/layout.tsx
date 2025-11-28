import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { CONSTANTS } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${CONSTANTS.APP_NAME} - Share PDF Files Instantly | Free PDF Sharing`,
    template: `%s | ${CONSTANTS.APP_NAME}`,
  },
  description: 'Share PDF documents instantly with DropDF. Upload PDFs, get shareable links in seconds. No signup required. Free PDF sharing service with built-in viewer.',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  keywords: [
    'PDF sharing',
    'share PDF online',
    'PDF file sharing',
    'upload PDF',
    'free PDF hosting',
    'PDF viewer',
    'document sharing',
    'file sharing',
    'instant PDF links',
    'PDF upload',
  ],
  authors: [{ name: 'DropDF' }],
  creator: 'DropDF',
  publisher: 'DropDF',
  openGraph: {
    title: `${CONSTANTS.APP_NAME} - Share PDF Files Instantly`,
    description: 'Upload PDFs and get shareable links in seconds. No signup required. Free, fast, and simple PDF sharing service.',
    url: CONSTANTS.APP_URL,
    siteName: CONSTANTS.APP_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CONSTANTS.APP_NAME} - Share PDF Files Instantly`,
    description: 'Free PDF sharing service. Upload PDFs, get instant shareable links. No signup required.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white text-gray-900`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
