'use client';

import { useState, useEffect } from 'react';
import { getUploadHistory, removeUpload, UploadRecord } from '@/lib/upload-history';
import { formatFileSize, formatTimeRemaining, formatRelativeTime } from '@/lib/utils';

export function UploadHistory() {
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loadHistory = () => {
    const history = getUploadHistory();
    setUploads(history);
  };

  useEffect(() => {
    loadHistory();

    // Listen for storage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'dropdf_uploads') {
        loadHistory();
      }
    };

    // Listen for new uploads in same tab
    const handleUploadSaved = () => {
      loadHistory();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('upload-saved', handleUploadSaved);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('upload-saved', handleUploadSaved);
    };
  }, []);

  const copyToClipboard = async (url: string, shortCode: string) => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopiedCode(shortCode);
        setTimeout(() => setCopiedCode(null), 2500);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          setCopiedCode(shortCode);
          setTimeout(() => setCopiedCode(null), 2500);
        } catch {
          console.error('Fallback copy failed');
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRemove = (shortCode: string) => {
    removeUpload(shortCode);
    loadHistory();
  };

  // Empty state
  if (uploads.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No uploads yet</h3>
        <p className="text-gray-500 mb-4">Your upload history will appear here</p>
        <a href="#upload" className="text-blue-600 hover:text-blue-700 font-medium">
          Upload your first PDF →
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {uploads.map((upload) => {
        const isExpired = new Date(upload.expiresAt) < new Date();
        const isCopied = copiedCode === upload.shortCode;

        return (
          <div
            key={upload.shortCode}
            className={`
              border-2 rounded-xl p-4 transition-all duration-200
              ${isExpired
                ? 'bg-gray-50 border-gray-200 opacity-50'
                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
              }
            `}
          >
            {/* Header with PDF icon and filename */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isExpired ? 'bg-gray-200' : 'bg-blue-100'}`}>
                <svg className={`w-6 h-6 ${isExpired ? 'text-gray-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate" title={upload.filename}>
                  {upload.filename}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(upload.fileSize)} • {formatRelativeTime(upload.uploadedAt)}
                </p>
              </div>
            </div>

            {/* Expiry status */}
            <div className="mb-3">
              {isExpired ? (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Expired
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {formatTimeRemaining(new Date(upload.expiresAt))}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(upload.url, upload.shortCode)}
                disabled={isExpired}
                className={`
                  flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all
                  ${isExpired
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isCopied
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
                  }
                `}
              >
                {isCopied ? (
                  <span className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  'Copy Link'
                )}
              </button>
              <a
                href={upload.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex-1 px-3 py-2 text-sm font-medium rounded-lg text-center transition-all
                  ${isExpired
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95'
                  }
                `}
              >
                Open PDF
              </a>
            </div>

            {/* Remove button (optional, for user convenience) */}
            <button
              onClick={() => handleRemove(upload.shortCode)}
              className="w-full mt-2 text-xs text-gray-400 hover:text-red-600 transition-colors"
            >
              Remove from history
            </button>
          </div>
        );
      })}
    </div>
  );
}
