/** True for `/blog` index and any `/blog/...` post route. */
export function isBlogSectionPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === "/blog" || pathname.startsWith("/blog/");
}
