import { Link } from "react-router-dom";

import {
  ClipboardCheck,
  Users,
  ShieldCheck,
  Award,
  CheckCircle,
  ArrowRight,
  Clock,
  GraduationCap,
  FileCheck,
  BookOpen,
  Eye,
  Mail,
  SearchCheck,
  Scale,
  Sparkles,
} from "lucide-react";

// Reviewer Responsibilities
const responsibilities = [
  "Evaluate manuscripts objectively and provide constructive feedback.",
  "Maintain strict confidentiality of submitted research papers.",
  "Identify originality, research quality, and methodological issues.",
  "Declare any potential conflicts of interest.",
  "Complete manuscript reviews within the specified timeframe.",
  "Follow publication ethics and academic integrity standards.",
];

// Review Criteria
const reviewCriteria = [
  {
    icon: Award,
    title: "Originality",
    description:
      "Assess the originality, novelty, and contribution of the research to the relevant academic field.",
  },
  {
    icon: FileCheck,
    title: "Research Quality",
    description:
      "Evaluate the accuracy, relevance, research methodology, and quality of the findings.",
  },
  {
    icon: BookOpen,
    title: "Clarity & Presentation",
    description:
      "Examine the organization, readability, language, and overall presentation of the manuscript.",
  },
  {
    icon: Eye,
    title: "References",
    description:
      "Check the relevance, accuracy, and adequacy of references and citations.",
  },
];

// Peer Review Process
const reviewProcess = [
  {
    number: "01",
    title: "Manuscript Assignment",
    description:
      "The editorial team assigns manuscripts to suitable reviewers according to their academic expertise.",
  },
  {
    number: "02",
    title: "Manuscript Evaluation",
    description:
      "Reviewers carefully examine the manuscript for originality, methodology, research quality, and relevance.",
  },
  {
    number: "03",
    title: "Review Submission",
    description:
      "Reviewers provide constructive feedback, suggestions, and recommendations to the editorial team.",
  },
  {
    number: "04",
    title: "Editorial Decision",
    description:
      "The editorial team considers reviewer recommendations and communicates the decision to the author.",
  },
];

