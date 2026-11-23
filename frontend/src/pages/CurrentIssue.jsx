import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  BookOpen,
  FileText,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  Download,
  BookMarked,
  Quote,
  Search,
  RefreshCw,
  Eye,
  Building2,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Globe,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Backend API URL
const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const API_URL = BASE_URL
  ? `${BASE_URL}/api/submissions`
  : "/api/submissions";

// Get keywords safely whether the backend returns an array or string
const getKeywords = (keywords) => {
  if (Array.isArray(keywords)) {
    return keywords.filter(Boolean);
  }

  if (typeof keywords === "string") {
    return keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
  }

  return [];
};

// Format publication date
const formatDate = (date) => {
  if (!date) return "Recently published";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently published";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Get the next publication date (25th of every month)
const getNextPublicationDate = () => {
  const today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth();

  // If today is after the 25th, move to next month
  if (today.getDate() > 25) {
    month += 1;
  }

  // Handle December → January
  if (month > 11) {
    month = 0;
    year += 1;
  }

  return new Date(year, month, 25);
};

// Get PDF URL
const getPdfUrl = (paperId, download = false) => {
  const url = `${API_URL}/current-issue/${paperId}/pdf`;

  return download ? `${url}?download=true` : url;
};

export default function CurrentIssue() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAbstracts, setExpandedAbstracts] = useState({});

  // Get next publication date
  const nextPublicationDate = getNextPublicationDate();

  // Fetch published papers
  const fetchCurrentIssue = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/current-issue`,
        {
          timeout: 20000,
        }
      );

      // Handle different API response formats
      const data = response.data;

      const fetchedPapers = Array.isArray(data)
        ? data
        : Array.isArray(data?.papers)
        ? data.papers
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setPapers(fetchedPapers);
    } catch (err) {
      console.error("Current Issue API Error:", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
            `Unable to load papers. Server returned ${err.response.status}.`
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the server. Please check your internet connection or try again later."
        );
      } else {
        setError("Something went wrong while loading the current issue.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentIssue();
  }, []);

  // Expand or collapse abstract
  const toggleAbstract = (paperId) => {
    setExpandedAbstracts((previous) => ({
      ...previous,
      [paperId]: !previous[paperId],
    }));
  };

  // Search papers
  const filteredPapers = papers.filter((paper) => {
    const search = searchTerm.toLowerCase();

    const title = paper.title || "";
    const abstract = paper.abstract || "";

    const authors = Array.isArray(paper.authors)
      ? paper.authors.join(", ")
      : paper.authors || "";

    const keywords = getKeywords(paper.keywords).join(", ");

    return (
      title.toLowerCase().includes(search) ||
      abstract.toLowerCase().includes(search) ||
      authors.toLowerCase().includes(search) ||
      keywords.toLowerCase().includes(search)
    );
  });

  const featuredPaper = papers.length > 0 ? papers[0] : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252B29]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] px-6 py-24 text-white">

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#B89B64]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm">
            <BookOpen size={16} />
            Current Journal Issue
          </div>

          <h1 className="max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Current Issue

            <span className="block text-[#D9C49B]">
              Research & Publications
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Explore the latest research articles and scholarly
            contributions published in the International
            Multidisciplinary Research Journal.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">

            <Link
              to="/archives"
              className="inline-flex items-center gap-2 rounded-lg bg-[#B89B64] px-6 py-3 font-semibold text-white transition hover:bg-[#a88a54]"
            >
              Explore Archives
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/submit-manuscript"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-semibold transition hover:bg-white hover:text-[#173D35]"
            >
              Submit Research
              <ArrowUpRight size={18} />
            </Link>

          </div>
        </div>
      </section>

      {/* PUBLICATION INFORMATION */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-6 md:grid-cols-3">

          {/* PUBLICATION SCHEDULE */}
          <div className="rounded-2xl border border-[#E7E3D9] bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#173D35]/10 text-[#173D35]">
              <Calendar size={23} />
            </div>

            <h3 className="font-serif text-xl font-bold">
              Publication Schedule
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              IMRJ publishes a new issue on the 25th of every month.
            </p>

            {/* NEXT PUBLICATION DATE */}
            <div className="mt-4 rounded-xl bg-[#F2F0E9] p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-[#9A7B43]">
                Next Publication Date
              </p>

              <p className="mt-2 font-serif text-2xl font-bold text-[#173D35]">
                {formatDate(nextPublicationDate)}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Published monthly on the 25th
              </p>

            </div>

          </div>

          {/* OPEN ACCESS */}
          <div className="rounded-2xl border border-[#E7E3D9] bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B89B64]/15 text-[#9A7B43]">
              <Globe size={23} />
            </div>

            <h3 className="font-serif text-xl font-bold">
              Open Access
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              Published research is made accessible to readers
              and researchers to encourage knowledge sharing.
            </p>

          </div>

          {/* PEER REVIEW */}
          <div className="rounded-2xl border border-[#E7E3D9] bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#173D35]/10 text-[#173D35]">
              <BookMarked size={23} />
            </div>

            <h3 className="font-serif text-xl font-bold">
              Peer Reviewed
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              The journal promotes academic quality through
              a scholarly peer-review process.
            </p>

          </div>

        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid items-center gap-10 md:grid-cols-2">

          <div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#B89B64]">
              About This Issue
            </p>

            <h2 className="font-serif text-3xl font-bold leading-tight text-[#173D35] md:text-4xl">
              Advancing Knowledge Through Research
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              The current issue of the International
              Multidisciplinary Research Journal presents
              scholarly contributions across multiple
              disciplines. Our aim is to provide a platform
              for researchers, academicians, and scholars
              to share innovative ideas and research findings.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Explore the published articles below and access
              their abstracts and full-text PDF documents.
            </p>

          </div>

          <div className="rounded-2xl bg-[#173D35] p-8 text-white shadow-lg md:p-10">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#B89B64]">
              <GraduationCap size={30} />
            </div>

            <h3 className="font-serif text-2xl font-bold">
              Research for a Better Tomorrow
            </h3>

            <p className="mt-4 leading-8 text-white/75">
              We encourage interdisciplinary research,
              academic collaboration, and the exchange
              of knowledge to contribute to society.
            </p>

            <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[#D9C49B]">
              <Sparkles size={17} />
              Connecting Knowledge with Innovation
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED PAPER */}
      {featuredPaper && (
        <section className="mx-auto max-w-7xl px-6 py-12">

          <div className="mb-7 flex items-center gap-3">

            <div className="h-8 w-1 rounded-full bg-[#B89B64]" />

            <h2 className="font-serif text-3xl font-bold text-[#173D35]">
              Featured Research
            </h2>

          </div>

          <div className="rounded-2xl border border-[#E7E3D9] bg-white p-7 shadow-sm md:p-10">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#173D35]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#173D35]">
              <Sparkles size={14} />
              Featured Publication
            </div>

            <h3 className="font-serif text-2xl font-bold leading-snug text-[#173D35] md:text-3xl">
              {featuredPaper.title}
            </h3>

            <p className="mt-4 text-sm text-gray-500">
              {Array.isArray(featuredPaper.authors)
                ? featuredPaper.authors.join(", ")
                : featuredPaper.authors || "Author information unavailable"}
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              {featuredPaper.abstract
                ? `${featuredPaper.abstract.slice(0, 350)}${
                    featuredPaper.abstract.length > 350 ? "..." : ""
                  }`
                : "Abstract not available."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">

              <span className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} />

                {formatDate(
                  featuredPaper.publishedAt ||
                    featuredPaper.publicationDate ||
                    featuredPaper.createdAt
                )}
              </span>

              <a
                href={getPdfUrl(featuredPaper._id)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#173D35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24574A]"
              >
                <Eye size={17} />
                View Paper
              </a>

            </div>
          </div>
        </section>
      )}

      {/* PUBLISHED PAPERS */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[#B89B64]">
              Research Publications
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#173D35] md:text-4xl">
              Published Papers
            </h2>

            <p className="mt-3 text-gray-600">
              Browse the research articles available in this issue.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#E7E3D9] bg-white px-4 py-3">

            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search research papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm outline-none md:w-64"
            />

          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-[#173D35]">

            <Loader2 size={38} className="animate-spin" />

            <p className="mt-4 text-gray-600">
              Loading published papers...
            </p>

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <AlertCircle
              size={35}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-4 text-xl font-bold text-red-700">
              Unable to Load Publications
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={fetchCurrentIssue}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#173D35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24574A]"
            >
              <RefreshCw size={16} />
              Try Again
            </button>

          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredPapers.length === 0 && (
          <div className="rounded-2xl border border-[#E7E3D9] bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#173D35]/10 text-[#173D35]">
              <FileText size={30} />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#173D35]">
              {searchTerm
                ? "No Matching Papers Found"
                : "No Papers Published Yet"}
            </h3>

            <p className="mt-3 text-gray-500">
              {searchTerm
                ? "Try searching with another title, author, or keyword."
                : "Published research papers will appear here once they are available."}
            </p>

          </div>
        )}

        {/* PAPER CARDS */}
        {!loading && !error && filteredPapers.length > 0 && (

          <div className="space-y-6">

            {filteredPapers.map((paper, index) => {
              const paperId = paper._id;
              const keywords = getKeywords(paper.keywords);
              const isExpanded = expandedAbstracts[paperId];

              const abstract = paper.abstract || "Abstract not available.";

              return (
                <article
                  key={paperId || index}
                  className="rounded-2xl border border-[#E7E3D9] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-8"
                >

                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    <div className="flex-1">

                      <div className="mb-4 flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-[#173D35]/10 px-3 py-1 text-xs font-bold text-[#173D35]">
                          Published Research
                        </span>

                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={14} />

                          {formatDate(
                            paper.publishedAt ||
                              paper.publicationDate ||
                              paper.createdAt
                          )}
                        </span>

                      </div>

                      <h3 className="font-serif text-xl font-bold leading-snug text-[#173D35] md:text-2xl">
                        {paper.title || "Untitled Research Paper"}
                      </h3>

                      <p className="mt-3 text-sm text-gray-500">
                        <span className="font-semibold text-gray-700">
                          Authors:
                        </span>{" "}

                        {Array.isArray(paper.authors)
                          ? paper.authors.join(", ")
                          : paper.authors || "Not specified"}
                      </p>

                      {/* ABSTRACT */}
                      <div className="mt-5">

                        <h4 className="mb-2 font-semibold text-[#173D35]">
                          Abstract
                        </h4>

                        <p className="text-sm leading-7 text-gray-600">
                          {isExpanded
                            ? abstract
                            : `${abstract.slice(0, 300)}${
                                abstract.length > 300 ? "..." : ""
                              }`}
                        </p>

                        {abstract.length > 300 && (
                          <button
                            onClick={() => toggleAbstract(paperId)}
                            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#9A7B43] hover:text-[#173D35]"
                          >
                            {isExpanded ? (
                              <>
                                Show Less
                                <ChevronUp size={16} />
                              </>
                            ) : (
                              <>
                                Read More
                                <ChevronDown size={16} />
                              </>
                            )}
                          </button>
                        )}

                      </div>

                      {/* KEYWORDS */}
                      {keywords.length > 0 && (
                        <div className="mt-5">

                          <h4 className="mb-3 text-sm font-semibold text-[#173D35]">
                            Keywords
                          </h4>

                          <div className="flex flex-wrap gap-2">

                            {keywords.map((keyword, keywordIndex) => (
                              <span
                                key={keywordIndex}
                                className="rounded-full bg-[#F2F0E9] px-3 py-1.5 text-xs text-gray-600"
                              >
                                {keyword}
                              </span>
                            ))}

                          </div>
                        </div>
                      )}

                      {/* PAPER DETAILS */}
                      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-500">

                        {paper.volume && (
                          <span>
                            Volume: {paper.volume}
                          </span>
                        )}

                        {paper.issue && (
                          <span>
                            Issue: {paper.issue}
                          </span>
                        )}

                        {paper.doi && (
                          <span>
                            DOI: {paper.doi}
                          </span>
                        )}

                      </div>

                    </div>
                  </div>

                  {/* PDF BUTTONS */}
                  <div className="mt-7 flex flex-wrap gap-3 border-t border-[#E7E3D9] pt-5">

                    <a
                      href={getPdfUrl(paperId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#173D35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24574A]"
                    >
                      <Eye size={17} />
                      View Full Paper
                    </a>

                    <a
                      href={getPdfUrl(paperId, true)}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#173D35] px-5 py-3 text-sm font-semibold text-[#173D35] transition hover:bg-[#173D35] hover:text-white"
                    >
                      <Download size={17} />
                      Download PDF
                    </a>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* RESEARCH AREAS */}
      <section className="bg-[#F0EEE7] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-[#B89B64]">
              Explore Disciplines
            </p>

            <h2 className="font-serif text-3xl font-bold text-[#173D35] md:text-4xl">
              Research Areas
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We welcome interdisciplinary research and
              contributions from diverse academic fields.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "Computer Science",
              "Management",
              "Education",
              "Science & Technology",
              "Health Sciences",
              "Social Sciences",
            ].map((area, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-[#E7E3D9] bg-white p-5 transition hover:border-[#B89B64] hover:shadow-md"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#173D35]/10 text-[#173D35]">
                  <Building2 size={22} />
                </div>

                <h3 className="font-semibold text-[#173D35]">
                  {area}
                </h3>

                <ArrowUpRight
                  size={18}
                  className="ml-auto text-[#B89B64]"
                />

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">

        <Quote
          size={40}
          className="mx-auto text-[#B89B64]"
        />

        <p className="mt-5 font-serif text-2xl italic leading-relaxed text-[#173D35] md:text-3xl">
          "Research is the foundation of knowledge,
          innovation, and meaningful progress."
        </p>

        <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-gray-500">
          International Multidisciplinary Research Journal
        </p>

      </section>

      {/* CALL TO ACTION */}
      <section className="bg-[#173D35] px-6 py-16 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#B89B64]">
            <BookOpen size={27} />
          </div>

          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            Have Research to Share?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/75">
            Contribute your research and become part of
            an academic community dedicated to knowledge
            sharing and innovation.
          </p>

          <Link
            to="/submit-manuscript"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#B89B64] px-7 py-3.5 font-semibold text-white transition hover:bg-[#a88a54]"
          >
            Submit Your Manuscript
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>

    </div>
  );
}