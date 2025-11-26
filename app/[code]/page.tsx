import { notFound, redirect } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PDFViewer } from '@/components/pdf-viewer';
import { CONSTANTS } from '@/lib/constants';

interface PageProps {
  params: { code: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { data: pdf } = await supabase
    .from('pdfs')
    .select('original_filename')
    .eq('short_code', params.code)
    .single();

  if (!pdf) {
    return { title: 'PDF Not Found - DropDF' };
  }

  return {
    title: `${pdf.original_filename} - DropDF`,
    description: `View ${pdf.original_filename} on DropDF`,
  };
}

export default async function ViewerPage({ params }: PageProps) {
  const { code } = params;

  // Fetch PDF metadata
  const { data: pdf, error } = await supabase
    .from('pdfs')
    .select('*')
    .eq('short_code', code)
    .single();

  if (error || !pdf) {
    notFound();
  }

  // Check expiry
  if (new Date(pdf.expires_at) < new Date()) {
    redirect('/expired');
  }

  const pdfUrl = `/api/pdf/${code}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-gray-900">
            Drop<span className="text-blue-500">DF</span>
          </a>
          <a
            href="/"
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            Share your own PDF →
          </a>
        </div>
      </header>

      {/* PDF Viewer */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <PDFViewer url={pdfUrl} filename={pdf.original_filename} />
        </div>
      </section>

      {/* Branding */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            Shared with{' '}
            <a href="/" className="text-blue-500 hover:text-blue-600 font-medium">
              DropDF
            </a>
            {' '}- The fastest way to share PDFs
          </p>
        </div>
      </section>
    </main>
  );
}
