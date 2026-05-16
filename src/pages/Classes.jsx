import { useAuth } from "../context/AuthContext"

export default function Classes() {
  const { tags } = useAuth()

  const canCreateClass = tags.some((tag) =>
    ["creator", "admin", "coordinator", "teacher"].includes(tag.id)
  )

  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
        Classes
      </p>

      <h1 className="text-5xl font-black text-white">
        TSA Classes
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
        Join your TSA team spaces, collaborate with members, and access class-specific chats, assignments, and projects.
      </p>

      <div className={`mt-10 grid gap-6 ${canCreateClass ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
        <div className="border border-white/10 bg-zinc-950 p-6">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
            Join Class
          </p>

          <input
            placeholder="Enter join code"
            className="mt-5 w-full border border-white/10 bg-white/10 px-5 py-4 font-bold text-white outline-none placeholder:text-slate-500"
          />

          <button className="mt-5 bg-cyan-300 px-6 py-4 font-black text-slate-950">
            Join Class
          </button>
        </div>

        {canCreateClass && (
          <div className="border border-white/10 bg-zinc-950 p-6">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              Create Class
            </p>

            <input
              placeholder="Class name"
              className="mt-5 w-full border border-white/10 bg-white/10 px-5 py-4 font-bold text-white outline-none placeholder:text-slate-500"
            />

            <input
              placeholder="School name"
              className="mt-4 w-full border border-white/10 bg-white/10 px-5 py-4 font-bold text-white outline-none placeholder:text-slate-500"
            />

            <button className="mt-5 bg-cyan-300 px-6 py-4 font-black text-slate-950">
              Create Class
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
