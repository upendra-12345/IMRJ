import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Editorial Board", path: "/editorial-board" },
  { name: "Reviewers", path: "/reviewers" },
  { name: "Current Issue", path: "/current-issue" },
  { name: "Archives", path: "/archives" },
  { name: "Contact", path: "/contact" },
];

  const linkStyle = ({ isActive }) =>
    `relative py-2 text-[13px] font-semibold tracking-wide transition-all duration-300
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#B89B64]
    after:transition-all after:duration-300
    ${
      isActive
        ? "text-[#173D35] after:w-full"
        : "text-[#555E58] hover:text-[#173D35] after:w-0 hover:after:w-full"
    }`;

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="relative z-50">

      {/* TOP INFORMATION BAR */}
      <div className="bg-[#173D35] text-[#E8E3D8]">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-[11px] md:text-xs tracking-wide">

          <p className="flex items-center gap-2">
            <BookOpen size={13} className="text-[#D1BC91]" />
            International Multidisciplinary Research Journal
          </p>

          <p className="hidden sm:block text-[#D1BC91]">
            Academic Excellence • Research • Innovation
          </p>

        </div>
      </div>


      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-[#E8E3D8] shadow-[0_4px_20px_rgba(23,61,53,0.05)]">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO AND BRAND */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group shrink-0"
          >

            <div className="relative w-12 h-12 bg-[#173D35] text-[#D1BC91] rounded-xl flex items-center justify-center shadow-md group-hover:bg-[#24574A] transition duration-300">

              <BookOpen size={25} strokeWidth={1.7} />

              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#B89B64] border-2 border-[#FAF9F6]" />

            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-wide text-[#173D35] leading-none">
                IMRJ
              </h1>

              <p className="text-[9px] sm:text-[10px] text-[#777D76] tracking-[0.12em] uppercase mt-2 leading-relaxed">
                International Multidisciplinary
                <br />
                Research Journal
              </p>
            </div>

          </Link>


          {/* DESKTOP NAVIGATION */}
          <div className="hidden xl:flex items-center gap-6">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}


            {/* AUTHOR DROPDOWN */}
            <div className="relative group">

              <button
                type="button"
                className="flex items-center gap-1.5 py-2 text-[13px] font-semibold tracking-wide text-[#555E58] hover:text-[#173D35] transition"
              >
                For Authors

                <ChevronDown
                  size={15}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              </button>

              {/* DROPDOWN MENU */}
              <div className="absolute top-full left-0 pt-4 w-60 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">

                <div className="bg-white rounded-xl shadow-xl border border-[#E8E3D8] p-2">

                  <Link
                    to="/author-guidelines"
                    className="flex items-center justify-between px-4 py-3 text-sm text-[#555E58] rounded-lg hover:bg-[#F2F0E9] hover:text-[#173D35] transition"
                  >
                    Author Guidelines
                    <ArrowUpRight size={15} />
                  </Link>

                  <Link
                    to="/publication-ethics"
                    className="flex items-center justify-between px-4 py-3 text-sm text-[#555E58] rounded-lg hover:bg-[#F2F0E9] hover:text-[#173D35] transition"
                  >
                    Publication Ethics
                    <ArrowUpRight size={15} />
                  </Link>

                  <Link
                    to="/submit-manuscript"
                    className="flex items-center justify-between px-4 py-3 text-sm text-[#555E58] rounded-lg hover:bg-[#F2F0E9] hover:text-[#173D35] transition"
                  >
                    Submit Manuscript
                    <ArrowUpRight size={15} />
                  </Link>

                </div>

              </div>

            </div>


            {/* SUBMIT BUTTON */}
            <Link
              to="/submit-manuscript"
              className="inline-flex items-center gap-2 bg-[#173D35] text-white px-5 py-3 rounded-lg text-sm font-semibold shadow-sm hover:bg-[#24574A] hover:shadow-lg transition duration-300"
            >
              Submit Paper
              <ArrowUpRight size={16} className="text-[#D1BC91]" />
            </Link>

          </div>


          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="xl:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-[#E8E3D8] text-[#173D35] hover:bg-[#F2F0E9] transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

        </div>


        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="xl:hidden bg-[#FAF9F6] border-t border-[#E8E3D8] shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-6 space-y-2">

              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === "/"}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#F2F0E9] text-[#173D35] border-l-4 border-[#B89B64]"
                        : "text-[#555E58] hover:bg-[#F2F0E9] hover:text-[#173D35]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}


              {/* MOBILE AUTHOR DROPDOWN */}
              <div>

                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#555E58] hover:bg-[#F2F0E9] rounded-lg transition"
                >
                  For Authors

                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="ml-4 pl-4 border-l-2 border-[#B89B64] space-y-1 mt-2">

                    <Link
                      to="/author-guidelines"
                      onClick={closeMobileMenu}
                      className="block py-2 text-sm text-[#777D76] hover:text-[#173D35]"
                    >
                      Author Guidelines
                    </Link>

                    <Link
                      to="/publication-ethics"
                      onClick={closeMobileMenu}
                      className="block py-2 text-sm text-[#777D76] hover:text-[#173D35]"
                    >
                      Publication Ethics
                    </Link>

                    <Link
                      to="/submit-manuscript"
                      onClick={closeMobileMenu}
                      className="block py-2 text-sm text-[#777D76] hover:text-[#173D35]"
                    >
                      Submit Manuscript
                    </Link>

                  </div>
                )}

              </div>


              {/* MOBILE CTA */}
              <Link
                to="/submit-manuscript"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 bg-[#173D35] text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-[#24574A] transition mt-4"
              >
                Submit Your Paper
                <ArrowUpRight size={17} className="text-[#D1BC91]" />
              </Link>

            </div>

          </div>
        )}

      </nav>

    </header>
  );
}

export default Navbar;