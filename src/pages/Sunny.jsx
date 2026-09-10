export default function Sunny() {
  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[var(--primary)]">
        Sunny
      </p>

      <h1 className="text-5xl font-black text-[var(--text)]">
        Sunny AI
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
        Your TSA assistant is still being built.
      </p>

      <div className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-sm">
        <p className="text-xl font-black text-[var(--text)]">
          Work in progress
        </p>

        <p className="mt-3 text-[var(--text-muted)]">
          Sunny will eventually understand your classes, assignments, calendar, and TSA Hub data.
        </p>
      </div>
    </div>
  )
}