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
  ClipboardCheck,
  MessageSquareText,
  RefreshCw,
  GraduationCap,
} from "lucide-react";

// Publication ethics principles
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
      "Obtain permission for copyrighted material used in the manuscript.",
      "Disclose relevant financial and non-financial conflicts of interest.",
      "Avoid submitting the same manuscript to multiple journals simultaneously.",
      "Acknowledge all sources and contributions appropriately.",
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
      "Ensure editorial decisions are transparent and consistent.",
      "Select appropriate reviewers based on subject expertise.",
      "Take appropriate action when ethical concerns arise.",
    ],
  },
  {
    icon: FileCheck,
    title: "Responsibilities of Reviewers",
    description:
      "Reviewers help maintain the academic quality, originality, and integrity of published research.",
    points: [
      "Provide objective, constructive, and timely feedback.",
      "Maintain confidentiality of manuscripts under review.",
      "Identify relevant missing references where appropriate.",
      "Report suspected plagiarism or research misconduct.",
      "Decline reviews when conflicts of interest exist.",
      "Avoid using unpublished research for personal advantage.",
      "Support fair and evidence-based evaluation.",
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
      "Submitted manuscripts may be checked for originality.",
      "Suspected misconduct may lead to rejection or further investigation.",
      "Authors may be asked to clarify concerns regarding originality.",
    ],
  },
  {
    icon: Scale,
    title: "Conflicts of Interest",
    description:
      "Transparency is essential when personal, financial, or professional interests may influence research.",
    points: [
      "Authors should disclose relevant financial interests.",
      "Non-financial conflicts should also be disclosed.",
      "Editors and reviewers should declare potential conflicts.",
      "Individuals with significant conflicts may be excluded from decisions.",
      "Disclosures should be accurate and complete.",
    ],
  },
  {
    icon: LockKeyhole,
    title: "Confidentiality and Data Protection",
    description:
      "The journal should respect the privacy of authors, reviewers, research participants, and contributors.",
    points: [
      "Manuscripts and reviewer comments should be treated confidentially.",
      "Personal information should be handled responsibly.",
      "Research involving human participants should follow applicable ethical standards.",
      "Necessary ethical approvals and participant consent should be obtained where applicable.",
      "Sensitive research data should be protected from unauthorized access.",
    ],
  },
  {
    icon: GraduationCap,
    title: "Research Ethics and Participant Consent",
    description:
      "Research involving human participants, animals, or sensitive information should follow appropriate ethical standards.",
    points: [
      "Authors should obtain ethical approval where required.",
      "Informed consent should be obtained from human participants where applicable.",
      "Participant privacy and confidentiality must be protected.",
      "Research involving animals should follow applicable institutional and legal guidelines.",
      "Ethical approval details should be included in the manuscript where relevant.",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Editorial Integrity",
    description:
      "The journal aims to maintain fairness, transparency, and accountability in editorial and peer-review decisions.",
    points: [
      "Editorial decisions should be based on scholarly merit.",
      "Peer-review processes should be conducted fairly.",
      "Reviewers should have relevant subject knowledge.",
      "Editorial decisions should not be influenced by commercial or personal interests.",
      "Concerns regarding editorial conduct should be handled responsibly.",
    ],
  },
];

// Ethical values
const ethicalValues = [
  "Originality and authenticity",
  "Fair and unbiased evaluation",
  "Transparency and accountability",
  "Respect for intellectual property",
  "Responsible research practices",
  "Confidentiality and trust",
];

// Reusable ethics card
const EthicsCard = ({ section, index }) => {
  const Icon = section.icon;

  return (
    <article className="group rounded-2xl border border-[#e8e2d5] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#B89B64]/50 hover:shadow-xl sm:p-7">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#173D35] text-[#D1BC91] transition-colors duration-300 group-hover:bg-[#B89B64] group-hover:text-white">
          <Icon size={23} />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B89B64]">
            Principle {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="mt-1 text-lg font-bold leading-snug text-[#173D35]">
            {section.title}
          </h3>
        </div>
      </div>

      <p className="mb-5 text-sm leading-7 text-gray-600">
        {section.description}
      </p>

      <div className="mb-5 h-px bg-[#eee9df]" />

      <ul className="space-y-3">
        {section.points.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm leading-6 text-gray-700"
          >
            <CheckCircle2
              size={17}
              className="mt-1 shrink-0 text-[#B89B64]"
            />

            <span>{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

// Reusable information section
const PolicySection = ({ icon: Icon, title, children }) => {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#173D35] text-[#D1BC91]">
        <Icon size={27} />
      </div>

      <div>
        <h3 className="font-serif text-2xl font-bold text-[#173D35]">
          {title}
        </h3>

        <div className="mt-3 space-y-3 text-sm leading-7 text-gray-600 md:text-base">
          {children}
        </div>
      </div>
    </div>
  );
};

const PublicationEthics = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF9F6]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] px-6 py-20 text-white md:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute right-[20%] top-1/2 h-40 w-40 rounded-full border border-[#D1BC91]/10" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D1BC91]/40 bg-white/10 text-[#D1BC91] shadow-lg">
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
            {[
              "Research Integrity",
              "Transparency",
              "Academic Responsibility",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/20 px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
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

            <div className="mt-7 flex items-center gap-3 border-l-4 border-[#B89B64] bg-[#F1EEE5] p-4">
              <ShieldCheck className="shrink-0 text-[#173D35]" size={23} />

              <p className="text-sm font-medium leading-6 text-[#173D35]">
                Academic integrity is a shared responsibility of everyone
                involved in scholarly publishing.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#e8e2d5] bg-[#F1EEE5] p-8 md:p-9">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#B89B64]/10" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#173D35] text-[#D1BC91]">
                <BookOpen size={30} />
              </div>

              <h3 className="mt-6 font-serif text-2xl font-bold text-[#173D35]">
                Our Ethical Values
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                The foundation of responsible academic publishing.
              </p>

              <div className="mt-7 space-y-4">
                {ethicalValues.map((value) => (
                  <div key={value} className="flex items-center gap-3">
                    <CheckCircle2
                      size={19}
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
        </div>
      </section>

      {/* ================= ETHICAL PRINCIPLES ================= */}
      <section className="bg-[#F1EEE5] px-6 py-16 md:py-20">
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
              involved in the academic publishing process and help maintain
              the quality and credibility of scholarly work.
            </p>

            <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#B89B64]" />
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

      {/* ================= COMPLAINTS AND APPEALS ================= */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#B89B64]">
            Transparency & Accountability
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-[#173D35] md:text-4xl">
            Editorial Procedures
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Responsible handling of editorial decisions, concerns, and
            publication-related issues.
          </p>
        </div>

        <div className="space-y-10 rounded-3xl border border-[#e8e2d5] bg-white p-7 shadow-sm md:p-10">
          <PolicySection
            icon={MessageSquareText}
            title="Complaints and Appeals"
          >
            <p>
              Authors who have concerns regarding editorial decisions or the
              publication process may contact the journal with a clear
              explanation of the issue.
            </p>

            <p>
              Complaints should be reviewed fairly and objectively. Appeals
              should include relevant information or evidence supporting the
              request for reconsideration.
            </p>
          </PolicySection>

          <div className="h-px bg-[#eee9df]" />

          <PolicySection
            icon={RefreshCw}
            title="Corrections and Retractions"
          >
            <p>
              If significant errors or ethical concerns are identified in a
              published article, the journal may review the matter and take
              appropriate corrective action.
            </p>

            <p>
              Depending on the circumstances, this may include publishing a
              correction, issuing an expression of concern, or retracting the
              article.
            </p>

            <p>
              Such matters should be handled carefully, fairly, and
              transparently, with the aim of maintaining the integrity of the
              academic record.
            </p>
          </PolicySection>

          <div className="h-px bg-[#eee9df]" />

          <PolicySection
            icon={ShieldCheck}
            title="Handling Research Misconduct"
          >
            <p>
              Allegations of plagiarism, data fabrication, falsification, or
              other forms of research misconduct should be examined
              responsibly.
            </p>

            <p>
              The journal may request clarification or supporting information
              from the concerned authors and take appropriate action based on
              the findings of its review.
            </p>
          </PolicySection>
        </div>
      </section>

      {/* ================= FINAL QUOTE ================= */}
      <section className="bg-[#F1EEE5] px-6 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#B89B64] shadow-sm">
            <BookOpen size={27} />
          </div>

          <h2 className="mt-6 font-serif text-2xl font-bold leading-relaxed text-[#173D35] md:text-3xl">
            "Integrity in research is the foundation of trustworthy knowledge
            and meaningful academic progress."
          </h2>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#B89B64]">
            Commitment to Academic Excellence
          </p>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="px-6 py-16">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#173D35] px-8 py-12 text-center text-white md:px-16 md:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-[#D1BC91]/15" />

          <div className="relative">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D1BC91]/30 bg-white/10 text-[#D1BC91]">
              <Scale size={33} />
            </div>

            <h2 className="mt-6 font-serif text-3xl font-bold md:text-4xl">
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
                className="inline-flex items-center gap-2 rounded-full bg-[#D1BC91] px-7 py-3 font-semibold text-[#173D35] transition duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <Mail size={18} />
                Contact Journal
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/author-guidelines"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Author Guidelines
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PublicationEthics;