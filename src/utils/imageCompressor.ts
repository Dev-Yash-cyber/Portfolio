/**
 * Client-side image compression & optimization helper.
 * Converts high-resolution images to lightweight, web-optimized JPEG data URLs
 * to ensure fast uploads, prevent localStorage quota errors, and ensure instant rendering.
 */
export async function compressImage(
  file: File,
  maxWidth = 1400,
  maxHeight = 1400,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image'));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };

    reader.onload = (readerEvent) => {
      const rawDataUrl = readerEvent.target?.result as string;
      if (!rawDataUrl) {
        return reject(new Error('Empty image data received'));
      }

      // If SVG or very small file (< 80KB), return as is
      if (file.type.includes('svg') || file.size < 80 * 1024) {
        return resolve(rawDataUrl);
      }

      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data url if canvas image loader fails
        resolve(rawDataUrl);
      };

      img.onload = () => {
        try {
          let width = img.width;
          let height = img.height;

          // Compute new dimensions keeping aspect ratio
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve(rawDataUrl);
          }

          // Render high-quality scaled image
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          console.warn('Canvas compression error, falling back to raw data URL:', err);
          resolve(rawDataUrl);
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}
