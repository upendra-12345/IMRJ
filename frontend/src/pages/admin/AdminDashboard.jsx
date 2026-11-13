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
  Mail,
  MessageSquare,
  Trash2,
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const SUBMISSION_API = `${BASE_URL}/api/submissions`;
const CONTACT_API = `${BASE_URL}/api/contact`;

const AdminDashboard = () => {
  const { admin, token, logout } = useAdminAuth();
  const navigate = useNavigate();

  // SUBMISSIONS
  const [submissions, setSubmissions] = useState([]);

  // CONTACT MESSAGES
  const [contacts, setContacts] = useState([]);

  // NAVIGATION
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);

  // LOADING
  const [loading, setLoading] = useState(true);
  const [contactLoading, setContactLoading] = useState(false);

  // SUBMISSION FILTERS
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // CONTACT FILTERS
  const [contactSearch, setContactSearch] = useState("");
  const [contactStatusFilter, setContactStatusFilter] = useState("All");

  // MODALS
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // STATISTICS
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    accepted: 0,
    rejected: 0,
  });

  // AUTH HEADERS
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${token}`,
  });

  // HANDLE AUTH ERRORS
  const handleAuthError = (error) => {
    if (error.response?.status === 401) {
      logout();
      navigate("/admin/login", { replace: true });
      return true;
    }

    return false;
  };

  // FETCH SUBMISSIONS
  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      const response = await axios.get(SUBMISSION_API, {
        headers: getAuthHeaders(),
        params: {
          limit: 100,
        },
      });

      const data = response.data.submissions || [];

      setSubmissions(data);

      setStats({
        total: response.data.total || data.length,
        pending: data.filter(
          (item) => item.status === "Pending"
        ).length,
        underReview: data.filter(
          (item) => item.status === "Under Review"
        ).length,
        accepted: data.filter(
          (item) => item.status === "Accepted"
        ).length,
        rejected: data.filter(
          (item) => item.status === "Rejected"
        ).length,
      });
    } catch (error) {
      console.error("Submission fetch error:", error);

      if (!handleAuthError(error)) {
        console.error(
          error.response?.data?.message || "Unable to fetch submissions."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // FETCH CONTACT MESSAGES
  const fetchContacts = async () => {
    try {
      setContactLoading(true);

      const response = await axios.get(
        `${CONTACT_API}/admin`,
        {
          headers: getAuthHeaders(),
        }
      );

      setContacts(response.data.contacts || []);
    } catch (error) {
      console.error("Contact fetch error:", error);

      if (!handleAuthError(error)) {
        alert(
          error.response?.data?.message ||
            "Unable to fetch contact messages."
        );
      }
    } finally {
      setContactLoading(false);
    }
  };

  // INITIAL DATA FETCH
  useEffect(() => {
    if (token) {
      fetchSubmissions();
      fetchContacts();
    }
  }, [token]);

  // LOGOUT
  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  // SIDEBAR NAVIGATION
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenu(false);

    if (tab === "submissions") {
      fetchSubmissions();
    }

    if (tab === "contacts") {
      fetchContacts();
    }
  };

  // UPDATE SUBMISSION STATUS
  const updateSubmissionStatus = async (id, status) => {
    try {
      await axios.patch(
        `${SUBMISSION_API}/${id}/status`,
        { status },
        {
          headers: getAuthHeaders(),
        }
      );

      await fetchSubmissions();

      setSelectedSubmission((prev) =>
        prev?._id === id ? { ...prev, status } : prev
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update submission status."
      );
    }
  };

  // DOWNLOAD RESEARCH PAPER
  const downloadPaper = async (id, filename) => {
    try {
      const response = await axios.get(
        `${SUBMISSION_API}/${id}/download`,
        {
          headers: getAuthHeaders(),
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
      console.error("Download error:", error);
      alert("Unable to download manuscript.");
    }
  };

  // UPDATE CONTACT STATUS
  const updateContactStatus = async (id, status) => {
    try {
      await axios.patch(
        `${CONTACT_API}/admin/${id}/status`,
        { status },
        {
          headers: getAuthHeaders(),
        }
      );

      await fetchContacts();

      setSelectedContact((prev) =>
        prev?._id === id ? { ...prev, status } : prev
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update message status."
      );
    }
  };

  // DELETE CONTACT MESSAGE
  const deleteContact = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${CONTACT_API}/admin/${id}`,
        {
          headers: getAuthHeaders(),
        }
      );

      setContacts((prev) =>
        prev.filter((contact) => contact._id !== id)
      );

      setSelectedContact(null);

      alert("Contact message deleted successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete contact message."
      );
    }
  };

  // FILTER SUBMISSIONS
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

  // FILTER CONTACTS
  const filteredContacts = contacts.filter((item) => {
    const searchText = contactSearch.toLowerCase();

    const matchesSearch =
      item.name?.toLowerCase().includes(searchText) ||
      item.email?.toLowerCase().includes(searchText) ||
      item.subject?.toLowerCase().includes(searchText) ||
      item.message?.toLowerCase().includes(searchText);

    const matchesStatus =
      contactStatusFilter === "All" ||
      item.status === contactStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // SUBMISSION STATUS COLORS
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

  // CONTACT STATUS COLORS
  const contactStatusStyle = (status) => {
    const styles = {
      Unread: "bg-amber-100 text-amber-700",
      Read: "bg-blue-100 text-blue-700",
      Replied: "bg-green-100 text-green-700",
    };

    return styles[status] || "bg-gray-100 text-gray-600";
  };

  // DASHBOARD STATISTICS
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

  const unreadContacts = contacts.filter(
    (item) => item.status === "Unread"
  ).length;

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

          <button
            type="button"
            onClick={() => handleTabChange("submissions")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition ${
              activeTab === "submissions"
                ? "bg-[#B89B64] text-[#173D35] font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <FileText size={20} />
            Submissions
          </button>

          {/* CONTACT MESSAGES */}
          <button
            type="button"
            onClick={() => handleTabChange("contacts")}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-left transition ${
              activeTab === "contacts"
                ? "bg-[#B89B64] text-[#173D35] font-semibold"
                : "text-white hover:bg-white/10"
            }`}
          >
            <span className="flex items-center gap-3">
              <Mail size={20} />
              Contact Messages
            </span>

            {unreadContacts > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {unreadContacts}
              </span>
            )}
          </button>

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
                  : activeTab === "contacts"
                  ? "Contact Messages"
                  : "Dashboard Overview"}
              </h2>

              <p className="text-sm text-gray-500">
                {activeTab === "profile"
                  ? "Manage your administrator account"
                  : activeTab === "contacts"
                  ? "Manage messages received from visitors"
                  : "Manage your journal administration"}
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

          {/* PROFILE */}
          {activeTab === "profile" && <AdminProfile />}

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif text-[#173D35]">
                  Welcome back, {admin?.name}
                </h2>

                <p className="text-gray-500 mt-2">
                  Here's what's happening with your journal today.
                </p>
              </div>

              {/* STATISTICS */}
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

              {/* CONTACT SUMMARY */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#173D35]">
                      Contact Messages
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      You have {contacts.length} total messages and{" "}
                      {unreadContacts} unread messages.
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-[#173D35]/10 text-[#173D35] flex items-center justify-center">
                    <MessageSquare size={24} />
                  </div>
                </div>

                <button
                  onClick={() => handleTabChange("contacts")}
                  className="mt-5 text-sm font-semibold text-[#173D35] hover:text-[#B89B64]"
                >
                  View Contact Messages →
                </button>
              </div>

              {/* RECENT SUBMISSIONS */}
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#173D35]">
                    Recent Submissions
                  </h3>

                  <button
                    onClick={() => handleTabChange("submissions")}
                    className="text-sm text-[#173D35] font-medium hover:text-[#B89B64]"
                  >
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[650px]">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                      <tr>
                        <th className="px-6 py-4">Paper Title</th>
                        <th className="px-6 py-4">Author</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="text-center py-10 text-gray-500">
                            Loading submissions...
                          </td>
                        </tr>
                      ) : submissions.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-10 text-gray-500">
                            No submissions found.
                          </td>
                        </tr>
                      ) : (
                        submissions.slice(0, 5).map((item) => (
                          <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                              {item.title}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-600">
                              {item.authorName}
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(item.createdAt).toLocaleDateString("en-IN")}
                            </td>

                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}

          {/* SUBMISSIONS SECTION */}
          {activeTab === "submissions" && (
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

                  <button
                    onClick={fetchSubmissions}
                    className="flex items-center justify-center gap-2 bg-[#173D35] text-white px-4 py-2.5 rounded-lg hover:bg-[#24574A]"
                  >
                    <RefreshCw size={16} />
                    Refresh
                  </button>
                </div>
              </div>

              {/* SUBMISSIONS TABLE */}
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
          )}

          {/* CONTACT MESSAGES SECTION */}
          {activeTab === "contacts" && (
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm">

              <div className="p-5 md:p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#173D35]">
                    Contact Messages
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    View and manage messages submitted through your contact page.
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
                      placeholder="Search messages..."
                      value={contactSearch}
                      onChange={(e) => setContactSearch(e.target.value)}
                      className="border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#173D35] w-full sm:w-52"
                    />
                  </div>

                  {/* STATUS FILTER */}
                  <select
                    value={contactStatusFilter}
                    onChange={(e) =>
                      setContactStatusFilter(e.target.value)
                    }
                    className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#173D35]"
                  >
                    <option value="All">All Messages</option>
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="Replied">Replied</option>
                  </select>

                  {/* REFRESH */}
                  <button
                    onClick={fetchContacts}
                    className="flex items-center justify-center gap-2 bg-[#173D35] text-white px-4 py-2.5 rounded-lg hover:bg-[#24574A]"
                  >
                    <RefreshCw size={16} />
                    Refresh
                  </button>
                </div>
              </div>

              {/* CONTACT TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">

                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {contactLoading ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-gray-500">
                          Loading contact messages...
                        </td>
                      </tr>
                    ) : filteredContacts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-gray-500">
                          No contact messages found.
                        </td>
                      </tr>
                    ) : (
                      filteredContacts.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">

                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-800">
                              {item.name}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                              {item.phone || "No phone number"}
                            </p>
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-600">
                            {item.email}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-800">
                            {item.subject}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString("en-IN")}
                          </td>

                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${contactStatusStyle(item.status)}`}>
                              {item.status}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">

                              <button
                                onClick={() => setSelectedContact(item)}
                                title="View Message"
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Eye size={18} />
                              </button>

                              <button
                                onClick={() => deleteContact(item._id)}
                                title="Delete Message"
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={18} />
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
                Showing {filteredContacts.length} of {contacts.length} messages
              </div>

            </section>
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
                  {selectedSubmission.abstract || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400 mb-2">
                  Update Status
                </p>

                <select
                  value={selectedSubmission.status}
                  onChange={(e) =>
                    updateSubmissionStatus(
                      selectedSubmission._id,
                      e.target.value
                    )
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

      {/* CONTACT MESSAGE DETAILS MODAL */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-[#173D35]">
                  Contact Message
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Message details from your website visitor
                </p>
              </div>

              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-red-500"
                aria-label="Close message"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-5">

              <div>
                <p className="text-xs uppercase text-gray-400">
                  Name
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  {selectedContact.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">
                  Email
                </p>

                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-[#173D35] font-medium mt-1 inline-block hover:underline"
                >
                  {selectedContact.email}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">
                  Phone
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  {selectedContact.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">
                  Subject
                </p>

                <p className="text-gray-800 font-medium mt-1">
                  {selectedContact.subject}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">
                  Message
                </p>

                <p className="text-gray-700 mt-2 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">
                  Received On
                </p>

                <p className="text-gray-800 mt-1">
                  {new Date(selectedContact.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              {/* UPDATE MESSAGE STATUS */}
              <div>
                <p className="text-xs uppercase text-gray-400 mb-2">
                  Update Message Status
                </p>

                <select
                  value={selectedContact.status}
                  onChange={(e) =>
                    updateContactStatus(
                      selectedContact._id,
                      e.target.value
                    )
                  }
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#173D35]"
                >
                  <option value="Unread">Unread</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
              </div>

              {/* REPLY THROUGH EMAIL */}
              <a
                href={`mailto:${selectedContact.email}?subject=${encodeURIComponent(
                  `Re: ${selectedContact.subject}`
                )}`}
                className="w-full bg-[#173D35] text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-[#24574A]"
              >
                <Mail size={18} />
                Reply Through Email
              </a>

              {/* DELETE */}
              <button
                onClick={() => deleteContact(selectedContact._id)}
                className="w-full border border-red-200 text-red-600 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-red-50"
              >
                <Trash2 size={18} />
                Delete Message
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