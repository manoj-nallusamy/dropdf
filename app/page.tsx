import Link from 'next/link';
import { UploadDropzone } from '@/components/upload-dropzone';
import { WaitlistForm } from '@/components/waitlist-form';
import { Header } from '@/components/header';

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" style={{ animationDelay: '1s' }} />

      <Header />

      {/* Hero Section */}
      <section className="relative py-4 sm:py-8 px-4">
        <div className="max-w-4xl mx-auto text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight leading-tight">
            Drop Your PDF, <span className="gradient-text">Share Instantly</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-3 sm:mb-4">
            DropDF makes PDF sharing effortless. Drop your file, get a link, share anywhere—no signup required.
          </p>
        </div>

        {/* Upload Dropzone */}
        <UploadDropzone />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-6 sm:py-12 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Ready for More?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Explore upcoming Pro & Business plans. <a href="#waitlist" className="text-blue-600 hover:text-blue-700 font-semibold underline">Join the waitlist</a> for early access
            </p>
          </div>

          {/* Mobile: Comparison Table */}
          <div className="md:hidden max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 border-b border-gray-200">
                <div className="text-xs font-semibold text-gray-600"></div>
                <div className="text-center">
                  <div className="text-sm font-bold text-gray-900">Free</div>
                  <div className="text-xs text-gray-500">$0</div>
                </div>
                <div className="text-center">
                  <div className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 font-bold rounded mx-auto w-fit mb-1">PRO</div>
                  <div className="text-sm font-bold text-gray-900">$5</div>
                  <div className="text-xs text-gray-500">/mo</div>
                </div>
                <div className="text-center">
                  <div className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 font-bold rounded mx-auto w-fit mb-1">BIZ</div>
                  <div className="text-sm font-bold text-gray-900">$19</div>
                  <div className="text-xs text-gray-500">/mo</div>
                </div>
              </div>

              {/* Feature Rows */}
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">Uploads</div>
                  <div className="text-center text-xs text-gray-600">3/week</div>
                  <div className="text-center text-xs text-gray-600">50/mo</div>
                  <div className="text-center text-xs font-semibold text-purple-600">∞</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">File size</div>
                  <div className="text-center text-xs text-gray-600">5MB</div>
                  <div className="text-center text-xs text-gray-600">50MB</div>
                  <div className="text-center text-xs text-gray-600">100MB</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">Storage</div>
                  <div className="text-center text-xs text-gray-600">—</div>
                  <div className="text-center text-xs text-gray-600">1GB</div>
                  <div className="text-center text-xs text-gray-600">10GB</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">Link expiry</div>
                  <div className="text-center text-xs text-gray-600">7 days</div>
                  <div className="text-center text-xs text-green-600">Never</div>
                  <div className="text-center text-xs text-green-600">Never</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">Password</div>
                  <div className="text-center text-red-400">✕</div>
                  <div className="text-center text-blue-500">✓</div>
                  <div className="text-center text-purple-600">✓</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">Analytics</div>
                  <div className="text-center text-red-400">✕</div>
                  <div className="text-center text-xs text-blue-600">Basic</div>
                  <div className="text-center text-xs text-purple-600">Advanced</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">Branding</div>
                  <div className="text-center text-xs text-gray-500">DropDF</div>
                  <div className="text-center text-xs text-blue-600">None</div>
                  <div className="text-center text-xs text-purple-600">None</div>
                </div>
                <div className="grid grid-cols-4 gap-2 p-3 items-center">
                  <div className="text-xs text-gray-700 font-medium">Domain</div>
                  <div className="text-center text-red-400">✕</div>
                  <div className="text-center text-red-400">✕</div>
                  <div className="text-center text-purple-600">✓</div>
                </div>
              </div>

              {/* CTA Row */}
              <div className="grid grid-cols-4 gap-2 p-3 bg-gray-50 border-t border-gray-200">
                <div></div>
                <button className="text-xs py-2 px-2 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200 transition-colors">
                  Start
                </button>
                <a href="#waitlist" className="text-xs py-2 px-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors text-center">
                  Join
                </a>
                <a href="#waitlist" className="text-xs py-2 px-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition-colors text-center">
                  Join
                </a>
              </div>
            </div>
          </div>

          {/* Desktop: Card View */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Free Tier */}
            <div className="relative bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-gray-300 transition-all">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Free</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500">/forever</span>
                </div>
                <p className="text-sm text-gray-600">Perfect for quick temporary shares</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>3 uploads</strong> per week</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Up to <strong>5MB</strong> per file</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Links expire in 7 days</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Instant shareable links</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Built-in PDF viewer</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">DropDF branding on viewer</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-400">No password protection</span>
                </li>
              </ul>
              <button className="w-full py-3 px-4 bg-gray-100 text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                Start Free
              </button>
            </div>

            {/* Pro Tier */}
            <div className="relative bg-white rounded-2xl border-2 border-blue-200 p-6 hover:border-blue-300 hover:shadow-xl transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full">
                  POPULAR
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">$5</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600">For individuals and freelancers</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>50 PDFs</strong> per month</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Up to <strong>50MB</strong> per file</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>1GB</strong> total storage</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Links never expire</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">No DropDF branding</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Password protection</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Basic analytics</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Email support</span>
                </li>
              </ul>
              <a href="#waitlist" className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all text-center shadow-lg shadow-blue-500/30">
                Join Waitlist
              </a>
            </div>

            {/* Business Tier */}
            <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-300 p-6 hover:border-purple-400 hover:shadow-2xl transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold rounded-full">
                  BEST VALUE
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Business</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-600">For businesses and teams</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>Unlimited</strong> PDFs</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Up to <strong>100MB</strong> per file</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>10GB</strong> total storage</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Links never expire</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">No DropDF branding</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Custom domain</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Password + expiry control</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Priority support</span>
                </li>
              </ul>
              <a href="#waitlist" className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all text-center shadow-lg shadow-purple-500/30">
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-6 sm:py-10 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Key Features
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Simple, powerful, and secure PDF sharing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: '⚡',
                title: 'Instant Sharing',
                description: 'Upload and share PDFs in seconds with shareable links.',
                color: 'from-yellow-400 to-orange-500',
                tier: 'free',
              },
              {
                icon: '🔒',
                title: 'Private & Secure',
                description: 'No signup required. Files auto-delete after 7 days.',
                color: 'from-green-400 to-emerald-500',
                tier: 'free',
              },
              {
                icon: '👁️',
                title: 'Built-in Viewer',
                description: 'Recipients view PDFs instantly in any browser.',
                color: 'from-cyan-400 to-blue-500',
                tier: 'free',
              },
              {
                icon: '🔐',
                title: 'Password Protection',
                description: 'Secure PDFs with password access control.',
                color: 'from-indigo-400 to-purple-500',
                tier: 'pro',
              },
              {
                icon: '📊',
                title: 'Analytics & Insights',
                description: 'Track views, downloads, and engagement metrics.',
                color: 'from-blue-400 to-cyan-500',
                tier: 'pro',
              },
              {
                icon: '🌐',
                title: 'Custom Branding',
                description: 'White-label viewer and custom domain support.',
                color: 'from-purple-400 to-fuchsia-500',
                tier: 'business',
              },
            ].map((feature) => (
              <div key={feature.title} className="feature-card group relative flex items-start gap-3 sm:gap-4">
                <div className={`flex-shrink-0 p-2 sm:p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                  <span className="text-2xl sm:text-3xl">{feature.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    {feature.tier === 'pro' && (
                      <span className="text-xs font-bold px-1.5 sm:px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">PRO</span>
                    )}
                    {feature.tier === 'business' && (
                      <span className="text-xs font-bold px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full">BIZ</span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-6 sm:py-10 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              How DropDF Works
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Share any PDF in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" style={{ top: '3rem' }} />

            {[
              {
                step: '1',
                title: 'Drop Your PDF',
                description: 'Drop your PDF file or click to browse. DropDF accepts files up to 5MB.',
                icon: '📤',
              },
              {
                step: '2',
                title: 'DropDF Creates Your Link',
                description: 'DropDF generates an instant shareable link. Copy it with one click.',
                icon: '🔗',
              },
              {
                step: '3',
                title: 'Share Your DropDF Link',
                description: 'Share your DropDF link via email, chat, or social media. Recipients can view it instantly.',
                icon: '🚀',
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative inline-block mb-3 sm:mb-6">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl sm:text-4xl font-bold mx-auto shadow-lg shadow-blue-500/30 transform hover:scale-110 transition-transform">
                    <span className="absolute top-1 right-1 text-xs sm:text-sm bg-white text-blue-600 rounded-full w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center font-bold">
                      {item.step}
                    </span>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-3">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-4 sm:py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              {
                icon: '💼',
                title: 'Business Proposals',
                points: ['Share client proposals instantly', 'Track who viewed your pitch', 'Password-protect sensitive deals']
              },
              {
                icon: '📊',
                title: 'Presentations',
                points: ['Share decks after meetings', 'No email attachment limits', 'Works on any device']
              },
              {
                icon: '📄',
                title: 'Resumes & CVs',
                points: ['Send to recruiters quickly', 'Always accessible online', 'Professional link sharing']
              },
              {
                icon: '📝',
                title: 'Contracts',
                points: ['Secure document sharing', 'No file corruption', 'Easy signature workflows']
              },
              {
                icon: '🎓',
                title: 'Academic Papers',
                points: ['Share research instantly', 'Collaborate with peers', 'No storage limits (Pro)']
              },
              {
                icon: '📋',
                title: 'Meeting Agendas',
                points: ['Send before meetings', 'Everyone stays aligned', 'Update in real-time']
              },
              {
                icon: '🎨',
                title: 'Event Flyers',
                points: ['Promote events easily', 'Share on social media', 'Track engagement (Pro)']
              },
              {
                icon: '🍽️',
                title: 'Restaurant Menus',
                points: ['QR code friendly', 'Update menu anytime', 'No printing costs']
              },
              {
                icon: '📦',
                title: 'Product Catalogs',
                points: ['Share inventory updates', 'Works for B2B sales', 'Professional presentation']
              },
            ].map((useCase) => (
              <div key={useCase.title} className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="text-2xl sm:text-3xl">{useCase.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">{useCase.title}</h3>
                    <ul className="space-y-1">
                      {useCase.points.map((point, idx) => (
                        <li key={idx} className="text-sm sm:text-base text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-1.5 flex-shrink-0">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA Section */}
      <section id="waitlist" className="relative py-8 sm:py-12 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-3 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">
            <span className="text-xs sm:text-sm font-semibold">🚀 Early Access Program</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">
            Join 1,000+ Companies<br />on the Waitlist
          </h2>

          <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Be among the first to unlock Pro and Business features when we launch. Get exclusive early access pricing and priority onboarding.
          </p>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-white/20 max-w-2xl mx-auto">
            <WaitlistForm />

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">50%</div>
                <div className="text-xs sm:text-sm text-blue-100">Early discount</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">14 days</div>
                <div className="text-xs sm:text-sm text-blue-100">Free trial</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold mb-0.5 sm:mb-1">Priority</div>
                <div className="text-xs sm:text-sm text-blue-100">Support</div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-blue-100 font-medium">No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-blue-100 font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-blue-100 font-medium">Email updates</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Everything you need to know about DropDF
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                How long do PDF links stay active?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Free tier links remain active for 7 days. After that, files are automatically deleted for your privacy. Pro and Business plans offer links that never expire.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Can I password protect my PDF?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Password protection is available on Pro and Business plans. You can secure your PDFs with password access control to ensure only authorized recipients can view them.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                What happens to my PDF after I upload it?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Your PDF is stored securely in cloud storage. Only people with the exact link can access it. Free tier files are automatically deleted after 7 days for your privacy.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Can I track who views my PDF?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Yes! View tracking and analytics are available on Pro and Business plans. You'll be able to see when and how many times your PDF was opened, along with detailed engagement metrics on Business plans.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Is there a file size limit?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Yes. Free tier supports files up to 5MB. Pro plan allows up to 50MB per file, and Business plan supports up to 100MB per file.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <Link href="/" className="text-2xl font-bold inline-block mb-2 group">
                <span className="text-blue-600">D<span className="lowercase">ro</span></span>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">P</span>
                <span className="text-purple-600">DF</span>
              </Link>
              <p className="text-gray-500 text-sm max-w-xs">
                DropDF makes PDF sharing effortless.
                Drop it. Link it. Share it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex gap-6">
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 DropDF. Built with ❤️ for easy PDF sharing.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
