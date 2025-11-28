import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { PDFViewer } from '@/components/pdf-viewer';

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params;
  const { data: pdf } = await supabase
    .from('pdfs')
    .select('original_filename')
    .eq('short_code', code)
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
  const { code } = await params;

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
    <main className="min-h-screen bg-gray-50 relative">
      {/* PDF Viewer */}
      <PDFViewer url={pdfUrl} filename={pdf.original_filename} />

      {/* Branding Banner - Bottom center on mobile, bottom right on desktop */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 bg-white border-2 border-gray-200 rounded-xl shadow-lg p-3 sm:p-4 sm:max-w-xs z-50">
        <div className="flex items-center justify-between sm:flex-col sm:items-start gap-3">
          <div className="flex-1">
            <Link href="/" className="text-base sm:text-lg font-bold hover:text-blue-600 transition-colors inline-block mb-1">
              <span className="text-blue-600">D<span className="lowercase">ro</span></span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">P</span>
              <span className="text-purple-600">DF</span>
            </Link>
            <p className="text-xs text-gray-500 hidden sm:block mb-2">
              DropDF makes PDF sharing effortless
            </p>
          </div>
          <Link
            href="/"
            className="px-3 py-1.5 sm:w-full sm:text-center sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md whitespace-nowrap"
          >
            Share PDF
          </Link>
        </div>
      </div>
    </main>
  );
}
