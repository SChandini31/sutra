import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardLayout() {
  const { role } = useAuth();
  const navigate = useNavigate();

  const linksByRole = {
    student: [
      { to: "/dashboard/student", label: "Dashboard" },
      { to: "/profile", label: "Profile" },
    ],
    faculty: [
      { to: "/dashboard/faculty", label: "Dashboard" },
      { to: "/profile", label: "Profile" },
    ],
    admin: [
      { to: "/dashboard/admin", label: "Dashboard" },
    ],
    parent: [
      { to: "/dashboard/parent", label: "Dashboard" },
    ],
  };

  const navItems = linksByRole[role] || [];

  return (
    <div className="dash-grid">
      <aside className="dash-aside">
        <div className="brand">Sutra</div>
        <nav className="dash-nav">
          {navItems.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `dash-link${isActive ? ' active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="dash-main">
        <div className="dash-header">
          <div className="dash-title">{role || 'Dashboard'}</div>
          <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="dash-card animate-in">
          <Outlet />
        </div>
      </main>

      <style>{`
        .dash-grid { min-height: calc(100vh - 140px); display: grid; grid-template-columns: 260px 1fr; gap: 16px; }
        .dash-aside { background: #3D348B; color: #fff; padding: 16px; border-radius: 12px; align-self: start; position: sticky; top: 84px; }
        .brand { font-weight: 700; font-size: 20px; margin-bottom: 16px; }
        .dash-nav { display: grid; gap: 8px; }
        .dash-link { display: block; padding: 10px 12px; border-radius: 8px; color: #EEF2FF; text-decoration: none; transition: background .15s ease, transform .05s ease; }
        .dash-link:hover { background: rgba(255,255,255,0.15); }
        .dash-link.active { background: #7678ED; color: #fff; }
        .dash-main { }
        .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .dash-title { font-weight: 700; font-size: 20px; text-transform: capitalize; color: #2E2E2E; }
        .btn-back { padding: 8px 12px; background: #F7B801; color: #2E2E2E; border: none; border-radius: 8px; cursor: pointer; }
        .dash-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); padding: 16px; }
        .animate-in { animation: fadeUp .35s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) { .dash-grid { grid-template-columns: 1fr; } .dash-aside { position: static; } }
      `}</style>
    </div>
  );
}


