import { Outlet, NavLink } from "react-router-dom"
import { Trophy } from "lucide-react"
import { pages } from "../data/appData"

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f5f6f8] text-[#1f2937]">
      <header className="sticky top-0 z-40 border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#21c064] text-white">
              <Trophy className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-black text-[#111827]">
                TSA Hub
              </h1>

              <p className="hidden text-xs font-bold text-[#6b7280] sm:block">
import { NavLink, Outlet } from "react-router-dom"
import {
  CalendarDays,
  Home,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react"

const pages = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: Home },
  { id: "classes", label: "Classes", path: "/classes", icon: Users },
  { id: "calendar", label: "Calendar", path: "/calendar", icon: CalendarDays },
  { id: "sunny", label: "Sunny", path: "/sunny", icon: Sparkles },
  { id: "profile", label: "Profile", path: "/profile", icon: UserRound },
  { id: "admin", label: "Admin", path: "/admin", icon: ShieldCheck },
]

export default function Layout() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--primary)] text-lg font-black text-white shadow-sm">
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

          <nav className="hidden items-center gap-2 md:flex">
          <nav className="hidden items-center gap-1 md:flex">
            {pages.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? "bg-[#21c064] text-white"
                      : "text-[#4b5563] hover:bg-[#f3f4f6]"
                  `rounded-xl px-4 py-2.5 text-sm font-black transition ${
                    isActive
                      ? "bg-[var(--primary-soft)] text-[var(--primary-hover)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--text)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e5e7eb] bg-white md:hidden">
        <div className="grid grid-cols-6 gap-1 px-2 py-2">
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border)] bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="grid grid-cols-6 gap-1">
          {pages.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `rounded-2xl px-2 py-3 text-center text-xs font-black ${
                  isActive
                    ? "bg-[#21c064] text-white"
                    : "text-[#6b7280]"
                `rounded-xl px-1 py-2 text-center text-[10px] font-black transition ${
                  isActive
                    ? "bg-[var(--primary-soft)] text-[var(--primary-hover)]"
                    : "text-[var(--text-muted)]"
                }`
              }
            >
              <item.icon className="mx-auto mb-1 h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
