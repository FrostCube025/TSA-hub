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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          email,
          username,
          status: "active",
        })

      if (profileError) {
        setMessage(profileError.message)
      } else {
        setMessage(
          "Account created. Please check your email to confirm your account."
        )
      }
    }

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
            Build,
            <br />
            collaborate,
            <br />
            compete.
          </h1>

          <p className="mt-6 max-w-xl text-xl leading-8 text-[var(--text-muted)]">
            Join your TSA community and collaborate on projects,
            competitions, assignments, and team activities.
          </p>


          <div className="mt-10 grid max-w-lg gap-4">

            {[
              "Private class spaces",
              "Team collaboration",
              "Competition tools",
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


        {/* Signup card */}
        <div className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-xl">

          <p className="text-sm font-black uppercase tracking-[0.25em] text-[var(--primary)]">
            Create Account
          </p>


          <h2 className="mt-3 text-4xl font-black text-[var(--text)]">
            Join TSA Hub
          </h2>


          <p className="mt-3 text-[var(--text-muted)]">
            Create your account and join your TSA class.
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
            onSubmit={handleSignup}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
            />


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
              minLength={6}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none placeholder:text-gray-400 focus:border-[var(--primary)]"
            />


            <button
              disabled={loading}
              className="w-full rounded-2xl bg-[var(--primary)] px-5 py-4 font-black text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

          </form>


          {message && (
            <div className="mt-5 rounded-2xl bg-[var(--primary-soft)] p-4 text-sm font-bold text-[var(--primary-hover)]">
              {message}
            </div>
          )}


          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-black text-[var(--primary)]"
            >
              Sign in
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}