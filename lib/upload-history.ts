export interface UploadRecord {
  shortCode: string;
  filename: string;
  url: string;
  uploadedAt: string; // ISO 8601
  expiresAt: string;  // ISO 8601
  fileSize: number;   // bytes
}

const STORAGE_KEY = 'dropdf_uploads';

export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function saveUpload(record: Omit<UploadRecord, 'uploadedAt'>): void {
  if (!isStorageAvailable()) {
    console.warn('localStorage is not available');
    return;
  }

  try {
    const uploads = getUploadHistory();
    const newRecord: UploadRecord = {
      ...record,
      uploadedAt: new Date().toISOString(),
    };

    // Prepend new upload (newest first)
    uploads.unshift(newRecord);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
  } catch (e) {
    if (e instanceof DOMException && e.name === 'QuotaExceededError') {
      // Remove oldest 10 uploads and try again
      try {
        const uploads = getUploadHistory();
        const trimmed = uploads.slice(0, uploads.length - 10);
        trimmed.unshift({
          ...record,
          uploadedAt: new Date().toISOString(),
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      } catch {
        console.error('Failed to save upload after trimming');
      }
    } else {
      console.error('Failed to save upload:', e);
    }
  }
}

export function getUploadHistory(): UploadRecord[] {
  if (!isStorageAvailable()) {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // Validate structure
    if (!Array.isArray(parsed)) {
      console.warn('Invalid upload history format, resetting');
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    // Validate each record and filter out invalid ones
    const validUploads = parsed.filter(
      (record) =>
        record &&
        typeof record === 'object' &&
        record.shortCode &&
        record.filename &&
        record.url &&
        record.expiresAt &&
        record.uploadedAt &&
        typeof record.fileSize === 'number'
    );

    // Auto-clean expired uploads
    return clearExpiredUploads(validUploads);
  } catch (e) {
    console.error('Failed to load upload history:', e);
    return [];
  }
}

function clearExpiredUploads(uploads: UploadRecord[]): UploadRecord[] {
  const now = new Date();
  const validUploads = uploads.filter((upload) => {
    const expiresAt = new Date(upload.expiresAt);
    return expiresAt > now;
  });

  // Save cleaned list back to localStorage
  if (validUploads.length !== uploads.length) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validUploads));
    } catch (e) {
      console.error('Failed to save cleaned upload history:', e);
    }
  }

  return validUploads;
}

export function removeUpload(shortCode: string): void {
  if (!isStorageAvailable()) {
    return;
  }

  try {
    const uploads = getUploadHistory();
    const filtered = uploads.filter((upload) => upload.shortCode !== shortCode);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to remove upload:', e);
  }
}
