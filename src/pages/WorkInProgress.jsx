export default function WorkInProgress({ title = "Work in progress" }) {
  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[var(--primary)]">
        Coming Soon
      </p>

      <h1 className="text-5xl font-black text-[var(--text)]">
        {title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
        This feature is still being built. The core parts of TSA Hub are available while development continues.
      </p>

      <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <p className="text-xl font-black text-[var(--text)]">
          Check back soon.
        </p>
      </div>
    </div>
  )
}