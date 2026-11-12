import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Upload,
  User,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  X,
  FileUp,
  Info,
} from "lucide-react";

function SubmitManuscript() {
  const initialFormData = {
    title: "",
    authorName: "",
    email: "",
    phone: "",
    institution: "",
    department: "",
    category: "",
    abstract: "",
    keywords: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [paper, setPaper] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Input styling
  const inputStyle =
    "w-full rounded-lg border border-[#E8E3D8] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#252B29] outline-none transition focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20 placeholder:text-[#A0A39D]";

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (
      !allowedTypes.includes(file.type) ||
      !allowedExtensions.includes(extension)
    ) {
      setMessage("Please upload a valid PDF, DOC, or DOCX file.");
      setPaper(null);
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("File size must be less than 10 MB.");
      setPaper(null);
      e.target.value = "";
      return;
    }

    setMessage("");
    setPaper(file);
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setPaper(null);

    const fileInput = document.getElementById("paper-upload");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Submit manuscript to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paper) {
      setMessage("Please upload your research paper.");
      return;
    }

    setLoading(true);
    setMessage("");
    setSubmissionId("");
    setIsSubmitted(false);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("paper", paper);

      const response = await fetch(
        "http://localhost:5001/api/submissions",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit your manuscript."
        );
      }

      setMessage(result.message);
      setSubmissionId(result.submission.submissionId);
      setIsSubmitted(true);

      setFormData(initialFormData);
      setPaper(null);

      e.target.reset();
    } catch (error) {
      console.error("Submission Error:", error);

      setMessage(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* HERO */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#173D35]/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-[#B89B64]" />

              <span className="text-[#D1BC91] text-xs uppercase tracking-[4px] font-semibold">
                Share Your Research
              </span>
            </div>

            <div className="w-14 h-14 bg-[#B89B64]/20 text-[#D1BC91] rounded-xl flex items-center justify-center mb-6">
              <FileText size={30} />
            </div>

            <h1 className="text-4xl md:text-6xl text-white mb-6">
              Submit Your{" "}
              <span className="text-[#D1BC91] italic">
                Manuscript
              </span>
            </h1>

            <p className="text-gray-200 leading-8 text-base md:text-lg">
              Share your academic research and contribute to the
              exchange of knowledge. Complete the submission form
              and provide your manuscript details.
            </p>

            <div className="flex items-center gap-3 mt-8 text-sm text-gray-300">
              <Link to="/" className="hover:text-[#D1BC91]">
                Home
              </Link>

              <span className="text-[#B89B64]">/</span>

              <span className="text-[#D1BC91]">
                Submit Manuscript
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SUBMISSION INFORMATION */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <FileText size={24} />,
              title: "Prepare Manuscript",
              text: "Prepare your research paper in PDF, DOC, or DOCX format.",
            },
            {
              icon: <User size={24} />,
              title: "Author Information",
              text: "Provide accurate author and institutional details.",
            },
            {
              icon: <Upload size={24} />,
              title: "Upload & Submit",
              text: "Upload your manuscript and complete the submission form.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#E8E3D8] rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-[#173D35] text-[#D1BC91] rounded-lg flex items-center justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#173D35] mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-[#777D76] leading-7">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMISSION FORM */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 pb-24">
        <div className="bg-white border border-[#E8E3D8] rounded-2xl shadow-sm overflow-hidden">
          {/* FORM HEADER */}
          <div className="bg-[#173D35] px-7 md:px-10 py-8">
            <span className="text-[#D1BC91] uppercase tracking-[3px] text-xs font-semibold">
              Manuscript Submission
            </span>

            <h2 className="text-3xl text-white mt-3">
              Submission Form
            </h2>

            <p className="text-gray-300 text-sm mt-3">
              Fields marked with * are required.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-10 space-y-9"
          >
            {/* SECTION 1: AUTHOR INFORMATION */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#F2F0E9] text-[#173D35] rounded-lg flex items-center justify-center">
                  <User size={19} />
                </div>

                <h3 className="text-xl text-[#173D35] font-semibold">
                  Author Information
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Author Full Name *
                  </label>

                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Institution / University *
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Enter institution name"
                    required
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Department *
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter your department"
                    required
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-[#E8E3D8]" />

            {/* SECTION 2: RESEARCH PAPER DETAILS */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#F2F0E9] text-[#173D35] rounded-lg flex items-center justify-center">
                  <BookOpen size={19} />
                </div>

                <h3 className="text-xl text-[#173D35] font-semibold">
                  Research Paper Details
                </h3>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Paper Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your research paper title"
                    required
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Research Category *
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className={inputStyle}
                  >
                    <option value="">Select research category</option>
                    <option>Computer Science & Engineering</option>
                    <option>Management & Commerce</option>
                    <option>Business Administration</option>
                    <option>Social Sciences</option>
                    <option>Education & Humanities</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Abstract *
                  </label>

                  <textarea
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write a short summary of your research..."
                    required
                    className={`${inputStyle} resize-none`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Keywords *
                  </label>

                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="Example: Machine Learning, AI, Data Science"
                    required
                    className={inputStyle}
                  />

                  <p className="text-xs text-[#92958E] mt-2">
                    Separate keywords using commas.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px bg-[#E8E3D8]" />

            {/* SECTION 3: FILE UPLOAD */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-[#F2F0E9] text-[#173D35] rounded-lg flex items-center justify-center">
                  <Upload size={19} />
                </div>

                <h3 className="text-xl text-[#173D35] font-semibold">
                  Upload Research Paper
                </h3>
              </div>

              <label
                htmlFor="paper-upload"
                className="block border-2 border-dashed border-[#D1BC91] bg-[#FAF9F6] rounded-xl p-8 text-center cursor-pointer hover:bg-[#F2F0E9] transition"
              >
                <FileUp
                  size={38}
                  className="mx-auto text-[#A58A56] mb-4"
                />

                <p className="text-[#173D35] font-semibold">
                  Click to upload your manuscript
                </p>

                <p className="text-xs text-[#777D76] mt-2">
                  PDF, DOC, DOCX (Maximum 10 MB)
                </p>

                <input
                  id="paper-upload"
                  type="file"
                  name="paper"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>

              {paper && (
                <div className="mt-4 flex items-center justify-between bg-[#F2F0E9] p-4 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="text-[#173D35] shrink-0" />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#173D35] truncate">
                        {paper.name}
                      </p>

                      <p className="text-xs text-[#777D76]">
                        {(paper.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={loading}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    aria-label="Remove uploaded file"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* INFORMATION */}
            <div className="bg-[#F2F0E9] rounded-lg p-5 flex items-start gap-3">
              <Info
                size={20}
                className="text-[#A58A56] shrink-0 mt-0.5"
              />

              <p className="text-sm text-[#777D76] leading-7">
                Please ensure that the manuscript and author information
                are accurate before submitting. Follow the journal's
                official submission guidelines.
              </p>
            </div>

            {/* SUCCESS / ERROR MESSAGE */}
            {message && (
              <div
                role="status"
                className={`rounded-lg p-5 border ${
                  isSubmitted
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isSubmitted && (
                    <CheckCircle2 size={22} className="shrink-0" />
                  )}

                  <div>
                    <p className="font-semibold">{message}</p>

                    {isSubmitted && (
                      <p className="text-sm mt-2">
                        Your Submission ID:{" "}
                        <strong>{submissionId}</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading || isSubmitted}
              className="w-full bg-[#173D35] hover:bg-[#245448] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition duration-300 shadow-md"
            >
              {loading
                ? "Submitting Manuscript..."
                : isSubmitted
                  ? "Manuscript Submitted"
                  : "Submit Manuscript"}

              {!loading && !isSubmitted && (
                <ArrowRight size={19} />
              )}

              {isSubmitted && <CheckCircle2 size={19} />}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SubmitManuscript;