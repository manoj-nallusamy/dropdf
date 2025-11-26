export const CONSTANTS = {
  // Upload limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
  ALLOWED_MIME_TYPES: ['application/pdf'],

  // Link settings
  SHORT_CODE_LENGTH: 8,
  DEFAULT_EXPIRY_HOURS: 24,

  // UI
  APP_NAME: 'DropDF',
  APP_DESCRIPTION: 'The fastest way to share a PDF. Drop a file, get a link.',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://dropdf.com',
} as const;
