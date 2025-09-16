export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copy">© 2025 Sutra. All Rights Reserved.</div>
        <nav className="footer-links">
          <a href="#">Privacy Policy</a>
          <span className="sep">|</span>
          <a href="#">Terms of Use</a>
          <span className="sep">|</span>
          <a href="#">Contact</a>
        </nav>
      </div>
      <style>{`
        .footer { width: 100%; background: rgba(255,255,255,0.95); border-top: 1px solid #e5e7eb; }
        .footer-container { max-width: 1200px; margin: 0 auto; padding: 12px 20px; display: flex; flex-direction: column; gap: 8px; align-items: center; justify-content: space-between; color: #6b7280; font-size: 14px; }
        @media (min-width: 640px) { .footer-container { flex-direction: row; } }
        .footer-links { display: flex; align-items: center; gap: 16px; }
        .footer-links a { color: #2E2E2E; text-decoration: none; }
        .footer-links a:hover { color: #3D348B; }
        .sep { color: #d1d5db; }
      `}</style>
    </footer>
  );
}


