import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

export default function Admin() {
  const { tags } = useAuth()

  const [pendingUsers, setPendingUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  const canApproveUsers = tags.some((tag) =>
    ["creator", "admin"].includes(tag.id)
  )

  async function loadPendingUsers() {
    setLoading(true)
    setMessage("")

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) {
      setMessage(error.message)
    } else {
      setPendingUsers(data || [])
    }

    setLoading(false)
  }

  async function approveUser(userId) {
    setMessage("")

    const { error } = await supabase.rpc("approve_user", {
      target_user_id: userId,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("User approved.")
    loadPendingUsers()
  }

  useEffect(() => {
    if (canApproveUsers) {
      loadPendingUsers()
    } else {
      setLoading(false)
    }
  }, [canApproveUsers])

  return (
    <div className="pb-24">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
        Admin
      </p>

      <h1 className="text-5xl font-black text-[#111827]">
        Admin Center
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4b5563]">
        Manage platform access, approvals, members, and future moderation tools.
      </p>

      {message && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-700">
          {message}
        </div>
      )}

      {!canApproveUsers ? (
        <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
          <p className="text-xl font-black text-red-700">
            Access restricted
          </p>

          <p className="mt-3 leading-7 text-red-600">
            Only Creator and Admin accounts can approve new users.
          </p>
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#6b7280]">
            Pending Accounts
          </p>

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="font-bold text-[#6b7280]">
                Loading pending users...
              </p>
            ) : pendingUsers.length === 0 ? (
              <div className="rounded-2xl bg-[#f9fafb] p-5">
                <p className="font-black text-[#111827]">
                  No pending users.
                </p>
              </div>
            ) : (
              pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-xl font-black text-[#111827]">
                      @{user.username || "no_username"}
                    </p>

                    <p className="mt-1 text-[#6b7280]">
                      {user.email}
                    </p>

                    <p className="mt-2 text-sm font-black uppercase tracking-[0.15em] text-yellow-700">
                      Pending Approval
                    </p>
                  </div>

                  <button
                    onClick={() => approveUser(user.id)}
                    className="rounded-2xl bg-[#21c064] px-6 py-3 font-black text-white"
                  >
                    Approve
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
