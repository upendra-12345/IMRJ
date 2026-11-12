import { useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { UserCircle, Save, Lock, Mail, User } from "lucide-react";

const API_URL = "http://localhost:5001/api/auth";

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.patch(
        `${API_URL}/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateAdmin(response.data.admin, response.data.token);

      setFormData({
        name: response.data.admin.name,
        email: response.data.admin.email,
        currentPassword: "",
        newPassword: "",
      });

      setMessage("Your profile has been updated successfully.");

    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">

      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#173D35]">
          My Profile
        </h2>
        <p className="text-gray-500 mt-2">
          Manage your administrator account and security settings.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">

        {/* PROFILE HEADER */}
        <div className="flex items-center gap-4 pb-7 border-b border-gray-100 mb-7">

          <div className="w-16 h-16 rounded-full bg-[#173D35] text-white flex items-center justify-center">
            <UserCircle size={38} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#173D35]">
              {admin?.name}
            </h3>
            <p className="text-sm text-gray-500">
              Journal Administrator
            </p>
          </div>

        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 text-sm">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[#173D35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-[#173D35]"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* PASSWORD SECTION */}
          <div className="border-t border-gray-100 pt-6">

            <h3 className="text-lg font-semibold text-[#173D35] mb-2 flex items-center gap-2">
              <Lock size={19} />
              Security Settings
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              Confirm your current password to save profile changes.
              Leave the new password blank if you don't want to change it.
            </p>

            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#173D35]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Enter new password (optional)"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#173D35]"
                />
              </div>

            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="border-t border-gray-100 pt-6">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#173D35] text-white px-7 py-3 rounded-lg hover:bg-[#24574A] transition disabled:opacity-50"
            >
              <Save size={18} />
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminProfile;