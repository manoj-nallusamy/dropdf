import { UploadDropzone } from '@/components/upload-dropzone';
import { WaitlistForm } from '@/components/waitlist-form';

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" style={{ animationDelay: '1s' }} />

      {/* Header */}
      <header className="relative py-6 px-4 backdrop-blur-sm bg-white/70 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold group">
            <span className="text-gray-900">Drop</span>
            <span className="gradient-text group-hover:scale-110 inline-block transition-transform">DF</span>
          </a>
          <div className="flex items-center gap-4">
            <a href="#how-it-works" className="hidden sm:inline text-sm text-gray-600 hover:text-blue-600 transition-colors">
              How it works
            </a>
            <a href="#features" className="hidden sm:inline text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full">
            <span className="text-sm font-medium text-blue-600">✨ No signup required • Free forever</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Share PDF Files
            <br />
            <span className="gradient-text">Instantly</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            The fastest way to share PDF documents online. Drop a file, get a shareable link in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>5MB per file</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24h storage</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant links</span>
            </div>
          </div>
        </div>

        {/* Upload Dropzone */}
        <UploadDropzone />
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share PDF documents without the hassle. No accounts, no complicated setup—just upload and share.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast Upload',
                description: 'Upload PDFs up to 5MB and get a shareable link in under 5 seconds. Optimized for speed and reliability.',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: '🔒',
                title: 'Privacy Focused',
                description: 'No account creation, no tracking. Your documents are automatically deleted after 24 hours for security.',
                color: 'from-green-400 to-emerald-500',
              },
              {
                icon: '📱',
                title: 'Universal Compatibility',
                description: 'Share links that work everywhere—desktop, mobile, tablet. Recipients can view PDFs in any browser.',
                color: 'from-blue-400 to-indigo-500',
              },
              {
                icon: '🔗',
                title: 'Clean Short Links',
                description: 'Get simple, memorable links that are easy to share via email, chat, or social media.',
                color: 'from-purple-400 to-pink-500',
              },
              {
                icon: '👁️',
                title: 'Built-in PDF Viewer',
                description: 'Recipients can view PDFs instantly in their browser without downloading anything.',
                color: 'from-cyan-400 to-blue-500',
              },
              {
                icon: '⬇️',
                title: 'Easy Downloads',
                description: 'One-click download option for anyone who needs to save the PDF to their device.',
                color: 'from-rose-400 to-red-500',
              },
            ].map((feature) => (
              <div key={feature.title} className="feature-card group">
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Three simple steps to share your PDF
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" style={{ top: '3rem' }} />

            {[
              {
                step: '1',
                title: 'Upload Your PDF',
                description: 'Drag and drop your PDF file or click to browse. Files up to 5MB accepted.',
                icon: '📤',
              },
              {
                step: '2',
                title: 'Get Your Link',
                description: 'Receive an instant shareable link. Copy it with one click.',
                icon: '🔗',
              },
              {
                step: '3',
                title: 'Share Anywhere',
                description: 'Send your link via email, chat, or social media. Anyone can view it instantly.',
                icon: '🚀',
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-4xl font-bold mx-auto shadow-lg shadow-blue-500/30 transform hover:scale-110 transition-transform">
                    <span className="absolute top-1 right-1 text-sm bg-white text-blue-600 rounded-full w-7 h-7 flex items-center justify-center font-bold">
                      {item.step}
                    </span>
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect For Every Use Case
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a professional, student, or just need to share a document quickly, DropDF has you covered.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '💼', text: 'Quick document sharing' },
              { icon: '📊', text: 'Client presentations' },
              { icon: '📄', text: 'Resume distribution' },
              { icon: '📝', text: 'Contract reviews' },
              { icon: '🎓', text: 'Academic papers' },
              { icon: '📋', text: 'Meeting agendas' },
              { icon: '🎨', text: 'Event flyers' },
              { icon: '📦', text: 'Product catalogs' },
            ].map((useCase) => (
              <div key={useCase.text} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="text-2xl">{useCase.icon}</div>
                <p className="text-gray-700 font-medium">{useCase.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-2xl mx-auto">
          <div className="card p-10 text-center">
            <div className="inline-block p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Want Pro Features?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Get unlimited uploads, password protection, analytics, custom domains, and more.
              <br />
              <span className="text-sm text-blue-600 font-medium">Join the waitlist for early access →</span>
            </p>

            <WaitlistForm />

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Unlimited uploads</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No expiry</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <a href="/" className="text-2xl font-bold inline-block mb-2 group">
                <span className="text-gray-900">Drop</span>
                <span className="gradient-text group-hover:scale-110 inline-block transition-transform">DF</span>
              </a>
              <p className="text-gray-500 text-sm max-w-xs">
                The fastest way to share PDF documents online.
                Simple, secure, and free.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex gap-6">
                <a href="/privacy" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                  Privacy
                </a>
                <a href="/terms" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 DropDF. Built with ❤️ for easy PDF sharing.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
