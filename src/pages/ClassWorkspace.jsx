import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../context/AuthContext"

export default function ClassWorkspace() {
  const { classId } = useParams()
  const { user, tags } = useAuth()

  const [classInfo, setClassInfo] = useState(null)
  const [channels, setChannels] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [channelName, setChannelName] = useState("")
  const [restricted, setRestricted] = useState(false)
  const [allowed, setAllowed] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notice, setNotice] = useState("")

  const isCreator = tags.some((tag) => tag.id === "creator")

  const canCreateChannels = tags.some((tag) =>
    ["creator", "admin", "teacher"].includes(tag.id)
  )

  async function checkAccess() {
    if (isCreator) {
      setAllowed(true)
      return
    }

    const { data, error } = await supabase
      .from("class_members")
      .select("approved")
      .eq("class_id", classId)
      .eq("user_id", user.id)
      .maybeSingle()

    if (error || !data || !data.approved) {
      setAllowed(false)
      return
    }

    setAllowed(true)
  }

  async function loadClass() {
    const { data, error } = await supabase
      .from("classes")
      .select("id, name, school_name")
      .eq("id", classId)
      .maybeSingle()

    if (error) {
      setNotice(error.message)
      return
    }

    setClassInfo(data)
  }

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

    if (data?.length && !selectedChannel) {
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
          avatar_url
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

    const { error } = await supabase
      .from("messages")
      .insert({
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

    const cleanName = channelName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")

    const { error } = await supabase
      .from("class_channels")
      .insert({
        class_id: classId,
        name: cleanName,
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
    if (user) {
      checkAccess()
    }
  }, [user, classId, isCreator])

  useEffect(() => {
    if (allowed) {
      loadClass()
      loadChannels()
    }
  }, [allowed, classId])

  useEffect(() => {
    if (selectedChannel) {
      loadMessages(selectedChannel.id)
    }
  }, [selectedChannel])

  if (allowed === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-black text-[var(--text-muted)]">
          Loading class...
        </p>
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="mx-auto mt-16 max-w-xl rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
        <h1 className="text-3xl font-black text-amber-800">
          Class access pending
        </h1>

        <p className="mt-3 text-amber-700">
          A teacher or class owner must approve your request before you can access this class.
        </p>

        <Link
          to="/classes"
          className="mt-6 inline-block rounded-2xl bg-[var(--primary)] px-6 py-3 font-black text-white"
        >
          Back to Classes
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <Link
        to="/classes"
        className="text-sm font-black text-[var(--primary)]"
      >
        ← Back to Classes
      </Link>

      <div className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--primary)]">
          Class Workspace
        </p>

        <h1 className="mt-2 text-4xl font-black text-[var(--text)]">
          {classInfo?.name || "TSA Class"}
        </h1>

        <p className="mt-2 text-[var(--text-muted)]">
          {classInfo?.school_name || "Technology Student Association"}
        </p>
      </div>

      {notice && (
        <div className="mt-5 rounded-2xl bg-[var(--primary-soft)] p-4 font-bold text-[var(--primary-hover)]">
          {notice}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Channels
          </p>

          <div className="space-y-1">
            {channels.length === 0 ? (
              <p className="rounded-2xl bg-[var(--surface-soft)] p-4 text-sm font-bold text-[var(--text-muted)]">
                No channels yet.
              </p>
            ) : (
              channels.map((channel) => {
                const active = selectedChannel?.id === channel.id

                return (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-left text-sm font-black transition ${
                      active
                        ? "bg-[var(--primary-soft)] text-[var(--primary-hover)]"
                        : "text-[var(--text-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--text)]"
                    }`}
                  >
                    <span>
                      <span className="opacity-60">#</span>{" "}
                      {channel.name}
                    </span>

                    {channel.restricted && (
                      <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] text-amber-700">
                        Private
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>

          {canCreateChannels && (
            <form
              onSubmit={createChannel}
              className="mt-8 border-t border-[var(--border)] pt-5"
            >
              <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Create Channel
              </p>

              <input
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="channel-name"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 font-bold text-[var(--text)] outline-none focus:border-[var(--primary)]"
              />

              <label className="mt-4 flex items-center gap-3 text-sm font-bold text-[var(--text-muted)]">
                <input
                  type="checkbox"
                  checked={restricted}
                  onChange={(e) => setRestricted(e.target.checked)}
                />
                Restricted channel
              </label>

              <button
                disabled={loading}
                className="mt-4 w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-black text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
              >
                Create Channel
              </button>
            </form>
          )}
        </aside>

        <section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <div className="border-b border-[var(--border)] px-6 py-4">
            <h2 className="text-lg font-black text-[var(--text)]">
              <span className="text-[var(--text-muted)]">#</span>{" "}
              {selectedChannel?.name || "Select a channel"}
            </h2>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {selectedChannel?.restricted
                ? "Restricted channel"
                : "Class discussion"}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto bg-[var(--surface-soft)] p-6">
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="rounded-2xl bg-[var(--surface)] p-6 text-center">
                  <p className="font-black text-[var(--text)]">
                    No messages yet.
                  </p>
                </div>
              ) : (
                messages.map((message) => {
                  const senderName =
                    message.profiles?.display_name ||
                    message.profiles?.username ||
                    "Member"

                  return (
                    <div key={message.id} className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] font-black text-white">
                        {senderName.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-black text-[var(--text)]">
                          {senderName}
                        </p>

                        <p className="mt-1 leading-7 text-[var(--text)]">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <form
            onSubmit={sendMessage}
            className="border-t border-[var(--border)] p-4"
          >
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
                className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 font-bold text-[var(--text)] outline-none focus:border-[var(--primary)]"
              />

              <button
                disabled={!selectedChannel || loading}
                className="rounded-xl bg-[var(--primary)] px-6 py-4 font-black text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
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