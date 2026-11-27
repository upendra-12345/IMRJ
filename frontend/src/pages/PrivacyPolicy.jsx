import { Link } from "react-router-dom";

import {
  ShieldCheck,
  FileText,
  LockKeyhole,
  Database,
  Phone,
  Globe,
  Mail,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";

import Footer from "../components/Footer";

// ==========================================
// TABLE OF CONTENTS
// ==========================================

const sections = [
  {
    id: "introduction",
    title: "Introduction",
  },
  {
    id: "information",
    title: "Information We Collect",
  },
  {
    id: "usage",
    title: "How We Use Information",
  },
  {
    id: "manuscripts",
    title: "Manuscripts and Peer Review",
  },
  {
    id: "publication",
    title: "Published Research",
  },
  
  {
    id: "retention",
    title: "Data Retention",
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
  },
  {
    id: "security",
    title: "Data Security",
  },
  {
    id: "changes",
    title: "Policy Updates",
  },
  {
    id: "contact",
    title: "Contact Us",
  },
];

// ==========================================
// PRIVACY POLICY PAGE
// ==========================================

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-[#FAF9F6] text-[#252B29]">

        {/* ==================================
            HERO SECTION
        ================================== */}

        <section className="border-b border-[#E5E2D9]">

          <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16">

            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#173D35] transition hover:text-[#B89B64]"
            >
              <ArrowLeft size={17} />

              Back to Home
            </Link>

            <div className="max-w-4xl">

              {/* BADGE */}

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8D4C8] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#173D35]">

                <ShieldCheck size={15} />

                Privacy & Data Protection

              </div>

              {/* TITLE */}

              <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-[#173D35] md:text-6xl">
                Privacy Policy
              </h1>

              {/* DESCRIPTION */}

              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 md:text-lg">

                Your privacy matters to us. This policy explains
                how the International Multidisciplinary Research
                Journal collects, uses, protects, and manages
                information when you visit our website or
                interact with our journal.

              </p>

              {/* POLICY INFORMATION */}

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                <span className="rounded-full bg-[#EAE8DF] px-4 py-2">
                  Last updated: November 26, 2026
                </span>

                <span>
                  International Multidisciplinary Research Journal
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ==================================
            MAIN CONTENT
        ================================== */}

        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">

            {/* ==================================
                TABLE OF CONTENTS
            ================================== */}

            <aside className="h-fit lg:sticky lg:top-8">

              <div className="rounded-2xl border border-[#E5E2D9] bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-[#173D35]">
                  On This Page
                </h2>

                <nav className="space-y-3">

                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-start gap-3 text-sm text-gray-600 transition hover:text-[#173D35]"
                    >

                      <span className="min-w-[20px] text-xs text-[#B89B64]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="group-hover:underline">
                        {section.title}
                      </span>

                    </a>
                  ))}

                </nav>

              </div>

            </aside>

            {/* ==================================
                POLICY CONTENT
            ================================== */}

            <div className="min-w-0">

              {/* ==================================
                  INTRODUCTION
              ================================== */}

              <div
                id="introduction"
                className="mb-12 scroll-mt-10"
              >

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173D35] text-white">
                    <BookOpen size={21} />
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-[#173D35] md:text-3xl">
                    Introduction
                  </h2>

                </div>

                <p className="text-base leading-8 text-gray-700">

                  The International Multidisciplinary Research
                  Journal (IMRJ) respects the privacy of authors,
                  reviewers, editors, and visitors to its website.

                </p>

                <p className="mt-4 text-base leading-8 text-gray-700">

                  This Privacy Policy describes the types of
                  information that may be collected through our
                  website and explains how that information may
                  be used in connection with manuscript submission,
                  editorial activities, publication, and communication.

                </p>

              </div>

              {/* ==================================
                  01. INFORMATION COLLECTED
              ================================== */}

              <PolicySection
                id="information"
                number="01"
                title="Information We Collect"
                icon={<FileText size={21} />}
              >

                <p>
                  Depending on how you interact with IMRJ,
                  we may collect the following categories
                  of information:
                </p>

                <ul>

                  <li>
                    <strong>Author information:</strong>{" "}
                    Name, email address, institutional affiliation,
                    department, and other details provided
                    during submission.
                  </li>

                  <li>
                    <strong>Manuscript information:</strong>{" "}
                    Paper title, abstract, keywords, manuscript
                    files, references, and publication-related
                    information.
                  </li>

                  <li>
                    <strong>Editorial information:</strong>{" "}
                    Information related to editorial decisions,
                    reviewer assignments, review comments,
                    and communication concerning submitted
                    manuscripts.
                  </li>

                  <li>
                    <strong>Contact information:</strong>{" "}
                    Details provided through contact forms
                    or other communication channels.
                  </li>

                  <li>
                    <strong>Technical information:</strong>{" "}
                    Information such as browser details,
                    access logs, and technical data that
                    may be generated when visiting the website.
                  </li>

                </ul>

              </PolicySection>

              {/* ==================================
                  02. INFORMATION USAGE
              ================================== */}

              <PolicySection
                id="usage"
                number="02"
                title="How We Use Information"
                icon={<Database size={21} />}
              >

                <p>
                  Information collected through the IMRJ
                  website may be used for legitimate
                  journal-related activities, including:
                </p>

                <ul>

                  <li>
                    Processing and managing manuscript submissions.
                  </li>

                  <li>
                    Communicating with authors and editorial staff.
                  </li>

                  <li>
                    Coordinating peer-review activities.
                  </li>

                  <li>
                    Evaluating manuscripts for editorial decisions.
                  </li>

                  <li>
                    Preparing accepted papers for publication.
                  </li>

                  <li>
                    Maintaining journal records and publication history.
                  </li>

                  <li>
                    Responding to enquiries and technical issues.
                  </li>

                  <li>
                    Maintaining the security and functionality
                    of the website.
                  </li>

                </ul>

              </PolicySection>

              {/* ==================================
                  03. MANUSCRIPTS AND PEER REVIEW
              ================================== */}

              <PolicySection
                id="manuscripts"
                number="03"
                title="Manuscripts and Peer Review"
                icon={<LockKeyhole size={21} />}
              >

                <p>
                  Manuscripts submitted to IMRJ may contain
                  personal information, research data, and
                  other material supplied by authors.
                </p>

                <p>
                  Submitted manuscripts and associated
                  editorial information may be accessed
                  by authorized editorial personnel and
                  reviewers where necessary for the
                  submission and review process.
                </p>

                <p>
                  IMRJ aims to handle manuscripts and
                  review materials responsibly and to
                  restrict access to individuals involved
                  in the relevant editorial process.
                </p>

                <p>
                  Authors should ensure that manuscripts
                  do not contain personal or confidential
                  information that they are not authorized
                  to disclose.
                </p>

              </PolicySection>

              {/* ==================================
                  04. PUBLISHED RESEARCH
              ================================== */}

              <PolicySection
                id="publication"
                number="04"
                title="Published Research"
                icon={<BookOpen size={21} />}
              >

                <p>
                  Papers accepted and published by IMRJ
                  may be made publicly available through
                  the journal website.
                </p>

                <p>
                  Published articles may include author
                  names, affiliations, abstracts, keywords,
                  references, and other information included
                  in the final publication.
                </p>

                <p>
                  Once an article is published, its
                  information may be accessed, downloaded,
                  cited, or shared by readers in accordance
                  with the journal's publication and
                  copyright policies.
                </p>

              </PolicySection>

              

              

              {/* ==================================
                  05. DATA RETENTION
              ================================== */}

              <PolicySection
                id="retention"
                number="05"
                title="Data Retention"
              >

                <p>
                  IMRJ may retain submission records,
                  editorial correspondence, and
                  publication information for as
                  long as reasonably necessary for
                  journal operations, publication
                  history, academic recordkeeping,
                  and applicable obligations.
                </p>

                <p>
                  Published research may remain
                  available as part of the journal's
                  permanent scholarly record.
                </p>

                <p>
                  Information that is no longer
                  required may be deleted, anonymized,
                  or otherwise handled appropriately,
                  subject to applicable requirements
                  and journal policies.
                </p>

              </PolicySection>

              {/* ==================================
                  06. PRIVACY RIGHTS
              ================================== */}

              <PolicySection
                id="rights"
                number="06"
                title="Your Privacy Rights"
              >

                <p>
                  Depending on applicable law,
                  individuals may have rights
                  concerning their personal
                  information, including the
                  right to request access,
                  correction, or deletion of
                  certain information.
                </p>

                <p>
                  Requests may be subject to
                  verification and consideration
                  of legitimate journal requirements,
                  including publication integrity
                  and academic recordkeeping.
                </p>

                <p>
                  To submit a privacy-related
                  request, please contact the
                  IMRJ editorial team through
                  the Contact page.
                </p>

              </PolicySection>

              {/* ==================================
                  07. DATA SECURITY
              ================================== */}

              <PolicySection
                id="security"
                number="07"
                title="Data Security"
                icon={<ShieldCheck size={21} />}
              >

                <p>
                  IMRJ takes reasonable technical
                  and organizational measures
                  intended to protect information
                  against unauthorized access,
                  loss, misuse, or alteration.
                </p>

                <p>
                  Access to information may be
                  restricted according to the
                  requirements of editorial and
                  administrative activities.
                </p>

                <p>
                  However, no method of electronic
                  transmission or storage can be
                  guaranteed to be completely secure.
                  Users should take appropriate
                  care when submitting information
                  through the internet.
                </p>

              </PolicySection>

              {/* ==================================
                  08. POLICY UPDATES
              ================================== */}

              <PolicySection
                id="changes"
                number="08"
                title="Policy Updates"
              >

                <p>
                  This Privacy Policy may be
                  updated from time to time
                  to reflect changes in journal
                  operations, website functionality,
                  or applicable requirements.
                </p>

                <p>
                  The latest version will be
                  published on this page together
                  with its updated revision date.
                </p>

                <p>
                  Users are encouraged to review
                  this page periodically.
                </p>

              </PolicySection>

              {/* ==================================
                  09. CONTACT US
              ================================== */}

              
              <section
                id="contact"
                 className="rounded-[28px] bg-gradient-to-br from-[#173D35] via-[#19463C] to-[#12382F] p-8 md:p-10 text-white shadow-xl"
              >
              {/* Icon */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Mail size={24} />
              </div>

              {/* Heading */}
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7BD7D]">
                Contact Us
              </p>

              <h2 className="mb-3 font-serif text-3xl font-bold md:text-4xl">
                 Get in Touch
              </h2>

              <p className="mb-8 text-base text-white/80 md:text-lg">
                 We’re here to help. Reach out to us through the following contact details:
              </p>

             {/* Contact Details */}
               <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">

              {/* Email Support */}
            <a
               href="dasglobal08@gmail.com"
               className="group flex items-start gap-4"
              >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C6A45D] text-[#173D35] transition-transform group-hover:scale-110">
               <Mail size={21} />
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D7BD7D]">
                  Email Support
                </p>

                <p className="text-base text-white transition-colors group-hover:text-[#D7BD7D]">
                  dasglobal08@gmail.com
               </p>
              </div>
            </a>

            {/* Contact Number */}
            {/* <a
              href="tel:+91 8109115483"
              className="group flex items-start gap-4"
            >
             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C6A45D] text-[#173D35] transition-transform group-hover:scale-110">
              <Phone size={21} />
             </div> */}

             {/* <div>
               <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D7BD7D]">
                 Contact Number
               </p>

               <p className="text-base text-white transition-colors group-hover:text-[#D7BD7D]">
                 +91 8109115483
                </p>
             </div> */}
           {/* </a> */}

            </div>

            {/* Divider */}
            <div className="my-7 border-t border-white/20" />

              <p className="font-serif text-base italic text-white/90">
                We typically respond within 24–48 hours.
              </p>
            </section>

            </div>

          </div>

        </section>

      </main>

      {/* REUSABLE FOOTER */}
      <Footer />

    </>
  );
}

// ==========================================
// REUSABLE POLICY SECTION
// ==========================================

function PolicySection({
  id,
  number,
  title,
  icon,
  children,
}) {
  return (
    <section
      id={id}
      className="mb-12 scroll-mt-10 border-b border-[#E5E2D9] pb-10 last:border-b-0"
    >

      <div className="mb-5 flex items-start gap-4">

        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9E7DD] text-[#173D35]">

            {icon}

          </div>
        )}

        <div>

          <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-[#B89B64]">
            SECTION {number}
          </p>

          <h2 className="font-serif text-2xl font-bold leading-snug text-[#173D35] md:text-3xl">
            {title}
          </h2>

        </div>

      </div>

      <div className="space-y-4 text-base leading-8 text-gray-700">

        {children}

      </div>

      <style>
        {`
          #${id} ul {
            list-style: disc;
            padding-left: 1.5rem;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }

          #${id} li {
            padding-left: 0.25rem;
            margin-bottom: 0.75rem;
          }

          #${id} strong {
            color: #173D35;
            font-weight: 600;
          }
        `}
      </style>

    </section>
  );
}