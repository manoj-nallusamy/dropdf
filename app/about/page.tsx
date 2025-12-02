import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About DropDF - Contact Us',
  description: 'Learn about DropDF and get in touch with us.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-4 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-xl font-bold group">
            <span className="text-blue-600">D<span className="lowercase">ro</span></span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">P</span>
            <span className="text-purple-600">DF</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About DropDF</h1>
        <p className="text-gray-500 mb-8">Simple, powerful PDF sharing for everyone</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is DropDF?</h2>
            <p className="text-gray-600 mb-4">
              DropDF is a simple and powerful PDF sharing service that makes it effortless to share documents online. Upload your PDF, get an instant shareable link, and share it anywhere—no signup required for basic use.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you&apos;re sharing business proposals, resumes, presentations, or any other PDF document, DropDF provides a fast, secure, and user-friendly solution. Our built-in PDF viewer ensures recipients can view your documents instantly without downloading additional software.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We believe that sharing documents should be simple and accessible to everyone. DropDF eliminates the hassle of email attachments, file size limits, and complex sharing workflows. Our goal is to provide the easiest way to share PDFs online while maintaining privacy and security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Founder</h2>
            <p className="text-gray-600 mb-4">
              DropDF is created by Manoj, a developer based in Bengaluru, India. The service was born out of a personal need for a simpler way to share PDF documents without the limitations of traditional file-sharing methods.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              We&apos;d love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out:
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <a href="mailto:support@dropdf.com" className="text-blue-600 hover:text-blue-700 font-medium text-lg">
                    support@dropdf.com
                  </a>
                  <p className="text-sm text-gray-600 mt-2">
                    For support inquiries, refund requests, feature suggestions, or general questions
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600">
                    Bengaluru, India
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We&apos;re Working On</h2>
            <p className="text-gray-600 mb-4">
              We&apos;re continuously improving DropDF and adding new features. Coming soon:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Pro Plan:</strong> Larger file sizes, permanent links, password protection, and analytics</li>
              <li><strong>Business Plan:</strong> Unlimited uploads, custom domains, advanced analytics, and priority support</li>
              <li><strong>Enhanced Security:</strong> Additional encryption and privacy features</li>
              <li><strong>API Access:</strong> Integrate DropDF into your own applications</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Want to be notified when these features launch? <Link href="/#waitlist" className="text-blue-600 hover:text-blue-700 font-semibold underline">Join our waitlist</Link>!
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I report abuse or copyright violations?</h3>
                <p className="text-gray-600">
                  Please email us at support@dropdf.com with details about the content and the link. We take copyright violations seriously and will investigate promptly.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use DropDF for commercial purposes?</h3>
                <p className="text-gray-600">
                  Yes! DropDF can be used for personal and commercial purposes. For high-volume business use, consider our upcoming Business plan with enhanced features and support.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer custom enterprise solutions?</h3>
                <p className="text-gray-600">
                  We&apos;re exploring enterprise options. If you&apos;re interested, please reach out to support@dropdf.com to discuss your requirements.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8 p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
            <h2 className="text-2xl font-bold mb-3">We&apos;d Love to Hear From You!</h2>
            <p className="text-blue-100 mb-4">
              Whether you have questions, suggestions, or just want to say hi, don&apos;t hesitate to reach out. Your feedback helps us make DropDF better for everyone.
            </p>
            <a
              href="mailto:support@dropdf.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send us an email
            </a>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
