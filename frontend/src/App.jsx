import { Routes, Route } from "react-router-dom";

// Public Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import EditorialBoard from "./pages/EditorialBoard";
import Reviewer from "./pages/Reviewers";
import CurrentIssue from "./pages/CurrentIssue";
import Archives from "./pages/Archives";
import Contact from "./pages/Contact";
import SubmitManuscript from "./pages/SubmitManuscript";
import ArchiveYear from "./pages/ArchiveYear";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
// NEW AUTHOR PAGES
import AuthorGuidelines from "./pages/AuthorGuidelines";
import PublicationEthics from "./pages/PublicationEthics";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Admin Protection
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

// Public Website Layout
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />

      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />

      <Route path="/editorial-board" element={<PublicLayout><EditorialBoard /></PublicLayout>} />
      <Route path="/reviewers" element={ <PublicLayout> <Reviewer /> </PublicLayout>  } />
  
 

      <Route path="/current-issue" element={<PublicLayout><CurrentIssue /></PublicLayout>} />

      <Route path="/archives" element={<PublicLayout><Archives /></PublicLayout>} />
      <Route path="/archives/:year" element={<ArchiveYear />} />

      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />



      {/* ================= AUTHOR ROUTES ================= */}

      <Route
        path="/author-guidelines"
        element={
          <PublicLayout>
            <AuthorGuidelines />
          </PublicLayout>
        }
      />

      <Route
        path="/publication-ethics"
        element={
          <PublicLayout>
            <PublicationEthics />
          </PublicLayout>
        }
      />

      <Route
        path="/submit-manuscript"
        element={
          <PublicLayout>
            <SubmitManuscript />
          </PublicLayout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
        <PublicLayout>
          <PrivacyPolicy />
        </PublicLayout>
        }
      />
      <Route path="/terms-and-conditions" element={<PublicLayout><TermsAndConditions /></PublicLayout>} />

  
      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />


      {/* ================= 404 PAGE ================= */}

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-[#173D35]">
                404
              </h1>

              <p className="text-gray-500 mt-3">
                Page Not Found
              </p>
            </div>
          </div>
        }
      />

    </Routes>
  );
}

export default App;