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
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer
          transition-all duration-300 ease-out group
          ${isDragActive
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-[1.02] shadow-xl'
            : 'border-gray-300 bg-white/80 backdrop-blur-sm hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/50 hover:shadow-lg'
          }
          ${uploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-gray-700 font-semibold text-lg">Uploading your PDF...</p>
              <p className="text-gray-500 text-sm mt-1">This will only take a moment</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            {/* Upload icon */}
            <div className={`
              relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300
              ${isDragActive
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg scale-110'
                : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:scale-110'
              }
            `}>
              <svg
                className={`w-10 h-10 transition-colors ${isDragActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {isDragActive && (
                <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping" />
              )}
            </div>

            {/* Text */}
            <div>
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {isDragActive ? '✨ Drop your PDF here' : 'Drop your PDF or click to browse'}
              </p>
              <p className="text-gray-600">
                Maximum file size: <span className="font-semibold text-gray-700">{formatFileSize(CONSTANTS.MAX_FILE_SIZE)}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                📄 PDF files only • 🕐 24-hour storage • 🔒 Secure upload
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error messages */}
      {(error || rejectionError) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-700 font-medium">
              {error || rejectionError}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
