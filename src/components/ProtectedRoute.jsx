import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-2xl font-black">
          Loading...
        </p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
        <div className="border border-white/10 bg-zinc-950 p-10 text-center">
          <h1 className="text-4xl font-black">
            Profile Error
          </h1>

          <p className="mt-4 text-slate-300">
            Your profile could not be loaded.
          </p>
        </div>
      </div>
    )
  }

  if (profile.status === "pending") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
        <div className="max-w-lg border border-yellow-500/20 bg-yellow-500/10 p-10 text-center">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
            Pending Approval
          </p>

          <h1 className="text-5xl font-black">
            Waiting for approval
          </h1>

          <p className="mt-6 text-lg leading-8 text-yellow-100">
            Your TSA Hub account has been created successfully,
            but a coordinator, admin, or creator must approve your membership before you can access the platform.
          </p>
        </div>
      </div>
    )
  }

  return children
}