import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6">
      <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-3 h-4 w-64" />
      </div>
      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Skeleton className="aspect-square rounded-2xl" />
        <Skeleton className="aspect-square rounded-2xl" />
        <Skeleton className="aspect-square rounded-2xl" />
        <Skeleton className="aspect-square rounded-2xl" />
      </section>
    </div>
  );
}
