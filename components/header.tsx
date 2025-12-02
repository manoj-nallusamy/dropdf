'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getUploadHistory } from '@/lib/upload-history';

interface HeaderProps {
  showDashboardLink?: boolean;
}

export function Header({ showDashboardLink }: HeaderProps = {}) {
  const [hasUploads, setHasUploads] = useState(false);

  useEffect(() => {
    // Check localStorage for uploads
    const uploads = getUploadHistory();
    setHasUploads(uploads.length > 0);

    // Listen for new uploads
    const handleUploadSaved = () => {
      setHasUploads(true);
    };

    window.addEventListener('upload-saved', handleUploadSaved);
    return () => window.removeEventListener('upload-saved', handleUploadSaved);
  }, []);

  const shouldShowDashboard = showDashboardLink ?? hasUploads;

  return (
    <header className="relative py-6 px-4 backdrop-blur-sm bg-white/70 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/icon.png"
            alt="DropDF"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-2xl font-bold">
            <span className="text-blue-600">D<span className="lowercase">ro</span></span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">P</span>
            <span className="text-purple-600">DF</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          {shouldShowDashboard && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
          )}
          <a href="/#pricing" className="hidden sm:inline text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            Pricing
          </a>
          <a href="/#features" className="hidden sm:inline text-sm text-gray-600 hover:text-blue-600 transition-colors">
            Features
          </a>
          <a href="/#waitlist" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md">
            Join Waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
