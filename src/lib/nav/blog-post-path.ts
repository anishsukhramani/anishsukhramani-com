/**
 * True for individual post URLs like `/blog/my-slug`, not `/blog` or other routes.
 */
export function isBlogPostPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return /^\/blog\/[^/]+$/.test(pathname);
}
