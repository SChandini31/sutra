import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function RootLayout() {
  return (
    <div className="root">
      <Navbar />
      <main className="content">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />

      <style>{`
        .root { min-height: 100vh; display: flex; flex-direction: column; background: #F5F5F5; }
        .content { flex: 1; width: 100%; }
        .container { max-width: 1120px; margin: 0 auto; padding: 24px 16px; }
      `}</style>
    </div>
  );
}


