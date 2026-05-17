export default function Dashboard() {
  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
        Dashboard
      </p>

      <h1 className="max-w-4xl text-5xl font-black tracking-tight text-[#111827]">
        Build. Submit. Chat. Compete.
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        A secure TSA member platform for projects, assignments, communication, submissions, and collaboration.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ["12", "Active Projects"],
          ["8", "Open Assignments"],
          ["34", "Members"],
        ].map(([number, label]) => (
          <div
            key={label}
            className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
          >
            <p className="text-4xl font-black text-[#21c064]">
              {number}
            </p>

            <p className="mt-2 font-bold text-[#111827]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
          Today
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            "Check class updates",
            "Review project progress",
            "Submit assigned work",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-[#f9fafb] p-5"
            >
              <p className="font-black text-[#111827]">
                {item}
              </p>

              <p className="mt-2 text-sm leading-6 text-[#6b7280]">
                Stay organized with your TSA team.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
