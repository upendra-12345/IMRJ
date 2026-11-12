import { Link } from "react-router-dom";


import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  BookOpen,
  MoveUpRight,
  ArrowUp,
} from "lucide-react";

function Footer() {
  const quickLinks = [
    ["Home", "/"],
    ["About Journal", "/about"],
    ["Editorial Board", "/editorial-board"],
    ["Current Issue", "/current-issue"],
    ["Archives", "/archives"],
    ["Contact", "/contact"],
  ];

  const authorLinks = [
    ["Author Guidelines", "/author-guidelines"],
    ["Publication Ethics", "/publication-ethics"],
    ["Submit Manuscript", "/submit-manuscript"],
    ["Review Process", "/review-process"],
    ["Publication Fees", "/publication-fees"],
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#FAF9F6] text-[#252B29]">

      {/* TOP CTA SECTION */}
      <div className="bg-[#173D35]">
        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div>
              <p className="text-[#D1BC91] uppercase tracking-[0.25em] text-xs mb-4">
                Share Your Research With The World
              </p>

              <h2 className="font-serif text-3xl md:text-5xl text-[#FAF9F6] leading-tight">
                Have research to publish?
              </h2>

              <p className="text-white/65 text-sm mt-4 max-w-xl">
                Contribute your research and become part of a global
                academic community.
              </p>
            </div>

            <Link
              to="/submit-manuscript"
              className="shrink-0 inline-flex items-center gap-3 bg-[#B89B64] text-[#173D35] px-7 py-4 text-sm font-semibold hover:bg-[#D1BC91] transition duration-300"
            >
              Submit Your Paper
              <ArrowUpRight size={18} />
            </Link>
            <Link
            to="/admin/login"
            className="shrink-0 inline-flex items-center gap-3 bg-[#B89B64] text-[#173D35] px-7 py-4 text-sm font-semibold hover:bg-[#D1BC91] transition duration-300"
            >
            <span className="inline-flex items-center gap-2">
            <i className="fas fa-user-shield"></i>
            Admin Login <ArrowUpRight size={18} />
            </span>
            </Link>

          </div>
        </div>
      </div>


      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">

          {/* BRAND */}
          <div className="lg:col-span-4">

            <Link to="/" className="inline-flex items-center gap-4">

              <div className="w-14 h-14 bg-[#173D35] flex items-center justify-center text-[#D1BC91]">
                <BookOpen size={29} strokeWidth={1.5} />
              </div>

              <div>
                <h2 className="font-serif text-3xl text-[#173D35]">
                  IMRJ
                </h2>

                <p className="text-[10px] uppercase tracking-[0.2em] text-[#B89B64] mt-1">
                  Research Journal
                </p>
              </div>

            </Link>

            <p className="text-sm text-[#777D76] leading-8 mt-7 max-w-sm">
              International Multidisciplinary Research Journal
              provides a platform for researchers, academicians
              and scholars to share ideas, explore discoveries
              and contribute to the advancement of knowledge.
            </p>

            <div className="flex items-center gap-3 mt-7">
              <span className="w-9 h-[2px] bg-[#B89B64]" />

              <span className="text-xs text-[#173D35] font-medium tracking-wide">
                Connecting Knowledge with Innovation
              </span>
            </div>

          </div>


          {/* EXPLORE */}
          <div className="lg:col-span-2">

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#173D35] mb-7">
              Explore
            </h3>

            <ul className="space-y-4">

              {quickLinks.map(([name, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-[#777D76] hover:text-[#B89B64] transition-colors duration-300"
                  >
                    {name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>


          {/* FOR AUTHORS */}
          <div className="lg:col-span-3">

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#173D35] mb-7">
              For Authors
            </h3>

            <ul className="space-y-4">

              {authorLinks.map(([name, path]) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-[#777D76] hover:text-[#B89B64] transition-colors duration-300"
                  >
                    {name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>


          {/* CONTACT */}
          <div className="lg:col-span-3">

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#173D35] mb-7">
              Contact Us
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4 items-start">

                <Mail
                  size={18}
                  className="text-[#B89B64] shrink-0 mt-1"
                />

                <a
                  href="mailto:dasglobal08@gmail.com"
                  className="text-sm text-[#777D76] hover:text-[#173D35] transition break-all"
                >
                  dasglobal08@gmail.com
                </a>

              </div>

              <div className="flex gap-4 items-start">

                <Phone
                  size={18}
                  className="text-[#B89B64] shrink-0 mt-1"
                />

                <a
                  href="tel:+918292161003"
                  className="text-sm text-[#777D76] hover:text-[#173D35] transition"
                >
                  +91 8109115483
                </a>

              </div>

              <div className="flex gap-4 items-start">

                <MapPin
                  size={18}
                  className="text-[#B89B64] shrink-0 mt-1"
                />

                <span className="text-sm text-[#777D76]">
                  Mumbai, Maharashtra, India
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* JOURNAL STATEMENT */}
        <div className="mt-16 pt-10 border-t border-[#E8E3D8]">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            <div>
              <p className="text-[#B89B64] text-xs uppercase tracking-[0.25em] mb-4">
                A Platform for Academic Excellence
              </p>

              <h2 className="font-serif text-4xl md:text-6xl text-[#173D35] leading-tight">
                Research.
                <span className="text-[#B89B64]"> Discover.</span>
                <br />
                Inspire.
              </h2>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-3 border border-[#D8D2C5] px-5 py-3 text-sm text-[#173D35] hover:bg-[#173D35] hover:text-white hover:border-[#173D35] transition duration-300"
            >
              Back to Top

              <ArrowUp
                size={17}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </button>

          </div>

        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="bg-[#173D35]">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-xs text-white/65 text-center">
            © {new Date().getFullYear()} IMRJ — International
            Multidisciplinary Research Journal. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-xs text-white/65">

            <Link
              to="/privacy-policy"
              className="hover:text-[#D1BC91] transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="hover:text-[#D1BC91] transition"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;