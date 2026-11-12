import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

import AdminProfile from "../../components/admin/AdminProfile";

import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  LogOut,
  Search,
  RefreshCw,
  Eye,
  Download,
  Menu,
  X,
  UserCircle,
} from "lucide-react";

const API_URL = "http://localhost:5001/api/submissions";

const AdminDashboard = () => {
  const { admin, token, logout } = useAdminAuth();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("submissions");

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // FETCH SUBMISSIONS
  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 100,
        },
      });

      const data = response.data.submissions || [];

      setSubmissions(data);

      setStats({
        total: response.data.total || 0,
        pending: data.filter((item) => item.status === "Pending").length,
        underReview: data.filter(
          (item) => item.status === "Under Review"
        ).length,
        accepted: data.filter((item) => item.status === "Accepted").length,
        rejected: data.filter((item) => item.status === "Rejected").length,
      });
    } catch (error) {
      console.error("Fetch error:", error);

      if (error.response?.status === 401) {
        logout();
        navigate("/admin/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // LOGOUT
  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  // SIDEBAR NAVIGATION
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenu(false);
  };

  // UPDATE SUBMISSION STATUS
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API_URL}/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchSubmissions();

      if (selectedSubmission?._id === id) {
        setSelectedSubmission((prev) => ({
          ...prev,
          status,
        }));
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to update status."
      );
    }
  };

  // DOWNLOAD PAPER
  const downloadPaper = async (id, filename) => {
    try {
      const response = await axios.get(
        `${API_URL}/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "research-paper.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Unable to download manuscript.");
    }
  };

  // SEARCH AND FILTER
  const filteredSubmissions = submissions.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.title?.toLowerCase().includes(searchText) ||
      item.authorName?.toLowerCase().includes(searchText) ||
      item.submissionId?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // STATUS COLORS
  const statusStyle = (status) => {
    const styles = {
      Pending: "bg-amber-100 text-amber-700",
      "Under Review": "bg-blue-100 text-blue-700",
      Accepted: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
      "Revision Required": "bg-purple-100 text-purple-700",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  // STATISTICS
  const statCards = [
    {
      title: "Total Submissions",
      value: stats.total,
      icon: FileText,
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
    },
    {
      title: "Under Review",
      value: stats.underReview,
      icon: LayoutDashboard,
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: CheckCircle,
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex">

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#173D35] text-white flex flex-col transform transition-transform duration-300 ${
          mobileMenu
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* LOGO */}
        <div className="p-7 border-b border-white/10">
          <h1 className="text-2xl font-serif font-bold">
            IMRJ
          </h1>

          <p className="text-xs text-[#B89B64] mt-1">
            ADMINISTRATION PANEL
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-5 space-y-2">

          {/* DASHBOARD */}
          <button
            type="button"
            onClick={() => handleTabChange("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              activeTab === "dashboard"
                ? "bg-[#B89B64] text-[#173D35] font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          {/* SUBMISSIONS */}
          <button
            type="button"
            onClick={() => {
              handleTabChange("submissions");
              fetchSubmissions();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              activeTab === "submissions"
                ? "bg-[#B89B64] text-[#173D35] font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <FileText size={20} />
            Submissions
          </button>

          {/* MY PROFILE */}
          <button
            type="button"
            onClick={() => handleTabChange("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              activeTab === "profile"
                ? "bg-[#B89B64] text-[#173D35] font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <UserCircle size={20} />
            My Profile
          </button>

        </nav>

        {/* LOGOUT */}
        <div className="p-5 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">

        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 px-5 md:px-8 py-5 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden text-[#173D35]"
              aria-label="Toggle menu"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>

            <div>
              <h2 className="text-xl font-semibold text-[#173D35]">
                {activeTab === "profile"
                  ? "My Profile"
                  : activeTab === "submissions"
                  ? "Research Submissions"
                  : "Dashboard Overview"}
              </h2>

              <p className="text-sm text-gray-500">
                {activeTab === "profile"
                  ? "Manage your administrator account"
                  : "Manage your journal submissions"}
              </p>
            </div>

          </div>

          {/* ADMIN INFORMATION */}
          <div className="flex items-center gap-3">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-[#173D35]">
                {admin?.name}
              </p>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#173D35] text-white flex items-center justify-center font-semibold">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-5 md:p-8">

          {/* PROFILE SECTION */}
          {activeTab === "profile" && (
            <AdminProfile />
          )}

          {/* DASHBOARD / SUBMISSIONS SECTION */}
          {activeTab !== "profile" && (
            <>

              {/* WELCOME */}
              {activeTab === "dashboard" && (
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif text-[#173D35]">
                    Welcome back, {admin?.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Here's what's happening with your journal today.
                  </p>
                </div>
              )}

              {/* STATISTICS */}
              {activeTab === "dashboard" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-9">

                  {statCards.map((card) => {
                    const Icon = card.icon;

                    return (
                      <div
                        key={card.title}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                      >
                        <div className="w-11 h-11 rounded-lg bg-[#173D35]/10 text-[#173D35] flex items-center justify-center">
                          <Icon size={22} />
                        </div>

                        <p className="text-sm text-gray-500 mt-5">
                          {card.title}
                        </p>

                        <h3 className="text-3xl font-bold text-[#173D35] mt-1">
                          {loading ? "..." : card.value}
                        </h3>
                      </div>
                    );
                  })}

                </div>
              )}

              {/* SUBMISSIONS TABLE */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm">

                <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between gap-4">

                  <div>
                    <h3 className="text-xl font-semibold text-[#173D35]">
                      Research Submissions
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Manage submitted research manuscripts.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">

                    {/* SEARCH */}
                    <div className="relative">
                      <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        placeholder="Search papers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#173D35] w-full sm:w-52"
                      />
                    </div>

                    {/* STATUS FILTER */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#173D35]"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Revision Required">Revision Required</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    {/* REFRESH */}
                    <button
                      onClick={fetchSubmissions}
                      className="flex items-center justify-center gap-2 bg-[#173D35] text-white px-4 py-2.5 rounded-lg hover:bg-[#24574A]"
                    >
                      <RefreshCw size={16} />
                      Refresh
                    </button>

                  </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">

                  <table className="w-full text-left min-w-[850px]">

                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-4">Submission ID</th>
                        <th className="px-6 py-4">Paper Title</th>
                        <th className="px-6 py-4">Author</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {loading ? (
                        <tr>
                          <td colSpan="6" className="text-center py-12 text-gray-500">
                            Loading submissions...
                          </td>
                        </tr>
                      ) : filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-12 text-gray-500">
                            No submissions found.
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50">

                            <td className="px-6 py-4 text-xs font-medium text-[#173D35]">
                              {item.submissionId}
                            </td>

                            <td className="px-6 py-4">
                              <p className="font-medium text-gray-800">
                                {item.title}
                              </p>

                              <p className="text-xs text-gray-400 mt-1">
                                {item.category}
                              </p>
                            </td>

                            <td className="px-6 py-4">
                              <p className="text-sm text-gray-800">
                                {item.authorName}
                              </p>

                              <p className="text-xs text-gray-400">
                                {item.email}
                              </p>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(item.createdAt).toLocaleDateString("en-IN")}
                            </td>

                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(item.status)}`}>
                                {item.status}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">

                                <button
                                  onClick={() => setSelectedSubmission(item)}
                                  title="View Details"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Eye size={18} />
                                </button>

                                <button
                                  onClick={() =>
                                    downloadPaper(
                                      item._id,
                                      item.paperFile?.originalName
                                    )
                                  }
                                  title="Download Paper"
                                  className="text-[#173D35] hover:text-[#B89B64]"
                                >
                                  <Download size={18} />
                                </button>

                              </div>
                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>

                <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
                  Showing {filteredSubmissions.length} of {stats.total} submissions
                </div>

              </section>

            </>
          )}

        </div>
      </main>

      {/* SUBMISSION DETAILS MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-xl font-semibold text-[#173D35]">
                Submission Details
              </h2>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-500 hover:text-red-500"
                aria-label="Close details"
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-4">

              {[
                ["Submission ID", selectedSubmission.submissionId],
                ["Paper Title", selectedSubmission.title],
                ["Author", selectedSubmission.authorName],
                ["Email", selectedSubmission.email],
                ["Phone", selectedSubmission.phone],
                ["Institution", selectedSubmission.institution],
                ["Department", selectedSubmission.department],
                ["Category", selectedSubmission.category],
                ["Keywords", selectedSubmission.keywords],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs uppercase text-gray-400">
                    {label}
                  </p>

                  <p className="text-gray-800 font-medium mt-1">
                    {value || "Not provided"}
                  </p>
                </div>
              ))}

              <div>
                <p className="text-xs uppercase text-gray-400">
                  Abstract
                </p>

                <p className="text-gray-700 mt-1 leading-relaxed">
                  {selectedSubmission.abstract}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400 mb-2">
                  Update Status
                </p>

                <select
                  value={selectedSubmission.status}
                  onChange={(e) =>
                    updateStatus(selectedSubmission._id, e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#173D35]"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Revision Required">Revision Required</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() =>
                  downloadPaper(
                    selectedSubmission._id,
                    selectedSubmission.paperFile?.originalName
                  )
                }
                className="w-full bg-[#173D35] text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-[#24574A]"
              >
                <Download size={18} />
                Download Research Paper
              </button>

            </div>
          </div>
        </div>
      )}

      {/* MOBILE SIDEBAR OVERLAY */}
      {mobileMenu && (
        <button
          aria-label="Close sidebar"
          onClick={() => setMobileMenu(false)}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        />
      )}

    </div>
  );
};

export default AdminDashboard;