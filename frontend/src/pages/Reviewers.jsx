import { useMemo, useState } from "react";

import {
  Search,
  GraduationCap,
  Globe2,
  BookOpen,
  Users,
  ArrowUpRight,
  Filter,
  ShieldCheck,
} from "lucide-react";

import "./Reviewers.css";

const reviewers = [
  {

   id: 1,
   name: "Dr. Aarav Sharma",
   designation: "Assistant Professor",
   institution: "Indian Institute of Management",
   country: "India",
   flag: "🇮🇳",
   expertise: ["AI in Business", "Business Analytics", "Digital Transformation"],
   category: "AI & Business Analytics",
   initials: "AS",

  },
  {
    id: 2,
    name: "Dr. Emily Wilson",
    designation: "Senior Research Fellow",
    institution: "London Business Research School",
    country: "United Kingdom",
    flag: "🇬🇧",
    expertise: ["Corporate Governance", "Strategic Management", "Organizational Behavior"],
    category: "Strategy & Governance",
    initials: "EW",
    
  },
  {
    id: 3,
    name: "Prof. Daniel Anderson",
    designation: "Professor",
    institution: "Pacific International Business School",
    country: "Australia",
    flag: "🇦🇺",
    expertise: ["Supply Chain Management", "Operations Research", "Agile Logistics"],
    category: "Operations & Supply Chain",
    initials: "DA",
    
  },
  {
    id: 4,
    name: "Dr. Sophia Martinez",
    designation: "Assistant Professor",
    institution: "Canadian Institute of Health Policy",
    country: "Canada",
    flag: "🇨🇦",
    expertise: ["Hospital Administration", "Patient Care Quality", "Health Economics"],
    category: "Healthcare Management",
    initials: "SM",
    
  },
  {
    id: 5,
    name: "Dr. James Richardson",
    designation: "Associate Professor",
    institution: "European University of Finance",
    country: "Germany",
    flag: "🇩🇪",
    expertise: ["Corporate Finance", "Risk Management", "Entrepreneurship"],
    category: "Finance & Accounting",
    initials: "JR",
    
  },
  {
    id: 6,
    name: "Dr. Priya Verma",
    designation: " Associate Professor",
    institution: "National Institute of Management",
    country: "India",
    flag: "🇮🇳",
    expertise: ["Consumer Behavior", "Digital Marketing ROI", "Brand Strategy"],
    category: "Marketing & HRM",
    initials: "PV",
    
  },
  {
    id: 7,
    name: "Dr. William Chen",
    designation: "Senior Lecturer",
    institution: "Singapore Institute of Management",
    country: "Singapore",
    flag: "🇸🇬",
    expertise: ["FinTech Adoption", "Blockchain in Business", "Enterprise Systems"],
    category: "AI & Business Analytics",
    initials: "WC",
    
  },
  {
    id: 8,
    name: "Dr. Isabella Brown",
    designation: "Research Associate",
    institution: "University of Global Leadership",
    country: "New Zealand",
    flag: "🇳🇿",
    expertise: ["Executive Leadership", "Human Capital", "Organizational Change"],
    category: "Marketing & HRM",
    initials: "IB",
    
  },
  {
    id: 9,
    name: "Dr. Ethan Clark",
    designation: "Assistant Professor",
    institution: "Northern Sustainability Institute",
    country: "France",
    flag: "🇫🇷",
    expertise: ["ESG Compliance", "Corporate Social Responsibility", "Circular Economy"],
    category: "Sustainability & ESG",
    initials: "EC",
    
  },
  {
    id: 10,
    name: "Prof. Charlotte Davis",
    designation: "Professor",
    institution: "International Health & Business University",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    expertise: ["Healthcare Operations", "Telehealth Implementation", "Health Informatics"],
    category: "Healthcare Management",
    initials: "CD",
    
  },
];

const categories = [
  "All",
  "Computer Science",
  "Engineering",
  "Management",
  "Education",
  "Science",
  "Health Sciences",
];

