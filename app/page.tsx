import { UploadDropzone } from '@/components/upload-dropzone';
import { WaitlistForm } from '@/components/waitlist-form';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900">
            Drop<span className="text-blue-500">DF</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Share PDFs instantly.
            <br />
            <span className="text-blue-500">No signup required.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Drop a PDF, get a shareable link in seconds.
            The fastest way to share documents online.
          </p>
        </div>

        {/* Upload Dropzone */}
        <UploadDropzone />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Why DropDF?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Instant Links',
                description: 'Upload and get a shareable link in under 5 seconds. No waiting.',
              },
              {
                icon: '🔒',
                title: 'No Account Needed',
                description: 'Start sharing immediately. No signup, no email verification.',
              },
              {
                icon: '📱',
                title: 'Works Everywhere',
                description: 'Your links work on any device. Desktop, tablet, or mobile.',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Want more features?
          </h2>
          <p className="text-gray-600 mb-8">
            Unlimited uploads, password protection, analytics, and custom domains.
            Join the waitlist for early access.
          </p>

          <WaitlistForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 DropDF. Made for fast PDF sharing.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
              Terms
            </a>
            <a href="https://twitter.com/dropdf" className="text-gray-500 hover:text-gray-700 text-sm">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
