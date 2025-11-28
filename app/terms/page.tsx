import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - DropDF',
  description: 'Read the terms and conditions for using DropDF PDF sharing service.',
};

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: November 27, 2025</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using DropDF (&quot;Service&quot;), you agree to be bound by these Terms of Service
              (&quot;Terms&quot;). If you disagree with any part of these terms, you may not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-600 mb-4">
              DropDF provides a free PDF sharing service that allows users to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Upload up to 3 PDF files per week (free tier)</li>
              <li>Upload PDF files up to 5MB each</li>
              <li>Generate shareable links for uploaded files</li>
              <li>Share PDFs without requiring an account</li>
              <li>View shared PDFs through our web interface</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
            <p className="text-gray-600 mb-4">You agree NOT to use DropDF to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Upload illegal, harmful, or offensive content</li>
              <li>Share copyrighted materials without permission</li>
              <li>Distribute malware, viruses, or malicious code</li>
              <li>Upload content that violates others&apos; privacy</li>
              <li>Share sexually explicit or adult content</li>
              <li>Harass, threaten, or harm others</li>
              <li>Engage in spam or phishing activities</li>
              <li>Abuse or overload our systems</li>
              <li>Attempt to breach security measures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">File Storage and Deletion</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Free tier: uploaded files are automatically deleted after 7 days</li>
              <li>Pro/Business tiers: files stored permanently (links never expire)</li>
              <li>We reserve the right to delete files earlier if they violate these Terms</li>
              <li>You should maintain your own backups of important files</li>
              <li>We are not responsible for any lost or deleted files</li>
              <li>Free tier links expire after 7 days and cannot be recovered</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Ownership</h2>
            <p className="text-gray-600 mb-4">
              You retain all rights to the content you upload. By uploading content, you grant DropDF a
              limited license to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Store and display your PDFs for the duration of the link&apos;s validity</li>
              <li>Generate shareable links and previews</li>
              <li>Provide the service as described</li>
            </ul>
            <p className="text-gray-600 mt-4">
              For free tier users, this license ends when your file is automatically deleted after 7 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-4">
              DropDF is provided &quot;as is&quot; without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Uninterrupted or error-free service</li>
              <li>Permanent storage of any files</li>
              <li>Security against unauthorized access</li>
              <li>Accuracy or reliability of the service</li>
              <li>Fitness for any particular purpose</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law, DropDF and its operators shall not be liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Lost profits, data, or opportunities</li>
              <li>Damages resulting from unauthorized access to your files</li>
              <li>Service interruptions or data loss</li>
              <li>Actions of third parties who access your shared links</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-600">
              You agree to indemnify and hold harmless DropDF from any claims, damages, or expenses
              arising from your use of the Service, your uploaded content, or your violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Modifications</h2>
            <p className="text-gray-600">
              We reserve the right to modify, suspend, or discontinue the Service at any time without
              notice. We may also update these Terms periodically. Continued use of the Service after
              changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Terminate or suspend access for violations of these Terms</li>
              <li>Remove content that violates our policies</li>
              <li>Ban users who abuse the service</li>
              <li>Take legal action for serious violations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Copyright and DMCA</h2>
            <p className="text-gray-600 mb-4">
              We respect intellectual property rights. If you believe content on DropDF infringes your
              copyright, please contact us with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>A description of the copyrighted work</li>
              <li>The URL of the infringing content</li>
              <li>Your contact information</li>
              <li>A statement of good faith belief that use is unauthorized</li>
              <li>A statement of accuracy under penalty of perjury</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-600">
              These Terms are governed by and construed in accordance with applicable laws, without
              regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-600">
              For questions about these Terms, please contact us through our website.
            </p>
          </section>

          <section className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> By using DropDF, you acknowledge that you have read, understood,
              and agree to be bound by these Terms of Service and our Privacy Policy.
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
