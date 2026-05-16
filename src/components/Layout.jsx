import { Outlet, NavLink } from "react-router-dom"
import { Lock, Trophy } from "lucide-react"
import { pages } from "../data/appData"

export default function Layout() {
  return (
<div className="min-h-screen bg-black text-white">      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <NavLink to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
              <Trophy className="h-6 w-6" />
            </div>

            <div className="text-left">
              <h1 className="text-xl font-black text-white">TSA Hub</h1>
              <p className="hidden text-xs font-semibold text-slate-400 sm:block">
                Technology Student Association
              </p>
            </div>
          </NavLink>

          <nav className="hidden rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {pages.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-black transition ${
                    isActive
                      ? "bg-cyan-300 text-slate-950"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white">
            <Lock className="h-4 w-4 text-cyan-200" />
            <span className="hidden sm:inline">Secure</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-28 pt-10 md:px-8 md:pb-12">
        <Outlet />
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-slate-950/95 px-2 py-2 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {pages.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `rounded-2xl px-2 py-3 text-center text-xs font-black ${
                  isActive ? "bg-cyan-300 text-slate-950" : "text-slate-300"
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