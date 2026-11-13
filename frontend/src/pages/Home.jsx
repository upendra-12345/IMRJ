import { Link } from "react-router-dom";

import {
  BookOpen,
  Globe,
  Users,
  ArrowRight,
  Microscope,
  Code,
  Briefcase,
  HeartPulse,
  GraduationCap,
  ArrowUpRight,
  Quote,
  Sparkles,
  BookMarked,
  Lightbulb,
  ShieldCheck,
  FileText,
} from "lucide-react";

// RESEARCH AREAS
const researchAreas = [
  {
    title: "Computer Science",
    description:
      "Exploring emerging technologies, artificial intelligence, data science, and software innovation.",
    icon: Code,
    number: "01",
  },
  {
    title: "Management",
    description:
      "Advancing modern business strategies, leadership, entrepreneurship, and organizational studies.",
    icon: Briefcase,
    number: "02",
  },
  {
    title: "Education",
    description:
      "Discovering innovative approaches to teaching, learning, and educational development.",
    icon: GraduationCap,
    number: "03",
  },
  {
    title: "Science & Technology",
    description:
      "Sharing scientific discoveries and technological advancements across disciplines.",
    icon: Microscope,
    number: "04",
  },
  {
    title: "Health Sciences",
    description:
      "Promoting research that contributes to healthcare, wellness, and medical innovation.",
    icon: HeartPulse,
    number: "05",
  },
  {
    title: "Social Sciences",
    description:
      "Understanding society, human behaviour, culture, and contemporary social challenges.",
    icon: Users,
    number: "06",
  },
];

// JOURNAL HIGHLIGHTS
const highlights = [
  {
    icon: ShieldCheck,
    title: "Quality Research",
    description:
      "Committed to academic quality and meaningful research.",
  },
  {
    icon: Globe,
    title: "Global Platform",
    description:
      "Connecting researchers and scholars across the world.",
  },
  {
    icon: Users,
    title: "Academic Community",
    description:
      "Building a collaborative community of researchers.",
  },
  {
    icon: BookMarked,
    title: "Knowledge Sharing",
    description:
      "Making multidisciplinary research accessible.",
  },
];

