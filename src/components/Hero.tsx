import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pb-16 pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-8 top-6 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-8 h-72 w-72 rounded-full bg-foreground/5 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4">
        <div className="rounded-3xl border border-border bg-white/80 p-8 shadow-sm md:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Minimal social
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground md:text-5xl">
            A calm place to share moments, not noise.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            NextGram keeps the focus on stories and imagery. Post, save, and
            explore in a clean, distraction-free feed designed for both mobile
            and desktop.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/feed"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:translate-y-0.5 hover:shadow-md"
            >
              Explore the feed
            </Link>
            <Link
              href="/post/create"
              className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:border-foreground/40"
            >
              Create a post
            </Link>
          </div>
        </div>

        <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white/70 p-4">
            Focused layouts that highlight media first.
          </div>
          <div className="rounded-2xl border border-border bg-white/70 p-4">
            Seamless mobile navigation with a single thumb.
          </div>
          <div className="rounded-2xl border border-border bg-white/70 p-4">
            Desktop-ready grids to browse in comfort.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
