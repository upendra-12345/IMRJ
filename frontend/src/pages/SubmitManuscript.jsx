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
  Loader2,
  ShieldCheck,
} from "lucide-react";

// Backend API URL
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const API_URL = BASE_URL
  ? `${BASE_URL}/api/submissions`
  : "/api/submissions";

// Initial form data
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

// Allowed file extensions
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Reusable input styling
const inputStyle =
  "w-full rounded-xl border border-[#E8E3D8] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#252B29] outline-none transition-all duration-300 focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20 placeholder:text-[#A0A39D] disabled:cursor-not-allowed disabled:opacity-60";

// Information cards
const submissionSteps = [
  {
    icon: FileText,
    title: "Prepare Manuscript",
    text: "Prepare your research paper in PDF, DOC, or DOCX format.",
  },
  {
    icon: User,
    title: "Author Information",
    text: "Provide accurate author and institutional details.",
  },
  {
    icon: Upload,
    title: "Upload & Submit",
    text: "Upload your manuscript and complete the submission form.",
  },
];

function SubmitManuscript() {
  const [formData, setFormData] = useState(initialFormData);

  const [paper, setPaper] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [loading, setLoading] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setMessageType("");
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    // Validate extension
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setMessage("Please upload a valid PDF, DOC, or DOCX file.");
      setMessageType("error");
      setPaper(null);
      e.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setMessage("File size must not exceed 10 MB.");
      setMessageType("error");
      setPaper(null);
      e.target.value = "";
      return;
    }

    // Validate MIME type when available
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/octet-stream",
      "",
    ];

    if (!allowedMimeTypes.includes(file.type)) {
      setMessage("The selected file format is not supported.");
      setMessageType("error");
      setPaper(null);
      e.target.value = "";
      return;
    }

    setPaper(file);
    setMessage("");
    setMessageType("");
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setPaper(null);

    const fileInput = document.getElementById("paper-upload");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialFormData);
    setPaper(null);
    setMessage("");
    setMessageType("");
    setSubmissionId("");
    setIsSubmitted(false);

    const fileInput = document.getElementById("paper-upload");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Submit manuscript
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paper) {
      setMessage("Please upload your research manuscript.");
      setMessageType("error");
      return;
    }

    if (!API_URL) {
      setMessage("Backend API URL is not configured.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");
    setSubmissionId("");
    setIsSubmitted(false);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.trim());
      });

      data.append("paper", paper);

      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      // Safely parse server response
      let result = {};

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response. Please try again."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            `Submission failed (${response.status}). Please try again.`
        );
      }

      const generatedSubmissionId =
        result.submission?.submissionId ||
        result.submissionId ||
        "";

      setSubmissionId(generatedSubmissionId);

      setMessage(
        result.message ||
          "Your manuscript has been submitted successfully!"
      );

      setMessageType("success");
      setIsSubmitted(true);

      setFormData(initialFormData);
      setPaper(null);

      e.target.reset();

    } catch (error) {
      console.error("Manuscript Submission Error:", error);

      if (error instanceof TypeError) {
        setMessage(
          "Unable to connect to the server. Please check your internet connection or try again later."
        );
      } else {
        setMessage(
          error.message || "Something went wrong. Please try again."
        );
      }

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden py-20 md:py-24">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#173D35]/95 via-[#173D35]/90 to-[#173D35]/75" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-[#D1BC91]/15" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">

          <div className="max-w-3xl">

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-12 bg-[#B89B64]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1BC91]">
                Share Your Research
              </span>
            </div>

            <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D1BC91]/30 bg-white/10 text-[#D1BC91]">
              <FileText size={32} />
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
              Submit Your{" "}
              <span className="italic text-[#D1BC91]">
                Manuscript
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              Share your academic research and contribute to the exchange
              of knowledge. Complete the submission form and provide your
              manuscript details for editorial consideration.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <Link
                to="/"
                className="transition hover:text-[#D1BC91]"
              >
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

      {/* ================= SUBMISSION STEPS ================= */}

      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10">

        <div className="grid gap-6 md:grid-cols-3">

          {submissionSteps.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-[#E8E3D8] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#173D35] text-[#D1BC91] transition-colors group-hover:bg-[#B89B64] group-hover:text-white">
                  <Icon size={25} />
                </div>

                <h3 className="mb-3 text-lg font-bold text-[#173D35]">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {item.text}
                </p>
              </article>
            );
          })}

        </div>
      </section>

      {/* ================= SUBMISSION FORM ================= */}

      <section className="mx-auto max-w-5xl px-6 pb-20 md:px-10 md:pb-24">

        <div className="overflow-hidden rounded-3xl border border-[#E8E3D8] bg-white shadow-sm">

          {/* FORM HEADER */}

          <div className="relative overflow-hidden bg-gradient-to-r from-[#173D35] to-[#24574A] px-7 py-9 md:px-10">

            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="relative">

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D1BC91]">
                Manuscript Submission
              </span>

              <h2 className="mt-3 font-serif text-3xl font-bold text-white md:text-4xl">
                Submission Form
              </h2>

              <p className="mt-3 text-sm text-white/70">
                Fields marked with * are required.
              </p>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-10 p-6 md:p-10"
          >

            {/* ================= AUTHOR INFORMATION ================= */}

            <section>

              <div className="mb-7 flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1EEE5] text-[#173D35]">
                  <User size={21} />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#173D35]">
                    Author Information
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Provide your personal and institutional details.
                  </p>
                </div>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="authorName"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Author Full Name *
                  </label>

                  <input
                    id="authorName"
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Email Address 
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Phone Number 
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="institution"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Institution / University 
                  </label>

                  <input
                    id="institution"
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Enter institution name"
                    
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="department"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Department 
                  </label>

                  <input
                    id="department"
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Enter your department"
                    
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  />
                </div>

              </div>
            </section>

            <div className="h-px bg-[#E8E3D8]" />

            {/* ================= PAPER DETAILS ================= */}

            <section>

              <div className="mb-7 flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1EEE5] text-[#173D35]">
                  <BookOpen size={21} />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#173D35]">
                    Research Paper Details
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Enter the details of your research manuscript.
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Paper Title *
                  </label>

                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your research paper title"
                    required
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Research Category *
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  >
                    <option value="">
                      Select research category
                    </option>

                    <option value="Computer Science & Engineering">
                      Healthcare & Hospital Management
                    </option>

                    <option value="Management & Commerce">
                      General Business & Strategy
                    </option>

                    <option value="Business Administration">
                      Finance & Accounting
                    </option>

                    <option value="Social Sciences">
                      Marketing & Consumer Behavior
                    </option>

                    <option value="Education & Humanities">
                      Human Resources &  Leadership

                    </option>

                    <option value="Science & Technology">
                      Technology, AI & Operations
                    </option>

                    <option value="Health Sciences">
                      Sustainability & ESG
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="abstract"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Abstract *
                  </label>

                  <textarea
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Write a summary of your research, including its objectives, methodology, and findings..."
                    required
                    disabled={loading || isSubmitted}
                    className={`${inputStyle} resize-none`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="keywords"
                    className="mb-2 block text-sm font-semibold text-[#173D35]"
                  >
                    Keywords *
                  </label>

                  <input
                    id="keywords"
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    placeholder="Machine Learning, Artificial Intelligence, Data Science"
                    required
                    disabled={loading || isSubmitted}
                    className={inputStyle}
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Separate keywords using commas.
                  </p>
                </div>

              </div>
            </section>

            <div className="h-px bg-[#E8E3D8]" />

            {/* ================= FILE UPLOAD ================= */}

            <section>

              <div className="mb-7 flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1EEE5] text-[#173D35]">
                  <Upload size={21} />
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-[#173D35]">
                    Upload Research Paper
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Upload your manuscript in the supported format.
                  </p>
                </div>

              </div>

              <label
                htmlFor="paper-upload"
                className={`block rounded-2xl border-2 border-dashed border-[#D1BC91] bg-[#FAF9F6] p-8 text-center transition-all duration-300 ${
                  loading || isSubmitted
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:border-[#173D35] hover:bg-[#F1EEE5]"
                }`}
              >

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#173D35] text-[#D1BC91]">
                  <FileUp size={32} />
                </div>

                <p className="font-semibold text-[#173D35]">
                  Click to upload your manuscript
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  PDF, DOC, DOCX (Maximum 10 MB)
                </p>

                <input
                  id="paper-upload"
                  type="file"
                  name="paper"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading || isSubmitted}
                />

              </label>

              {/* Selected File */}

              {paper && (
                <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-[#E8E3D8] bg-[#F1EEE5] p-4">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#173D35]">
                      <FileText size={22} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#173D35]">
                        {paper.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {(paper.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={loading || isSubmitted}
                    className="shrink-0 rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                    aria-label="Remove uploaded file"
                  >
                    <X size={20} />
                  </button>

                </div>
              )}

            </section>

            {/* ================= INFORMATION ================= */}

            <div className="flex items-start gap-4 rounded-xl border border-[#E8E3D8] bg-[#F1EEE5] p-5">

              <Info
                size={21}
                className="mt-0.5 shrink-0 text-[#A58A56]"
              />

              <div>
                <p className="font-semibold text-[#173D35]">
                  Before submitting
                </p>

                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Please ensure that your manuscript and author information
                  are accurate. Follow the journal's official submission
                  guidelines and verify that your manuscript is original.
                </p>

                <Link
                  to="/author-guidelines"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#173D35] hover:text-[#B89B64]"
                >
                  Read Author Guidelines
                  <ArrowRight size={16} />
                </Link>
              </div>

            </div>

            {/* ================= SUCCESS / ERROR MESSAGE ================= */}

            {message && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-xl border p-5 ${
                  messageType === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >

                <div className="flex items-start gap-3">

                  {messageType === "success" ? (
                    <CheckCircle2
                      size={23}
                      className="shrink-0"
                    />
                  ) : (
                    <Info
                      size={23}
                      className="shrink-0"
                    />
                  )}

                  <div className="min-w-0">

                    <p className="font-semibold">
                      {message}
                    </p>

                    {isSubmitted && submissionId && (
                      <div className="mt-3 rounded-lg border border-green-200 bg-white/70 p-3">

                        <p className="text-xs font-medium uppercase tracking-wider text-green-700">
                          Your Submission ID
                        </p>

                        <p className="mt-1 break-all text-lg font-bold text-green-900">
                          {submissionId}
                        </p>

                        <p className="mt-2 text-xs text-green-700">
                          Please save this ID for future reference.
                        </p>

                      </div>
                    )}

                    {isSubmitted && (
                      <p className="mt-3 text-sm">
                        Your manuscript has been received. The editorial
                        team will review it according to the journal's
                        submission process.
                      </p>
                    )}

                  </div>
                </div>
              </div>
            )}

            {/* ================= SUBMIT BUTTON ================= */}

            <button
              type="submit"
              disabled={loading || isSubmitted}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#173D35] py-4 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#245448] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >

              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Submitting Manuscript...
                </>
              ) : isSubmitted ? (
                <>
                  Manuscript Submitted
                  <CheckCircle2 size={20} />
                </>
              ) : (
                <>
                  Submit Manuscript
                  <ArrowRight size={19} />
                </>
              )}

            </button>

            {/* Submit another manuscript */}

            {isSubmitted && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-xl border border-[#173D35] py-3.5 font-semibold text-[#173D35] transition hover:bg-[#F1EEE5]"
              >
                Submit Another Manuscript
              </button>
            )}

            {/* Security note */}

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={16} className="text-[#B89B64]" />
              Your submission is processed through the journal's submission
              system.
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}

export default SubmitManuscript;