'use client';

import { useState } from 'react';
import { formatFileSize, formatTimeRemaining } from '@/lib/utils';

interface LinkDisplayProps {
  result: {
    url: string;
    filename: string;
    size: number;
    expiresAt: string;
  };
  onReset: () => void;
}

export function LinkDisplay({ result, onReset }: LinkDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(result.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback for non-secure contexts (like HTTP on mobile)
        const textArea = document.createElement('textarea');
        textArea.value = result.url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const timeRemaining = formatTimeRemaining(new Date(result.expiresAt));

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-gradient-to-b from-green-50 to-white border border-green-200 rounded-2xl p-8 text-center">
        {/* Success icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Your PDF is ready to share!
        </h3>

        <p className="text-gray-500 text-sm mb-6">
          {result.filename} • {formatFileSize(result.size)} • {timeRemaining}
        </p>

        {/* Link display and copy */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
          <input
            type="text"
            value={result.url}
            readOnly
            className="flex-1 bg-transparent outline-none text-gray-700 text-sm px-3 font-mono"
          />
          <button
            onClick={copyToClipboard}
            className={`
              px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
              ${copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95'
              }
            `}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
          >
            Open PDF →
          </a>
          <span className="text-gray-300">|</span>
          <button
            onClick={onReset}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Upload another
          </button>
        </div>
      </div>

      {/* Upgrade prompt */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
        <p className="text-sm text-gray-600">
          Want unlimited uploads, no expiry, and analytics?
        </p>
        <a href="#waitlist" className="text-sm text-blue-500 hover:text-blue-600 font-semibold">
          Join the waitlist →
        </a>
      </div>
    </div>
  );
}
