import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

import {
  BookOpen,
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
  FileText,
  AlertCircle,
} from "lucide-react";

const Archives = () => {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedYears, setExpandedYears] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);

  // Fetch published papers grouped by year
  const fetchArchives = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/api/submissions/archives");

      const data = response.data;

      // Support both direct array and { archives: [] } responses
      const archiveData = Array.isArray(data)
        ? data
        : data.archives || [];

      setArchives(archiveData);

      // Expand the latest year by default
      if (archiveData.length > 0) {
        setExpandedYears({
          [archiveData[0].year]: true,
        });
      }
    } catch (err) {
      console.error("Error fetching archives:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load archives. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  // Toggle year accordion
  const toggleYear = (year) => {
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  // Download published paper
  const handleDownload = async (paperId, title) => {
    try {
      setDownloadingId(paperId);

      const response = await API.get(
        `/api/submissions/${paperId}/download`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title || "research-paper"}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch (err) {
      console.error("Download error:", err);
      alert("Unable to download this paper. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  // Filter archives by year, title, author, or journal information
  const filteredArchives = archives
    .map((yearItem) => {
      const filteredPapers = (yearItem.papers || []).filter((paper) => {
        const search = searchTerm.toLowerCase();

        return (
          paper.title?.toLowerCase().includes(search) ||
          paper.author?.toLowerCase().includes(search) ||
          paper.authors?.toString().toLowerCase().includes(search) ||
          paper.abstract?.toLowerCase().includes(search) ||
          paper.keywords?.toString().toLowerCase().includes(search)
        );
      });

      return {
        ...yearItem,
        papers: filteredPapers,
      };
    })
    .filter((yearItem) => yearItem.papers.length > 0);

  // Total published papers
  const totalPapers = archives.reduce(
    (total, yearItem) => total + (yearItem.papers?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252B29]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] py-20 px-6">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border-[40px] border-white" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full border-[40px] border-white" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-[#E8D6A8] text-sm mb-6">
            <BookMarked size={16} />
            <span>Research Publications & Knowledge Repository</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            Journal Archives
          </h1>

          <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
            Explore previously published research papers and academic
            contributions from the International Multidisciplinary
            Research Journal.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-10">

            <div className="text-center">
              <div className="text-4xl font-bold text-[#E8D6A8]">
                {loading ? "..." : archives.length}
              </div>
              <p className="text-white/70 text-sm mt-1">
                Publication Years
              </p>
            </div>

            <div className="w-px bg-white/20" />

            <div className="text-center">
              <div className="text-4xl font-bold text-[#E8D6A8]">
                {loading ? "..." : totalPapers}
              </div>
              <p className="text-white/70 text-sm mt-1">
                Published Papers
              </p>
            </div>

            <div className="w-px bg-white/20" />

            <div className="text-center">
              <div className="text-4xl font-bold text-[#E8D6A8]">
                Open
              </div>
              <p className="text-white/70 text-sm mt-1">
                Access Research
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        {/* SECTION HEADING */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">

          <div>
            <span className="text-[#B89B64] font-semibold uppercase tracking-widest text-sm">
              Explore Publications
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-[#173D35] mt-3 font-serif">
              Previous Issues
            </h2>

            <p className="text-gray-600 mt-3 max-w-2xl">
              Browse published research papers organized by their
              publication year.
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-80">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search papers, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#B89B64] transition"
            />

          </div>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">

            <div className="w-12 h-12 border-4 border-[#173D35]/20 border-t-[#173D35] rounded-full animate-spin" />

            <p className="text-gray-500 mt-5">
              Loading published papers...
            </p>

          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">

            <AlertCircle
              size={40}
              className="text-red-500 mx-auto mb-4"
            />

            <h3 className="text-xl font-semibold text-red-700">
              Unable to Load Archives
            </h3>

            <p className="text-red-600 mt-2">
              {error}
            </p>

            <button
              onClick={fetchArchives}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#173D35] text-white rounded-lg hover:bg-[#24574A] transition"
            >
              <RefreshCw size={17} />
              Try Again
            </button>

          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && archives.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 px-6 text-center">

            <BookOpen
              size={55}
              className="text-[#B89B64] mx-auto mb-5"
            />

            <h3 className="text-2xl font-bold text-[#173D35] font-serif">
              No Archives Available Yet
            </h3>

            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Published research papers will appear here once they
              are added to the journal.
            </p>

            <Link
              to="/current-issue"
              className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-[#173D35] text-white rounded-lg hover:bg-[#24574A] transition"
            >
              Explore Current Issue
              <ArrowRight size={18} />
            </Link>

          </div>
        )}

        {/* NO SEARCH RESULTS */}
        {!loading &&
          !error &&
          archives.length > 0 &&
          filteredArchives.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">

              <Search
                size={45}
                className="text-gray-300 mx-auto mb-4"
              />

              <h3 className="text-xl font-semibold text-[#173D35]">
                No Matching Papers Found
              </h3>

              <p className="text-gray-500 mt-2">
                Try searching with a different title or author name.
              </p>

              <button
                onClick={() => setSearchTerm("")}
                className="mt-5 text-[#173D35] font-semibold hover:text-[#B89B64]"
              >
                Clear Search
              </button>

            </div>
          )}

        {/* ARCHIVE YEARS */}
        {!loading &&
          !error &&
          filteredArchives.map((yearItem) => {
            const isExpanded = expandedYears[yearItem.year];

            return (
              <div
                key={yearItem.year}
                className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >

                {/* YEAR HEADER */}
                <button
                  onClick={() => toggleYear(yearItem.year)}
                  className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 md:p-8 text-left hover:bg-[#FAF9F6] transition"
                >

                  <div className="flex items-center gap-5">

                    <div className="w-14 h-14 rounded-xl bg-[#173D35] flex items-center justify-center text-[#E8D6A8]">
                      <Calendar size={26} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#173D35] font-serif">
                        {yearItem.year}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {yearItem.papers.length} Published{" "}
                        {yearItem.papers.length === 1 ? "Paper" : "Papers"}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    <span className="px-4 py-2 rounded-full bg-[#F4F0E6] text-[#173D35] text-sm font-semibold">
                      {yearItem.papers.length} Articles
                    </span>

                    {isExpanded ? (
                      <ChevronUp className="text-[#173D35]" size={22} />
                    ) : (
                      <ChevronDown className="text-[#173D35]" size={22} />
                    )}

                  </div>

                </button>

                {/* PAPERS */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-6 md:p-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {yearItem.papers.map((paper, index) => {
                        const paperId = paper._id || paper.id;

                        return (
                          <article
                            key={paperId || index}
                            className="group border border-gray-100 rounded-xl p-6 hover:border-[#B89B64] hover:shadow-lg transition duration-300"
                          >

                            {/* PAPER TOP */}
                            <div className="flex items-center justify-between mb-5">

                              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B89B64]">
                                <FileText size={15} />
                                Research Article
                              </span>

                              <span className="text-xs text-gray-400">
                                {paper.publicationDate
                                  ? new Date(
                                      paper.publicationDate
                                    ).toLocaleDateString("en-IN", {
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : yearItem.year}
                              </span>

                            </div>

                            {/* TITLE */}
                            <h4 className="text-lg font-bold text-[#173D35] leading-snug group-hover:text-[#B89B64] transition">
                              {paper.title || "Untitled Research Paper"}
                            </h4>

                            {/* AUTHOR */}
                            <div className="flex items-start gap-2 mt-4 text-sm text-gray-600">

                              <GraduationCap
                                size={17}
                                className="text-[#B89B64] shrink-0 mt-0.5"
                              />

                              <span>
                                {paper.authors ||
                                  paper.author ||
                                  "Author information unavailable"}
                              </span>

                            </div>

                            {/* INSTITUTION */}
                            {paper.institution && (
                              <div className="flex items-start gap-2 mt-2 text-sm text-gray-500">

                                <Building2
                                  size={16}
                                  className="text-[#B89B64] shrink-0 mt-0.5"
                                />

                                <span>{paper.institution}</span>

                              </div>
                            )}

                            {/* ABSTRACT */}
                            {paper.abstract && (
                              <div className="mt-5">

                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                                  {paper.abstract}
                                </p>

                              </div>
                            )}

                            {/* KEYWORDS */}
                            {paper.keywords && (
                              <div className="flex flex-wrap gap-2 mt-4">

                                {(Array.isArray(paper.keywords)
                                  ? paper.keywords
                                  : paper.keywords.split(",")
                                )
                                  .slice(0, 3)
                                  .map((keyword, i) => (
                                    <span
                                      key={i}
                                      className="text-xs px-3 py-1 rounded-full bg-[#F4F0E6] text-[#173D35]"
                                    >
                                      {keyword.trim()}
                                    </span>
                                  ))}

                              </div>
                            )}

                            {/* DOI */}
                            {paper.doi && (
                              <p className="text-xs text-gray-400 mt-4">
                                DOI: {paper.doi}
                              </p>
                            )}

                            {/* ACTIONS */}
                            <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-100">

                              <button
                                onClick={() =>
                                  handleDownload(
                                    paperId,
                                    paper.title
                                  )
                                }
                                disabled={downloadingId === paperId}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#173D35] text-white text-sm font-medium hover:bg-[#24574A] transition disabled:opacity-50"
                              >

                                {downloadingId === paperId ? (
                                  <>
                                    <RefreshCw
                                      size={15}
                                      className="animate-spin"
                                    />
                                    Downloading...
                                  </>
                                ) : (
                                  <>
                                    <Download size={15} />
                                    Download PDF
                                  </>
                                )}

                              </button>

                              {paper.doi && (
                                <a
                                  href={`https://doi.org/${paper.doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 text-[#173D35] text-sm font-medium hover:border-[#B89B64] transition"
                                >
                                  DOI
                                  <ArrowUpRight size={15} />
                                </a>
                              )}

                            </div>

                          </article>
                        );
                      })}

                    </div>

                  </div>
                )}

              </div>
            );
          })}

      </section>

      {/* BOTTOM CTA */}
      <section className="bg-[#F1EEE5] py-16 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <div className="w-16 h-16 rounded-2xl bg-[#173D35] text-[#E8D6A8] flex items-center justify-center mx-auto mb-6">
            <Quote size={30} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#173D35] font-serif">
            Contribute to Academic Excellence
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Share your research and contribute to the growing body
            of multidisciplinary academic knowledge.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">

            <Link
              to="/submit-manuscript"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#173D35] text-white rounded-lg font-semibold hover:bg-[#24574A] transition"
            >
              Submit Your Research
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#173D35] text-[#173D35] rounded-lg font-semibold hover:bg-[#173D35] hover:text-white transition"
            >
              Contact Journal
              <ArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Archives;