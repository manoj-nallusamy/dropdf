'use client';

import { useEffect, useRef, useState } from 'react';

interface PDFViewerProps {
  url: string;
  filename: string;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.25;

export function PDFViewer({ url, filename }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.0);
  const [fitToScreenZoom, setFitToScreenZoom] = useState(1.0);

  const zoomIn = () => setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  const zoomOut = () => setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  const resetZoom = () => setZoom(fitToScreenZoom);

  useEffect(() => {
    const loadPDF = async () => {
      if (!containerRef.current) return;

      try {
        setError(null);

        // Dynamically import pdfjs only on client-side
        const pdfjs = await import('pdfjs-dist');

        // Set worker path
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

        const pdf = await pdfjs.getDocument(url).promise;

        // Calculate fit-to-screen zoom on first load
        if (zoom === 1.0 && containerRef.current) {
          const firstPage = await pdf.getPage(1);
          const viewport = firstPage.getViewport({ scale: 1.0 });
          const containerWidth = containerRef.current.clientWidth - 32; // Account for padding
          const calculatedZoom = Math.min(containerWidth / viewport.width, 2.5);
          setFitToScreenZoom(calculatedZoom);
          setZoom(calculatedZoom);
          return; // Re-render will happen with new zoom
        }

        // Create a temporary container to render before swapping
        const tempContainer = document.createElement('div');

        // Render all pages to temp container with high DPI
        const outputScale = window.devicePixelRatio || 1;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);

          const viewport = page.getViewport({ scale: zoom });

          const canvas = document.createElement('canvas');
          canvas.className = 'mx-auto mb-4 shadow-lg rounded';

          // Set canvas size with device pixel ratio for crisp rendering
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = Math.floor(viewport.width) + 'px';
          canvas.style.height = Math.floor(viewport.height) + 'px';

          const context = canvas.getContext('2d');
          if (!context) continue;

          const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

          await page.render({
            canvasContext: context,
            canvas,
            viewport,
            ...(transform && { transform }),
          }).promise;

          tempContainer.appendChild(canvas);
        }

        // Swap content all at once to avoid flicker
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          Array.from(tempContainer.children).forEach(child => {
            containerRef.current?.appendChild(child);
          });
        }

        setLoading(false);
      } catch (err) {
        console.error('PDF load error:', err);
        setError('Failed to load PDF');
        setLoading(false);
      }
    };

    loadPDF();
  }, [url, zoom, loading]);

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
    <div className="w-full h-screen flex flex-col">
      {/* Controls Bar - Always visible except on initial load */}
      {!loading && (
        <div className="flex items-center justify-between p-2 bg-white border-b border-gray-200">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Zoom Out"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            </button>

            <span className="px-2 py-1 text-xs font-medium text-gray-700 min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Zoom In"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={resetZoom}
              className="px-2 py-1 text-gray-700 text-xs font-medium hover:bg-gray-100 transition-colors"
              title="Reset Zoom"
            >
              Fit
            </button>
          </div>

          {/* Download Button */}
          <a
            href={url}
            download={filename}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </a>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Loading PDF...</p>
          </div>
        </div>
      )}

      {/* PDF pages container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto bg-gray-100 p-2"
      />
    </div>
  );
}
