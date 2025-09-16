import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import FacultyDashboard from "./pages/FacultyDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ParentDashboard from "./pages/ParentDashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";

const router = createBrowserRouter([
  {
    element: <RootLayout />, children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        element: <ProtectedRoute />, children: [
          {
            element: <DashboardLayout />, children: [
              { element: <RoleRoute allow={["student"]} />, children: [{ path: "dashboard/student", element: <StudentDashboard /> }] },
              { element: <RoleRoute allow={["faculty"]} />, children: [{ path: "dashboard/faculty", element: <FacultyDashboard /> }] },
              { element: <RoleRoute allow={["admin"]} />, children: [{ path: "dashboard/admin", element: <AdminDashboard /> }] },
              { element: <RoleRoute allow={["parent"]} />, children: [{ path: "dashboard/parent", element: <ParentDashboard /> }] },
              { path: "profile", element: <Profile /> },
            ]
          }
        ]
      }
    ]
  }
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
