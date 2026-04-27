export default function RouteLoading({ label }: { label: string }) {
  return (
    <main className="min-h-[100dvh] bg-[var(--background)] px-6 pb-24 pt-24 text-[var(--foreground)]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent)]">
          loading {label}
        </p>

        <div className="space-y-5">
          <div className="h-12 w-56 animate-pulse rounded-full bg-[var(--color-accent-subtle)]" />
          <div className="h-5 w-full max-w-3xl animate-pulse rounded-full bg-[var(--border)]" />
          <div className="h-5 w-full max-w-2xl animate-pulse rounded-full bg-[var(--border)]" />
          <div className="mt-10 h-[24rem] w-full animate-pulse rounded-[28px] border border-[var(--border)] bg-[var(--card)]/60" />
        </div>
      </div>
    </main>
  );
}
