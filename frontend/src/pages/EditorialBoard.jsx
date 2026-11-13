import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  ArrowRight,
  
  BookOpen,
  Award,
  Globe,
  ShieldCheck,
  Sparkles,
  Quote,
  Mail,
} from "lucide-react";

function EditorialBoard() {
  const editorialMembers = [
    {
      role: "Editor-in-Chief",
      description:
        "Provides academic leadership and oversees the journal's editorial direction.",
      number: "01",
    },
    {
      role: "Associate Editor",
      description:
        "Supports editorial decisions and coordinates manuscript evaluations.",
      number: "02",
    },
    {
      role: "Managing Editor",
      description:
        "Coordinates editorial operations and publication workflows.",
      number: "03",
    },
    {
      role: "Editorial Board Member",
      description:
        "Contributes academic expertise and supports journal development.",
      number: "04",
    },
    {
      role: "Section Editor",
      description:
        "Supports research evaluation within specific academic disciplines.",
      number: "05",
    },
    {
      role: "Review Coordinator",
      description:
        "Coordinates communication and the manuscript review process.",
      number: "06",
    },
  ];

  const responsibilities = [
    {
      icon: <ShieldCheck size={23} />,
      title: "Academic Standards",
      description:
        "Supporting quality, accuracy, and academic integrity throughout the editorial process.",
    },
    {
      icon: <BookOpen size={23} />,
      title: "Editorial Excellence",
      description:
        "Encouraging clear scholarly communication and meaningful research contributions.",
    },
    {
      icon: <Globe size={23} />,
      title: "Research Collaboration",
      description:
        "Supporting knowledge exchange across disciplines and academic communities.",
    },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102F29]/95 via-[#173D35]/85 to-[#173D35]/65" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-20">

          <div className="max-w-3xl animate-fade-up">

            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-[#B89B64]" />

              <span className="text-[#D1BC91] uppercase tracking-[4px] text-xs font-semibold">
                The People Behind IMRJ
              </span>
            </div>

            <div className="w-14 h-14 rounded-xl bg-[#B89B64]/20 text-[#D1BC91] flex items-center justify-center mb-6">
              <Users size={29} />
            </div>

            <h1 className="text-5xl md:text-7xl text-white leading-tight mb-6">
              Editorial <span className="text-[#D1BC91] italic">Board</span>
            </h1>

            <p className="text-gray-200 text-base md:text-lg leading-8 max-w-2xl">
              Meet the academic professionals supporting IMRJ's
              editorial activities, scholarly communication, and
              commitment to research excellence.
            </p>

            <div className="flex items-center gap-3 mt-8 text-sm text-gray-300">
              <Link to="/" className="hover:text-[#D1BC91] transition">
                Home
              </Link>

              <span className="text-[#B89B64]">/</span>

              <span className="text-[#D1BC91]">Editorial Board</span>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-72 h-72 border border-white/10 rounded-full translate-x-1/3 translate-y-1/2" />

        <div className="absolute bottom-0 right-24 w-44 h-44 border border-[#B89B64]/20 rounded-full translate-y-1/2" />

      </section>


      {/* ================= INTRODUCTION ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">

        <div className="max-w-3xl mx-auto text-center animate-fade-up">

          <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
            Leadership & Expertise
          </span>

          <h2 className="text-3xl md:text-5xl text-[#173D35] mt-4 mb-6">
            Our Editorial <span className="italic">Team</span>
          </h2>

          <p className="text-[#777D76] leading-8 text-sm md:text-base">
            The editorial board plays an important role in supporting
            the journal's academic standards, editorial processes, and
            scholarly communication. Together, its members contribute
            to creating an environment that encourages meaningful
            research and academic collaboration.
          </p>

          <div className="w-16 h-[2px] bg-[#B89B64] mx-auto mt-7" />

        </div>


        {/* ================= EDITORIAL CARDS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">

          {editorialMembers.map((member, index) => (

            <div
              key={index}
              className="bg-white border border-[#E8E3D8] rounded-2xl p-7 md:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#B89B64]/50 transition duration-500 group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >

              {/* Background number */}
              <span className="absolute top-3 right-5 text-6xl font-serif text-[#F2F0E9] group-hover:text-[#B89B64]/10 transition">
                {member.number}
              </span>

              {/* Profile icon */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-[#F2F0E9] border border-[#E8E3D8] text-[#173D35] flex items-center justify-center mx-auto group-hover:bg-[#173D35] group-hover:text-[#D1BC91] group-hover:border-[#173D35] transition duration-500">
                <GraduationCap size={43} strokeWidth={1.4} />
              </div>

              <div className="w-10 h-[2px] bg-[#B89B64] mx-auto mt-6 mb-5 group-hover:w-16 transition-all duration-300" />

              <h3 className="text-xl font-semibold text-[#173D35] mb-3">
                {member.role}
              </h3>

              <p className="text-sm text-[#777D76] leading-7">
                {member.description}
              </p>

              <div className="mt-6 pt-5 border-t border-[#E8E3D8] flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A58A56]">
                <Award size={15} />
                Editorial Position
              </div>

            </div>

          ))}

        </div>

        <div className="mt-10 flex items-start gap-3 max-w-3xl mx-auto bg-[#F2F0E9] border border-[#E8E3D8] rounded-xl p-5">

          <Sparkles size={20} className="text-[#A58A56] shrink-0 mt-0.5" />

          <p className="text-sm text-[#777D76] leading-7">
            <strong className="text-[#173D35]">Editorial information:</strong>{" "}
            These are illustrative editorial positions. Replace them
            with verified names, designations, qualifications, and
            institutional affiliations before publishing this page.
          </p>

        </div>

      </section>


      {/* ================= RESPONSIBILITIES ================= */}
      <section className="bg-[#F2F0E9] py-20 border-y border-[#E8E3D8]">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="text-center max-w-2xl mx-auto mb-14">

            <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
              Our Commitment
            </span>

            <h2 className="text-3xl md:text-4xl text-[#173D35] mt-4 mb-5">
              Roles & <span className="italic">Responsibilities</span>
            </h2>

            <p className="text-[#777D76] text-sm leading-7">
              Our editorial framework focuses on maintaining a
              responsible and organized approach to scholarly publishing.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-7">

            {responsibilities.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-[#E8E3D8] hover:shadow-lg transition duration-300 group"
              >

                <div className="w-14 h-14 rounded-xl bg-[#173D35] text-[#D1BC91] flex items-center justify-center group-hover:bg-[#B89B64] group-hover:text-white transition duration-300">
                  {item.icon}
                </div>

                <h3 className="text-xl text-[#173D35] font-semibold mt-6 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-[#777D76] leading-7">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= QUOTE SECTION ================= */}
      <section className="relative py-24 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#173D35]/95" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

          <Quote size={42} className="text-[#B89B64] mx-auto mb-7" />

          <h2 className="text-2xl md:text-4xl text-white leading-relaxed font-normal">
            "Advancing knowledge through meaningful research,
            academic integrity, and collaborative thinking."
          </h2>

          <div className="w-16 h-[2px] bg-[#B89B64] mx-auto mt-8" />

          <p className="text-[#D1BC91] text-xs uppercase tracking-[4px] mt-6">
            IMRJ Editorial Philosophy
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="bg-[#FAF9F6] py-20">

        <div className="max-w-7xl mx-auto px-6 md:px-10">

          <div className="bg-[#173D35] rounded-2xl p-8 md:p-14 relative overflow-hidden">

            <div className="absolute -right-16 -top-24 w-80 h-80 border border-white/10 rounded-full" />

            <div className="absolute -right-5 -top-14 w-56 h-56 border border-[#B89B64]/20 rounded-full" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

              <div className="max-w-2xl text-center md:text-left">

                <div className="flex items-center gap-3 justify-center md:justify-start mb-5">

                  <span className="h-[1px] w-10 bg-[#B89B64]" />

                  <span className="text-[#D1BC91] uppercase tracking-[3px] text-xs font-semibold">
                    Be Part of the Research Community
                  </span>

                </div>

                <h2 className="text-3xl md:text-4xl text-white mb-4">
                  Interested in <span className="italic text-[#D1BC91]">Contributing?</span>
                </h2>

                <p className="text-gray-300 text-sm leading-7">
                  Share your academic work and contribute to the
                  exchange of knowledge across research disciplines.
                </p>

              </div>

              <div className="flex flex-wrap justify-center gap-4 shrink-0">

                <Link
                  to="/contact"
                  className="px-6 py-3.5 border border-[#D1BC91] text-[#D1BC91] rounded-lg font-semibold text-sm hover:bg-white hover:text-[#173D35] transition duration-300 flex items-center gap-2"
                >
                  <Mail size={17} />
                  Contact Us
                </Link>

                <Link
                  to="/submit-manuscript"
                  className="px-6 py-3.5 bg-[#B89B64] text-white rounded-lg font-semibold text-sm hover:bg-[#A58A56] transition duration-300 flex items-center gap-2"
                >
                  Submit Research
                  <ArrowRight size={17} />
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default EditorialBoard;