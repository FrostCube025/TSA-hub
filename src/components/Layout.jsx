import { NavLink, Outlet } from "react-router-dom"
import {
  CalendarDays,
  Home,
  LogOut,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react"
import { supabase } from "../lib/supabaseClient"

const pages = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    id: "classes",
    label: "Classes",
    path: "/classes",
    icon: Users,
  },
  {
    id: "calendar",
    label: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    id: "sunny",
    label: "Sunny",
    path: "/sunny",
    icon: Sparkles,
  },
  {
    id: "profile",
    label: "Profile",
    path: "/profile",
    icon: UserRound,
  },
  {
    id: "admin",
    label: "Admin",
    path: "/admin",
    icon: ShieldCheck,
  },
]

export default function Layout() {
  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <NavLink
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] font-black text-white shadow-sm">
              T
            </div>

            <div>
              <h1 className="text-xl font-black text-[var(--text)]">
                TSA Hub
              </h1>

              <p className="hidden text-xs font-bold text-[var(--text-muted)] sm:block">
                Technology Student Association
              </p>
            </div>
          </NavLink>


          <div className="flex items-center gap-2">

            <nav className="hidden items-center gap-1 md:flex">
              {pages.map((item) => {
                const Icon = item.icon

                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition ${
                        isActive
                          ? "bg-[var(--primary-soft)] text-[var(--primary-hover)]"
                          : "text-[var(--text-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--text)]"
                      }`
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                )
              })}
            </nav>


            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">
                Logout
              </span>
            </button>

          </div>

        </div>
      </header>


      <main className="mx-auto max-w-7xl px-5 py-8">
        <Outlet />
      </main>


      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="grid grid-cols-6 gap-1">

          {pages.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-xl px-1 py-2 text-center text-[10px] font-black ${
                    isActive
                      ? "bg-[var(--primary-soft)] text-[var(--primary-hover)]"
                      : "text-[var(--text-muted)]"
                  }`
                }
              >
                <Icon className="mx-auto mb-1 h-5 w-5" />
                {item.label}
              </NavLink>
            )
          })}

        </div>
      </nav>

    </div>
  )
}