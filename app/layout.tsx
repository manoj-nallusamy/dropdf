import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CONSTANTS } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${CONSTANTS.APP_NAME} - Share PDFs Instantly`,
  description: CONSTANTS.APP_DESCRIPTION,
  openGraph: {
    title: `${CONSTANTS.APP_NAME} - Share PDFs Instantly`,
    description: CONSTANTS.APP_DESCRIPTION,
    url: CONSTANTS.APP_URL,
    siteName: CONSTANTS.APP_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CONSTANTS.APP_NAME} - Share PDFs Instantly`,
    description: CONSTANTS.APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
