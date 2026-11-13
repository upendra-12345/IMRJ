import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  User,
  Building2,
  Download,
  FileText,
} from "lucide-react";

function ArchiveYear() {
  const { year } = useParams();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/api/submissions/archives");

        const archives = response.data.archives || [];

        const selectedYear = archives.find(
          (item) => String(item.year) === String(year)
        );

        setPapers(selectedYear?.papers || []);

      } catch (err) {
        console.error("Archive fetching error:", err);
        setError("Unable to load published papers.");
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, [year]);

  // Download published research paper
  const downloadPaper = async (paper) => {
    try {
      const response = await API.get(
        `/api/submissions/${paper._id}/download`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download =
        paper.paperFile?.originalName || "research-paper.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Paper download error:", err);
      alert("Unable to download paper.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-6 py-16 md:px-10">

      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          to="/archives"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#173D35] hover:text-[#B89B64]"
        >
          <ArrowLeft size={18} />
          Back to Archives
        </Link>

        {/* Page Header */}
        <div className="mb-14 border-b border-[#E8E3D8] pb-10">

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
            IMRJ Publication Archives
          </p>

          <h1 className="font-serif text-5xl text-[#173D35] md:text-6xl">
            Publications {year}
          </h1>

          <p className="mt-5 text-[#777D76]">
            Explore all research papers published in {year}.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <p className="py-16 text-center text-[#173D35]">
            Loading published papers...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="py-16 text-center text-red-600">
            {error}
          </p>
        )}

        {/* No Papers */}
        {!loading && !error && papers.length === 0 && (
          <div className="py-20 text-center">

            <BookOpen
              size={50}
              className="mx-auto mb-5 text-[#B89B64]"
            />

            <h2 className="font-serif text-3xl text-[#173D35]">
              No Papers Found
            </h2>

            <p className="mt-4 text-[#777D76]">
              No published papers are available for {year}.
            </p>

          </div>
        )}

        {/* Published Papers */}
        {!loading && !error && papers.length > 0 && (
          <>

            <div className="mb-10 flex items-center justify-between">

              <h2 className="font-serif text-3xl text-[#173D35]">
                Published Research
              </h2>

              <span className="bg-[#173D35] px-4 py-2 text-sm text-white">
                {papers.length} Papers
              </span>

            </div>

            <div className="grid gap-7 md:grid-cols-2">

              {papers.map((paper) => (

                <article
                  key={paper._id}
                  className="border border-[#E8E3D8] bg-white p-8 transition-all hover:-translate-y-1 hover:border-[#B89B64] hover:shadow-xl"
                >

                  {/* Category and Status */}
                  <div className="flex items-center justify-between">

                    <span className="bg-[#173D35]/5 px-3 py-2 text-xs font-semibold text-[#173D35]">
                      {paper.category || "Research Paper"}
                    </span>

                    <span className="text-xs font-semibold text-green-700">
                      Published
                    </span>

                  </div>

                  {/* Paper Title */}
                  <h3 className="mt-7 font-serif text-2xl leading-snug text-[#173D35]">
                    {paper.title}
                  </h3>

                  {/* Paper Information */}
                  <div className="mt-6 space-y-4 text-sm text-[#777D76]">

                    <p className="flex items-center gap-3">
                      <User size={17} className="text-[#B89B64]" />
                      {paper.authorName}
                    </p>

                    <p className="flex items-center gap-3">
                      <Building2 size={17} className="text-[#B89B64]" />
                      {paper.institution}
                    </p>

                    <p className="flex items-center gap-3">
                      <Calendar size={17} className="text-[#B89B64]" />
                      {paper.publishedAt
                        ? new Date(paper.publishedAt).toLocaleDateString("en-IN")
                        : "Date unavailable"}
                    </p>

                    <p className="flex items-center gap-3">
                      <FileText size={17} className="text-[#B89B64]" />
                      {paper.submissionId}
                    </p>

                  </div>

                  {/* Abstract */}
                  {paper.abstract && (
                    <p className="mt-6 border-t border-[#E8E3D8] pt-5 text-sm leading-7 text-[#777D76]">
                      {paper.abstract}
                    </p>
                  )}

                  {/* Download Button */}
                  <button
                    onClick={() => downloadPaper(paper)}
                    className="mt-7 inline-flex items-center gap-3 bg-[#173D35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24574A]"
                  >
                    <Download size={17} />
                    Download Research Paper
                  </button>

                </article>

              ))}

            </div>

          </>
        )}

      </div>

    </main>
  );
}

export default ArchiveYear;