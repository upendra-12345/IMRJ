import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { LockKeyhole, Mail, ArrowRight, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Logo and Heading */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-[#173D35] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <ShieldCheck size={32} className="text-[#B89B64]" />
          </div>

          <h1 className="text-3xl font-bold text-[#173D35] font-serif">
            IMRJ Admin Portal
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            International Multidisciplinary Research Journal
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          <div className="mb-7">
            <h2 className="text-2xl font-semibold text-[#252B29]">
              Welcome Back
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Sign in to manage research paper submissions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#252B29] mb-2">
                Admin Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#173D35] focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#252B29] mb-2">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#173D35] focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#173D35] hover:bg-[#24574A] text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}

              {!loading && <ArrowRight size={18} />}
            </button>

          </form>

          <div className="mt-7 pt-5 border-t border-gray-100 text-center">
            <Link
              to="/"
              className="text-sm text-[#173D35] hover:text-[#B89B64] transition"
            >
              ← Back to Journal Website
            </Link>
          </div>

        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} IMRJ. Admin access only.
        </p>

      </div>

    </div>
  );
};

export default AdminLogin;