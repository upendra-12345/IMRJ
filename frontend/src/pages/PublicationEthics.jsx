import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  FileCheck,
  SearchCheck,
  AlertTriangle,
  BookOpen,
  Scale,
  LockKeyhole,
  CheckCircle2,
  ArrowRight,
  Mail,
} from "lucide-react";

const ethicsSections = [
  {
    icon: Users,
    title: "Responsibilities of Authors",
    description:
      "Authors are expected to submit original research and present their findings honestly and accurately.",
    points: [
      "Submit only original work that has not been published elsewhere.",
      "Ensure that all listed authors have made meaningful contributions.",
      "Provide accurate data, results, and references.",
      "Obtain permission for any copyrighted material used.",
      "Disclose relevant conflicts of interest.",
      "Avoid submitting the same manuscript to multiple journals simultaneously.",
    ],
  },
  {
    icon: SearchCheck,
    title: "Responsibilities of Editors",
    description:
      "Editors should make fair, unbiased, and responsible decisions throughout the publication process.",
    points: [
      "Evaluate manuscripts based on academic quality and relevance.",
      "Maintain confidentiality of submitted manuscripts.",
      "Avoid discrimination based on personal or institutional factors.",
      "Manage conflicts of interest appropriately.",
      "Ensure that editorial decisions are transparent and consistent.",
    ],
  },
  {
    icon: FileCheck,
    title: "Responsibilities of Reviewers",
    description:
      "Reviewers play an important role in maintaining the quality and integrity of published research.",
    points: [
      "Provide objective, constructive, and timely feedback.",
      "Maintain confidentiality of manuscripts under review.",
      "Identify relevant missing references where appropriate.",
      "Report suspected plagiarism or research misconduct.",
      "Decline reviews when conflicts of interest exist.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Plagiarism and Research Misconduct",
    description:
      "IMRJ expects all submitted manuscripts to maintain high standards of originality and academic integrity.",
    points: [
      "Plagiarism, including self-plagiarism, is not acceptable.",
      "Fabrication or falsification of research data is prohibited.",
      "Improper citation and unattributed use of others' work should be avoided.",
      "Manuscripts may be checked for originality.",
      "Suspected misconduct may lead to rejection or further investigation.",
    ],
  },
  {
    icon: Scale,
    title: "Conflicts of Interest",
    description:
      "Transparency is essential when personal, financial, or professional interests may influence research.",
    points: [
      "Authors should disclose relevant financial and non-financial interests.",
      "Editors and reviewers should declare potential conflicts.",
      "Individuals with significant conflicts may be excluded from decisions.",
      "Disclosures should be accurate and complete.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "Confidentiality and Data Protection",
    description:
      "The journal should respect the privacy of authors, reviewers, and research participants.",
    points: [
      "Manuscripts and reviewer comments should be treated confidentially.",
      "Personal information should be handled responsibly.",
      "Research involving human participants should follow applicable ethical standards.",
      "Necessary ethical approvals and participant consent should be obtained where applicable.",
    ],
  },
];

const EthicsCard = ({ section, index }) => {
  const Icon = section.icon;

  return (
    <div className="group rounded-2xl border border-[#e8e2d5] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#173D35] text-[#D1BC91]">
          <Icon size={23} />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B89B64]">
            Principle {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-[#173D35]">
            {section.title}
          </h3>
        </div>
      </div>

      <p className="mb-5 text-sm leading-7 text-gray-600">
        {section.description}
      </p>

      <ul className="space-y-3">
        {section.points.map((point, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-6 text-gray-700">
            <CheckCircle2
              size={17}
              className="mt-1 shrink-0 text-[#B89B64]"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PublicationEthics = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] px-6 py-20 text-white">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D1BC91]/40 bg-white/10 text-[#D1BC91]">
            <ShieldCheck size={34} />
          </div>

          <span className="inline-block rounded-full border border-[#D1BC91]/40 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E5D6B7]">
            Academic Integrity & Responsibility
          </span>

          <h1 className="mt-7 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Publication Ethics
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            Promoting honesty, transparency, originality, and ethical
            practices in academic research and scholarly publication.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white/80">
            <span className="rounded-full border border-white/20 px-4 py-2">
              Research Integrity
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2">
              Transparency
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2">
              Academic Responsibility
            </span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#B89B64]">
              Our Commitment
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold leading-snug text-[#173D35] md:text-4xl">
              Building Trust Through Ethical Research
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              The International Multidisciplinary Research Journal (IMRJ)
              recognizes the importance of ethical standards in scholarly
              publishing. Responsible research practices help maintain
              academic credibility, protect the rights of contributors, and
              support the development of reliable knowledge.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Authors, editors, reviewers, and other contributors are expected
              to follow appropriate ethical principles throughout the
              submission, review, and publication process.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8e2d5] bg-[#F1EEE5] p-8">
            <BookOpen size={35} className="text-[#B89B64]" />

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#173D35]">
              Our Ethical Values
            </h3>

            <div className="mt-6 space-y-4">
              {[
                "Originality and authenticity",
                "Fair and unbiased evaluation",
                "Transparency and accountability",
                "Respect for intellectual property",
                "Responsible research practices",
              ].map((value, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-[#B89B64]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Principles */}
      <section className="bg-[#F1EEE5] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#B89B64]">
              Ethical Guidelines
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#173D35] md:text-4xl">
              Principles of Publication Ethics
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              These principles outline the responsibilities of everyone
              involved in the academic publishing process.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {ethicsSections.map((section, index) => (
              <EthicsCard
                key={section.title}
                section={section}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Corrections and Retractions */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-[#e8e2d5] bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#173D35] text-[#D1BC91]">
              <FileCheck size={28} />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-[#173D35] md:text-3xl">
                Corrections and Retractions
              </h2>

              <p className="mt-4 leading-8 text-gray-600">
                If significant errors or ethical concerns are identified in a
                published article, the journal may review the matter and take
                appropriate corrective action. Depending on the circumstances,
                this may include publishing a correction, issuing an expression
                of concern, or retracting the article.
              </p>

              <p className="mt-3 leading-8 text-gray-600">
                All such matters should be handled carefully, fairly, and
                transparently, with the aim of maintaining the integrity of
                the academic record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#173D35] px-8 py-12 text-center text-white md:px-16">
          <Scale size={35} className="mx-auto text-[#D1BC91]" />

          <h2 className="mt-5 font-serif text-3xl font-bold md:text-4xl">
            Questions About Publication Ethics?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
            For questions or concerns regarding research integrity,
            publication ethics, or editorial practices, please contact the
            journal.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#D1BC91] px-7 py-3 font-semibold text-[#173D35] transition hover:bg-white"
            >
              <Mail size={18} />
              Contact Journal
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/author-guidelines"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Author Guidelines
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicationEthics;