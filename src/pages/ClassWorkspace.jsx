import { useParams, Link } from "react-router-dom"

export default function ClassWorkspace() {
  const { classId } = useParams()

  return (
   <div className="min-h-[calc(100vh-180px)] pb-8">
      <Link
        to="/classes"
        className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200"
      >
        ← Back to Classes
      </Link>

     <div className="mt-6 grid min-h-[650px] gap-6 lg:grid-cols-[260px_1fr]">
        <div className="border border-[#e5e7eb] bg-white p-4">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Channels
          </p>

          <div className="space-y-1">
            {[
              "general",
              "announcements",
              "webmaster",
              "coding",
              "officers",
            ].map((channel, index) => (
              <button
                key={channel}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-bold transition ${
                  index === 0
                    ? "bg-white/10 text-[#111827]"
                    : "text-slate-400 hover:bg-white/5 hover:text-[#111827]"
                }`}
              >
                <span className="text-slate-500">#</span>
                {channel}
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-[#e5e7eb] pt-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-600">
              Class ID
            </p>

            <p className="mt-2 break-all text-xs text-slate-500">
              {classId}
            </p>
          </div>
        </div>

        <div className="flex h-full flex-col border border-[#e5e7eb] bg-white">
          <div className="border-b border-[#e5e7eb] px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">#</span>

              <h1 className="text-lg font-black text-[#111827]">
                general
              </h1>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Class-wide announcements and discussion.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {[
                {
                  name: "FrostCube",
                  tags: ["Creator", "Founding Member"],
                  text: "Welcome to the TSA class workspace.",
                },
                {
                  name: "Ava",
                  tags: ["Verified", "Webmaster"],
                  text: "The new website layout looks really clean.",
                },
              ].map((msg) => (
                <div key={msg.text} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cyan-300 font-black text-slate-950">
                    {msg.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black text-[#111827]">
                        {msg.name}
                      </p>

                      {msg.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-cyan-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-2 leading-7 text-[#4b5563]">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e5e7eb] p-4">
            <input
              placeholder="Message #general"
              className="w-full border border-[#e5e7eb] bg-white/5 px-5 py-4 text-[#111827] outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
