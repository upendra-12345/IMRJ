import {
  BookOpen,
  FileText,
  Users,
  CheckCircle,
  ClipboardList,
  Upload,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  PenTool,
  Quote,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

function AuthorGuidelines() {
  const sections = [
    {
      icon: FileText,
      title: "Manuscript Preparation",
      description:
        "Authors should prepare their manuscripts in a clear, structured and professional academic format.",
      points: [
        "Manuscripts must be original and written in clear English.",
        "Use a readable font such as Times New Roman, 12-point size.",
        "Use 1.5 line spacing and justified alignment.",
        "Include page numbers throughout the manuscript.",
        "The manuscript should be submitted in PDF format.",
      ],
    },
    {
      icon: ClipboardList,
      title: "Manuscript Structure",
      description:
        "Research papers should follow a standard academic structure.",
      points: [
        "Title of the Research Paper",
        "Author name(s), affiliation and email address",
        "Abstract (approximately 150–250 words)",
        "Keywords (4–6 relevant keywords)",
        "Introduction and Literature Review",
        "Research Methodology",
        "Results and Discussion",
        "Conclusion and Future Scope",
        "References",
      ],
    },
    {
      icon: Users,
      title: "Author Information",
      description:
        "All authors must provide accurate information at the time of submission.",
      points: [
        "Full name of the corresponding author.",
        "Institution or university affiliation.",
        "Department and designation, where applicable.",
        "Valid email address and contact number.",
        "All contributing authors must be listed.",
      ],
    },
    {
      icon: Quote,
      title: "References and Citations",
      description:
        "All sources used in the research must be properly acknowledged.",
      points: [
        "Cite all sources used in the manuscript.",
        "Maintain a consistent referencing style.",
        "Ensure every in-text citation appears in the reference list.",
        "Avoid incomplete or misleading references.",
        "Give proper credit to previously published research.",
      ],
    },
    {
      icon: ShieldCheck,
      title: "Originality and Plagiarism",
      description:
        "IMRJ encourages original, ethical and responsible academic research.",
      points: [
        "Submitted manuscripts must be original.",
        "The manuscript must not be published elsewhere.",
        "Simultaneous submission to other journals is not permitted.",
        "Proper citations must be provided for borrowed ideas and content.",
        "Plagiarism and research misconduct may lead to rejection.",
      ],
    },
    {
      icon: CheckCircle,
      title: "Review and Publication Process",
      description:
        "Every submitted manuscript is subject to editorial assessment.",
      points: [
        "Initial screening by the editorial team.",
        "Assessment for relevance, originality and formatting.",
        "Peer review, where applicable.",
        "Authors may be asked to revise their manuscripts.",
        "Final acceptance or rejection is communicated by the editorial team.",
      ],
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#252B29]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] text-white">

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89B64]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D1BC91]/40 bg-white/10 text-[#E5D5B1] text-xs tracking-widest uppercase mb-6">
            <BookOpen size={15} />
            For Authors
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Author Guidelines
          </h1>

          <div className="w-20 h-1 bg-[#B89B64] mt-6 mb-6 rounded-full" />

          <p className="text-[#E8E3D8] text-base md:text-lg leading-8 max-w-2xl">
            Guidelines for preparing and submitting research manuscripts
            to the International Multidisciplinary Research Journal.
          </p>

          <div className="flex flex-wrap gap-4 mt-9">

            <Link
              to="/submit-manuscript"
              className="inline-flex items-center gap-2 bg-[#D1BC91] text-[#173D35] px-6 py-3.5 rounded-lg font-semibold hover:bg-white transition"
            >
              Submit Manuscript
              <ArrowRight size={17} />
            </Link>

            <a
              href="#guidelines"
              className="inline-flex items-center gap-2 border border-white/40 px-6 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Read Guidelines
              <ArrowRight size={17} />
            </a>

          </div>

        </div>
      </section>


      {/* INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-[#B89B64] uppercase tracking-[0.2em] text-xs font-bold mb-4">
              Publishing with IMRJ
            </p>

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#173D35] leading-snug">
              Preparing Your Research for Publication
            </h2>

            <p className="text-[#68716B] leading-8 mt-6">
              The International Multidisciplinary Research Journal
              welcomes original research contributions from researchers,
              academicians, scholars and students across multiple
              disciplines.
            </p>

            <p className="text-[#68716B] leading-8 mt-4">
              Authors are requested to carefully review these guidelines
              before submitting their manuscripts to ensure a smooth
              editorial and review process.
            </p>
          </div>

          <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 shadow-sm">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#EAF0EB] flex items-center justify-center text-[#173D35]">
                <PenTool size={23} />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#173D35]">
                Before Submission
              </h3>
            </div>

            {[
              "Prepare an original research manuscript.",
              "Follow the prescribed manuscript structure.",
              "Verify author information and references.",
              "Check the manuscript for plagiarism.",
              "Ensure the uploaded PDF is complete and readable.",
            ].map((item, index) => (
              <div key={index} className="flex gap-3 mb-5 last:mb-0">

                <CheckCircle
                  size={19}
                  className="text-[#B89B64] shrink-0 mt-1"
                />

                <p className="text-sm text-[#68716B] leading-6">
                  {item}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* GUIDELINE CARDS */}
      <section id="guidelines" className="bg-[#F2F0E9] py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-2xl mx-auto mb-14">

            <p className="text-[#B89B64] uppercase tracking-[0.2em] text-xs font-bold mb-4">
              Submission Requirements
            </p>

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#173D35]">
              Guidelines for Authors
            </h2>

            <p className="text-[#68716B] mt-5 leading-7">
              Please follow the requirements below when preparing your
              research manuscript for submission.
            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {sections.map((section, index) => {
              const Icon = section.icon;

              return (
                <div
                  key={index}
                  className="bg-white p-7 rounded-2xl border border-[#E8E3D8] hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >

                  <div className="w-12 h-12 rounded-xl bg-[#EAF0EB] text-[#173D35] flex items-center justify-center mb-6">
                    <Icon size={23} />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#173D35] mb-3">
                    {section.title}
                  </h3>

                  <p className="text-sm text-[#68716B] leading-7 mb-5">
                    {section.description}
                  </p>

                  <div className="space-y-3">

                    {section.points.map((point, i) => (
                      <div key={i} className="flex gap-2.5">

                        <span className="text-[#B89B64] mt-1">
                          ✓
                        </span>

                        <p className="text-sm text-[#555E58] leading-6">
                          {point}
                        </p>

                      </div>
                    ))}

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* SUBMISSION CHECKLIST */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8 md:p-12">

          <div className="flex items-center gap-3 mb-8">

            <div className="w-12 h-12 bg-[#173D35] text-[#D1BC91] rounded-xl flex items-center justify-center">
              <ClipboardList size={24} />
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#173D35]">
                Submission Checklist
              </h2>

              <p className="text-sm text-[#777D76] mt-1">
                Review these points before submitting your paper.
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {[
              "The manuscript is original and unpublished.",
              "The title and abstract accurately represent the research.",
              "All authors and affiliations are correctly mentioned.",
              "Keywords are included.",
              "References and citations are properly formatted.",
              "The manuscript is uploaded in PDF format.",
              "The manuscript has been checked for plagiarism.",
              "All required submission information is provided.",
            ].map((item, index) => (

              <div
                key={index}
                className="flex gap-3 p-4 bg-[#FAF9F6] rounded-xl"
              >

                <CheckCircle
                  size={20}
                  className="text-[#B89B64] shrink-0 mt-0.5"
                />

                <p className="text-sm text-[#555E58] leading-6">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* IMPORTANT NOTICE */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex gap-4 p-6 rounded-xl bg-[#F3EDE0] border border-[#E5D5B1]">

          <AlertCircle
            size={23}
            className="text-[#9C7C43] shrink-0 mt-1"
          />

          <div>
            <h3 className="font-bold text-[#173D35] mb-2">
              Important Notice
            </h3>

            <p className="text-sm text-[#68716B] leading-7">
              Submission of a manuscript does not guarantee acceptance
              or publication. All manuscripts are subject to editorial
              evaluation and the journal's applicable review policies.
              Authors are responsible for ensuring the accuracy and
              originality of their submitted work.
            </p>
          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}
      <section className="bg-[#173D35]">

        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-white/10 text-[#D1BC91] flex items-center justify-center">
              <Upload size={25} />
            </div>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Ready to Submit Your Research?
          </h2>

          <p className="text-[#D9E1DC] mt-5 max-w-xl mx-auto leading-7">
            We welcome original research contributions from authors
            across different academic disciplines.
          </p>

          <Link
            to="/submit-manuscript"
            className="inline-flex items-center gap-2 mt-8 px-7 py-4 bg-[#D1BC91] text-[#173D35] rounded-lg font-bold hover:bg-white transition"
          >
            Submit Your Manuscript
            <ArrowRight size={18} />
          </Link>

          <div className="flex items-center justify-center gap-2 mt-8 text-[#D9E1DC] text-sm">
            <Mail size={16} />
            International Multidisciplinary Research Journal
          </div>

        </div>

      </section>

    </div>
  );
}

export default AuthorGuidelines;