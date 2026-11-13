import { useState, useEffect } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";

import {
  UserCircle,
  Save,
  Lock,
  Mail,
  User,
} from "lucide-react";

// API Configuration
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const API_URL = BASE_URL
  ? `${BASE_URL}/api/auth`
  : null;

const AdminProfile = () => {
  const { admin, token, updateAdmin } = useAdminAuth();

  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Keep form synchronized with admin context
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: admin?.name || "",
      email: admin?.email || "",
    }));
  }, [admin]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  // Update administrator profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!API_URL) {
        throw new Error(
          "Backend API URL is not configured. Check your frontend .env file."
        );
      }

      if (!token) {
        throw new Error(
          "Your session has expired. Please log in again."
        );
      }

      const response = await axios.patch(
        `${API_URL}/profile`,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          currentPassword: formData.currentPassword,
          ...(formData.newPassword.trim() && {
            newPassword: formData.newPassword,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedAdmin = response.data.admin;
      const newToken = response.data.token;

      if (!updatedAdmin) {
        throw new Error(
          "Invalid response received from the server."
        );
      }

      // Update admin context
      updateAdmin(
        updatedAdmin,
        newToken || token
      );

      // Reset password fields
      setFormData({
        name: updatedAdmin.name || "",
        email: updatedAdmin.email || "",
        currentPassword: "",
        newPassword: "",
      });

      setMessage(
        response.data.message ||
        "Your profile has been updated successfully."
      );

    } catch (err) {
      console.error(
        "Admin Profile Update Error:",
        err
      );

      if (err.response?.status === 401) {
        setError(
          "Your session has expired or your current password is incorrect. Please verify your details."
        );
      } else if (err.response?.status === 403) {
        setError(
          "You are not authorized to update this profile."
        );
      } else {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Unable to update profile. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#173D35]">
          My Profile
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your administrator account and security settings.
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">

        {/* PROFILE HEADER */}
        <div className="flex items-center gap-4 pb-7 border-b border-gray-100 mb-7">

          <div className="w-16 h-16 rounded-full bg-[#173D35] text-white flex items-center justify-center">
            <UserCircle size={38} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#173D35]">
              {admin?.name || "Administrator"}
            </h3>

            <p className="text-sm text-gray-500">
              Journal Administrator
            </p>
          </div>

        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div
            role="status"
            className="mb-6 p-4 rounded-lg bg-green-50 border border-green-100 text-green-700 text-sm"
          >
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PERSONAL INFORMATION */}
          <div>

            <h3 className="text-lg font-semibold text-[#173D35] mb-5">
              Personal Information
            </h3>

            <div className="space-y-5">

              {/* FULL NAME */}
              <div>
                <label
                  htmlFor="admin-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="admin-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] transition"
                  />

                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="admin-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] transition"
                  />

                </div>
              </div>

            </div>
          </div>

          {/* SECURITY SETTINGS */}
          <div className="border-t border-gray-100 pt-6">

            <h3 className="text-lg font-semibold text-[#173D35] mb-2 flex items-center gap-2">
              <Lock size={19} />
              Security Settings
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              Enter your current password to save profile changes.
              Leave the new password blank if you don't want to change it.
            </p>

            <div className="space-y-5">

              {/* CURRENT PASSWORD */}
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Password
                </label>

                <input
                  id="current-password"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] transition"
                />
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>

                <input
                  id="new-password"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Enter new password (optional)"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] transition"
                />

                <p className="text-xs text-gray-400 mt-2">
                  Minimum 8 characters if changing your password.
                </p>
              </div>

            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="border-t border-gray-100 pt-6">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#173D35] text-white px-7 py-3 rounded-lg hover:bg-[#24574A] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >

              <Save size={18} />

              {loading
                ? "Saving Changes..."
                : "Save Changes"}

            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminProfile;