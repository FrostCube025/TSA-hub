import {
  CalendarDays,
  ClipboardList,
  Home,
  ShieldCheck,
  Trophy,
  UserRound,
  Users,
} from "lucide-react"

export const pages = [
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: Home },
  { id: "classes", label: "Classes", path: "/classes", icon: Users },
  { id: "projects", label: "Projects", path: "/projects", icon: Trophy },
  { id: "assignments", label: "Work", path: "/assignments", icon: ClipboardList },
  { id: "calendar", label: "Calendar", path: "/calendar", icon: CalendarDays },
  { id: "profile", label: "Profile", path: "/profile", icon: UserRound },
  { id: "admin", label: "Admin", path: "/admin", icon: ShieldCheck },
]

export const projects = [
  { name: "Webmaster", progress: 72, members: 5, status: "Active" },
  { name: "Coding", progress: 48, members: 4, status: "Building" },
  { name: "Engineering Design", progress: 63, members: 6, status: "Testing" },
  { name: "Video Game Design", progress: 39, members: 3, status: "Prototype" },
]

export const assignments = [
  { title: "Submit project outline", team: "Webmaster", due: "Friday", submitted: "9/12" },
  { title: "Upload prototype video", team: "Engineering", due: "Monday", submitted: "4/6" },
  { title: "Rubric self-check", team: "All Teams", due: "Next Week", submitted: "17/28" },
]
