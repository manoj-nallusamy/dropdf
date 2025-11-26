'use client';

import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PDFViewerProps {
  url: string;
  filename: string;
}

export function PDFViewer({ url, filename }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPDF = async () => {
      if (!containerRef.current) return;

      try {
        setLoading(true);
        setError(null);

        const pdf = await pdfjs.getDocument(url).promise;
        setNumPages(pdf.numPages);

        // Clear container
        containerRef.current.innerHTML = '';

        // Render all pages
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          canvas.className = 'mx-auto mb-4 shadow-lg rounded';
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const context = canvas.getContext('2d');
          if (!context) continue;

          await page.render({
            canvasContext: context,
            viewport,
          }).promise;

          containerRef.current?.appendChild(canvas);
        }

        setLoading(false);
      } catch (err) {
        console.error('PDF load error:', err);
        setError('Failed to load PDF');
        setLoading(false);
      }
    };

    loadPDF();
  }, [url]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-50 rounded-xl">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <a
            href={url}
            download={filename}
            className="mt-4 inline-block text-blue-500 hover:text-blue-600"
          >
            Download PDF instead
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-500 font-bold text-xs">PDF</span>
          </div>
          <div>
            <p className="font-medium text-gray-800 truncate max-w-[200px] sm:max-w-none">
              {filename}
            </p>
            {numPages > 0 && (
              <p className="text-sm text-gray-500">{numPages} pages</p>
            )}
          </div>
        </div>

        <a
          href={url}
          download={filename}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
        >
          Download
        </a>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Loading PDF...</p>
          </div>
        </div>
      )}

      {/* PDF pages container */}
      <div
        ref={containerRef}
        className="bg-gray-100 rounded-xl p-4 overflow-auto max-h-[80vh]"
      />
    </div>
  );
}
