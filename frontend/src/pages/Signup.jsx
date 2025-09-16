import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "", role: "student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await signup({ email: form.email, password: form.password, role: form.role });
      navigate("/");
    } catch (err) {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Create your account</h1>
        <p className="signup-sub">Join Sutra – Student Performance Tracker</p>
        <form onSubmit={onSubmit} className="signup-form">
          {error && <div className="signup-error">{error}</div>}
          <div className="field">
            <label className="label">Email</label>
            <input name="email" type="email" required value={form.email} onChange={onChange} className="input" />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input name="password" type="password" required value={form.password} onChange={onChange} className="input" />
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <input name="confirm" type="password" required value={form.confirm} onChange={onChange} className="input" />
          </div>
          <div className="field">
            <label className="label">Role</label>
            <select name="role" value={form.role} onChange={onChange} className="input">
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
              <option value="parent">Parent</option>
            </select>
          </div>
          <button disabled={loading} className="btn-primary w-full">{loading ? 'Creating...' : 'Create Account'}</button>
          <p className="signup-hint">Have an account? <Link to="/">Login</Link></p>
        </form>
      </div>

      <style>{`
        .signup-page { min-height: 70vh; display: grid; place-items: center; padding: 16px; }
        .signup-card { width: 100%; max-width: 420px; background: rgba(255,255,255,0.95); border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 10px 25px rgba(16,24,40,0.08); padding: 24px; }
        .signup-title { margin: 0; text-align: center; font-size: 28px; color: #3d348b; font-weight: 700; }
        .signup-sub { margin: 6px 0 0; text-align: center; color: #6b7280; font-size: 14px; }
        .signup-form { margin-top: 20px; display: grid; gap: 12px; }
        .signup-error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 12px; font-size: 14px; text-align: center; }
        .field { display: grid; gap: 6px; }
        .label { font-size: 14px; color: #374151; }
        .input { width: 100%; padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; }
        .input:focus { border-color: #7678ed; box-shadow: 0 0 0 3px rgba(118,120,237,0.15); }
        .btn-primary { background: #7678ed; color: white; border: none; padding: 10px 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .signup-hint { text-align: center; font-size: 14px; color: #6b7280; }
        .signup-hint a { color: #f18701; text-decoration: none; }
      `}</style>
    </div>
  );
}


