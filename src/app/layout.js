import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main className="min-h-screen p-4 max-w-6xl mx-auto">{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
