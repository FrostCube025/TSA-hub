import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Admin() {
  const [pendingUsers, setPendingUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  async function loadPendingUsers() {
    setLoading(true)

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) {
      setMessage(error.message)
    } else {
      setPendingUsers(data)
    }

    setLoading(false)
  }

  async function approveUser(userId) {
    const { error } = await supabase
      .from("profiles")
      .update({ status: "verified" })
      .eq("id", userId)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("User approved.")
    loadPendingUsers()
  }

  useEffect(() => {
    loadPendingUsers()
  }, [])

  return (
    <div>
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-cyan-200">
        Admin
      </p>

      <h1 className="text-5xl font-black text-[#111827]">
        Approval Center
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        Review pending TSA Hub accounts and approve verified members.
      </p>

      {message && (
        <div className="mt-6 border border-cyan-300/20 bg-cyan-300/10 p-4 font-bold text-cyan-100">
          {message}
        </div>
      )}

      <div className="mt-10 space-y-4">
        {loading ? (
          <p className="text-[#4b5563]">Loading pending users...</p>
        ) : pendingUsers.length === 0 ? (
          <div className="border border-white/10 bg-white p-6">
            <p className="font-black text-[#111827]">No pending users.</p>
          </div>
        ) : (
          pendingUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-4 border border-white/10 bg-white p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-xl font-black text-[#111827]">
                  @{user.username || "no_username"}
                </p>

                <p className="mt-1 text-slate-400">
                  {user.email}
                </p>

                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-yellow-300">
                  Pending Approval
                </p>
              </div>

              <button
                onClick={() => approveUser(user.id)}
                className="bg-cyan-300 px-6 py-3 font-black text-slate-950"
              >
                Approve
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
