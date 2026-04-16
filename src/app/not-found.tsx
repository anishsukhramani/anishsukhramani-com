import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight">
        This page does not exist.
      </h1>
      <p className="mt-3 text-muted-foreground">
        The link may be broken, or the article was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex justify-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        Back home
      </Link>
    </div>
  );
}