const Home = () => {
  return (
    <main className="overflow-hidden bg-[#FAF9F6] text-[#252B29]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[760px] items-center overflow-hidden bg-[#173D35]">

        {/* Background Image */}
        <div
          className="animate-hero-zoom absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102D26]/95 via-[#173D35]/90 to-[#173D35]/65" />

        {/* Decorative Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "65px 65px",
          }}
        />

        {/* Decorative Circles */}
        <div className="absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full border border-white/10" />

        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full border border-white/10" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 py-24 md:px-10 lg:grid-cols-2">

          {/* HERO CONTENT */}
          <div className="animate-fade-up text-white">

            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#D1BC91]/40 bg-white/10 px-5 py-2.5 backdrop-blur-md">

              <Sparkles size={15} className="text-[#D1BC91]" />

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#E5D7B8]">
                International Multidisciplinary Research Journal
              </span>

            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D1BC91]">
              Explore · Research · Innovate
            </p>

            <h1 className="max-w-2xl font-serif text-5xl leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
              Discover

              <span className="block text-[#D1BC91]">
                Knowledge.
              </span>

              Inspire Innovation.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              A platform for researchers, academicians, and innovators to
              publish ideas, share discoveries, and contribute to the future
              of multidisciplinary research.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/submit-manuscript"
                className="group inline-flex items-center gap-3 bg-[#B89B64] px-7 py-4 text-sm font-semibold text-[#173D35] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D1BC91] hover:shadow-xl"
              >
                Submit Your Research

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-[#D1BC91] hover:bg-white/10"
              >
                Explore Journal
                <ArrowRight size={18} />
              </Link>

            </div>

            {/* JOURNAL FEATURES */}
            <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-white/20 pt-8">

              <div>
                <h3 className="font-serif text-3xl text-[#D1BC91]">
                  Global
                </h3>

                <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  Research Community
                </p>
              </div>

              <div className="h-12 w-px bg-white/20" />

              <div>
                <h3 className="font-serif text-3xl text-[#D1BC91]">
                  Multi
                </h3>

                <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  Disciplinary Scope
                </p>
              </div>

              <div className="h-12 w-px bg-white/20" />

              <div>
                <h3 className="font-serif text-3xl text-[#D1BC91]">
                  Open
                </h3>

                <p className="mt-1 text-xs uppercase tracking-widest text-white/60">
                  Knowledge Sharing
                </p>
              </div>

            </div>

          </div>

          {/* JOURNAL COVER */}
          <div className="relative mx-auto hidden w-full max-w-md animate-float lg:block">

            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#D1BC91]/30" />

            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#B89B64]/10 blur-3xl" />

            {/* COVER DESIGN */}
            <div className="relative rotate-2 border border-[#D1BC91]/40 bg-[#FAF9F6] p-3 shadow-2xl transition-transform duration-700 hover:rotate-0">

              <div className="flex min-h-[480px] flex-col border border-[#B89B64]/50 p-7 sm:p-9">

                <div className="flex items-center justify-between border-b border-[#D8D0C0] pb-5">

                  <div className="flex items-center gap-2">
                    <BookOpen size={23} className="text-[#173D35]" />

                    <span className="text-xs font-bold tracking-widest text-[#173D35]">
                      IMRJ
                    </span>
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#777D76]">
                    Research Journal
                  </span>

                </div>

                <div className="flex flex-1 flex-col justify-center py-10">

                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#B89B64]">
                    International Publication
                  </p>

                  <h2 className="font-serif text-5xl leading-tight text-[#173D35]">
                    Research.
                    <br />
                    Discover.
                    <br />

                    <span className="text-[#B89B64]">
                      Transform.
                    </span>
                  </h2>

                  <div className="my-7 h-[2px] w-20 bg-[#B89B64]" />

                  <p className="max-w-xs text-sm leading-7 text-[#777D76]">
                    An academic platform for multidisciplinary knowledge,
                    innovation, and scholarly excellence.
                  </p>

                </div>

                <div className="border-t border-[#D8D0C0] pt-5">

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#173D35]">
                    International Multidisciplinary
                  </p>

                  <p className="mt-2 text-xs uppercase tracking-widest text-[#777D76]">
                    Research Journal
                  </p>

                </div>

              </div>

            </div>

            {/* FLOATING BADGE */}
            <div className="absolute -bottom-5 -right-8 flex items-center gap-3 bg-white px-5 py-4 shadow-xl">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#173D35] text-[#D1BC91]">
                <BookMarked size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#173D35]">
                  Academic Excellence
                </p>

                <p className="text-xs text-[#777D76]">
                  Knowledge Without Boundaries
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM DECORATION */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#B89B64] to-transparent" />

      </section>

      {/* ================= INTRODUCTION ================= */}
      <section className="relative px-6 py-24 md:px-10 lg:py-32">

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="animate-fade-up">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              About The Journal
            </p>

            <h2 className="max-w-xl font-serif text-4xl leading-tight text-[#173D35] sm:text-5xl">
              Where Ideas Meet

              <span className="text-[#B89B64]">
                {" "}Knowledge.
              </span>
            </h2>

            <div className="my-8 h-[2px] w-20 bg-[#B89B64]" />

            <p className="text-base leading-8 text-[#777D76]">
              The International Multidisciplinary Research Journal provides
              a platform for researchers, academicians, students, and
              professionals to share their research contributions across
              diverse academic disciplines.
            </p>

            <p className="mt-5 text-base leading-8 text-[#777D76]">
              We aim to encourage research culture, support knowledge
              exchange, and create opportunities for meaningful academic
              collaboration.
            </p>

            <Link
              to="/about"
              className="group mt-9 inline-flex items-center gap-3 border-b border-[#B89B64] pb-2 text-sm font-semibold text-[#173D35] transition-all hover:gap-5"
            >
              Learn More About Us
              <ArrowRight size={18} />
            </Link>

          </div>

          {/* RIGHT IMAGE */}
          <div className="group relative">

            <div className="absolute -left-5 -top-5 h-full w-full border border-[#B89B64]/50 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />

            <div
              className="relative h-[420px] overflow-hidden bg-cover bg-center shadow-xl"
              role="img"
              aria-label="Academic books and research materials"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=85')",
              }}
            >

              <div className="absolute inset-0 bg-gradient-to-t from-[#173D35]/80 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">

                <p className="text-xs uppercase tracking-[0.25em] text-[#D1BC91]">
                  Knowledge Is Power
                </p>

                <h3 className="mt-3 font-serif text-3xl">
                  Inspiring Research.
                  <br />
                  Shaping Tomorrow.
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="border-y border-[#E8E3D8] bg-[#F2F0E9] px-6 py-20 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              Our Commitment
            </p>

            <h2 className="font-serif text-4xl text-[#173D35] sm:text-5xl">
              Built Around Knowledge
            </h2>

          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group border-b border-[#D8D0C0] px-5 py-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#B89B64] hover:bg-white hover:shadow-lg"
                  style={{
                    animation: `fadeUp 0.7s ease-out ${index * 0.15}s both`,
                  }}
                >

                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#173D35] text-[#D1BC91] transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#B89B64] group-hover:text-[#173D35]">
                    <Icon size={25} />
                  </div>

                  <h3 className="font-serif text-xl text-[#173D35]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#777D76]">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ================= RESEARCH AREAS ================= */}
      <section className="px-6 py-24 md:px-10 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
                Explore Our Disciplines
              </p>

              <h2 className="font-serif text-4xl text-[#173D35] sm:text-5xl">
                Research Areas
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-[#777D76]">
                Explore a diverse range of research fields and contribute
                your knowledge to a growing academic community.
              </p>

            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-[#173D35] transition-all hover:gap-5"
            >
              Explore More
              <ArrowUpRight size={19} />
            </Link>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {researchAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <div
                  key={area.title}
                  className="group relative overflow-hidden border border-[#E8E3D8] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#B89B64] hover:shadow-xl"
                  style={{
                    animation: `fadeUp 0.7s ease-out ${index * 0.12}s both`,
                  }}
                >

                  <span className="absolute -right-2 -top-5 font-serif text-8xl text-[#F2F0E9] transition-colors duration-500 group-hover:text-[#B89B64]/15">
                    {area.number}
                  </span>

                  <div className="relative">

                    <div className="mb-8 flex h-14 w-14 items-center justify-center bg-[#F2F0E9] text-[#173D35] transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#173D35] group-hover:text-[#D1BC91]">
                      <Icon size={26} />
                    </div>

                    <h3 className="font-serif text-2xl text-[#173D35]">
                      {area.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#777D76]">
                      {area.description}
                    </p>

                    <div className="mt-7 flex items-center justify-between border-t border-[#E8E3D8] pt-5">

                      <span className="text-xs font-semibold uppercase tracking-widest text-[#B89B64]">
                        Research Field
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ================= RESEARCH PHILOSOPHY ================= */}
      <section className="relative overflow-hidden bg-[#173D35] px-6 py-28 md:px-10">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102D26]/95 to-[#173D35]/85" />

        <div className="relative mx-auto max-w-5xl text-center">

          <Quote
            size={48}
            className="mx-auto mb-8 text-[#B89B64]"
          />

          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#D1BC91]">
            Our Research Philosophy
          </p>

          <h2 className="font-serif text-3xl leading-relaxed text-white sm:text-4xl lg:text-5xl">
            "Research is not just about discovering answers,

            <span className="text-[#D1BC91]">
              {" "}it is about creating new possibilities."
            </span>
          </h2>

          <div className="mx-auto mt-10 h-[2px] w-20 bg-[#B89B64]" />

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/65">
            We believe that every meaningful idea has the potential to
            inspire innovation, create impact, and shape a better future.
          </p>

        </div>

      </section>

      {/* ================= CURRENT ISSUE ================= */}
      <section className="bg-[#F2F0E9] px-6 py-24 md:px-10 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              Latest Publication
            </p>

            <h2 className="font-serif text-4xl text-[#173D35] sm:text-5xl">
              Current Issue
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#777D76]">
              Discover recent research contributions and explore
              scholarly work from different academic disciplines.
            </p>

          </div>

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* ISSUE COVER */}
            <div className="mx-auto w-full max-w-sm animate-float">

              <div className="relative bg-[#173D35] p-5 shadow-2xl">

                <div className="flex min-h-[430px] flex-col border border-[#D1BC91]/50 p-8">

                  <div className="flex items-center justify-between border-b border-white/20 pb-5">

                    <BookOpen
                      className="text-[#D1BC91]"
                      size={25}
                    />

                    <span className="text-xs uppercase tracking-widest text-white/60">
                      IMRJ
                    </span>

                  </div>

                  <div className="flex flex-1 flex-col justify-center">

                    <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[#D1BC91]">
                      Latest Edition
                    </p>

                    <h3 className="font-serif text-5xl leading-tight text-white">
                      Research
                      <br />
                      Journal
                    </h3>

                    <div className="my-7 h-[2px] w-16 bg-[#B89B64]" />

                    <p className="text-sm leading-7 text-white/65">
                      International Multidisciplinary Research Journal
                    </p>

                  </div>

                  <div className="border-t border-white/20 pt-5">

                    <p className="text-xs uppercase tracking-widest text-[#D1BC91]">
                      Ideas · Innovation · Impact
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ISSUE DETAILS */}
            <div>

              <span className="inline-block bg-[#173D35] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#D1BC91]">
                Featured Issue
              </span>

              <h3 className="mt-7 font-serif text-4xl leading-tight text-[#173D35] sm:text-5xl">
                Advancing Research
                <br />
                Across Disciplines
              </h3>

              <p className="mt-7 text-base leading-8 text-[#777D76]">
                Explore academic contributions from researchers,
                scholars, and professionals working across multiple
                disciplines. Discover innovative ideas and research
                that contribute to the advancement of knowledge.
              </p>

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center bg-white text-[#173D35]">
                    <FileText size={20} />
                  </div>

                  <p className="text-sm font-medium text-[#173D35]">
                    Multidisciplinary Research Publications
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center bg-white text-[#173D35]">
                    <Lightbulb size={20} />
                  </div>

                  <p className="text-sm font-medium text-[#173D35]">
                    Innovative Ideas and Academic Contributions
                  </p>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center bg-white text-[#173D35]">
                    <Globe size={20} />
                  </div>

                  <p className="text-sm font-medium text-[#173D35]">
                    Global Research Perspectives
                  </p>

                </div>

              </div>

              <Link
                to="/current-issue"
                className="group mt-10 inline-flex items-center gap-3 bg-[#173D35] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#24574A] hover:shadow-lg"
              >
                View Current Issue

                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-[#173D35] px-6 py-24 md:px-10">

        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />

        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl text-center">

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D1BC91]">
            Share Your Knowledge
          </p>

          <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Have Research to

            <span className="text-[#D1BC91]">
              {" "}Publish?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65">
            Be a part of our academic community. Share your research,
            contribute new ideas, and inspire the next generation of
            knowledge and innovation.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/submit-manuscript"
              className="group inline-flex items-center gap-3 bg-[#B89B64] px-8 py-4 text-sm font-bold text-[#173D35] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D1BC91] hover:shadow-xl"
            >
              Submit Your Manuscript

              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-white/40 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-[#D1BC91] hover:bg-white/10"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Home;