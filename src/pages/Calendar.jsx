export default function Calendar() {
  const events = [
    {
      title: "Webmaster Meeting",
      date: "March 18",
      time: "3:30 PM",
    },
    {
      title: "Coding Competition Prep",
      date: "March 21",
      time: "4:00 PM",
    },
    {
      title: "Regional TSA Deadline",
      date: "March 28",
      time: "11:59 PM",
    },
  ]

  const posts = [
    {
      author: "Coordinator",
      title: "Competition preparation",
      text: "All teams should update project progress before Friday.",
    },
    {
      author: "Officer Team",
      title: "Meeting schedule update",
      text: "The next officer meeting has been moved to Wednesday.",
    },
    {
      author: "FrostCube",
      title: "Platform update",
      text: "The new class workspace system is now online.",
    },
  ]

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
        Calendar
      </p>

      <h1 className="text-5xl font-black text-[#111827]">
        Events & News
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        Stay updated with meetings, deadlines, competitions, announcements, and TSA activity.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
            Upcoming Events
          </p>

          <div className="mt-5 space-y-4">
            {events.map((event) => (
              <div
                key={event.title}
                className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5"
              >
                <p className="text-xl font-black text-[#111827]">
                  {event.title}
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  <span className="rounded-full bg-[#21c064]/10 px-3 py-2 text-sm font-black text-[#15803d]">
                    {event.date}
                  </span>

                  <span className="rounded-full bg-[#e0f2fe] px-3 py-2 text-sm font-black text-[#0369a1]">
                    {event.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
            News Feed
          </p>

          <div className="mt-5 space-y-5">
            {posts.map((post) => (
              <div
                key={post.title}
                className="rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#21c064] font-black text-white">
                    {post.author.charAt(0)}
                  </div>

                  <div>
                    <p className="font-black text-[#111827]">
                      {post.author}
                    </p>

                    <p className="text-sm text-[#6b7280]">
                      TSA Hub Announcement
                    </p>
                  </div>
                </div>

                <h2 className="mt-5 text-2xl font-black text-[#111827]">
                  {post.title}
                </h2>

                <p className="mt-3 leading-7 text-[#4b5563]">
                  {post.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
