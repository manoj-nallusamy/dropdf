import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - DropDF',
  description: 'Learn how DropDF protects your privacy and handles your PDF documents.',
};

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: November 27, 2025</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 mb-4">
              At DropDF, we take your privacy seriously. This policy explains how we collect, use, and protect
              your information when you use our PDF sharing service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">PDF Files</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>When you upload a PDF, we temporarily store it on our secure servers</li>
              <li>Free tier files are automatically deleted after 7 days</li>
              <li>We do not scan, read, or analyze the content of your PDFs</li>
              <li>File names and sizes are stored for operational purposes</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Usage Data</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>View counts for shared links</li>
              <li>Upload timestamps and expiry dates</li>
              <li>Anonymous analytics to improve our service</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Waitlist Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Email addresses provided for waitlist signup</li>
              <li>Used only for product updates and feature announcements</li>
              <li>Never shared with third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To provide PDF hosting and sharing services</li>
              <li>To generate and manage shareable links</li>
              <li>To track basic analytics (view counts)</li>
              <li>To communicate with waitlist subscribers about new features</li>
              <li>To improve our service and user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Encrypted connections (HTTPS/SSL)</li>
              <li>Secure cloud storage with Cloudflare R2</li>
              <li>Database security with Supabase</li>
              <li>Automatic file deletion after 7 days for free tier</li>
              <li>No permanent storage of file contents</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or rent your personal information. Your data is only shared:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>When you create a shareable link (intentional sharing)</li>
              <li>With service providers necessary to operate our platform (Cloudflare, Supabase)</li>
              <li>When required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Processing</h2>
            <p className="text-gray-600 mb-4">
              When you purchase a paid plan (Pro or Business), payment processing is handled by our Merchant of Record, Dodo Payments. Dodo Payments collects and processes payment information on our behalf, including billing details and tax compliance. Please refer to Dodo Payments&apos; privacy policy for details on how they handle your payment data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Know what data we collect about you</li>
              <li>Request deletion of your waitlist email</li>
              <li>Opt out of communications at any time</li>
              <li>Know that your uploaded files are automatically deleted after 7 days (free tier)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use minimal tracking:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Essential cookies for service functionality</li>
              <li>Anonymous analytics to understand usage patterns</li>
              <li>No third-party advertising cookies</li>
              <li>No cross-site tracking</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-600">
              DropDF is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify users of significant
              changes by updating the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this privacy policy or how we handle your data, please contact
              us through our website.
            </p>
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
