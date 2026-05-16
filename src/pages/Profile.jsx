import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../lib/supabaseClient"

const tagStyles = {
  creator:
    "animate-pulse border-yellow-300/40 bg-gradient-to-r from-purple-500/20 via-yellow-400/20 to-purple-500/20 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.25)]",
  founding_member: "border-yellow-300/30 bg-yellow-400/10 text-yellow-200",
  verified: "border-cyan-300/30 bg-cyan-400/10 text-cyan-200",
  admin: "border-red-300/30 bg-red-400/10 text-red-200",
  coordinator: "border-violet-300/30 bg-violet-400/10 text-violet-200",
  teacher: "border-blue-300/30 bg-blue-400/10 text-blue-200",
  officer: "border-orange-300/30 bg-orange-400/10 text-orange-200",
  project_leader: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
  webmaster: "border-indigo-300/30 bg-indigo-400/10 text-indigo-200",
  coding: "border-green-300/30 bg-green-400/10 text-green-200",
  engineering: "border-amber-300/30 bg-amber-400/10 text-amber-200",
  media: "border-pink-300/30 bg-pink-400/10 text-pink-200",
  pending: "border-slate-300/30 bg-slate-400/10 text-slate-200",
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
      .update({ username, bio })
      .eq("id", user.id)

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Profile updated.")
    }

    setSaving(false)
  }

  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
        Profile
      </p>

      <h1 className="text-5xl font-black text-white">
        Member Profile
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
        Your display name and official tags are controlled by coordinators. You can customize your username and bio.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="border border-white/10 bg-zinc-950 p-6">
          <div className="flex aspect-square items-center justify-center border border-white/10 bg-white/5 text-7xl font-black text-cyan-200">
            {(profile?.display_name || profile?.username || user?.email || "U").charAt(0).toUpperCase()}
          </div>

          <button
            disabled
            className="mt-5 w-full bg-cyan-300/40 px-5 py-4 font-black text-slate-950 opacity-60"
          >
            Profile Picture Coming Later
          </button>

          <div className="mt-6 border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              Account
            </p>

            <p className="mt-2 break-all font-bold text-slate-300">
              {profile?.email || user?.email}
            </p>
          </div>
        </div>

        <div className="border border-white/10 bg-zinc-950 p-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              Display Name
            </p>

            <h2 className="mt-2 text-4xl font-black text-white">
              {profile?.display_name || profile?.username || "Unnamed Member"}
            </h2>
          </div>

          <div className="mt-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
              Official Tags
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              {tags.length === 0 ? (
                <span className="border border-slate-300/30 bg-slate-400/10 px-3 py-2 text-sm font-black text-slate-200">
                  No tags assigned
                </span>
              ) : (
                tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`border px-3 py-2 text-sm font-black ${
                      tagStyles[tag.id] || "border-white/20 bg-white/10 text-white"
                    }`}
                  >
                    {tag.name}
                  </span>
                ))
              )}
            </div>
          </div>

          <form onSubmit={saveProfile} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                Username
              </label>

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-3 w-full border border-white/10 bg-white/10 px-5 py-4 font-bold text-white outline-none placeholder:text-slate-500"
                placeholder="Username"
              />
            </div>

            <div>
              <label className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="5"
                className="mt-3 w-full resize-none border border-white/10 bg-white/10 px-5 py-4 font-bold text-white outline-none placeholder:text-slate-500"
                placeholder="Write a short bio..."
              />
            </div>

            <button
              disabled={saving}
              className="bg-cyan-300 px-6 py-4 font-black text-slate-950 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>

          {message && (
            <p className="mt-5 border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}