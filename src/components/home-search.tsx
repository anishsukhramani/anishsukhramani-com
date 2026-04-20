export function HomeSearch() {
  return (
    <form action="/search" method="get" className="w-full max-w-xl">
      <div className="group relative flex h-12 w-full items-center overflow-hidden rounded-2xl border border-border/80 bg-background/80 shadow-sm backdrop-blur">
        <label htmlFor="home-search" className="sr-only">
          Search articles
        </label>
        <input
          id="home-search"
          type="search"
          name="q"
          placeholder="Search topics, titles, ideas..."
          className="h-full w-full bg-transparent px-4 pr-20 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="absolute right-1.5 inline-flex h-9 origin-center items-center justify-center rounded-xl px-4 text-sm font-medium text-primary transition-[transform,opacity,color,background-color] duration-200 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:bg-muted active:scale-[0.98]"
        >
          Search
        </button>
      </div>
    </form>
  );
}
