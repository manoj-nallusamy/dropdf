'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Turnstile } from '@marsidev/react-turnstile';
import { LinkDisplay } from './link-display';
import { CONSTANTS } from '@/lib/constants';
import { formatFileSize } from '@/lib/utils';
import { saveUpload } from '@/lib/upload-history';

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string>('');

  // Generate or load device ID and Turnstile token on mount
  useEffect(() => {
    // Get or create device ID
    let id = localStorage.getItem('dropdf_device_id');
    if (!id) {
      id = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
      localStorage.setItem('dropdf_device_id', id);
    }
    setDeviceId(id);

    // Load Turnstile token from sessionStorage
    const savedToken = sessionStorage.getItem('turnstile_token');
    if (savedToken) {
      setTurnstileToken(savedToken);
    }
  }, []);

  // Save token to sessionStorage when verification succeeds
  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
    sessionStorage.setItem('turnstile_token', token);
  }, []);

  // Clear token from sessionStorage on expiry
  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
    sessionStorage.removeItem('turnstile_token');
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!turnstileToken) {
      setError('Please complete the CAPTCHA verification');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('turnstileToken', turnstileToken);
    formData.append('deviceId', deviceId);

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

      // Save to localStorage
      saveUpload({
        shortCode: data.shortCode,
        filename: data.filename,
        url: data.url,
        expiresAt: data.expiresAt,
        fileSize: data.size,
      });

      // Notify header to show dashboard link
      window.dispatchEvent(new CustomEvent('upload-saved'));

      // Reset CAPTCHA after successful upload
      setTurnstileToken(null);
      sessionStorage.removeItem('turnstile_token');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [turnstileToken, deviceId]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: CONSTANTS.MAX_FILE_SIZE,
  });

  const reset = () => {
    setResult(null);
    setError(null);
    setTurnstileToken(null);
  };

  // Show success state
  if (result) {
    return <LinkDisplay result={result} onReset={reset} />;
  }

  // File rejection errors - make them human-friendly
  const rejectionError = fileRejections[0]?.errors[0]?.message;
  const friendlyRejectionError = rejectionError
    ? rejectionError.includes('larger than')
      ? 'File is too large. Maximum file size is 5MB.'
      : rejectionError.includes('type') || rejectionError.includes('accept')
      ? 'Only PDF files are allowed.'
      : rejectionError
    : null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 sm:p-10 md:p-12 text-center cursor-pointer
          transition-all duration-300 ease-out group
          ${isDragActive
            ? 'border-blue-500 bg-gradient-to-br from-blue-100 to-purple-100 scale-[1.02] shadow-xl'
            : 'border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 hover:border-blue-400 hover:from-blue-100 hover:to-purple-100 hover:shadow-lg'
          }
          ${uploading ? 'pointer-events-none opacity-70' : ''}
        `}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-gray-700 font-semibold text-base sm:text-lg">Uploading your PDF...</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">This will only take a moment</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 sm:gap-5">
            {/* Upload icon */}
            <div className={`
              relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center transition-all duration-300
              ${isDragActive
                ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg scale-110'
                : 'bg-gradient-to-br from-blue-400 to-purple-500 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:scale-110 shadow-md'
              }
            `}>
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-transform"
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
                <div className="absolute inset-0 rounded-xl bg-white/20 animate-ping" />
              )}
            </div>

            {/* Text */}
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-800 mb-1.5">
                {isDragActive ? '✨ Drop your PDF here' : 'Drop your PDF or click to browse'}
              </p>
              <p className="text-sm sm:text-base text-gray-600">
                Max size: <span className="font-semibold text-blue-600">{formatFileSize(CONSTANTS.MAX_FILE_SIZE)}</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                📄 PDF only • 🕐 7 days • 🔒 Secure
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CAPTCHA Widget - only show if no valid token */}
      {!turnstileToken && (
        <div className="mt-6 flex justify-center overflow-x-auto">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={handleTurnstileSuccess}
            onError={(err) => {
              console.error('Turnstile error:', err);
              setError('CAPTCHA verification failed. Please try again.');
              sessionStorage.removeItem('turnstile_token');
            }}
            onExpire={handleTurnstileExpire}
            options={{
              size: 'flexible',
            }}
          />
        </div>
      )}

      {/* Verified status indicator */}
      {turnstileToken && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-700">Verified</span>
          </div>
        </div>
      )}

      {/* Error messages */}
      {(error || friendlyRejectionError) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-700 font-medium">
              {error || friendlyRejectionError}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
