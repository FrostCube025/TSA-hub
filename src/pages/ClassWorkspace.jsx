import { Link, useParams } from "react-router-dom"

export default function ClassWorkspace() {
  const { classId } = useParams()

  const channels = ["general", "announcements", "webmaster", "coding", "officers"]

  const messages = [
    {
      name: "FrostCube",
      tags: ["Creator", "Founding Member"],
      text: "Welcome to the TSA class workspace.",
    },
    {
      name: "Ava",
      tags: ["Verified", "Webmaster"],
      text: "The new class workspace feels much cleaner now.",
    },
  ]

  return (
    <div className="pb-24">
      <Link
        to="/classes"
        className="text-sm font-black text-[#21c064]"
      >
        ← Back to Classes
      </Link>

      <div className="mt-6 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
          Class Workspace
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#111827]">
          TSA Class Hub
        </h1>

        <p className="mt-3 max-w-3xl text-[#4b5563]">
          Private class space with channels, chat, assignments, projects, and members.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#6b7280]">
            Channels
          </p>

          <div className="space-y-1">
            {channels.map((channel, index) => (
              <button
                key={channel}
                className={`flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                  index === 0
                    ? "bg-[#21c064] text-white"
                    : "text-[#4b5563] hover:bg-[#f3f4f6]"
                }`}
              >
                <span className={index === 0 ? "text-white" : "text-[#9ca3af]"}>#</span>
                {channel}
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[#f9fafb] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9ca3af]">
              Class ID
            </p>

            <p className="mt-2 break-all text-xs font-bold text-[#6b7280]">
              {classId}
            </p>
          </div>
        </aside>

        <section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="border-b border-[#e5e7eb] px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af]">#</span>

              <h2 className="text-xl font-black text-[#111827]">
                general
              </h2>
            </div>

            <p className="mt-1 text-sm font-medium text-[#6b7280]">
              Class-wide discussion and announcements.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#f9fafb] p-6">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.text} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#21c064] font-black text-white">
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
                          className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-2 leading-7 text-[#374151]">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#e5e7eb] bg-white p-4">
            <input
              placeholder="Message #general"
              className="w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
            />
          </div>
        </section>
      </div>
    </div>
  )
}
