import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        username,
        status: "pending",
      })

      if (profileError) {
        setMessage(profileError.message)
      } else {
        setMessage("Account created. Waiting for approval.")
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#155e75,transparent_35%),radial-gradient(circle_at_top_right,#581c87,transparent_30%),#020617] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="hidden lg:block">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
              TSA Hub
            </p>

            <h1 className="text-6xl font-black leading-tight text-white">
              Join your team’s command center.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Create your TSA Hub account to access projects, assignments, submissions,
              team chat, and member resources after approval.
            </p>

            <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
              {["Secure", "Private", "Member-only"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
              Create Profile
            </p>

            <h2 className="text-4xl font-black text-white">
              Sign up
            </h2>

            <p className="mt-3 text-slate-300">
              Your account will start as pending until a coordinator approves it.
            </p>

            <form onSubmit={handleSignup} className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400"
              />

              <button
                disabled={loading}
                className="w-full rounded-2xl bg-cyan-300 px-5 py-4 font-black text-slate-950 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {message && (
              <p className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-bold text-cyan-100">
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-black text-cyan-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}