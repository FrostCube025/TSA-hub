export default function Dashboard() {
  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
        Dashboard
      </p>

      <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
        Build. Submit. Chat. Compete.
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
        A secure TSA member platform for projects, assignments, communication,
        submissions, and collaboration.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <p className="text-4xl font-black text-cyan-300">12</p>
          <p className="mt-2 font-bold text-white">Active Projects</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <p className="text-4xl font-black text-cyan-300">8</p>
          <p className="mt-2 font-bold text-white">Open Assignments</p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
          <p className="text-4xl font-black text-cyan-300">34</p>
          <p className="mt-2 font-bold text-white">Members</p>
        </div>
      </div>
    </div>
  )
}