import { Link } from "react-router-dom";
import {
  BookOpen,
  Target,
  Eye,
  Globe,
  Award,
  Users,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  Microscope,
  GraduationCap,
  Sparkles,
  Quote,
  HeartHandshake,
  FileText,
} from "lucide-react";

const coreValues = [
  {
    icon: Award,
    title: "Excellence",
    description:
      "Maintaining high standards of academic quality and meaningful research contributions.",
    number: "01",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Promoting honesty, transparency, and ethical practices in academic publishing.",
    number: "02",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Encouraging worldwide access to academic knowledge and research discoveries.",
    number: "03",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Supporting new ideas, discoveries, creativity, and interdisciplinary thinking.",
    number: "04",
  },
];

const researchAreas = [
  "Engineering & Technology",
  "Computer Science",
  "Management Studies",
  "Commerce & Economics",
  "Social Sciences",
  "Education",
  "Arts & Humanities",
  "Science & Research",
];

function About() {
  return (
    <main className="overflow-hidden bg-[#FAF9F6] text-[#252B29]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#173D35]">

        {/* Background Image */}
        <div
          className="absolute inset-0 animate-hero-zoom bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        {/* Overlay */}
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
        <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full border border-white/10" />
        <div className="absolute -right-16 -top-16 h-[320px] w-[320px] rounded-full border border-white/10" />

        <div className="relative mx-auto w-full max-w-7xl px-6 py-28 text-center md:px-10">

          <div className="animate-fade-up">

            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#D1BC91]/40 bg-white/10 px-5 py-2.5 backdrop-blur-md">
              <Sparkles size={16} className="text-[#D1BC91]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E5D7B8]">
                Discover Our Story
              </span>
            </div>

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#D1BC91]">
              International Multidisciplinary Research Journal
            </p>

            <h1 className="font-serif text-5xl leading-tight text-white sm:text-6xl md:text-7xl">
              About
              <span className="text-[#D1BC91]"> IMRJ</span>
            </h1>

            <div className="mx-auto my-8 h-[2px] w-24 bg-[#B89B64]" />

            <p className="mx-auto max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
              Advancing academic excellence, encouraging innovation,
              and connecting researchers through the power of
              multidisciplinary knowledge.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                to="/submit-manuscript"
                className="group inline-flex items-center gap-3 bg-[#B89B64] px-7 py-4 text-sm font-semibold text-[#173D35] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D1BC91] hover:shadow-xl"
              >
                Submit Your Research
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>

              <a
                href="#who-we-are"
                className="inline-flex items-center gap-3 border border-white/40 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-[#D1BC91] hover:bg-white/10"
              >
                Discover More
                <ArrowRight size={18} />
              </a>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#B89B64] to-transparent" />

      </section>


      {/* ================= INTRODUCTION ================= */}
      <section
        id="who-we-are"
        className="px-6 py-24 md:px-10 lg:py-32"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Left Content */}
          <div className="animate-fade-up">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              Who We Are
            </p>

            <h2 className="max-w-xl font-serif text-4xl leading-tight text-[#173D35] sm:text-5xl">
              Advancing Knowledge Through
              <span className="text-[#B89B64]"> Research.</span>
            </h2>

            <div className="my-8 h-[2px] w-20 bg-[#B89B64]" />

            <p className="text-base leading-8 text-[#777D76]">
              The International Multidisciplinary Research Journal
              (IMRJ) is an academic platform that encourages
              researchers, academicians, scholars, and professionals
              to share their original research and innovative ideas.
            </p>

            <p className="mt-5 text-base leading-8 text-[#777D76]">
              Our journal aims to create a collaborative environment
              where knowledge from different academic disciplines
              can contribute to solving real-world challenges.
            </p>

            <p className="mt-5 text-base leading-8 text-[#777D76]">
              We are committed to maintaining high academic standards,
              research integrity, and the dissemination of quality
              scholarly work.
            </p>

            <Link
              to="/editorial-board"
              className="group mt-9 inline-flex items-center gap-3 border-b border-[#B89B64] pb-2 text-sm font-semibold text-[#173D35] transition-all hover:gap-5"
            >
              Meet Our Editorial Team
              <ArrowRight size={18} />
            </Link>

          </div>


          {/* Right Image */}
          <div className="group relative">

            <div className="absolute -left-5 -top-5 h-full w-full border border-[#B89B64]/50 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />

            <div
              className="relative h-[450px] overflow-hidden bg-cover bg-center shadow-xl"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85')",
              }}
            >

              <div className="absolute inset-0 bg-gradient-to-t from-[#102D26]/90 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white">

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D1BC91]">
                  Our Philosophy
                </p>

                <h3 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                  Knowledge Has
                  <br />
                  No Boundaries.
                </h3>

              </div>

            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-7 -right-3 flex items-center gap-3 bg-white p-5 shadow-xl sm:-right-7">

              <div className="flex h-12 w-12 items-center justify-center bg-[#173D35] text-[#D1BC91]">
                <BookOpen size={23} />
              </div>

              <div>
                <p className="font-serif text-lg text-[#173D35]">
                  IMRJ
                </p>
                <p className="text-xs text-[#777D76]">
                  Research & Innovation
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= RESEARCH COMMITMENT ================= */}
      <section className="border-y border-[#E8E3D8] bg-[#F2F0E9] px-6 py-24 md:px-10">

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          <div>

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              Our Commitment
            </p>

            <h2 className="font-serif text-4xl leading-tight text-[#173D35] sm:text-5xl">
              Research With
              <span className="text-[#B89B64]"> Purpose.</span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#777D76]">
              We provide a platform for the exchange of innovative
              ideas, scientific discoveries, and academic knowledge
              through scholarly publications.
            </p>

            <div className="mt-9 space-y-5">

              {[
                "Quality Academic Research",
                "Interdisciplinary Collaboration",
                "Ethical Publishing Practices",
                "Global Knowledge Sharing",
              ].map((item) => (

                <div key={item} className="flex items-center gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#173D35] text-[#D1BC91]">
                    <ShieldCheck size={19} />
                  </div>

                  <span className="text-sm font-medium text-[#173D35]">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* Commitment Image Card */}
          <div className="relative overflow-hidden bg-[#173D35] p-8 text-white shadow-xl sm:p-12">

            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />

            <div className="relative">

              <div className="mb-8 flex h-16 w-16 items-center justify-center bg-[#B89B64] text-[#173D35]">
                <BookOpen size={31} />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl">
                Our Research
                <br />
                Commitment
              </h3>

              <p className="mt-6 text-base leading-8 text-white/70">
                Creating opportunities for researchers to publish
                original work, exchange ideas, and contribute
                meaningfully to the academic community.
              </p>

              <div className="mt-10 border-t border-white/20 pt-7">

                <div className="flex items-center gap-4">
                  <HeartHandshake
                    size={30}
                    className="text-[#D1BC91]"
                  />

                  <p className="text-sm leading-6 text-white/80">
                    Encouraging collaboration and knowledge
                    sharing across academic disciplines.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>


      {/* ================= MISSION & VISION ================= */}
      <section className="px-6 py-24 md:px-10 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              Our Purpose
            </p>

            <h2 className="font-serif text-4xl text-[#173D35] sm:text-5xl">
              Mission & Vision
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#777D76]">
              Building a better academic future through research,
              innovation, and knowledge sharing.
            </p>

          </div>


          <div className="grid gap-8 md:grid-cols-2">

            {/* Mission */}
            <div className="group relative overflow-hidden bg-[#173D35] p-9 text-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-12">

              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />

              <div className="relative">

                <div className="mb-8 flex h-16 w-16 items-center justify-center bg-white/10 text-[#D1BC91]">
                  <Target size={31} />
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D1BC91]">
                  What Drives Us
                </p>

                <h3 className="font-serif text-3xl sm:text-4xl">
                  Our Mission
                </h3>

                <div className="my-7 h-[2px] w-16 bg-[#B89B64]" />

                <p className="text-base leading-8 text-white/75">
                  Our mission is to encourage high-quality research,
                  promote academic collaboration, and provide
                  researchers with an accessible platform to publish
                  original research, innovative ideas, and scholarly
                  contributions.
                </p>

              </div>
            </div>


            {/* Vision */}
            <div className="group relative overflow-hidden bg-[#EAE5D9] p-9 text-[#173D35] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-12">

              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-[#173D35]/10 transition-transform duration-700 group-hover:scale-125" />

              <div className="relative">

                <div className="mb-8 flex h-16 w-16 items-center justify-center bg-[#173D35] text-[#D1BC91]">
                  <Eye size={31} />
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B89B64]">
                  Where We Aspire
                </p>

                <h3 className="font-serif text-3xl sm:text-4xl">
                  Our Vision
                </h3>

                <div className="my-7 h-[2px] w-16 bg-[#B89B64]" />

                <p className="text-base leading-8 text-[#626B63]">
                  Our vision is to become a recognized international
                  platform for multidisciplinary research by connecting
                  scholars worldwide and contributing to academic
                  excellence, innovation, and sustainable development.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= CORE VALUES ================= */}
      <section className="bg-[#F2F0E9] px-6 py-24 md:px-10">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
              What We Believe
            </p>

            <h2 className="font-serif text-4xl text-[#173D35] sm:text-5xl">
              Our Core Values
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#777D76]">
              The principles that guide our commitment to academic
              research and publishing excellence.
            </p>

          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {coreValues.map((value, index) => {

              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group relative overflow-hidden border border-[#E8E3D8] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#B89B64] hover:shadow-xl"
                  style={{
                    animation: `fadeUp 0.7s ease-out ${index * 0.12}s both`,
                  }}
                >

                  <span className="absolute -right-2 -top-5 font-serif text-8xl text-[#F2F0E9] transition-colors group-hover:text-[#B89B64]/20">
                    {value.number}
                  </span>

                  <div className="relative">

                    <div className="mb-8 flex h-14 w-14 items-center justify-center bg-[#173D35] text-[#D1BC91] transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#B89B64] group-hover:text-[#173D35]">
                      <Icon size={27} />
                    </div>

                    <h3 className="font-serif text-2xl text-[#173D35]">
                      {value.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#777D76]">
                      {value.description}
                    </p>

                    <div className="mt-7 h-[2px] w-10 bg-[#B89B64] transition-all duration-500 group-hover:w-full" />

                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>


      {/* ================= RESEARCH AREAS ================= */}
      <section className="relative overflow-hidden bg-[#173D35] px-6 py-24 md:px-10">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#102D26]/95 to-[#173D35]/90" />

        <div className="relative mx-auto max-w-7xl">

          <div className="mb-16 text-center">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D1BC91]">
              Multidisciplinary Approach
            </p>

            <h2 className="font-serif text-4xl text-white sm:text-5xl">
              Research Across
              <span className="text-[#D1BC91]"> Disciplines</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/65">
              IMRJ welcomes scholarly contributions from diverse
              academic and professional fields.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {researchAreas.map((area, index) => (

              <div
                key={area}
                className="group border border-white/15 bg-white/[0.06] p-7 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#B89B64] hover:bg-white/10"
                style={{
                  animation: `fadeUp 0.7s ease-out ${index * 0.1}s both`,
                }}
              >

                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-white/10 text-[#D1BC91] transition-all duration-500 group-hover:rotate-6 group-hover:bg-[#B89B64] group-hover:text-[#173D35]">
                  <GraduationCap size={27} />
                </div>

                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {area}
                </h3>

              </div>

            ))}

          </div>
        </div>
      </section>


      {/* ================= QUOTE SECTION ================= */}
      <section className="px-6 py-24 md:px-10">

        <div className="mx-auto max-w-5xl text-center">

          <Quote
            size={45}
            className="mx-auto mb-8 text-[#B89B64]"
          />

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B89B64]">
            Our Belief
          </p>

          <h2 className="font-serif text-3xl leading-relaxed text-[#173D35] sm:text-4xl lg:text-5xl">
            "Great research begins with curiosity and grows through
            <span className="text-[#B89B64]">
              {" "}collaboration and discovery."
            </span>
          </h2>

          <div className="mx-auto mt-9 h-[2px] w-20 bg-[#B89B64]" />

        </div>
      </section>


      {/* ================= CALL TO ACTION ================= */}
      <section className="relative overflow-hidden bg-[#173D35] px-6 py-24 md:px-10">

        {/* Decorative Circles */}
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-[#B89B64] text-[#173D35]">
            <BookOpen size={32} />
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D1BC91]">
            Be Part of Our Community
          </p>

          <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Share Your Research
            <span className="text-[#D1BC91]"> With The World.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/65">
            Contribute to academic knowledge, share your discoveries,
            and become a part of our growing research community.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/submit-manuscript"
              className="group inline-flex items-center gap-3 bg-[#B89B64] px-8 py-4 text-sm font-bold text-[#173D35] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D1BC91] hover:shadow-xl"
            >
              Submit Your Research
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
}

export default About;