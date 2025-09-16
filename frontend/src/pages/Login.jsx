import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const roleToPath = {
  student: "/dashboard/student",
  faculty: "/dashboard/faculty",
  admin: "/dashboard/admin",
  parent: "/dashboard/parent",
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ email: form.email, password: form.password });
      const role = data?.role || form.role;
      navigate(roleToPath[role] || "/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-sub">Login to Sutra – Student Performance Tracker</p>
        <form onSubmit={onSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="field">
            <label className="label">Email</label>
            <input name="email" type="email" required value={form.email} onChange={onChange} className="input" />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input name="password" type="password" required value={form.password} onChange={onChange} className="input" />
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
          <button disabled={loading} className="btn-primary w-full">{loading ? 'Logging in...' : 'Login'}</button>
          <p className="login-hint">No account? <Link to="/signup">Sign up</Link></p>
        </form>
      </div>

      <style>{`
        .login-page { min-height: 70vh; display: grid; place-items: center; padding: 16px; }
        .login-card { width: 100%; max-width: 420px; background: rgba(255,255,255,0.95); border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 10px 25px rgba(16,24,40,0.08); padding: 24px; }
        .login-title { margin: 0; text-align: center; font-size: 28px; color: #3d348b; font-weight: 700; }
        .login-sub { margin: 6px 0 0; text-align: center; color: #6b7280; font-size: 14px; }
        .login-form { margin-top: 20px; display: grid; gap: 12px; }
        .login-error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; border-radius: 8px; padding: 10px 12px; font-size: 14px; text-align: center; }
        .field { display: grid; gap: 6px; }
        .label { font-size: 14px; color: #374151; }
        .input { width: 100%; padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; outline: none; }
        .input:focus { border-color: #7678ed; box-shadow: 0 0 0 3px rgba(118,120,237,0.15); }
        .btn-primary { background: #7678ed; color: white; border: none; padding: 10px 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
        .login-hint { text-align: center; font-size: 14px; color: #6b7280; }
        .login-hint a { color: #f18701; text-decoration: none; }
      `}</style>
    </div>
  );
}


