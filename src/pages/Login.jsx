import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      if (!data.user) {
        setMessage("Login failed. No user returned.")
        return
      }

      navigate("/dashboard")
    } catch (err) {
      setMessage("Something went wrong while signing in.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="hidden lg:block">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
              TSA Hub
            </p>

            <h1 className="text-6xl font-black leading-tight text-white">
              Access your team command center.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Sign in to view projects, assignments, chats, submissions, and member-only tools.
            </p>
          </div>

          <div className="border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/30 sm:p-8">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
              Login
            </p>

            <h2 className="text-4xl font-black text-white">
              Welcome back
            </h2>

            <p className="mt-3 text-slate-300">
              Sign in with your approved TSA Hub account.
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-white/10 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-white/10 bg-white/10 px-5 py-4 text-white outline-none placeholder:text-slate-400"
              />

              <button
                disabled={loading}
                className="w-full bg-cyan-300 px-5 py-4 font-black text-slate-950 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {message && (
              <p className="mt-5 border border-red-300/20 bg-red-400/10 p-4 text-sm font-bold text-red-100">
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-slate-400">
              Need an account?{" "}
              <Link to="/signup" className="font-black text-cyan-200">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}