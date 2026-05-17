import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

export default function ClassWorkspace() {
  const { classId } = useParams()
  const { user, tags } = useAuth()

  const [channels, setChannels] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")

  const [channelName, setChannelName] = useState("")
  const [restricted, setRestricted] = useState(false)

  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState("")

  const canCreateChannels = tags.some((tag) =>
    ["creator", "admin", "coordinator", "teacher"].includes(tag.id)
  )

  async function loadChannels() {
    const { data, error } = await supabase
      .from("class_channels")
      .select("*")
      .eq("class_id", classId)
      .order("created_at", { ascending: true })

    if (error) {
      setNotice(error.message)
      return
    }

    setChannels(data || [])

    if (data && data.length > 0 && !selectedChannel) {
      setSelectedChannel(data[0])
    }
  }

  async function loadMessages(channelId) {
    if (!channelId) return

    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        profiles (
          id,
          username,
          display_name,
          email
        )
      `)
      .eq("channel_id", channelId)
      .order("created_at", { ascending: true })

    if (error) {
      setNotice(error.message)
      return
    }

    setMessages(data || [])
  }

  async function sendMessage(e) {
    e.preventDefault()

    if (!newMessage.trim() || !selectedChannel) return

    setLoading(true)
    setNotice("")

    const { error } = await supabase.from("messages").insert({
      class_id: classId,
      channel_id: selectedChannel.id,
      sender_id: user.id,
      text: newMessage.trim(),
    })

    if (error) {
      setNotice(error.message)
      setLoading(false)
      return
    }

    setNewMessage("")
    await loadMessages(selectedChannel.id)
    setLoading(false)
  }

  async function createChannel(e) {
    e.preventDefault()

    if (!channelName.trim()) return

    setLoading(true)
    setNotice("")

    const { error } = await supabase
      .from("class_channels")
      .insert({
        class_id: classId,
        name: channelName.trim().toLowerCase(),
        restricted,
        created_by: user.id,
      })

    if (error) {
      setNotice(error.message)
      setLoading(false)
      return
    }

    setChannelName("")
    setRestricted(false)

    await loadChannels()

    setNotice("Channel created.")
    setLoading(false)
  }

  useEffect(() => {
    loadChannels()
  }, [classId])

  useEffect(() => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id)
    }
  }, [selectedChannel])

  return (
    <div className="pb-24">
      <Link to="/classes" className="text-sm font-black text-[#21c064]">
        ← Back to Classes
      </Link>

      <div className="mt-6 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#21c064]">
          Class Workspace
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#111827]">
          TSA Class Hub
        </h1>

        <p className="mt-3 max-w-3xl text-[#4b5563]">
          Private class space with channels, messages, assignments, projects, and members.
        </p>
      </div>

      {notice && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-700">
          {notice}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6b7280]">
              Channels
            </p>
          </div>

          <div className="mt-4 space-y-1">
            {channels.length === 0 ? (
              <p className="rounded-2xl bg-[#f9fafb] p-4 text-sm font-bold text-[#6b7280]">
                No channels yet.
              </p>
            ) : (
              channels.map((channel) => {
                const active = selectedChannel?.id === channel.id

                return (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                      active
                        ? "bg-[#21c064] text-white"
                        : "text-[#4b5563] hover:bg-[#f3f4f6]"
                    }`}
                  >
                    <span>
                      <span className={active ? "text-white" : "text-[#9ca3af]"}>
                        #
                      </span>{" "}
                      {channel.name}
                    </span>

                    {channel.restricted && (
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-black ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        private
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>

          {canCreateChannels && (
            <form onSubmit={createChannel} className="mt-8">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#6b7280]">
                Create Channel
              </p>

              <input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="channel-name"
                className="w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
              />

              <label className="mt-4 flex items-center gap-3 text-sm font-bold text-[#4b5563]">
                <input
                  type="checkbox"
                  checked={restricted}
                  onChange={(e) => setRestricted(e.target.checked)}
                />

                Private Channel
              </label>

              <button
                disabled={loading}
                className="mt-4 w-full rounded-2xl bg-[#21c064] px-4 py-3 font-black text-white disabled:opacity-60"
              >
                Create Channel
              </button>
            </form>
          )}

          <div className="mt-8 rounded-2xl bg-[#f9fafb] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9ca3af]">
              Class ID
            </p>

            <p className="mt-2 break-all text-xs font-bold text-[#6b7280]">
              {classId}
            </p>
          </div>
        </aside>

        <section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
          <div className="border-b border-[#e5e7eb] px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-[#9ca3af]">#</span>

              <h2 className="text-xl font-black text-[#111827]">
                {selectedChannel?.name || "no-channel"}
              </h2>
            </div>

            <p className="mt-1 text-sm font-medium text-[#6b7280]">
              {selectedChannel?.restricted
                ? "Restricted channel."
                : "Class-wide discussion channel."}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#f9fafb] p-6">
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="rounded-3xl bg-white p-6 text-center">
                  <p className="font-black text-[#111827]">
                    No messages yet.
                  </p>

                  <p className="mt-2 text-sm text-[#6b7280]">
                    Start the conversation in this channel.
                  </p>
                </div>
              ) : (
                messages.map((message) => {
                  const senderName =
                    message.profiles?.display_name ||
                    message.profiles?.username ||
                    "Member"

                  return (
                    <div key={message.id} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#21c064] font-black text-white">
                        {senderName.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-black text-[#111827]">
                            {senderName}
                          </p>

                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                            Member
                          </span>
                        </div>

                        <p className="mt-2 leading-7 text-[#374151]">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <form onSubmit={sendMessage} className="border-t border-[#e5e7eb] bg-white p-4">
            <div className="flex gap-3">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={
                  selectedChannel
                    ? `Message #${selectedChannel.name}`
                    : "Select a channel"
                }
                disabled={!selectedChannel || loading}
                className="min-w-0 flex-1 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-5 py-4 font-bold text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#21c064]"
              />

              <button
                disabled={!selectedChannel || loading}
                className="rounded-2xl bg-[#21c064] px-6 py-4 font-black text-white disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}
