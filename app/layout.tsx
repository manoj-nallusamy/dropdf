import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { CONSTANTS } from '@/lib/constants';
import { WebApplicationSchema, OrganizationSchema, FAQSchema } from './components/json-ld-schema';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(CONSTANTS.APP_URL),
  title: {
    default: 'Share PDF Online Free - DropDF | Instant PDF Sharing & Hosting',
    template: `%s | ${CONSTANTS.APP_NAME}`,
  },
  description: 'Upload PDFs and get shareable links instantly. No signup required. Free PDF hosting with built-in viewer. Try DropDF now - share PDFs in 3 clicks!',
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: '/',
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
    title: 'Share PDF Online Free - DropDF | Instant PDF Sharing & Hosting',
    description: 'Upload PDFs and get shareable links in seconds. No signup required. Free, fast, and simple PDF sharing service.',
    url: CONSTANTS.APP_URL,
    siteName: CONSTANTS.APP_NAME,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Share PDF Online Free - DropDF | Instant PDF Sharing & Hosting',
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
      <head>
        <WebApplicationSchema />
        <OrganizationSchema />
        <FAQSchema />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
