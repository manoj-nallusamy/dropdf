import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      {/* Header */}
      <header className="relative py-6 px-4 backdrop-blur-sm bg-white/70 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-2xl font-bold group inline-block">
            <span className="text-blue-600">D<span className="lowercase">ro</span></span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">P</span>
            <span className="text-purple-600">DF</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="text-center max-w-2xl">
          {/* Icon */}
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-gray-500/30 -rotate-3 transform hover:rotate-0 transition-transform">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-purple-400 rounded-full blur-xl opacity-50"></div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            PDF Not Found
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 mb-3 leading-relaxed max-w-xl mx-auto">
            This PDF doesn&apos;t exist or may have been removed.
          </p>
          <p className="text-sm sm:text-base text-gray-500 mb-8 leading-relaxed max-w-xl mx-auto">
            Double-check the link or ask the sender for a new one.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Share Your PDF
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
          </div>

          {/* Info Box */}
          <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg max-w-lg mx-auto">
            <div className="flex items-start gap-4 text-left">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Common reasons:</h3>
                <ul className="text-sm text-gray-600 leading-relaxed space-y-1">
                  <li>• The link may have expired (free links last 7 days)</li>
                  <li>• The PDF was deleted by the owner</li>
                  <li>• There&apos;s a typo in the URL</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2024 DropDF. Built with ❤️ for easy PDF sharing.
          </p>
        </div>
      </footer>
    </main>
  );
}
