import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

function generateJoinCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

export default function Classes() {
  const { user, tags } = useAuth()

  const [classes, setClasses] = useState([])
  const [className, setClassName] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [joinCode, setJoinCode] = useState("")
  const [joinInput, setJoinInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const canCreateClass = tags.some((tag) =>
    ["creator", "admin", "coordinator", "teacher"].includes(tag.id)
  )

  async function loadClasses() {
    const { data, error } = await supabase
      .from("class_members")
      .select(`
        approved,
        role,
        classes (
          id,
          name,
          school_name,
          join_code
        )
      `)
      .eq("user_id", user.id)

    if (!error && data) {
      const cleanClasses = data.map((item) => ({
        ...item.classes,
        approved: item.approved,
        role: item.role,
      }))

      setClasses(cleanClasses)
    }
  }

  async function createClass(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const code = generateJoinCode()

    const { data, error } = await supabase
      .from("classes")
      .insert({
        name: className,
        school_name: schoolName,
        join_code: code,
        owner_id: user.id,
      })
      .select()
      .single()

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    await supabase.from("class_members").insert({
      class_id: data.id,
      user_id: user.id,
      role: "owner",
      approved: true,
    })

    setClassName("")
    setSchoolName("")
    setJoinCode(code)
    setMessage("Class created successfully.")
    loadClasses()
    setLoading(false)
  }

  async function joinClass(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("join_code", joinInput.toUpperCase())
      .maybeSingle()

    if (error || !data) {
      setMessage("Invalid join code.")
      setLoading(false)
      return
    }

    const { error: joinError } = await supabase
      .from("class_members")
      .insert({
        class_id: data.id,
        user_id: user.id,
        role: "member",
        approved: false,
      })

    if (joinError) {
      setMessage(joinError.message)
    } else {
      setMessage("Join request sent.")
    }

    setJoinInput("")
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      loadClasses()
    }
  }, [user])

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
        Classes
      </p>

      <h1 className="text-5xl font-black text-[#111827]">
        TSA Classes
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        Join your TSA team spaces, collaborate with members, and access class-specific chats, assignments, and projects.
      </p>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-700">
          {message}
        </div>
      )}

      <div className={`mt-10 grid gap-6 ${canCreateClass ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
        <form
          onSubmit={joinClass}
          className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
            Join Class
          </p>

          <input
            value={joinInput}
            onChange={(e) => setJoinInput(e.target.value)}
            placeholder="Enter join code"
            className="mt-5 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
          />

          <button
            disabled={loading}
            className="mt-5 rounded-2xl bg-[#21c064] px-6 py-4 font-black text-white disabled:opacity-60"
          >
            Join Class
          </button>
        </form>

        {canCreateClass && (
          <form
            onSubmit={createClass}
            className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Create Class
            </p>

            <input
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Class name"
              className="mt-5 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
            />

            <input
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="School name"
              className="mt-4 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
            />

            <button
              disabled={loading}
              className="mt-5 rounded-2xl bg-[#21c064] px-6 py-4 font-black text-white disabled:opacity-60"
            >
              Create Class
            </button>

            {joinCode && (
              <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-700">
                  Join Code
                </p>

                <p className="mt-2 text-3xl font-black text-yellow-800">
                  {joinCode}
                </p>
              </div>
            )}
          </form>
        )}
      </div>

      <div className="mt-12">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
          My Classes
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {classes.length === 0 ? (
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <p className="font-black text-[#111827]">
                No classes joined yet.
              </p>
            </div>
          ) : (
            classes.map((item) => (
              <Link
                key={item.id}
                to={`/classes/${item.id}`}
                className="block rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm transition hover:border-[#21c064]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-[#111827]">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-[#6b7280]">
                      {item.school_name}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-2 text-sm font-black ${
                      item.approved
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {item.approved ? "Approved" : "Pending"}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-[#f9fafb] p-4">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
                    Join Code
                  </p>

                  <p className="mt-2 text-xl font-black text-[#111827]">
                    {item.join_code}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
