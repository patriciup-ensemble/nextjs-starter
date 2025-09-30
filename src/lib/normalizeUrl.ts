export function normalizeUrl(url?: string): string {
  if (!url) return "#";

  const trimmed = url.trim();

  if (trimmed.startsWith("#")) return `/${trimmed}`;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return `/${trimmed}`;
}


