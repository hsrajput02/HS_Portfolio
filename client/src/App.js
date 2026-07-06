import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

// Admin Components
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import Stats from "./pages/admin/Stats";
import Projects from "./pages/admin/Projects";
import Skills from "./pages/admin/Skills";
import Experience from "./pages/admin/Experience";
import Certificates from "./pages/admin/Certificates";
import Messages from "./pages/admin/Messages";
import Settings from "./pages/admin/Settings";
import ChangePassword from "./pages/admin/ChangePassword";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Layout */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Dashboard />}>

            {/* Dashboard Overview */}
            <Route index element={<DashboardHome />} />

            {/* Stats */}
            <Route
              path="stats"
              element={<Stats />}
            />

            {/* Projects */}
            <Route
              path="projects"
              element={<Projects />}
            />

            {/* Skills */}
            <Route
              path="skills"
              element={<Skills />}
            />

            {/* Experience */}
            <Route
              path="experience"
              element={<Experience />}
            />

            {/* Certificates */}
            <Route
              path="certificates"
              element={<Certificates />}
            />

            {/* Messages */}
            <Route
              path="messages"
              element={<Messages />}
            />

            {/* Settings */}
            <Route
              path="settings"
              element={<Settings />}
            />

            {/* Change Password */}
            <Route
              path="change-password"
              element={<ChangePassword />}
            />

          </Route>
          {/* 404 Not Found */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;