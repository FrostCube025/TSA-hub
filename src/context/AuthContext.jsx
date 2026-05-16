import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle()

    if (error) {
      console.log(error.message)
      setProfile(null)
      return
    }

    setProfile(data)
  }

  async function loadTags(userId) {
    const { data, error } = await supabase
      .from("user_tags")
      .select(`
        tag_id,
        tags (
          id,
          name,
          color,
          authority_level
        )
      `)
      .eq("user_id", userId)

    if (error) {
      console.log(error.message)
      setTags([])
      return
    }

    const cleanTags = data.map((item) => item.tags)

    setTags(cleanTags)
  }

  useEffect(() => {
    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const currentUser = session?.user ?? null

      setUser(currentUser)

      if (currentUser) {
        await loadProfile(currentUser.id)
        await loadTags(currentUser.id)
      } else {
        setProfile(null)
        setTags([])
      }

      setLoading(false)
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const currentUser = session?.user ?? null

      setUser(currentUser)

      if (currentUser) {
        setTimeout(async () => {
          await loadProfile(currentUser.id)
          await loadTags(currentUser.id)
        }, 0)
      } else {
        setProfile(null)
        setTags([])
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        tags,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}