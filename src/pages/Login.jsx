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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (!data.user) {
      setMessage("Login failed.")
      setLoading(false)
      return
    }

    navigate("/dashboard")
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] px-5 py-10">

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-10 lg:grid-cols-2">

        {/* Left side */}
        <div className="hidden lg:block">

          <p className="text-sm font-black uppercase tracking-[0.3em] text-[var(--primary)]">
            TSA Hub
          </p>

          <h1 className="mt-5 text-6xl font-black leading-tight text-[var(--text)]">
            Your TSA team,
            <br />
            connected.
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-8 text-[var(--text-muted)]">
            Collaborate on projects, communicate with your team, track events,
            and organize your TSA experience in one place.
          </p>


          <div className="mt-10 grid max-w-lg gap-4">

            {[
              "Class collaboration",
              "Project management",
              "Competition preparation",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--border)] bg-white p-4 font-black text-[var(--text)] shadow-sm"
              >
                ✓ {item}
              </div>
            ))}

          </div>

        </div>


        {/* Login card */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-xl">

          <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--primary)]">
            Login
          </p>


          <h2 className="mt-3 text-4xl font-black text-[var(--text)]">
            Welcome back
          </h2>


          <p className="mt-3 text-[var(--text-muted)]">
            Sign in to access TSA Hub.
          </p>


          <button
            type="button"
            className="mt-8 w-full rounded-2xl border border-[var(--border)] bg-white px-5 py-4 font-black text-[var(--text)] transition hover:bg-[var(--surface-soft)]"
          >
            Continue with Google
          </button>


          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-[var(--border)]" />

            <span className="text-xs font-black uppercase text-[var(--text-muted)]">
              or
            </span>

            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>


          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
            />


            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
            />


            <button
              disabled={loading}
              className="w-full rounded-2xl bg-[var(--primary)] px-5 py-4 font-black text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>


          {message && (
            <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
              {message}
            </div>
          )}


          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Need an account?{" "}
            <Link
              to="/signup"
              className="font-black text-[var(--primary)]"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}