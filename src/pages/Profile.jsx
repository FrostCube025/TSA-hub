import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabaseClient"

const badgeStyles = {
  creator:
    "animate-pulse border-yellow-300 bg-gradient-to-r from-purple-100 via-yellow-100 to-purple-100 text-yellow-800 shadow-[0_0_18px_rgba(250,204,21,0.25)]",
  founding_member: "border-yellow-200 bg-yellow-50 text-yellow-700",
  verified: "border-emerald-200 bg-emerald-50 text-emerald-700",
  admin: "border-red-200 bg-red-50 text-red-700",
  coordinator: "border-violet-200 bg-violet-50 text-violet-700",
  teacher: "border-blue-200 bg-blue-50 text-blue-700",
  officer: "border-orange-200 bg-orange-50 text-orange-700",
  project_leader: "border-emerald-200 bg-emerald-50 text-emerald-700",
  webmaster: "border-indigo-200 bg-indigo-50 text-indigo-700",
  coding: "border-green-200 bg-green-50 text-green-700",
  engineering: "border-amber-200 bg-amber-50 text-amber-700",
  media: "border-pink-200 bg-pink-50 text-pink-700",
  pending: "border-gray-200 bg-gray-50 text-gray-600",
    "animate-pulse border-purple-200 bg-purple-50 text-purple-700 shadow-[0_0_14px_rgba(147,51,234,0.18)]",
  admin: "border-red-200 bg-red-50 text-red-700",
  teacher: "border-blue-200 bg-blue-50 text-blue-700",
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

    if (!user) return

    setSaving(true)
    setMessage("")

    const { error } = await supabase
      .from("profiles")
      .update({
        username: username.trim(),
        bio: bio.trim(),
      })
      .eq("id", user.id)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Profile updated.")
    }

    setSaving(false)
  }

  const displayName =
    profile?.display_name ||
    profile?.username ||
    "TSA Member"

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
        Profile
      </p>

      <h1 className="text-5xl font-black text-[#111827]">
        Member Profile
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        Your display name and official tags are controlled by coordinators. You can customize your username and bio.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div className="flex aspect-square items-center justify-center rounded-3xl border border-[#e5e7eb] bg-[#f5f6f8] text-7xl font-black text-[#21c064]">
            {(profile?.display_name || profile?.username || user?.email || "U").charAt(0).toUpperCase()}
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[var(--primary)]">
        Profile
      </p>

      <h1 className="text-5xl font-black text-[var(--text)]">
        Member Profile
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--text-muted)]">
        Customize your profile while official roles remain controlled by TSA Hub administrators.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex aspect-square items-center justify-center rounded-3xl bg-[var(--primary-soft)] text-7xl font-black text-[var(--primary)]">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <button
            disabled
            className="mt-5 w-full rounded-2xl bg-[#21c064]/30 px-5 py-4 font-black text-[#065f46] opacity-70"
            className="mt-5 w-full rounded-2xl bg-[var(--primary-soft)] px-5 py-4 font-black text-[var(--primary-hover)] opacity-70"
          >
            Profile Picture Coming Soon
          </button>

          <div className="mt-6 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Account
            </p>

            <p className="mt-2 break-all font-bold text-[#374151]">
          <div className="mt-6 rounded-2xl bg-[var(--surface-soft)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Email
            </p>

            <p className="mt-2 break-all font-bold text-[var(--text)]">
              {profile?.email || user?.email}
            </p>
          </div>
        </div>
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Display Name
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#111827]">
              {profile?.display_name || profile?.username || "Unnamed Member"}
            </h2>
          </div>

          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Official Tags
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              {tags.length === 0 ? (
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-black text-gray-600">
                  No tags assigned
                </span>
              ) : (
                tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`rounded-full border px-3 py-2 text-sm font-black ${
                      tagStyles[tag.id] || "border-gray-200 bg-gray-50 text-gray-700"
                    }`}
                  >
                    {tag.name}
                  </span>
                ))
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
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
              {tags.filter((tag) =>
                ["creator", "admin", "teacher"].includes(tag.id)
              ).length === 0 ? (
                <span className="text-sm font-bold text-[var(--text-muted)]">
                  No special role
                </span>
              ) : (
                tags
                  .filter((tag) =>
                    ["creator", "admin", "teacher"].includes(tag.id)
                  )
                  .map((tag) => (
                    <span
                      key={tag.id}
                      className={`rounded-full border px-3 py-2 text-sm font-black ${
                        badgeStyles[tag.id]
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))
>>>>>>> bffad9c (Update light theme and authentication flow)
              )}
            </div>
          </div>

          <form onSubmit={saveProfile} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Username
              </label>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-3 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
                placeholder="Username"
                className="mt-3 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="5"
                className="mt-3 w-full resize-none rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
                placeholder="Write a short bio..."
                placeholder="Tell the team something about yourself..."
                className="mt-3 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
              />
            </div>

            <button
              disabled={saving}
              className="rounded-2xl bg-[#21c064] px-6 py-4 font-black text-white disabled:opacity-60"
=======
              className="rounded-2xl bg-[var(--primary)] px-6 py-4 font-black text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>

          {message && (
            <p className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700">
            <div className="mt-5 rounded-2xl bg-[var(--primary-soft)] p-4 font-bold text-[var(--primary-hover)]">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
