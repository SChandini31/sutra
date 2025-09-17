import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function StudentDashboard() {
  const { api } = useAuth();
  const [profile, setProfile] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const p = await api.get("/profile");
        setProfile(p.data);
        if (p?.data?.id) {
          const m = await api.get(`/marks/student/${p.data.id}`);
          setMarks(m.data || []);
        }
      } catch {
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="dashboard-container">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card kpi-gpa">
          <div className="kpi-label">GPA</div>
          <div className="kpi-value">8.7</div>
        </div>
        <div className="kpi-card kpi-credits">
          <div className="kpi-label">Completed Credits</div>
          <div className="kpi-value">96</div>
        </div>
        <div className="kpi-card kpi-attendance">
          <div className="kpi-label">Attendance</div>
          <div className="kpi-value">92%</div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-grid">
        {/* GPA Trend */}
        <div className="insight-card">
          <h3>Performance Trend (GPA)</h3>
          <div className="chart">
            <svg viewBox="0 0 200 100" preserveAspectRatio="none">
              <polyline
                fill="url(#grad)"
                stroke="#7678ED"
                strokeWidth="2"
                points="0,80 40,70 80,60 120,50 160,55 200,45"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7678ED" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7678ED" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="hint">GPA over semesters</p>
        </div>

        {/* Attendance Heatmap */}
        <div className="insight-card">
          <h3>Attendance Heatmap</h3>
          <div className="heatmap">
            {Array.from({ length: 35 }).map((_, idx) => {
              const val = Math.floor(Math.random() * 100);
              return (
                <div
                  key={idx}
                  className="heatmap-cell"
                  style={{ backgroundColor: `rgba(61,52,139,${val / 100})` }}
                  title={`${val}%`}
                />
              );
            })}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="insight-card">
          <h3>Subject Performance</h3>
          <div className="bars">
            {["Math", "Physics", "Chemistry", "CS", "English"].map(
              (sub, idx) => {
                const score = [82, 76, 88, 92, 79][idx];
                return (
                  <div key={idx} className="bar-item">
                    <div className="bar-label">{sub}</div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ width: `${score}%` }}
                      >
                        <span>{score}</span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="panel">
        <div className="panel-header">Profile</div>
        {loading && <div className="hint">Loading…</div>}
        {error && <div className="error">{error}</div>}
        <div className="profile-grid">
          <div>
            <span className="muted">Name</span>
            <div className="strong">{profile?.name || "-"}</div>
          </div>
          <div>
            <span className="muted">Department</span>
            <div className="strong">{profile?.department || "-"}</div>
          </div>
          <div>
            <span className="muted">College</span>
            <div className="strong">{profile?.college || "-"}</div>
          </div>
          <div>
            <span className="muted">Year</span>
            <div className="strong">{profile?.year || "-"}</div>
          </div>
        </div>
      </div>

      {/* Marks */}
      <div className="panel">
        <div className="panel-header">Marks</div>
        <div className="table-wrap">
          <table className="marks-table">
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

      {/* Internal CSS */}
      <style>{`
        /* Container */
        .dashboard-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #2E2E2E;
          padding: 20px;
          display: grid;
          gap: 24px;
        }

        /* KPI Cards */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .kpi-grid { grid-template-columns: 1fr; }
        }
        .kpi-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 6px 18px rgba(16,24,40,0.08);
          border-top: 6px solid;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .kpi-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(16,24,40,0.12); }
        .kpi-label { font-size: 0.9rem; color: #6b7280; }
        .kpi-value { font-size: 1.8rem; font-weight: 700; margin-top: 4px; }
        .kpi-gpa { border-top-color: #3D348B; }
        .kpi-credits { border-top-color: #7678ED; }
        .kpi-attendance { border-top-color: #F7B801; }

        /* Insights Grid */
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .insight-card {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 6px 18px rgba(16,24,40,0.06);
        }
        .insight-card h3 {
          margin-bottom: 12px;
          color: #3D348B;
        }
        .chart {
          width: 100%;
          height: 150px;
        }
        .chart svg {
          width: 100%;
          height: 100%;
        }

        /* Heatmap */
        .heatmap {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 6px;
          padding: 10px;
        }
        .heatmap-cell {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          transition: transform 0.2s, background-color 0.2s;
        }
        .heatmap-cell:hover {
          transform: scale(1.1);
          background-color: #FF6B35 !important;
        }

        /* Bars */
        .bars { display: flex; flex-direction: column; gap: 12px; }
        .bar-item { display: flex; flex-direction: column; }
        .bar-label { font-size: 0.9rem; margin-bottom: 4px; color: #2e2e2e; }
        .bar-track { background: #f0f0f0; border-radius: 8px; overflow: hidden; }
        .bar-fill {
          background: linear-gradient(90deg, #3D348B, #7678ED);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 6px;
          border-radius: 8px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          transition: background 0.3s;
        }
        .bar-fill:hover {
          background: linear-gradient(90deg, #F7B801, #FF6B35);
        }
        .bar-fill span { margin-left: 6px; }

        /* Panels */
        .panel {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(16,24,40,0.06);
        }
        .panel-header {
          font-weight: 600;
          padding: 12px 16px;
          border-bottom: 1px solid #e5e7eb;
          background: #f5f5f5;
          border-radius: 12px 12px 0 0;
        }

        /* Profile Grid */
        .profile-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 16px;
        }
        @media (max-width: 900px) { .profile-grid { grid-template-columns: 1fr; } }
        .muted { font-size: 0.85rem; color: #6b7280; }
        .strong { font-weight: 600; font-size: 1rem; color: #2E2E2E; }

        /* Marks Table */
        .table-wrap { overflow-x: auto; }
        .marks-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 400px;
        }
        .marks-table thead tr { background: #f5f5f5; }
        .marks-table th, .marks-table td {
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }
        .marks-table th { font-weight: 600; }
        .marks-table tr:hover { background: #fefefe; }

        /* Error & Hint */
        .error { color: #FF6B35; padding: 12px; text-align: center; }
        .hint { color: #7678ED; padding: 12px; text-align: center; }

      `}</style>
    </div>
  );
}




