'use client';

import { Header } from '@/components/header';
import { UploadDropzone } from '@/components/upload-dropzone';
import { UploadHistory } from '@/components/upload-history';
import { WaitlistBanner } from '@/components/waitlist-banner';

export default function DashboardPage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" style={{ animationDelay: '1s' }} />

      <Header showDashboardLink={true} />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 relative">
        {/* Section 1: Upload Dropzone */}
        <section id="upload">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Upload New PDF
          </h2>
          <UploadDropzone />
        </section>

        {/* Section 2: Upload History */}
        <section id="history">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your Uploads
            </h2>
            <p className="text-sm text-gray-500">
              Files are automatically deleted after 7 days
            </p>
          </div>
          <UploadHistory />
        </section>

        {/* Section 3: Waitlist Banner */}
        <section id="upgrade">
          <WaitlistBanner />
        </section>
      </div>

      {/* Footer */}
      <footer className="relative py-8 px-4 mt-12 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 DropDF. Built with ❤️ for easy PDF sharing.
          </p>
        </div>
      </footer>
    </main>
  );
}
