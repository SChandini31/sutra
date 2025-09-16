import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function ParentDashboard() {
  const { api } = useAuth();
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data } = await api.get("/marks/student/1");
        setMarks(data || []);
      } catch {
      } finally { setLoading(false); }
    }
    load();
  }, []);

  return (
    <div className="par-grid">
      <div className="kpi-grid">
        <div className="kpi-card kpi-1">
          <div className="kpi-label">Attendance</div>
          <div className="kpi-value">94%</div>
        </div>
        <div className="kpi-card kpi-3">
          <div className="kpi-label">Alerts</div>
          <div className="kpi-value">2</div>
        </div>
        <div className="kpi-card kpi-4">
          <div className="kpi-label">Reports</div>
          <div className="kpi-value">Quarterly</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">Ward Performance</div>
        {loading && <div className="hint">Loading…</div>}
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Semester</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {(marks || []).map((m, idx) => (
                <tr key={idx}>
                  <td>{m.subject}</td>
                  <td>{m.semester}</td>
                  <td>{m.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .par-grid { display: grid; gap: 16px; }
        .kpi-grid { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .kpi-grid { grid-template-columns: 1fr; } }
        .kpi-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); border-top: 4px solid; animation: fadeUp .35s ease both; }
        .kpi-1 { border-top-color: #3D348B; }
        .kpi-3 { border-top-color: #F7B801; }
        .kpi-4 { border-top-color: #FF6B35; }
        .kpi-label { color: #6b7280; font-size: 14px; }
        .kpi-value { font-size: 22px; font-weight: 700; }
        .panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); }
        .panel-header { padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; }
        .hint { padding: 12px 16px; font-size: 14px; color: #6b7280; }
        .table-wrap { overflow-x: auto; }
        .table { width: 100%; border-collapse: collapse; }
        .table thead tr { background: #f3f4f6; }
        .table th, .table td { text-align: left; padding: 12px; border-top: 1px solid #e5e7eb; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}


