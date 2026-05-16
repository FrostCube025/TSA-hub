import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

import Layout from "./components/Layout"

import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Assignments from "./pages/Assignments"
import Chat from "./pages/Chat"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="dashboard"
              element={<Dashboard />}
            />

            <Route
              path="projects"
              element={<Projects />}
            />

            <Route
              path="assignments"
              element={<Assignments />}
            />

            <Route
              path="chat"
              element={<Chat />}
            />

            <Route
              path="admin"
              element={<Admin />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}