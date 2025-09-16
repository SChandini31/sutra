import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { roleToPath } from "../utils/roles.js";

export default function RoleRoute({ allow }) {
  const { token, role } = useAuth();
  const location = useLocation();
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!allow.includes(role)) return <Navigate to={roleToPath[role] || "/"} replace />;
  return <Outlet />;
}


