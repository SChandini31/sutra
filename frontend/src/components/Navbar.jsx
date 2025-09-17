import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { role, token, logout } = useAuth();
  const navigate = useNavigate();

  const roleLinks = {
    student: [
      { to: "/dashboard/student", label: "Dashboard" },
      { to: "/profile", label: "Profile" },
    ],
    faculty: [
      { to: "/dashboard/faculty", label: "Dashboard" },
      { to: "/dashboard/faculty", label: "Upload Marks" },
    ],
    admin: [
      { to: "/dashboard/admin", label: "Manage Users" },
    ],
    parent: [
      { to: "/dashboard/parent", label: "Dashboard" },
    ],
  };

  const links = token ? (roleLinks[role] || []) : [];

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to={token ? (links[0]?.to || "/") : "/"} className="logo">
         <img src="/image.png" alt="Sutra"/>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <a href="/#features">Features</a>
          <a href="/#testimonials">Testimonials</a>
          <a href="/#demo">Demo</a>
          <a href="/#contact">Contact</a>
          {token && <NavLink to={links[0]?.to || "/"} className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>}
          {token && <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink>}
          {links.slice(1).map(l => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? "active" : ""}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="auth-buttons">
          {!token ? (
            <>
              <NavLink to="/login" className="btn-secondary">Login</NavLink>
              <NavLink to="/signup" className="btn-primary">Get Started</NavLink>
            </>
          ) : (
            <button onClick={() => { logout(); navigate('/'); }} className="btn-logout">Logout</button>
          )}
        </div>
      </div>

      <style>{`
        /* Navbar Styles */
        .navbar {
          position: sticky;
          top: 0;
          width: 100%;
          backdrop-filter: blur(10px);
           z-index: 1000;
        }
        .navbar img{
            border-radius: 9px;
            width: 130px;
           }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 50%;
        }

        .logo {
          font-weight: 600;
          color: #3D348B;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 30px;
        }
        .nav-links a {
          text-decoration: none;
          color: darkblue;
          font-size: 0.95rem;
          padding: 6px 8px;
          border-radius: 4px;
        }
        .nav-links a:hover {
          color:rgb(30, 7, 243);
          background: rgba(0,0,0,0.05);
        }
        .nav-links a.active {
          color: #3D348B;
          font-weight: 900;
        }

        .auth-buttons {
          display: flex;
          gap: 15px;
        }
        .btn-primary {
          background-color: #7678ED;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          cursor: bubble;
        }
        .btn-secondary {
          background-color: white;
          color: #7678ED;
          border: 2px solid #7678ED;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          cursor: bubble;
        }
        .btn-logout {
          background-color: #FF6B35;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: bubble;
        }

        @media (max-width: 760px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
