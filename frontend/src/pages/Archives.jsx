import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Archive,
  BookOpen,
  Calendar,
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  Clock,
  Globe,
  FileText,
  Sparkles,
  Download,
  User,
  Building2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

function Archives() {
  const [archiveYears, setArchiveYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/api/submissions/archives`
        );

        // Backend returns archives, not papers
        const archives = response.data.archives || [];

        const years = archives.map((item) => ({
          year: item.year,
          count: item.count,
          papers: item.papers || [],
          description: `Explore ${item.count} published research ${
            item.count === 1 ? "paper" : "papers"
          } from ${item.year}.`,
          status: "Published",
          volumes: `${item.count} Published ${
            item.count === 1 ? "Paper" : "Papers"
          }`,
        }));

        years.sort((a, b) => Number(b.year) - Number(a.year));

        setArchiveYears(years);
      } catch (err) {
        console.error("Error fetching archives:", err);

        setError(
          "Unable to load publication archives. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, []);

  const handleDownload = async (paperId, fileName) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/submissions/${paperId}/download`,
        { responseType: "blob" }
      );

      const fileURL = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = fileName || "research-paper.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(fileURL);
    } catch (err) {
      console.error("Download error:", err);
      alert("Unable to download this paper. Please try again.");
    }
  };

  return (
    <main className="overflow-hidden bg-[#FAF9F6] text-[#252B29]">

      {/* HERO SECTION */}
      <section className="relative flex min-h-[470px] items-center justify-center overflow-hidden bg-[#173D35] px-6 py-24 text-center">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102D26]/95 via-[#173D35]/90 to-[#173D35]/75" />

        <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-4xl">

          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center border border-[#D1BC91]/40 bg-white/10 text-[#D1BC91]">
            <Archive size={30} />
          </div>

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#D1BC91]">
            Explore Our Publications
          </p>

          <h1 className="font-serif text-5xl text-white sm:text-6xl md:text-7xl">
            Journal <span className="text-[#D1BC91]">Archives</span>
          </h1>

          <div className="mx-auto my-8 h-[2px] w-24 bg-[#B89B64]" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            Explore previously published journal issues, discover
            academic contributions, and access research publications
            from different years.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-white/60">
            <Link to="/" className="hover:text-[#D1BC91]">
              Home
            </Link>
            <span className="text-[#B89B64]">/</span>
            <span className="text-[#D1BC91]">Archives</span>
          </div>

        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              Previous Publications
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#173D35] sm:text-5xl">
              A Collection of
              <span className="text-[#B89B64]">
                {" "}Research & Knowledge.
              </span>
            </h2>

            <div className="my-8 h-[2px] w-20 bg-[#B89B64]" />

            <p className="max-w-xl text-base leading-8 text-[#777D76]">
              The IMRJ archive brings together previously published
              research papers and academic contributions. Browse
              publications by year and explore scholarly work
              across multiple disciplines.
            </p>
          </div>

          <div className="bg-[#173D35] p-9 text-white shadow-xl sm:p-12">
            <div className="mb-7 flex h-14 w-14 items-center justify-center bg-[#B89B64] text-[#173D35]">
              <BookMarked size={27} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1BC91]">
              Research Collection
            </p>

            <h3 className="mt-4 font-serif text-3xl sm:text-4xl">
              Knowledge That
              <br />
              Stands the Test of Time.
            </h3>

            <p className="mt-6 text-sm leading-7 text-white/65">
              Revisit previous academic publications and discover
              ideas that continue to inspire research and innovation.
            </p>
          </div>

        </div>
      </section>

      {/* DYNAMIC ARCHIVES */}
      <section className="border-y border-[#E8E3D8] bg-[#F2F0E9] px-6 py-24 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              Browse By Year
            </p>

            <h2 className="font-serif text-4xl text-[#173D35] sm:text-5xl">
              Publication Archives
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#777D76]">
              Browse published research papers by publication year.
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-[#E8E3D8] border-t-[#173D35]" />
              <p className="text-[#173D35]">
                Loading publication archives...
              </p>
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="py-16 text-center">
              <p className="text-red-600">{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-5 bg-[#173D35] px-6 py-3 text-sm text-white"
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && archiveYears.length === 0 && (
            <div className="py-20 text-center">
              <BookOpen
                size={50}
                className="mx-auto mb-6 text-[#B89B64]"
              />

              <h3 className="font-serif text-3xl text-[#173D35]">
                No Published Archives Yet
              </h3>

              <p className="mt-4 text-sm text-[#777D76]">
                Published research papers will appear here.
              </p>
            </div>
          )}

          {/* YEAR CARDS */}
          {!loading && !error && archiveYears.length > 0 && (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

              {archiveYears.map((item) => (
                <div
                  key={item.year}
                  className="group relative overflow-hidden border border-[#E8E3D8] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#B89B64] hover:shadow-xl"
                >

                  <span className="absolute -right-2 -top-5 font-serif text-8xl text-[#F2F0E9]">
                    {item.year.slice(2)}
                  </span>

                  <div className="relative">

                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center bg-[#173D35] text-[#D1BC91]">
                        <BookOpen size={27} />
                      </div>

                      <span className="border border-[#B89B64]/40 bg-[#B89B64]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#8D7141]">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="mt-8 font-serif text-5xl text-[#173D35]">
                      {item.year}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#777D76]">
                      {item.description}
                    </p>

                    <div className="mt-7 flex items-center gap-3 border-t border-[#E8E3D8] pt-5">
                      <Calendar size={17} className="text-[#B89B64]" />
                      <span className="text-xs font-medium text-[#777D76]">
                        {item.volumes}
                      </span>
                    </div>

                    <Link
                      to={`/archives/${item.year}`}
                      className="mt-7 flex items-center justify-between border-b border-[#B89B64] pb-3 text-sm font-semibold text-[#173D35]"
                    >
                      View Published Papers
                      <ArrowRight size={19} />
                    </Link>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* PUBLISHED PAPERS */}
      {!loading && !error && archiveYears.length > 0 && (
        <section className="px-6 py-24 md:px-10">

          <div className="mx-auto max-w-7xl">

            <div className="mb-14 text-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
                Published Research
              </p>

              <h2 className="font-serif text-4xl text-[#173D35] sm:text-5xl">
                Research Publications
              </h2>

              <p className="mt-5 text-[#777D76]">
                Access published research papers from the IMRJ journal.
              </p>
            </div>

            {archiveYears.map((yearItem) => (
              <div key={yearItem.year} className="mb-16">

                <div className="mb-8 flex items-center gap-4">
                  <h3 className="font-serif text-3xl text-[#173D35]">
                    {yearItem.year}
                  </h3>

                  <div className="h-px flex-1 bg-[#E8E3D8]" />

                  <span className="text-xs text-[#8D7141]">
                    {yearItem.count} Papers
                  </span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">

                  {yearItem.papers.map((paper) => (
                    <article
                      key={paper._id}
                      className="border border-[#E8E3D8] bg-white p-7 transition-all duration-300 hover:border-[#B89B64] hover:shadow-lg"
                    >

                      <div className="flex items-center justify-between">
                        <span className="bg-[#173D35]/5 px-3 py-2 text-xs font-semibold text-[#173D35]">
                          {paper.category || "Research Paper"}
                        </span>

                        <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
                          <BookMarked size={14} />
                          Published
                        </span>
                      </div>

                      <h4 className="mt-6 font-serif text-2xl leading-snug text-[#173D35]">
                        {paper.title}
                      </h4>

                      <div className="mt-5 space-y-3 text-sm text-[#777D76]">

                        <p className="flex items-center gap-3">
                          <User size={16} className="text-[#B89B64]" />
                          {paper.authorName}
                        </p>

                        <p className="flex items-center gap-3">
                          <Building2 size={16} className="text-[#B89B64]" />
                          {paper.institution}
                        </p>

                        <p className="flex items-center gap-3">
                          <Calendar size={16} className="text-[#B89B64]" />
                          {paper.publishedAt
                            ? new Date(paper.publishedAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Date unavailable"}
                        </p>

                      </div>

                      {paper.abstract && (
                        <p className="mt-6 line-clamp-3 text-sm leading-7 text-[#777D76]">
                          {paper.abstract}
                        </p>
                      )}

                      <div className="mt-7 border-t border-[#E8E3D8] pt-5">

                        <button
                          onClick={() =>
                            handleDownload(
                              paper._id,
                              paper.paperFile?.originalName
                            )
                          }
                          className="inline-flex items-center gap-3 bg-[#173D35] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#24574A]"
                        >
                          <Download size={17} />
                          Download Full Paper
                        </button>

                      </div>

                    </article>
                  ))}

                </div>
              </div>
            ))}

          </div>
        </section>
      )}

      {/* ARCHIVE INFORMATION */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">

          <div className="flex gap-5 border-b border-[#E8E3D8] pb-7 md:border-b-0 md:border-r md:pb-0 md:pr-7">
            <FileText size={28} className="shrink-0 text-[#B89B64]" />
            <div>
              <h3 className="font-serif text-xl text-[#173D35]">
                Academic Papers
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#777D76]">
                Explore scholarly contributions from different research disciplines.
              </p>
            </div>
          </div>

          <div className="flex gap-5 border-b border-[#E8E3D8] pb-7 md:border-b-0 md:border-r md:pb-0 md:pr-7">
            <Globe size={28} className="shrink-0 text-[#B89B64]" />
            <div>
              <h3 className="font-serif text-xl text-[#173D35]">
                Global Research
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#777D76]">
                Discover research ideas and academic perspectives from diverse fields.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <Clock size={28} className="shrink-0 text-[#B89B64]" />
            <div>
              <h3 className="font-serif text-xl text-[#173D35]">
                Previous Issues
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#777D76]">
                Browse past publications and revisit valuable academic research.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="relative overflow-hidden bg-[#173D35] px-6 py-24 md:px-10">

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-[#B89B64] text-[#173D35]">
            <Sparkles size={30} />
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D1BC91]">
            Contribute to Research
          </p>

          <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
            Have New Research
            <span className="text-[#D1BC91]">
              {" "}to Share?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65">
            Become a part of our academic community. Submit your
            manuscript and contribute to multidisciplinary research.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/submit-manuscript"
              className="inline-flex items-center gap-3 bg-[#B89B64] px-8 py-4 text-sm font-bold text-[#173D35] hover:bg-[#D1BC91]"
            >
              Submit Your Research
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-white/40 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Archives;