function Reviewers() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredReviewers = useMemo(() => {
    return reviewers.filter((reviewer) => {
      const matchesSearch = [
        reviewer.name,
        reviewer.institution,
        reviewer.country,
        reviewer.category,
        ...reviewer.expertise,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesCategory =
        activeCategory === "All" ||
        reviewer.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const handleImageError = (event, initials) => {
    const image = event.currentTarget;
    image.style.display = "none";

    const parent = image.parentElement;
    parent.classList.add("reviewer-avatar-fallback");
    parent.textContent = initials;
  };

  return (
    <div className="reviewers-page">

      {/* HERO SECTION */}
      <section className="reviewers-hero">
        <div className="reviewers-hero-content">

          <div className="reviewers-eyebrow">
            <Globe2 size={16} />
            INTERNATIONAL ACADEMIC NETWORK
          </div>

          <h1>
            International <br />
            <span>Reviewers</span>
          </h1>

          <p>
            Meet our international academic community representing
            diverse research disciplines and scholarly perspectives.
          </p>

          <div className="reviewers-hero-stats">
            <div>
              <strong>{reviewers.length}+</strong>
              <span>Sample Profiles</span>
            </div>

            <div>
              <strong>10</strong>
              <span>Countries</span>
            </div>

            <div>
              <strong>6</strong>
              <span>Research Areas</span>
            </div>
          </div>

        </div>

        <div className="reviewers-hero-decoration">
          <GraduationCap size={150} strokeWidth={0.8} />
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="reviewers-intro">

        <div className="reviewers-section-label">
          <span></span>
          OUR ACADEMIC COMMUNITY
        </div>

        <h2>
          Global Knowledge.
          <span> Diverse Perspectives.</span>
        </h2>

        <p>
          Our sample reviewer directory demonstrates the multidisciplinary
          nature of IMRJ, covering academic and research interests across
          various fields of knowledge.
        </p>

      </section>

      {/* SEARCH AND FILTER */}
      <section className="reviewers-container">

        <div className="reviewers-toolbar">

          <div className="reviewers-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name, country or expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search reviewers"
            />
          </div>

          <div className="reviewers-filter-label">
            <Filter size={17} />
            Research Areas
          </div>

        </div>

        {/* CATEGORY FILTERS */}
        <div className="reviewers-categories">

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}

        </div>

        {/* REVIEWER CARDS */}
        <div className="reviewers-grid">

          {filteredReviewers.map((reviewer) => (

            <article className="reviewer-card" key={reviewer.id}>

              <div className="reviewer-card-top">

                {/* REALISTIC PORTRAIT */}
               <div className="reviewer-avatar reviewer-avatar-fallback">
                  {reviewer.initials}
                </div>

                <span className="reviewer-flag">
                  {reviewer.flag}
                </span>

              </div>

              <div className="reviewer-card-content">

                <span className="reviewer-category">
                  {reviewer.category}
                </span>

                <h3>{reviewer.name}</h3>

                <p className="reviewer-designation">
                  {reviewer.designation}
                </p>

                <div className="reviewer-institution">
                  <GraduationCap size={17} />

                  <span>{reviewer.institution}</span>
                </div>

                <div className="reviewer-country">
                  <Globe2 size={16} />
                  {reviewer.country}
                </div>

                <div className="reviewer-divider"></div>

                <div className="reviewer-expertise-heading">
                  <BookOpen size={16} />
                  Research Expertise
                </div>

                <div className="reviewer-tags">

                  {reviewer.expertise.map((item) => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              {/* <div className="reviewer-card-footer">
                <span>Academic Profile</span>
                <ArrowUpRight size={18} />
              </div> */}

            </article>

          ))}

        </div>

        {/* EMPTY STATE */}
        {filteredReviewers.length === 0 && (

          <div className="reviewers-empty">

            <Users size={40} />

            <h3>No reviewers found</h3>

            <p>
              Try searching with a different name or research area.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear Filters
            </button>

          </div>

        )}

      </section>

      {/* DISCLAIMER */}
      <section className="reviewers-notice">

        <ShieldCheck size={23} />

        <div>
          <h3>Academic Directory Demonstration</h3>

          <p>
            The profiles, portraits, names and institutional affiliations
            displayed on this page are illustrative demonstration data
            for website development. They do not represent actual IMRJ
            reviewers, editorial board members or verified academic
            affiliations.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Reviewers;