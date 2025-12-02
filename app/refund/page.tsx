import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - DropDF',
  description: 'Learn about DropDF refund policy and money-back guarantee. 7-day money-back guarantee on all paid plans. Easy refund process.',
  openGraph: {
    title: 'Refund Policy - DropDF',
    description: '7-day money-back guarantee on all paid plans. Easy refund process.',
    url: 'https://dropdf.com/refund',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy - DropDF',
    description: '7-day money-back guarantee on all paid plans. Easy refund process.',
  },
};

export default function RefundPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: November 29, 2024</p>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7-Day Money-Back Guarantee</h2>
            <p className="text-gray-600 mb-4">
              We offer a 7-day money-back guarantee on all paid plans (Pro and Business). If you&apos;re not satisfied with DropDF, contact us within 7 days of purchase for a full refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What&apos;s Covered</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>All Pro plan subscriptions ($5/month)</li>
              <li>All Business plan subscriptions ($19/month)</li>
              <li>Both monthly and annual billing cycles</li>
            </ul>
            <p className="text-gray-600 mt-4">
              <strong>Note:</strong> The free tier does not require payment, so refunds do not apply.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Request a Refund</h2>
            <p className="text-gray-600 mb-4">
              To request a refund, please email us at:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-900 font-semibold">support@dropdf.com</p>
            </div>
            <p className="text-gray-600 mb-4">
              Please include in your refund request:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Your email address used for the subscription</li>
              <li>The date of purchase</li>
              <li>Reason for refund (optional, but helps us improve)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Processing</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Refund requests are processed within 2-3 business days</li>
              <li>Refunds are issued to the original payment method</li>
              <li>It may take 5-10 business days for the refund to appear in your account, depending on your bank or payment provider</li>
              <li>Once a refund is issued, your subscription will be cancelled immediately</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Merchant of Record</h2>
            <p className="text-gray-600 mb-4">
              Payments are processed by Dodo Payments, who acts as the Merchant of Record for all transactions. Dodo Payments handles billing, payment disputes, and refund processing.
            </p>
            <p className="text-gray-600">
              For payment-related questions or issues with processing your refund, you may contact Dodo Payments support or reach out to us directly at support@dropdf.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">After the 7-Day Period</h2>
            <p className="text-gray-600 mb-4">
              After the 7-day guarantee period has passed, refunds are handled on a case-by-case basis. If you experience technical issues or problems with the service, please contact us at support@dropdf.com and we&apos;ll work with you to resolve the issue.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cancellations</h2>
            <p className="text-gray-600 mb-4">
              You can cancel your subscription at any time. If you cancel:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>You will continue to have access to paid features until the end of your current billing period</li>
              <li>You will not be charged for the next billing cycle</li>
              <li>Your files will remain accessible according to your plan&apos;s storage limits until the subscription ends</li>
            </ul>
          </section>

          <section className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Questions?</strong> If you have any questions about our refund policy, please don&apos;t hesitate to contact us at support@dropdf.com. We&apos;re here to help!
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