// Review Recommendations
const recommendations = [
  {
    title: "Accept",
    description:
      "The manuscript meets the journal's publication requirements.",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    title: "Minor Revision",
    description:
      "The manuscript requires small corrections or clarifications.",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    title: "Major Revision",
    description:
      "The manuscript requires substantial improvements before reconsideration.",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    title: "Reject",
    description:
      "The manuscript does not meet the required academic standards.",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
];

// Reusable Section Heading
const SectionHeading = ({ label, title, description }) => (
  <div className="mx-auto mb-14 max-w-2xl text-center">
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B64]">
      {label}
    </span>

    <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#173D35] md:text-4xl">
      {title}
    </h2>

    <p className="mt-5 leading-7 text-gray-600">{description}</p>

    <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-[#B89B64]" />
  </div>
);

// Reusable Review Process Card
const ProcessCard = ({ step, index }) => (
  <article className="group relative rounded-2xl border border-[#e8e2d5] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <span className="font-serif text-5xl font-bold text-[#B89B64]/40 transition-colors group-hover:text-[#B89B64]">
      {step.number}
    </span>

    <h3 className="mt-6 text-lg font-bold text-[#173D35]">
      {step.title}
    </h3>

    <p className="mt-4 text-sm leading-7 text-gray-600">
      {step.description}
    </p>

    {index !== 3 && (
      <div className="absolute -right-4 top-12 z-10 hidden h-8 w-8 items-center justify-center rounded-full bg-[#B89B64] text-white shadow-md lg:flex">
        <ArrowRight size={16} />
      </div>
    )}
  </article>
);

function Reviewer() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAF9F6]">

      {/* ================= HERO SECTION ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] px-6 py-20 text-white md:py-24">

        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-[#D1BC91]/10" />

        <div className="pointer-events-none absolute right-[20%] top-1/2 h-40 w-40 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D1BC91]/40 bg-white/10 text-[#D1BC91]">
            <Users size={32} />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-[#D1BC91]/40 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E5D6B7]">
            <Sparkles size={14} />
            IMRJ Academic Community
          </span>

          <h1 className="mt-7 font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            For Reviewers
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 md:text-lg">
            Supporting academic excellence through objective evaluation,
            constructive feedback, and ethical peer review.
          </p>

          <div className="mx-auto mt-9 h-1 w-20 rounded-full bg-[#B89B64]" />

          <div className="mt-9 flex flex-wrap justify-center gap-3 text-sm text-white/80">
            {["Academic Excellence", "Research Integrity", "Fair Evaluation"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 px-4 py-2"
                >
                  {item}
                </span>
              )
            )}
          </div>

        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        <div className="grid items-center gap-12 md:grid-cols-2">

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B64]">
              Reviewer Information
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold leading-snug text-[#173D35] md:text-4xl">
              Welcome to the IMRJ Reviewer Community
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Reviewers play an essential role in maintaining the academic
              quality, credibility, and integrity of the International
              Multidisciplinary Research Journal.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              We invite experienced researchers, academicians, and subject
              experts to contribute their knowledge and expertise to the
              scholarly publication process through fair, independent, and
              constructive manuscript evaluation.
            </p>

            <div className="mt-7">
              <Link
                to="/publication-ethics"
                className="inline-flex items-center gap-2 font-semibold text-[#173D35] transition hover:text-[#B89B64]"
              >
                Read Publication Ethics
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#e8e2d5] bg-[#F1EEE5] p-8 md:p-10">

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#B89B64]/10" />

            <div className="relative">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#173D35] text-[#D1BC91]">
                <Award size={34} />
              </div>

              <h3 className="mt-7 font-serif text-2xl font-bold text-[#173D35]">
                Our Commitment
              </h3>

              <p className="mt-4 leading-8 text-gray-600">
                IMRJ aims to promote a transparent, fair, confidential, and
                academically rigorous peer-review environment that supports
                high-quality multidisciplinary research and scholarly
                communication.
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-[#DED7C8] pt-6 text-[#B89B64]">
                <GraduationCap size={24} />

                <span className="text-sm font-semibold text-[#173D35]">
                  Promoting Research Excellence
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= RESPONSIBILITIES ================= */}

      <section className="bg-white px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <SectionHeading
            label="Professional Standards"
            title="Reviewer Responsibilities"
            description="Reviewers are expected to maintain professional standards throughout the manuscript evaluation process."
          />

          <div className="grid gap-5 md:grid-cols-2">

            {responsibilities.map((item, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 rounded-2xl border border-[#e8e2d5] bg-[#FAF9F6] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B89B64]/60 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#173D35] text-[#D1BC91] transition-colors group-hover:bg-[#B89B64] group-hover:text-white">
                  <CheckCircle size={21} />
                </div>

                <p className="pt-1 text-sm leading-7 text-gray-700">
                  {item}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= REVIEW CRITERIA ================= */}

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        <SectionHeading
          label="Evaluation Standards"
          title="Manuscript Review Criteria"
          description="Reviewers should carefully consider the following important aspects while evaluating submitted manuscripts."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {reviewCriteria.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-2xl border border-[#e8e2d5] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#F1EEE5] text-[#173D35] transition-all duration-300 group-hover:bg-[#173D35] group-hover:text-[#D1BC91]">
                  <Icon size={27} />
                </div>

                <h3 className="mb-4 text-lg font-bold text-[#173D35]">
                  {item.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {item.description}
                </p>
              </article>
            );
          })}

        </div>
      </section>

      {/* ================= PEER REVIEW PROCESS ================= */}

      <section className="bg-[#F1EEE5] px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <SectionHeading
            label="How It Works"
            title="Peer Review Process"
            description="A structured process designed to support responsible manuscript evaluation and editorial decision-making."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {reviewProcess.map((step, index) => (
              <ProcessCard
                key={step.number}
                step={step}
                index={index}
              />
            ))}

          </div>
        </div>
      </section>

      {/* ================= REVIEW RECOMMENDATIONS ================= */}

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        <SectionHeading
          label="Editorial Recommendations"
          title="Review Decision Categories"
          description="Reviewers may recommend one of the following decisions based on their assessment of the manuscript."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {recommendations.map((item) => (
            <article
              key={item.title}
              className={`rounded-2xl border ${item.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <span
                className={`inline-flex rounded-lg px-3 py-2 text-xs font-bold ${item.bg} ${item.color}`}
              >
                {item.title}
              </span>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                {item.description}
              </p>
            </article>
          ))}

        </div>
      </section>

      {/* ================= CONFIDENTIALITY ================= */}

      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col items-center gap-8 rounded-3xl border border-[#e8e2d5] bg-[#FAF9F6] p-8 md:flex-row md:p-12">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#173D35] text-[#D1BC91]">
              <ShieldCheck size={42} />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#B89B64]">
                Academic Integrity
              </span>

              <h2 className="mt-3 font-serif text-2xl font-bold text-[#173D35] md:text-3xl">
                Confidentiality and Publication Ethics
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                All manuscripts received for review must be treated as
                confidential documents. Reviewers must not share, reproduce,
                or use unpublished manuscript content for personal or
                professional benefit. Any potential conflict of interest
                should be disclosed to the editorial office. Reviewers must
                maintain impartiality and respect the intellectual property
                of authors.
              </p>

              <Link
                to="/publication-ethics"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#173D35] transition hover:text-[#B89B64]"
              >
                View Publication Ethics
                <ArrowRight size={17} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= REVIEW TIMELINE ================= */}

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">

        <div className="grid items-center gap-10 md:grid-cols-2">

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B64]">
              Timely Evaluation
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold text-[#173D35] md:text-4xl">
              Timely and Constructive Reviews
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              Reviewers are encouraged to complete assigned evaluations
              within the timeframe communicated by the editorial office.
              If additional time is required, reviewers should inform the
              editorial team promptly.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e8e2d5] bg-white p-8 shadow-sm md:p-10">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1EEE5] text-[#173D35]">
              <Clock size={29} />
            </div>

            <h3 className="mt-6 font-serif text-2xl font-bold text-[#173D35]">
              Review Timeline
            </h3>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              The review deadline will be communicated individually when a
              manuscript is assigned. Reviewers should follow the deadline
              specified in the assignment notification.
            </p>

          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="px-6 pb-16 md:pb-20">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#173D35] to-[#315F50] px-8 py-14 text-center text-white md:px-16 md:py-16">

          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-[#D1BC91]/15" />

          <div className="relative">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D1BC91]/30 bg-white/10 text-[#D1BC91]">
              <ClipboardCheck size={34} />
            </div>

            <span className="mt-7 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#D1BC91]">
              Become a Contributor
            </span>

            <h2 className="mt-4 font-serif text-3xl font-bold md:text-4xl">
              Join Our Reviewer Network
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/75">
              Are you an academician, researcher, or subject expert?
              Contribute your expertise to the advancement of quality
              multidisciplinary research and academic publishing.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#D1BC91] px-7 py-3.5 font-semibold text-[#173D35] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <Mail size={18} />
                Contact Editorial Office
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/author-guidelines"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
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
}

export default Reviewer;