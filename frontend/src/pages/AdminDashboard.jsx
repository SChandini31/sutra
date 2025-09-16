import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { api } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setError("");
        setLoading(true);
        const { data } = await api.get("/users");
        setUsers(data || []);
      } catch {
        setError("Failed to load users");
      } finally { setLoading(false); }
    }
    load();
  }, []);

  return (
    <div className="adm-grid">
      <div className="kpi-grid">
        <div className="kpi-card kpi-1">
          <div className="kpi-label">Total Users</div>
          <div className="kpi-value">{users.length}</div>
        </div>
        <div className="kpi-card kpi-2">
          <div className="kpi-label">Students</div>
          <div className="kpi-value">{users.filter(u => u.role === 'student').length}</div>
        </div>
        <div className="kpi-card kpi-3">
          <div className="kpi-label">Faculty</div>
          <div className="kpi-value">{users.filter(u => u.role === 'faculty').length}</div>
        </div>
        <div className="kpi-card kpi-4">
          <div className="kpi-label">Parents</div>
          <div className="kpi-value">{users.filter(u => u.role === 'parent').length}</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Users</div>
        {loading && <div className="hint">Loading…</div>}
        {error && <div className="error">{error}</div>}
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx}>
                  <td>{u.email}</td>
                  <td className="cap">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .adm-grid { display: grid; gap: 16px; }
        .kpi-grid { display: grid; gap: 16px; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1100px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) { .kpi-grid { grid-template-columns: 1fr; } }
        .kpi-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); border-top: 4px solid; animation: fadeUp .35s ease both; }
        .kpi-1 { border-top-color: #3D348B; }
        .kpi-2 { border-top-color: #7678ED; }
        .kpi-3 { border-top-color: #F7B801; }
        .kpi-4 { border-top-color: #FF6B35; }
        .kpi-label { color: #6b7280; font-size: 14px; }
        .kpi-value { font-size: 22px; font-weight: 700; }
        .panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); }
        .panel-header { padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; }
        .hint { padding: 12px 16px; font-size: 14px; color: #6b7280; }
        .error { padding: 12px 16px; font-size: 14px; color: #b91c1c; }
        .table-wrap { overflow-x: auto; }
        .table { width: 100%; border-collapse: collapse; }
        .table thead tr { background: #f3f4f6; }
        .table th, .table td { text-align: left; padding: 12px; border-top: 1px solid #e5e7eb; }
        .cap { text-transform: capitalize; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}


