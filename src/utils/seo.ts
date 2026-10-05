export function updateSEO({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}) {
  const baseTitle = 'Yash Barot | Full-Stack Developer';
  document.title = title ? `${title} | Yash Barot` : baseTitle;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && description) {
    metaDesc.setAttribute('content', description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && title) {
    ogTitle.setAttribute('content', `${title} | Yash Barot`);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && description) {
    ogDesc.setAttribute('content', description);
  }

  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg && ogImage) {
    ogImg.setAttribute('content', ogImage);
  }

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (canonicalUrl) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }
}
