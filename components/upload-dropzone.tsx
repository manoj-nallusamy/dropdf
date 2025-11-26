'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { LinkDisplay } from './link-display';
import { CONSTANTS } from '@/lib/constants';
import { formatFileSize } from '@/lib/utils';

interface UploadResult {
  url: string;
  filename: string;
  size: number;
  expiresAt: string;
}

export function UploadDropzone() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: CONSTANTS.MAX_FILE_SIZE,
  });

  const reset = () => {
    setResult(null);
    setError(null);
  };

  // Show success state
  if (result) {
    return <LinkDisplay result={result} onReset={reset} />;
  }

  // File rejection errors
  const rejectionError = fileRejections[0]?.errors[0]?.message;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-200 ease-out
          ${isDragActive
            ? 'border-blue-500 bg-blue-50 scale-[1.02]'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${uploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 font-medium">Uploading your PDF...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {/* Upload icon */}
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
              ${isDragActive ? 'bg-blue-100' : 'bg-gray-100'}
            `}>
              <svg
                className={`w-8 h-8 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            {/* Text */}
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragActive ? 'Drop your PDF here' : 'Drop a PDF or click to upload'}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Max {formatFileSize(CONSTANTS.MAX_FILE_SIZE)} • Link expires in 24 hours
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error messages */}
      {(error || rejectionError) && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center">
            {error || rejectionError}
          </p>
        </div>
      )}
    </div>
  );
}
