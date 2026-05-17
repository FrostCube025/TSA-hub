import { useParams, Link } from "react-router-dom"

export default function ClassWorkspace() {
  const { classId } = useParams()

  return (
    <div>
      <Link to="/classes" className="text-sm font-black text-cyan-200">
        ← Back to Classes
      </Link>

      <p className="mt-8 mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
        Class Workspace
      </p>

      <h1 className="text-5xl font-black text-white">
        TSA Class Hub
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
        This will become the private workspace for this class, including channels, members, assignments, submissions, and class chat.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="border border-white/10 bg-zinc-950 p-5">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            Channels
          </p>

          {["general", "announcements", "webmaster", "coding", "officers"].map((channel) => (
            <button
              key={channel}
              className="mb-2 block w-full bg-white/5 px-4 py-3 text-left font-black text-white"
            >
              #{channel}
            </button>
          ))}
        </div>

        <div className="border border-white/10 bg-zinc-950 p-6">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            Class ID
          </p>

          <p className="mt-2 break-all text-cyan-200">
            {classId}
          </p>

          <div className="mt-8 border border-white/10 bg-white/5 p-6">
            <h2 className="text-3xl font-black text-white">
              #general
            </h2>

            <p className="mt-3 text-slate-300">
              Real class-based chat will go here next.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
