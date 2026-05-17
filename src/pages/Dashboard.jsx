import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
  const { user } = useAuth()

  const [classCount, setClassCount] = useState(0)
  const [eventCount, setEventCount] = useState(0)
  const [postCount, setPostCount] = useState(0)

  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])

  async function loadDashboard() {
    const { data: classesData } = await supabase
      .from("class_members")
      .select("*")
      .eq("user_id", user.id)

    if (classesData) {
      setClassCount(classesData.length)
    }

    const { data: eventsData } = await supabase
      .from("calendar_events")
      .select("*")
      .order("event_date", { ascending: true })
      .limit(5)

    if (eventsData) {
      setEvents(eventsData)
      setEventCount(eventsData.length)
    }

    const { data: postsData } = await supabase
      .from("feed_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5)

    if (postsData) {
      setPosts(postsData)
      setPostCount(postsData.length)
    }
  }

  useEffect(() => {
    if (user) {
      loadDashboard()
    }
  }, [user])

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
        Dashboard
      </p>

      <h1 className="max-w-4xl text-5xl font-black tracking-tight text-[#111827]">
        TSA Hub Overview
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        Track classes, announcements, upcoming events, assignments, and platform activity.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-4xl font-black text-[#21c064]">
            {classCount}
          </p>

          <p className="mt-2 font-bold text-[#111827]">
            Joined Classes
          </p>
        </div>

        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-4xl font-black text-[#21c064]">
            {eventCount}
          </p>

          <p className="mt-2 font-bold text-[#111827]">
            Upcoming Events
          </p>
        </div>

        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-4xl font-black text-[#21c064]">
            {postCount}
          </p>

          <p className="mt-2 font-bold text-[#111827]">
            Recent Posts
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
            Upcoming Events
          </p>

          <div className="mt-5 space-y-4">
            {events.length === 0 ? (
              <div className="rounded-2xl bg-[#f9fafb] p-5">
                <p className="font-black text-[#111827]">
                  No upcoming events.
                </p>
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl bg-[#f9fafb] p-5"
                >
                  <p className="text-xl font-black text-[#111827]">
                    {event.title}
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#6b7280]">
                    {event.event_date} • {event.event_time || "All day"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
            Recent Announcements
          </p>

          <div className="mt-5 space-y-4">
            {posts.length === 0 ? (
              <div className="rounded-2xl bg-[#f9fafb] p-5">
                <p className="font-black text-[#111827]">
                  No announcements yet.
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-2xl bg-[#f9fafb] p-5"
                >
                  <p className="text-xl font-black text-[#111827]">
                    {post.title}
                  </p>

                  <p className="mt-3 leading-7 text-[#4b5563]">
                    {post.body}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
