import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

const typeStyles = {
  meeting: "bg-[var(--primary)] text-white",
  deadline: "bg-red-500 text-white",
  competition: "bg-blue-500 text-white",
  task: "bg-amber-400 text-amber-950",
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function Calendar() {
  const { user } = useAuth()

  const today = new Date()

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [type, setType] = useState("task")
  const [description, setDescription] = useState("")

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function loadEvents() {
    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("event_date", { ascending: true })

    if (error) {
      setMessage(error.message)
      return
    }

    setEvents(data || [])
  }

  async function loadPosts() {
    const { data, error } = await supabase
      .from("feed_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (error) {
      console.error(error)
      return
    }

    setPosts(data || [])
  }

  useEffect(() => {
    loadEvents()
    loadPosts()
  }, [])

  const days = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(
      viewYear,
      viewMonth + 1,
      0
    ).getDate()

    const cells = []

    for (let i = 0; i < firstDay; i++) {
      cells.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(day)
    }

    return cells
  }, [viewYear, viewMonth])

  function getDateString(day) {
    const month = String(viewMonth + 1).padStart(2, "0")
    const dateDay = String(day).padStart(2, "0")

    return `${viewYear}-${month}-${dateDay}`
  }

  function isToday(day) {
    if (!day) return false

    return (
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    )
  }

  function previousMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((year) => year - 1)
    } else {
      setViewMonth((month) => month - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((year) => year + 1)
    } else {
      setViewMonth((month) => month + 1)
    }
  }

  function goToToday() {
    const now = new Date()

    setViewYear(now.getFullYear())
    setViewMonth(now.getMonth())
  }

  async function createEvent(e) {
    e.preventDefault()

    if (!title.trim() || !date || !user) return

    setLoading(true)
    setMessage("")

    const { error } = await supabase
      .from("calendar_events")
      .insert({
        creator_id: user.id,
        title: title.trim(),
        event_date: date,
        event_time: time || null,
        event_type: type,
        description: description.trim(),
      })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setTitle("")
    setDate("")
    setTime("")
    setType("task")
    setDescription("")

    const createdDate = new Date(`${date}T12:00:00`)

    setViewYear(createdDate.getFullYear())
    setViewMonth(createdDate.getMonth())

    await loadEvents()

    setMessage("Event created.")
    setLoading(false)
  }

  function formatEventDate(event) {
    const eventDate = new Date(`${event.event_date}T12:00:00`)

    return eventDate.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[var(--primary)]">
        Calendar
      </p>

      <h1 className="text-5xl font-black text-[var(--text)]">
        Events & Tasks
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--text-muted)]">
        Track TSA meetings, deadlines, competitions, announcements,
        and personal tasks.
      </p>

      {message && (
        <div className="mt-6 rounded-2xl bg-[var(--primary-soft)] p-4 font-bold text-[var(--primary-hover)]">
          {message}
        </div>
      )}

      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_360px]">

        {/* CALENDAR */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Month View
              </p>

              <h2 className="mt-2 text-3xl font-black text-[var(--text)]">
                {monthNames[viewMonth]} {viewYear}
              </h2>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={previousMonth}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={goToToday}
                className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-black text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
              >
                Today
              </button>

              <button
                onClick={nextMonth}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
                aria-label="Next month"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1.5 text-xs font-black text-[var(--primary-hover)]">
              Meeting
            </span>

            <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-black text-red-700">
              Deadline
            </span>

            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
              Competition
            </span>

            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700">
              Task
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase tracking-[0.1em] text-[var(--text-muted)]">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              const dayEvents = day
                ? events.filter(
                    (event) => event.event_date === getDateString(day)
                  )
                : []

              return (
                <div
                  key={`${viewYear}-${viewMonth}-${index}`}
                  className={`min-h-[110px] rounded-2xl border p-2 sm:p-3 ${
                    day
                      ? "border-[var(--border)] bg-[var(--surface-soft)]"
                      : "border-transparent"
                  }`}
                >
                  {day && (
                    <>
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-black ${
                          isToday(day)
                            ? "bg-[var(--primary)] text-white"
                            : "text-[var(--text)]"
                        }`}
                      >
                        {day}
                      </div>

                      <div className="mt-2 space-y-1">
                        {dayEvents.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            title={event.title}
                            className={`block w-full truncate rounded-lg px-2 py-1.5 text-left text-[10px] font-black sm:text-[11px] ${
                              typeStyles[event.event_type] ||
                              typeStyles.task
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


        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          <form
            onSubmit={createEvent}
            className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Create Task / Event
            </p>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="mt-5 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-4 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none focus:border-[var(--primary)]"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none focus:border-[var(--primary)]"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-4 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none focus:border-[var(--primary)]"
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
              className="mt-4 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
            />

            <button
              disabled={loading}
              className="mt-5 w-full rounded-2xl bg-[var(--primary)] px-6 py-4 font-black text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>


          {/* NEWS FEED */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              News Feed
            </p>

            <div className="mt-5 space-y-4">

              {posts.length === 0 ? (
                <div className="rounded-2xl bg-[var(--surface-soft)] p-5">
                  <p className="font-black text-[var(--text)]">
                    No announcements yet.
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-2xl bg-[var(--surface-soft)] p-5"
                  >
                    <p className="font-black text-[var(--text)]">
                      {post.title}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                      {post.body}
                    </p>
                  </div>
                ))
              )}

            </div>
          </div>

        </div>
      </div>


      {/* EVENT POPUP */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-5">

              <div className="min-w-0">

                <span
                  className={`inline-block rounded-full px-3 py-2 text-xs font-black capitalize ${
                    typeStyles[selectedEvent.event_type] ||
                    typeStyles.task
                  }`}
                >
                  {selectedEvent.event_type}
                </span>

                <h2 className="mt-5 text-3xl font-black text-[var(--text)]">
                  {selectedEvent.title}
                </h2>

                <p className="mt-3 font-bold text-[var(--text-muted)]">
                  {formatEventDate(selectedEvent)}
                </p>

                {selectedEvent.event_time && (
                  <p className="mt-1 font-bold text-[var(--text-muted)]">
                    {selectedEvent.event_time}
                  </p>
                )}

                <p className="mt-5 leading-7 text-[var(--text-muted)]">
                  {selectedEvent.description ||
                    "No description provided."}
                </p>

              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--surface-soft)] font-black text-[var(--text)] transition hover:bg-gray-200"
                aria-label="Close event"
              >
                ×
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}