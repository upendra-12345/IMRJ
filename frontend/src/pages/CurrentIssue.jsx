import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const API_URL = "http://localhost:5001/api/submissions";

const CurrentIssue = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPaper, setExpandedPaper] = useState(null);

  // ==========================================
  // FETCH CURRENT ISSUE PAPERS
  // ==========================================

  const fetchPapers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API_URL}/current-issue`);

      if (response.data.success) {
        setPapers(response.data.papers || []);
      } else {
        setPapers([]);
      }
    } catch (err) {
      console.error("Error fetching current issue papers:", err);
      setError("Unable to load published papers. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ==========================================
  // FILTER PAPERS
  // ==========================================

  const filteredPapers = papers.filter((paper) => {
    const search = searchTerm.toLowerCase();

    return (
      paper.title?.toLowerCase().includes(search) ||
      paper.authorName?.toLowerCase().includes(search) ||
      paper.category?.toLowerCase().includes(search) ||
      paper.keywords?.toLowerCase().includes(search) ||
      paper.institution?.toLowerCase().includes(search)
    );
  });

  // ==========================================
  // PDF URLS
  // ==========================================

  const getPdfUrl = (paperId, download = false) => {
    const baseUrl = `http://localhost:5001/api/submissions/current-issue/${paperId}/pdf`;

    return download ? `${baseUrl}?download=true` : baseUrl;
  };

  // ==========================================
  // TOGGLE ABSTRACT
  // ==========================================

  const toggleAbstract = (paperId) => {
    setExpandedPaper((previous) =>
      previous === paperId ? null : paperId
    );
  };

  const featuredPaper = papers.length > 0 ? papers[0] : null;

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#252B29]">

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] px-6 py-24 md:px-12">

        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#B89B64]/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 border border-[#D1BC91]/40 px-5 py-2 mb-7">
            <BookOpen size={15} className="text-[#D1BC91]" />

            <span className="text-[#E4D6B8] uppercase tracking-[3px] text-xs font-semibold">
              International | Peer Reviewed | Open Access
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">
            Current Issue
          </h1>

          <div className="w-20 h-[2px] bg-[#B89B64] mx-auto my-7" />

          <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base leading-8">
            Explore the latest published research, scholarly articles,
            and academic contributions from researchers across
            multiple disciplines.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-9">

            <a
              href="#published-papers"
              className="inline-flex items-center gap-2 bg-[#B89B64] text-[#173D35] px-7 py-3 text-sm font-semibold hover:bg-[#D1BC91] transition"
            >
              Explore Papers
              <ArrowRight size={17} />
            </a>

            <Link
              to="/submit-manuscript"
              className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3 text-sm hover:bg-white/10 transition"
            >
              Submit Your Research
              <ArrowUpRight size={17} />
            </Link>

          </div>
        </div>
      </section>


      {/* =====================================
          MONTHLY PUBLICATION SCHEDULE
      ===================================== */}

      <section className="bg-[#F2F0E9] px-6 py-14 md:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden bg-white border border-[#E8E3D8] shadow-sm">

            <div className="grid md:grid-cols-3 items-center">

              <div className="md:col-span-2 p-8 md:p-10">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-12 h-12 flex items-center justify-center bg-[#173D35] text-[#D1BC91]">
                    <Calendar size={25} />
                  </div>

                  <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
                    Publication Schedule
                  </span>

                </div>

                <h2 className="font-serif text-3xl md:text-4xl text-[#173D35]">
                  25th of Every Month
                </h2>

                <p className="mt-4 text-sm leading-8 text-[#777D76] max-w-2xl">
                  The International Multidisciplinary Research Journal
                  follows a monthly publication schedule. The official
                  publication date is the 25th of every month.
                  Research papers are published following the editorial
                  review and acceptance process.
                </p>

              </div>

              <div className="bg-[#173D35] p-8 md:p-10 text-center h-full flex flex-col justify-center">

                <Calendar
                  size={35}
                  className="mx-auto text-[#D1BC91] mb-4"
                />

                <p className="text-[#D1BC91] uppercase tracking-[3px] text-xs font-semibold">
                  Publication Frequency
                </p>

                <h3 className="font-serif text-4xl text-white mt-3">
                  Monthly
                </h3>

                <div className="w-12 h-[2px] bg-[#B89B64] mx-auto my-4" />

                <p className="text-white/70 text-sm">
                  Every Month · 25th
                </p>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =====================================
          INTRODUCTION SECTION
      ===================================== */}

      <section className="px-6 py-20 md:px-12">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          <div>

            <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
              Latest Research
            </span>

            <h2 className="font-serif text-3xl md:text-4xl text-[#173D35] mt-4 leading-tight">
              Advancing Knowledge Through Research
            </h2>

            <div className="w-16 h-[2px] bg-[#B89B64] my-6" />

            <p className="text-[#777D76] text-sm leading-8">
              The Current Issue presents recently published research
              articles that contribute to academic knowledge,
              innovation, and interdisciplinary learning.
            </p>

            <p className="text-[#777D76] text-sm leading-8 mt-4">
              Our journal welcomes original research papers,
              innovative ideas, and scholarly contributions from
              researchers, academicians, and students.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[#173D35] font-semibold text-sm mt-7 hover:text-[#A58A56] transition"
            >
              Learn More About Our Journal
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="relative">

            <div className="bg-[#173D35] p-10 md:p-14 text-center">

              <BookMarked
                size={55}
                className="mx-auto text-[#D1BC91] mb-7"
              />

              <h3 className="font-serif text-3xl text-white">
                Current Publications
              </h3>

              <p className="text-white/65 text-sm mt-4 leading-7">
                Discover peer-reviewed research and academic
                contributions published in our journal.
              </p>

              <div className="grid grid-cols-2 gap-5 mt-9">

                <div className="border border-white/20 p-5">
                  <p className="font-serif text-3xl text-[#D1BC91]">
                    {papers.length}
                  </p>

                  <p className="text-white/60 text-xs mt-2">
                    Published Papers
                  </p>
                </div>

                <div className="border border-white/20 p-5">
                  <p className="font-serif text-3xl text-[#D1BC91]">
                    Monthly
                  </p>

                  <p className="text-white/60 text-xs mt-2">
                    Publication Cycle
                  </p>
                </div>

              </div>

            </div>

            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#B89B64] -z-10" />

          </div>

        </div>
      </section>


      {/* =====================================
          FEATURED ISSUE
      ===================================== */}

      <section className="bg-[#F2F0E9] px-6 py-20 md:px-12">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
              Featured Publication
            </span>

            <h2 className="font-serif text-3xl md:text-4xl text-[#173D35] mt-4">
              Latest Research Contribution
            </h2>

            <div className="w-16 h-[2px] bg-[#B89B64] mx-auto mt-6" />

          </div>

          {featuredPaper ? (

            <div className="bg-white border border-[#E8E3D8] shadow-sm grid md:grid-cols-3">

              <div className="bg-[#173D35] p-10 flex flex-col justify-center items-center text-center">

                <BookOpen size={55} className="text-[#D1BC91] mb-6" />

                <p className="text-[#D1BC91] uppercase tracking-[3px] text-xs">
                  Featured Paper
                </p>

                <h3 className="font-serif text-3xl text-white mt-4">
                  Current Issue
                </h3>

                <p className="text-white/60 text-xs mt-4">
                  International Multidisciplinary Research Journal
                </p>

              </div>

              <div className="md:col-span-2 p-8 md:p-12">

                <div className="flex flex-wrap items-center gap-3 mb-5">

                  <span className="bg-[#E9F0EB] text-[#173D35] px-3 py-1 text-xs font-semibold">
                    {featuredPaper.category || "Research Article"}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-[#858B84]">
                    <Calendar size={13} />
                    {formatDate(featuredPaper.publishedAt)}
                  </span>

                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[#173D35] leading-snug">
                  {featuredPaper.title}
                </h3>

                <p className="text-[#777D76] text-sm mt-5 leading-7">
                  {featuredPaper.abstract
                    ? `${featuredPaper.abstract.substring(0, 250)}${
                        featuredPaper.abstract.length > 250 ? "..." : ""
                      }`
                    : "Explore this research contribution in our latest issue."}
                </p>

                <div className="flex flex-wrap gap-5 mt-7 text-xs text-[#777D76]">

                  <span className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#A58A56]" />
                    {featuredPaper.authorName || "Author"}
                  </span>

                  <span className="flex items-center gap-2">
                    <Building2 size={15} className="text-[#A58A56]" />
                    {featuredPaper.institution || "Institution"}
                  </span>

                </div>

                <div className="flex flex-wrap gap-3 mt-8">

                  <a
                    href={getPdfUrl(featuredPaper._id)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#173D35] text-white px-5 py-3 text-sm hover:bg-[#24574A] transition"
                  >
                    <Eye size={16} />
                    View Paper
                  </a>

                  <a
                    href={getPdfUrl(featuredPaper._id, true)}
                    className="inline-flex items-center gap-2 border border-[#173D35] text-[#173D35] px-5 py-3 text-sm hover:bg-[#173D35] hover:text-white transition"
                  >
                    <Download size={16} />
                    Download PDF
                  </a>

                </div>

              </div>

            </div>

          ) : (

            <div className="bg-white border border-[#E8E3D8] p-10 text-center">

              <BookOpen
                size={40}
                className="mx-auto text-[#B89B64] mb-4"
              />

              <h3 className="font-serif text-2xl text-[#173D35]">
                No Featured Paper Yet
              </h3>

              <p className="text-[#777D76] text-sm mt-3">
                Published research papers will appear here.
              </p>

            </div>

          )}

        </div>
      </section>


      {/* =====================================
          PUBLISHED PAPERS
      ===================================== */}

      <section
        id="published-papers"
        className="px-6 py-20 md:px-12 scroll-mt-20"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
              Research Articles
            </span>

            <h2 className="font-serif text-3xl md:text-4xl text-[#173D35] mt-4">
              Published Research Papers
            </h2>

            <div className="w-16 h-[2px] bg-[#B89B64] mx-auto mt-6" />

            <p className="text-[#777D76] text-sm mt-5 max-w-2xl mx-auto leading-7">
              Browse the research papers published in our latest issue.
              You can search articles by title, author, category,
              institution, or keywords.
            </p>

          </div>


          {/* SEARCH BAR */}

          <div className="max-w-xl mx-auto mb-12">

            <div className="relative">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A58A56]"
              />

              <input
                type="text"
                placeholder="Search papers, authors, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#E4E0D6] py-4 pl-12 pr-5 text-sm outline-none focus:border-[#173D35] transition"
              />

            </div>

          </div>


          {/* LOADING */}

          {loading && (

            <div className="text-center py-16">

              <RefreshCw
                size={35}
                className="mx-auto text-[#B89B64] animate-spin"
              />

              <p className="text-[#777D76] text-sm mt-5">
                Loading published papers...
              </p>

            </div>

          )}


          {/* ERROR */}

          {!loading && error && (

            <div className="bg-white border border-red-200 p-8 text-center max-w-xl mx-auto">

              <AlertCircle
                size={35}
                className="mx-auto text-red-500 mb-4"
              />

              <p className="text-red-600 text-sm">
                {error}
              </p>

              <button
                onClick={fetchPapers}
                className="mt-5 inline-flex items-center gap-2 bg-[#173D35] text-white px-5 py-3 text-sm"
              >
                <RefreshCw size={15} />
                Try Again
              </button>

            </div>

          )}


          {/* EMPTY STATE */}

          {!loading && !error && filteredPapers.length === 0 && (

            <div className="bg-white border border-[#E8E3D8] p-12 text-center">

              <FileText
                size={45}
                className="mx-auto text-[#B89B64] mb-5"
              />

              <h3 className="font-serif text-2xl text-[#173D35]">
                {searchTerm
                  ? "No Matching Papers Found"
                  : "No Papers Published Yet"}
              </h3>

              <p className="text-[#777D76] text-sm mt-4">
                {searchTerm
                  ? "Try searching with a different title, author, or keyword."
                  : "Accepted and published research papers will appear here."}
              </p>

              {searchTerm && (

                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-5 text-[#173D35] underline text-sm"
                >
                  Clear Search
                </button>

              )}

            </div>

          )}


          {/* PAPER CARDS */}

          {!loading && !error && filteredPapers.length > 0 && (

            <div className="space-y-6">

              {filteredPapers.map((paper, index) => (

                <article
                  key={paper._id}
                  className="bg-white border border-[#E8E3D8] hover:border-[#B89B64] transition shadow-sm"
                >

                  <div className="p-7 md:p-9">

                    {/* PAPER HEADER */}

                    <div className="flex flex-wrap justify-between items-center gap-3 mb-5">

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="text-xs font-semibold text-[#A58A56] uppercase tracking-wider">
                          Paper {index + 1}
                        </span>

                        <span className="bg-[#E9F0EB] text-[#173D35] px-3 py-1 text-xs">
                          {paper.category || "Research Article"}
                        </span>

                      </div>

                      <span className="flex items-center gap-1 text-xs text-[#777D76]">
                        <Calendar size={14} />
                        Published: {formatDate(paper.publishedAt)}
                      </span>

                    </div>


                    {/* TITLE */}

                    <h3 className="font-serif text-xl md:text-2xl text-[#173D35] leading-snug">
                      {paper.title}
                    </h3>


                    {/* AUTHOR DETAILS */}

                    <div className="flex flex-wrap gap-x-7 gap-y-3 mt-5 text-xs text-[#777D76]">

                      <span className="flex items-center gap-2">
                        <GraduationCap
                          size={16}
                          className="text-[#B89B64]"
                        />
                        {paper.authorName || "Author not specified"}
                      </span>

                      <span className="flex items-center gap-2">
                        <Building2
                          size={15}
                          className="text-[#B89B64]"
                        />
                        {paper.institution || "Institution not specified"}
                      </span>

                      {paper.department && (

                        <span className="flex items-center gap-2">
                          <BookOpen
                            size={15}
                            className="text-[#B89B64]"
                          />
                          {paper.department}
                        </span>

                      )}

                    </div>


                    {/* ABSTRACT */}

                    <div className="mt-7">

                      <h4 className="text-xs uppercase tracking-[2px] font-bold text-[#A58A56] mb-3">
                        Abstract
                      </h4>

                      <p className="text-sm text-[#777D76] leading-8">

                        {expandedPaper === paper._id
                          ? paper.abstract || "No abstract available."
                          : paper.abstract
                            ? `${paper.abstract.substring(0, 220)}${
                                paper.abstract.length > 220 ? "..." : ""
                              }`
                            : "No abstract available."}

                      </p>

                      {paper.abstract && paper.abstract.length > 220 && (

                        <button
                          onClick={() => toggleAbstract(paper._id)}
                          className="inline-flex items-center gap-2 text-[#173D35] text-xs font-semibold mt-3 hover:text-[#A58A56] transition"
                        >

                          {expandedPaper === paper._id ? (
                            <>
                              Show Less
                              <ChevronUp size={15} />
                            </>
                          ) : (
                            <>
                              Read More
                              <ChevronDown size={15} />
                            </>
                          )}

                        </button>

                      )}

                    </div>


                    {/* KEYWORDS */}

                    {paper.keywords && (

                      <div className="mt-6">

                        <h4 className="text-xs uppercase tracking-[2px] font-bold text-[#A58A56] mb-3">
                          Keywords
                        </h4>

                        <div className="flex flex-wrap gap-2">

                          {paper.keywords.split(",").map((keyword, i) => (

                            <span
                              key={i}
                              className="bg-[#F2F0E9] text-[#555E57] px-3 py-2 text-xs"
                            >
                              {keyword.trim()}
                            </span>

                          ))}

                        </div>

                      </div>

                    )}


                    {/* PAPER ACTIONS */}

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EEEAE1] mt-7 pt-6">

                      <div className="flex items-center gap-2 text-xs text-[#777D76]">

                        <CheckCircle
                          size={15}
                          className="text-green-700"
                        />

                        Peer Reviewed & Published

                      </div>

                      <div className="flex flex-wrap gap-3">

                        <a
                          href={getPdfUrl(paper._id)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 border border-[#173D35] text-[#173D35] px-4 py-2.5 text-xs font-semibold hover:bg-[#173D35] hover:text-white transition"
                        >
                          <Eye size={15} />
                          View PDF
                        </a>

                        <a
                          href={getPdfUrl(paper._id, true)}
                          className="inline-flex items-center gap-2 bg-[#173D35] text-white px-4 py-2.5 text-xs font-semibold hover:bg-[#24574A] transition"
                        >
                          <Download size={15} />
                          Download
                        </a>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          )}

        </div>
      </section>


      {/* =====================================
          RESEARCH AREAS
      ===================================== */}

      <section className="bg-[#F2F0E9] px-6 py-20 md:px-12">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
              Multidisciplinary Research
            </span>

            <h2 className="font-serif text-3xl md:text-4xl text-[#173D35] mt-4">
              Explore Research Areas
            </h2>

            <div className="w-16 h-[2px] bg-[#B89B64] mx-auto mt-6" />

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              "Computer Science & Engineering",
              "Management Studies",
              "Education",
              "Science & Technology",
              "Health Sciences",
              "Social Sciences",
            ].map((area, index) => (

              <div
                key={index}
                className="bg-white border border-[#E8E3D8] p-7 flex items-center gap-4 hover:border-[#B89B64] hover:-translate-y-1 transition duration-300"
              >

                <div className="w-11 h-11 flex items-center justify-center bg-[#173D35] text-[#D1BC91] shrink-0">
                  <BookOpen size={20} />
                </div>

                <h3 className="font-serif text-lg text-[#173D35]">
                  {area}
                </h3>

              </div>

            ))}

          </div>

        </div>
      </section>


      {/* =====================================
          QUOTE SECTION
      ===================================== */}

      <section className="bg-[#173D35] px-6 py-20 md:px-12">

        <div className="max-w-4xl mx-auto text-center">

          <Quote
            size={45}
            className="mx-auto text-[#B89B64] mb-7"
          />

          <h2 className="font-serif text-2xl md:text-4xl text-white leading-relaxed">
            "Research is the foundation of innovation,
            discovery, and meaningful progress."
          </h2>

          <div className="w-16 h-[2px] bg-[#B89B64] mx-auto mt-8" />

          <p className="text-[#D1BC91] uppercase tracking-[3px] text-xs mt-6">
            International Multidisciplinary Research Journal
          </p>

        </div>

      </section>


      {/* =====================================
          CALL TO ACTION
      ===================================== */}

      <section className="px-6 py-20 md:px-12">

        <div className="max-w-7xl mx-auto bg-white border border-[#E8E3D8] p-9 md:p-14 text-center">

          <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
            Contribute to Research
          </span>

          <h2 className="font-serif text-3xl md:text-4xl text-[#173D35] mt-5">
            Share Your Research With the World
          </h2>

          <p className="text-[#777D76] text-sm leading-8 max-w-2xl mx-auto mt-5">
            Have an original research paper or academic contribution?
            Submit your manuscript and become part of our growing
            multidisciplinary research community.
          </p>

          <Link
            to="/submit-manuscript"
            className="inline-flex items-center gap-3 bg-[#173D35] text-white px-8 py-4 mt-8 text-sm font-semibold hover:bg-[#24574A] transition"
          >
            Submit Your Manuscript
            <ArrowUpRight size={17} />
          </Link>

        </div>

      </section>

    </div>
  );
};

export default CurrentIssue;