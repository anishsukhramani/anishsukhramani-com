/** Short vibration for high-intent actions (Android; no-op elsewhere). */
export function triggerHaptic(pattern: number | number[] = 50): void {
  if (typeof navigator === "undefined" || !navigator.vibrate) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* ignore unsupported environments */
  }
}
