import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabaseClient"

const badgeStyles = {
  creator:
    "border-purple-200 bg-purple-50 text-purple-700",
  admin:
    "border-red-200 bg-red-50 text-red-700",
  teacher:
    "border-blue-200 bg-blue-50 text-blue-700",
}

export default function Profile() {
  const { user, profile, tags } = useAuth()

  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "")
      setBio(profile.bio || "")
    }
  }, [profile])

  async function saveProfile(e) {
    e.preventDefault()

    setSaving(true)
    setMessage("")

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        bio,
      })
      .eq("id", user.id)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Profile updated successfully.")
    }

    setSaving(false)
  }

  const displayName =
    profile?.display_name ||
    profile?.username ||
    "TSA Member"

  const roles = tags.filter((tag) =>
    ["creator", "admin", "teacher"].includes(tag.id)
  )

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[var(--primary)]">
        Profile
      </p>

      <h1 className="text-5xl font-black text-[var(--text)]">
        Member Profile
      </h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">

        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">

          <div className="flex aspect-square items-center justify-center rounded-3xl bg-[var(--primary-soft)] text-7xl font-black text-[var(--primary)]">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <div className="mt-6 rounded-2xl bg-[var(--surface-soft)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Email
            </p>

            <p className="mt-2 break-all font-bold text-[var(--text)]">
              {profile?.email || user?.email}
            </p>
          </div>

        </div>


        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm">

          <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Display Name
          </p>

          <h2 className="mt-2 text-4xl font-black text-[var(--text)]">
            {displayName}
          </h2>


          <div className="mt-8">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Roles
            </p>


            <div className="mt-3 flex flex-wrap gap-2">

              {roles.length === 0 ? (
                <span className="text-sm font-bold text-[var(--text-muted)]">
                  No special roles
                </span>
              ) : (

                roles.map((tag) => (
                  <span
                    key={tag.id}
                    className={`rounded-full border px-3 py-2 text-sm font-black ${
                      badgeStyles[tag.id]
                    }`}
                  >
                    {tag.name}
                  </span>
                ))

              )}

            </div>

          </div>



          <form
            onSubmit={saveProfile}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Username
              </label>


              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none"
              />

            </div>



            <div>

              <label className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Bio
              </label>


              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="5"
                className="mt-3 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none"
              />

            </div>



            <button
              disabled={saving}
              className="rounded-2xl bg-[var(--primary)] px-6 py-4 font-black text-white"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>


          </form>


          {message && (
            <div className="mt-5 rounded-2xl bg-[var(--primary-soft)] p-4 font-bold text-[var(--primary-hover)]">
              {message}
            </div>
          )}

        </div>

      </div>

    </div>
  )
}