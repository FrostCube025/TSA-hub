import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children }) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8]">
        <p className="text-2xl font-black text-[#111827]">
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
      <div className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-5">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-10 text-center shadow-sm">
          <h1 className="text-4xl font-black text-[#111827]">
            Profile Error
          </h1>

          <p className="mt-4 text-[#6b7280]">
            Your profile could not be loaded.
          </p>
        </div>
      </div>
    )
  }

  return children
}