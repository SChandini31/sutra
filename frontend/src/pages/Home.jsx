import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Sutra – Student Performance Tracker</h1>
        <p>
          Monitor academic progress, manage marks, and keep everyone aligned. A modern dashboard for students, faculty, parents, and admins.
        </p>
        <div className="hero-buttons">
          <NavLink to="/login" className="btn-primary">Get Started</NavLink>
          <NavLink to="/signup" className="btn-secondary">Create Account</NavLink>
        </div>
      </section>

      <section className="roles-section">
        <div className="role-card student">
          <div className="role-title">Student</div>
          <p>Track marks, view profile, and monitor progress across semesters.</p>
        </div>
        <div className="role-card faculty">
          <div className="role-title">Faculty</div>
          <p>Upload marks quickly and keep records accurate and secure.</p>
        </div>
        <div className="role-card admin-parent">
          <div className="role-title">Admin & Parent</div>
          <p>Oversee users and get insights on performance for better decisions.</p>
        </div>
      </section>

      <section className="why-section">
        <div className="section-title">Why Sutra?</div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-title">Clean Interface</div>
            <div className="feature-desc">Minimal, fast and responsive UI with modern design.</div>
          </div>
          <div className="feature-card">
            <div className="feature-title">Role-Based Access</div>
            <div className="feature-desc">Separate dashboards for Students, Faculty, Admins, and Parents.</div>
          </div>
          <div className="feature-card">
            <div className="feature-title">Secure</div>
            <div className="feature-desc">JWT authentication and fine-grained route protection.</div>
          </div>
        </div>
      </section>

      <section className="analytics" id="features">
        <div className="section-title">Insights at a glance</div>
        <div className="analytics-grid">
          <div className="chart-card">
            <div className="chart-header">Performance Trend (GPA)</div>
            <TrendChart />
          </div>
          <div className="chart-card">
            <div className="chart-header">Attendance Heatmap</div>
            <AttendanceHeatmap />
          </div>
          <div className="chart-card">
            <div className="chart-header">Subject Performance</div>
            <SubjectBarChart />
          </div>
        </div>
      </section>

      <section id="testimonials" className="extras">
        <div className="section-title">Testimonials</div>
        <div className="extras-grid">
          <div className="quote">“Sutra made tracking my semester effortless.” <span>– Student</span></div>
          <div className="quote">“Uploading marks is quick and reliable.” <span>– Faculty</span></div>
          <div className="quote">“Clear view of performance trends.” <span>– Parent</span></div>
        </div>
      </section>

      <section id="demo" className="extras">
        <div className="section-title">Live Demo</div>
        <p className="center">Log in with your account to see personalized dashboards in action.</p>
      </section>

      <section id="contact" className="extras">
        <div className="section-title">Contact</div>
        <p className="center">Questions? Reach us at <a href="mailto:support@sutra.app" className="link">support@sutra.app</a></p>
      </section>

      <style>{`
        .home-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Hero Section */
        .hero-section {
          text-align: center;
          margin-bottom: 60px;
        }
        .hero-section h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #3d348b;
        }
        .hero-section p {
          margin-top: 20px;
          color: #555;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        .hero-buttons {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .btn-primary {
          background-color: #7678ed;
          color: white;
          padding: 12px 25px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
        }
        .btn-secondary {
          background-color: white;
          color: #7678ed;
          border: 2px solid #7678ed;
          padding: 12px 25px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
        }

        /* Roles Section */
        .roles-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
        }
        .role-card {
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          border-top: 6px solid;
          width: 300px;
          text-align: center;
        }
        .role-card .role-title {
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 1.2rem;
        }
        .student { border-color: #3d348b; }
        .faculty { border-color: #f7b801; }
        .admin-parent { border-color: #f08a5d; }
        .role-card p { color: #555; font-size: 0.95rem; line-height: 1.5; }

        /* Why Section */
        .why-section {
          background: #f5f5f5;
          padding: 40px 20px;
          border-radius: 12px;
        }
        .section-title {
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 30px;
          text-align: center;
        }
        .features-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .feature-card {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          width: 250px;
          text-align: center;
        }
        .feature-title {
          font-weight: 600;
          margin-bottom: 10px;
          font-size: 1.1rem;
        }
        .feature-desc {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.4;
        }

        /* Analytics */
        .analytics { margin-top: 60px; }
        .analytics-grid { display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 1100px) { .analytics-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 700px) { .analytics-grid { grid-template-columns: 1fr; } }
        .chart-card { background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 6px 18px rgba(16,24,40,0.06); animation: fadeUp .35s ease both; }
        .chart-header { font-weight: 600; margin-bottom: 8px; }
        .chart-wrap { width: 100%; height: 220px; }
        .legend { display: flex; gap: 12px; align-items: center; margin-top: 8px; color: #6b7280; font-size: 12px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

        /* Extras */
        .extras { margin-top: 60px; }
        .extras-grid { display: grid; gap: 16px; grid-template-columns: repeat(3,1fr); }
        @media (max-width: 900px) { .extras-grid { grid-template-columns: 1fr; } }
        .quote { background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:16px; box-shadow:0 6px 18px rgba(16,24,40,0.06); font-size:14px; }
        .quote span { color:#2E2E2E; font-weight:600; }
        .center { text-align:center; color:#2E2E2E; }
        .link { color:#7678ED; text-decoration:none; }
        .link:hover { text-decoration:underline; }

        /* Responsive */
        @media (max-width: 768px) {
          .roles-section {
            flex-direction: column;
            align-items: center;
          }
          .features-grid {
            flex-direction: column;
            align-items: center;
          }
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

function TrendChart() {
  const data = [7.1, 7.4, 7.8, 8.2, 8.1, 8.5, 8.7];
  const w = 360; const h = 180; const pad = 24;
  const max = 10; const min = 6;
  const stepX = (w - pad * 2) / (data.length - 1);
  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <div className="chart-wrap">
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="gpaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#7678ed" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7678ed" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="#e5e7eb" strokeWidth="1" points={`${pad},${h-pad} ${w-pad},${h-pad}`} />
        <polyline fill="none" stroke="#7678ed" strokeWidth="2.5" points={points} style={{filter:'drop-shadow(0 1px 1px rgba(0,0,0,0.15))'}} />
        <polygon fill="url(#gpaGradient)" points={`${points} ${w-pad},${h-pad} ${pad},${h-pad}`} />
        {data.map((v,i)=>{
          const x = pad + i * stepX;
          const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
          return <circle key={i} cx={x} cy={y} r="3.5" fill="#7678ed" />
        })}
      </svg>
      <div className="legend"><span className="dot" style={{background:'#7678ed'}}></span> GPA over semesters</div>
    </div>
  );
}

function AttendanceHeatmap() {
  // 7 days x 5 weeks heatmap values 0..1
  const values = Array.from({ length: 35 }, () => Math.random());
  return (
    <div className="chart-wrap" style={{height: 220}}>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7, 1fr)',gap:4}}>
        {values.map((v, i) => {
          const c = Math.round(200 * v);
          const bg = `rgb(${255-c}, ${255-c}, 255)`;
          return <div key={i} title={`${Math.round(v*100)}%`} style={{height:26,borderRadius:6,background:bg,transition:'transform .15s',}} className="heatcell" />
        })}
      </div>
      <style>{`
        .heatcell:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
}

function SubjectBarChart() {
  const subjects = [
    { name: 'Math', score: 82 },
    { name: 'Physics', score: 76 },
    { name: 'Chemistry', score: 88 },
    { name: 'CS', score: 92 },
    { name: 'English', score: 79 },
  ];
  const w = 360; const h = 200; const pad = 28; const barW = 44; const gap = 20;
  return (
    <div className="chart-wrap">
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
        {subjects.map((s, i) => {
          const x = pad + i * (barW + gap);
          const barH = (s.score / 100) * (h - pad * 2);
          const y = h - pad - barH;
          const color = i % 2 === 0 ? '#3d348b' : '#7678ed';
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barH} rx="6" fill={color} />
              <text x={x + barW/2} y={h - pad + 16} textAnchor="middle" fontSize="10" fill="#6b7280">{s.name}</text>
              <text x={x + barW/2} y={y - 6} textAnchor="middle" fontSize="11" fill="#111827">{s.score}</text>
            </g>
          );
        })}
      </svg>
      <div className="legend"><span className="dot" style={{background:'#3d348b'}}></span> Core • <span className="dot" style={{background:'#7678ed'}}></span> Electives</div>
    </div>
  );
}
