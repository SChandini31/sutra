import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { api } = useAuth();
  const [form, setForm] = useState({ name: "", college: "", department: "", year: "", dob: "", additional_details: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data } = await api.get("/profile");
        setForm({
          name: data?.name || "",
          college: data?.college || "",
          department: data?.department || "",
          year: data?.year || "",
          dob: data?.dob || "",
          additional_details: data?.additional_details || "",
        });
      } catch {
      } finally { setLoading(false); }
    }
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await api.put("/profile/update", form);
      setMessage("Profile updated");
    } catch {
      setMessage("Update failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="profile-form">
      <div className="form-header">
        <div className="title">Edit Profile</div>
        {loading && <span className="hint">Loading…</span>}
      </div>
      {message && <div className="info">{message}</div>}
      <div className="grid">
        <input name="name" placeholder="Name" className="input" value={form.name} onChange={onChange} />
        <input name="college" placeholder="College" className="input" value={form.college} onChange={onChange} />
        <input name="department" placeholder="Department" className="input" value={form.department} onChange={onChange} />
        <input name="year" placeholder="Year" className="input" value={form.year} onChange={onChange} />
        <input name="dob" placeholder="Date of Birth" className="input" value={form.dob} onChange={onChange} />
        <input name="additional_details" placeholder="Additional Details" className="input" value={form.additional_details} onChange={onChange} />
      </div>
      <div className="actions">
        <button className="btn-primary">Save</button>
      </div>

      <style>{`
        .profile-form { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 6px 18px rgba(16,24,40,0.06); padding: 16px; max-width: 900px; }
        .form-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
        .title { font-weight: 600; }
        .hint { font-size: 12px; color: #6b7280; }
        .info { margin-top: 8px; font-size: 14px; color: #f18701; }
        .grid { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); margin-top: 12px; }
        @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
        .input { width: 100%; padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; }
        .input:focus { border-color: #7678ED; box-shadow: 0 0 0 3px rgba(118,120,237,0.15); }
        .actions { display: flex; justify-content: end; margin-top: 10px; }
        .btn-primary { padding: 10px 12px; background: #3EB489; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
      `}</style>
    </form>
  );
}


