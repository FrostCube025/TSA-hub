import { useMemo, useState } from "react"

const initialEvents = [
  {
    id: 1,
    title: "Webmaster Meeting",
    date: "2026-05-18",
    time: "3:30 PM",
    type: "meeting",
    description: "Team meeting for website updates and project planning.",
  },
  {
    id: 2,
    title: "Coding Competition Prep",
    date: "2026-05-21",
    time: "4:00 PM",
    type: "competition",
    description: "Practice session for coding competition members.",
  },
  {
    id: 3,
    title: "Regional TSA Deadline",
    date: "2026-05-28",
    time: "11:59 PM",
    type: "deadline",
    description: "Final deadline for regional TSA materials.",
  },
]

const typeStyles = {
  meeting: "bg-[#21c064] text-white",
  deadline: "bg-red-500 text-white",
  competition: "bg-blue-500 text-white",
  task: "bg-yellow-400 text-[#111827]",
}

export default function Calendar() {
  const [events, setEvents] = useState(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [type, setType] = useState("task")
  const [description, setDescription] = useState("")

  const year = 2026
  const month = 4

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = []

    for (let i = 0; i < firstDay; i++) {
      cells.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day)
    }

    return cells
  }, [])

  function eventDate(day) {
    return `${year}-05-${String(day).padStart(2, "0")}`
  }

  function createEvent(e) {
    e.preventDefault()

    if (!title || !date) return

    setEvents([
      ...events,
      {
        id: Date.now(),
        title,
        date,
        time: time || "All day",
        type,
        description,
      },
    ])

    setTitle("")
    setDate("")
    setTime("")
    setType("task")
    setDescription("")
  }

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
        Calendar
      </p>

      <h1 className="text-5xl font-black text-[#111827]">
        Events & Tasks
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        Track TSA meetings, deadlines, competitions, announcements, and personal tasks.
      </p>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
                Month View
              </p>

              <h2 className="mt-2 text-3xl font-black text-[#111827]">
                May 2026
              </h2>
            </div>

            <div className="flex gap-2">
              <span className="rounded-full bg-[#21c064] px-3 py-2 text-xs font-black text-white">
                Meeting
              </span>
              <span className="rounded-full bg-red-500 px-3 py-2 text-xs font-black text-white">
                Deadline
              </span>
              <span className="rounded-full bg-blue-500 px-3 py-2 text-xs font-black text-white">
                Competition
              </span>
              <span className="rounded-full bg-yellow-400 px-3 py-2 text-xs font-black text-[#111827]">
                Task
              </span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase tracking-[0.15em] text-[#6b7280]">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayEvents = day
                ? events.filter((event) => event.date === eventDate(day))
                : []

              return (
                <div
                  key={index}
                  className={`min-h-[105px] rounded-2xl border p-3 ${
                    day
                      ? "border-[#e5e7eb] bg-[#f9fafb]"
                      : "border-transparent bg-transparent"
                  }`}
                >
                  {day && (
                    <>
                      <p className="font-black text-[#111827]">
                        {day}
                      </p>

                      <div className="mt-2 space-y-1">
                        {dayEvents.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className={`block w-full truncate rounded-full px-2 py-1 text-left text-[11px] font-black ${
                              typeStyles[event.type]
                            }`}
                          >
                            {event.title}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <form
            onSubmit={createEvent}
            className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Create Task / Event
            </p>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="mt-5 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none focus:border-[#21c064]"
            />

            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time"
              className="mt-4 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none focus:border-[#21c064]"
            >
              <option value="task">Task</option>
              <option value="meeting">Meeting</option>
              <option value="deadline">Deadline</option>
              <option value="competition">Competition</option>
            </select>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Description"
              className="mt-4 w-full resize-none rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
            />

            <button className="mt-5 w-full rounded-2xl bg-[#21c064] px-6 py-4 font-black text-white">
              Create
            </button>
          </form>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              News Feed
            </p>

            <div className="mt-5 space-y-4">
              {events.slice(-3).reverse().map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="w-full rounded-2xl bg-[#f9fafb] p-4 text-left"
                >
                  <p className="font-black text-[#111827]">
                    {event.title}
                  </p>

                  <p className="mt-1 text-sm text-[#6b7280]">
                    {event.date} • {event.time}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`rounded-full px-3 py-2 text-xs font-black ${
                    typeStyles[selectedEvent.type]
                  }`}
                >
                  {selectedEvent.type}
                </span>

                <h2 className="mt-5 text-3xl font-black text-[#111827]">
                  {selectedEvent.title}
                </h2>

                <p className="mt-3 font-bold text-[#6b7280]">
                  {selectedEvent.date} • {selectedEvent.time}
                </p>

                <p className="mt-5 leading-7 text-[#4b5563]">
                  {selectedEvent.description || "No description provided."}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-full bg-[#f3f4f6] px-4 py-2 font-black text-[#111827]"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
