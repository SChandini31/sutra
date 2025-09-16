import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function FacultyDashboard() {
  const { api } = useAuth();
  const [form, setForm] = useState({ studentId: "", subject: "", marks: "", semester: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      setLoading(true);
      await api.post("/marks/upload", { student: form.studentId, subject: form.subject, marks: Number(form.marks), semester: form.semester });
      setMessage("Marks uploaded");
    } catch {
      setMessage("Upload failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="fac-grid">
      <div className="kpi-grid">
        <div className="kpi-card kpi-1">
          <div className="kpi-label">Assignments</div>
          <div className="kpi-value">12</div>
        </div>
        <div className="kpi-card kpi-2">
          <div className="kpi-label">Submissions</div>
          <div className="kpi-value">248</div>
        </div>
        <div className="kpi-card kpi-3">
          <div className="kpi-label">Pending Reviews</div>
          <div className="kpi-value">7</div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="panel space">
        <div className="panel-header">
          <span>Upload Marks</span>
          {loading && <span className="hint">Processing…</span>}
        </div>
        {message && <div className="info">{message}</div>}
        <div className="form-grid">
          <input name="studentId" placeholder="Student ID" className="input" value={form.studentId} onChange={onChange} required />
          <input name="subject" placeholder="Subject" className="input" value={form.subject} onChange={onChange} required />
          <input name="marks" type="number" placeholder="Marks" className="input" value={form.marks} onChange={onChange} required />
          <input name="semester" placeholder="Semester" className="input" value={form.semester} onChange={onChange} required />
        </div>
        <button disabled={loading} className="btn-primary">{loading ? 'Submitting…' : 'Submit'}</button>
      </form>

      <style>{`
        .fac-grid { display: grid; gap: 16px; }
        .kpi-grid { display: grid; gap: 16px; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .kpi-grid { grid-template-columns: 1fr; } }
        .kpi-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); border-top: 4px solid; animation: fadeUp .35s ease both; }
        .kpi-1 { border-top-color: #3D348B; }
        .kpi-2 { border-top-color: #7678ED; }
        .kpi-3 { border-top-color: #F7B801; }
        .kpi-label { color: #6b7280; font-size: 14px; }
        .kpi-value { font-size: 22px; font-weight: 700; }
        .panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); padding: 16px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600; }
        .hint { font-size: 12px; color: #6b7280; }
        .info { margin-top: 8px; font-size: 14px; color: #f18701; }
        .form-grid { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); margin-top: 12px; }
        @media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } }
        .input { width: 100%; padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; }
        .input:focus { border-color: #7678ED; box-shadow: 0 0 0 3px rgba(118,120,237,0.15); }
        .btn-primary { margin-top: 10px; padding: 10px 12px; background: #7678ED; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .btn-primary:disabled { opacity: .7; cursor: not-allowed; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}


