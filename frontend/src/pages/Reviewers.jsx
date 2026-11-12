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
} from "lucide-react";

function Reviewer() {
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
      icon: <Award size={28} />,
      title: "Originality",
      description:
        "Assess the originality, novelty, and contribution of the research to the relevant academic field.",
    },
    {
      icon: <FileCheck size={28} />,
      title: "Research Quality",
      description:
        "Evaluate the accuracy, relevance, research methodology, and quality of the findings.",
    },
    {
      icon: <BookOpen size={28} />,
      title: "Clarity & Presentation",
      description:
        "Examine the organization, readability, language, and overall presentation of the manuscript.",
    },
    {
      icon: <Eye size={28} />,
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
        "The editorial team considers reviewer recommendations and communicates the final decision to the author.",
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
    },
    {
      title: "Minor Revision",
      description:
        "The manuscript requires small corrections or clarifications.",
      color: "text-blue-700",
      bg: "bg-blue-50",
    },
    {
      title: "Major Revision",
      description:
        "The manuscript requires substantial improvements before reconsideration.",
      color: "text-amber-700",
      bg: "bg-amber-50",
    },
    {
      title: "Reject",
      description:
        "The manuscript does not meet the required academic standards.",
      color: "text-red-700",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] text-white py-24 px-6">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#B89B64]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D1BC91]/40 bg-white/10 text-[#D1BC91] text-xs tracking-[0.2em] uppercase mb-7">
            <Users size={15} />
            IMRJ Academic Community
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            For Reviewers
          </h1>

          <p className="max-w-3xl mx-auto text-[#E8E3D8] text-base md:text-lg leading-relaxed">
            Supporting academic excellence through objective evaluation,
            constructive feedback, and ethical peer review.
          </p>

          <div className="w-20 h-1 bg-[#B89B64] mx-auto mt-9 rounded-full" />
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          <div>
            <p className="text-[#B89B64] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Reviewer Information
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#173D35] mb-7 leading-tight">
              Welcome to the IMRJ Reviewer Community
            </h2>

            <p className="text-[#777D76] leading-8 mb-5">
              Reviewers play an essential role in maintaining the academic
              quality, credibility, and integrity of the International
              Multidisciplinary Research Journal.
            </p>

            <p className="text-[#777D76] leading-8">
              We invite experienced researchers, academicians, and subject
              experts to contribute their knowledge and expertise to the
              scholarly publication process through fair, independent, and
              constructive manuscript evaluation.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-9 border border-[#E8E3D8] shadow-sm">
            <div className="w-16 h-16 rounded-xl bg-[#F2F0E9] flex items-center justify-center text-[#173D35] mb-7">
              <Award size={34} />
            </div>

            <h3 className="text-2xl font-bold text-[#173D35] mb-5">
              Our Commitment
            </h3>

            <p className="text-[#777D76] leading-8">
              IMRJ aims to promote a transparent, fair, confidential, and
              academically rigorous peer review environment that supports
              high-quality multidisciplinary research and scholarly
              communication.
            </p>

            <div className="mt-7 flex items-center gap-3 text-[#B89B64]">
              <GraduationCap size={22} />
              <span className="text-sm font-semibold">
                Promoting Research Excellence
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* REVIEWER RESPONSIBILITIES */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-[#B89B64] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Professional Standards
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#173D35] mb-5">
              Reviewer Responsibilities
            </h2>

            <p className="text-[#777D76] max-w-2xl mx-auto leading-7">
              Reviewers are expected to maintain professional standards
              throughout the manuscript evaluation process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {responsibilities.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-[#FAF9F6] border border-[#E8E3D8] hover:border-[#B89B64] hover:shadow-sm transition duration-300"
              >
                <CheckCircle
                  size={23}
                  className="text-[#B89B64] shrink-0 mt-1"
                />

                <p className="text-[#555E58] text-sm leading-7">
                  {item}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* REVIEW CRITERIA */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <p className="text-[#B89B64] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Evaluation Standards
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#173D35] mb-5">
            Manuscript Review Criteria
          </h2>

          <p className="text-[#777D76] max-w-2xl mx-auto leading-7">
            Reviewers should carefully consider the following important
            aspects while evaluating submitted manuscripts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewCriteria.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl border border-[#E8E3D8] shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-[#F2F0E9] flex items-center justify-center text-[#173D35] mb-6 group-hover:bg-[#173D35] group-hover:text-[#D1BC91] transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold text-[#173D35] mb-4">
                {item.title}
              </h3>

              <p className="text-sm text-[#777D76] leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* PEER REVIEW PROCESS */}
      <section className="bg-[#F2F0E9] py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#B89B64] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              How It Works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#173D35] mb-5">
              Peer Review Process
            </h2>

            <p className="text-[#777D76] max-w-2xl mx-auto leading-7">
              A structured process designed to support responsible manuscript
              evaluation and editorial decision-making.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewProcess.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-sm border border-[#E8E3D8] hover:shadow-lg transition duration-300"
              >
                <span className="text-5xl font-bold text-[#B89B64]/40">
                  {step.number}
                </span>

                <h3 className="text-lg font-bold text-[#173D35] mt-6 mb-4">
                  {step.title}
                </h3>

                <p className="text-sm text-[#777D76] leading-7">
                  {step.description}
                </p>

                {index !== 3 && (
                  <div className="hidden lg:flex absolute -right-4 top-12 z-10 w-8 h-8 bg-[#B89B64] rounded-full items-center justify-center text-white">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* REVIEW RECOMMENDATIONS */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="text-center mb-14">
          <p className="text-[#B89B64] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Editorial Recommendations
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-[#173D35] mb-5">
            Review Decision Categories
          </h2>

          <p className="text-[#777D76] max-w-2xl mx-auto leading-7">
            Reviewers may recommend one of the following decisions based
            on their assessment of the manuscript.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recommendations.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E8E3D8] p-6 shadow-sm"
            >
              <div
                className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold mb-5 ${item.bg} ${item.color}`}
              >
                {item.title}
              </div>

              <p className="text-sm text-[#777D76] leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* CONFIDENTIALITY & ETHICS */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="bg-[#FAF9F6] border border-[#E8E3D8] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">

            <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#F2F0E9] flex items-center justify-center text-[#173D35]">
              <ShieldCheck size={42} />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#173D35] mb-5">
                Confidentiality and Publication Ethics
              </h2>

              <p className="text-[#777D76] leading-8">
                All manuscripts received for review must be treated as
                confidential documents. Reviewers must not share, reproduce,
                or use unpublished manuscript content for personal or
                professional benefit. Any potential conflict of interest
                should be disclosed to the editorial office. Reviewers must
                maintain impartiality and respect the intellectual property
                of authors.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* REVIEWER TIME COMMITMENT */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          <div>
            <p className="text-[#B89B64] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Timely Evaluation
            </p>

            <h2 className="text-3xl font-bold text-[#173D35] mb-5">
              Timely and Constructive Reviews
            </h2>

            <p className="text-[#777D76] leading-8">
              Reviewers are encouraged to complete assigned evaluations
              within the timeframe communicated by the editorial office.
              If additional time is required, reviewers should inform the
              editorial team promptly.
            </p>
          </div>

          <div className="bg-white border border-[#E8E3D8] rounded-2xl p-8">
            <div className="w-14 h-14 bg-[#F2F0E9] rounded-xl flex items-center justify-center text-[#173D35] mb-5">
              <Clock size={29} />
            </div>

            <h3 className="text-xl font-bold text-[#173D35] mb-3">
              Review Timeline
            </h3>

            <p className="text-[#777D76] text-sm leading-7">
              The review deadline will be communicated individually when a
              manuscript is assigned. Reviewers should follow the deadline
              specified in the assignment notification.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-6 pb-20">
        <div className="relative overflow-hidden max-w-5xl mx-auto bg-gradient-to-r from-[#173D35] to-[#315F50] rounded-3xl p-10 md:p-16 text-center text-white">

          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />

          <div className="relative">

            <div className="flex justify-center mb-7">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#D1BC91]">
                <ClipboardCheck size={35} />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Reviewer Network
            </h2>

            <p className="text-[#E8E3D8] max-w-2xl mx-auto leading-8 mb-9">
              Are you an academician, researcher, or subject expert?
              Contribute your expertise to the advancement of quality
              multidisciplinary research and academic publishing.
            </p>

            <a
              href="mailto:editor@imrj.org"
              className="inline-flex items-center gap-3 bg-[#D1BC91] text-[#173D35] px-8 py-4 rounded-lg font-bold hover:bg-[#E8D8B5] transition duration-300 shadow-lg"
            >
              Contact Editorial Office
              <ArrowRight size={18} />
            </a>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Reviewer;