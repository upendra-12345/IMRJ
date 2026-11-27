import { Link } from "react-router-dom";

import {
  FileText,
  ShieldCheck,
  AlertCircle,
  Scale,
  Mail,
  Phone,
} from "lucide-react";

import Footer from "../components/Footer";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "about", title: "About IMRJ" },
  { id: "submissions", title: "Manuscript Submission" },
  { id: "review", title: "Peer Review and Publication" },
  { id: "copyright", title: "Copyright and Ownership" },
  { id: "responsibilities", title: "User Responsibilities" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact Us" },
];

function TermsSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 font-serif text-2xl font-semibold text-[#173D35]">
        {title}
      </h2>

      <div className="space-y-4 text-[15px] leading-8 text-[#555F59]">
        {children}
      </div>
    </section>
  );
}

export default function TermsAndConditions() {
  return (
    <>
      <main className="min-h-screen bg-[#FAF9F6] text-[#252B29]">

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#173D35] via-[#24574A] to-[#315F50] px-6 py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
              <Scale size={16} />
              Journal Policies
            </div>

            <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight md:text-6xl">
              Terms & Conditions
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              These terms outline the conditions for using the
              International Multidisciplinary Research Journal website,
              submitting manuscripts, and accessing journal services.
            </p>

            <p className="mt-8 text-sm text-white/70">
              Last updated: November 26, 2026
            </p>

          </div>
        </section>

        {/* Main Content */}
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[280px_1fr]">

            {/* Table of Contents */}
            <aside className="h-fit rounded-2xl border border-[#E7E3D9] bg-white p-6 lg:sticky lg:top-28">

              <h3 className="mb-5 font-serif text-lg font-semibold text-[#173D35]">
                On This Page
              </h3>

              <nav className="space-y-3">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex gap-3 text-sm leading-6 text-[#68716B] transition hover:text-[#173D35]"
                  >
                    <span className="font-medium text-[#B89B64]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>

            </aside>

            {/* Terms Content */}
            <div className="space-y-12">

              {/* General Information */}
              <div className="rounded-2xl border border-[#E7E3D9] bg-white p-6 md:p-8">

                <div className="mb-4 flex items-center gap-3">
                  <FileText
                    className="text-[#B89B64]"
                    size={24}
                  />

                  <h2 className="font-serif text-xl font-semibold text-[#173D35]">
                    General Information
                  </h2>
                </div>

                <p className="text-[15px] leading-8 text-[#555F59]">
                  These Terms and Conditions govern your use of the
                  International Multidisciplinary Research Journal (IMRJ)
                  website and its services. By accessing the website,
                  creating an account, or submitting a manuscript,
                  you agree to these terms and applicable journal policies.
                </p>

              </div>

              {/* 1. Acceptance */}
              <TermsSection
                id="acceptance"
                title="1. Acceptance of Terms"
              >
                <p>
                  By using the IMRJ website, you confirm that you have
                  read and understood these Terms and Conditions.
                </p>

                <p>
                  These terms apply to website visitors, registered users,
                  authors, reviewers, and other individuals using
                  the journal's services.
                </p>
              </TermsSection>

              {/* 2. About IMRJ */}
              <TermsSection
                id="about"
                title="2. About IMRJ"
              >
                <p>
                  IMRJ provides an academic platform for the submission,
                  evaluation, and dissemination of scholarly research
                  across multiple disciplines.
                </p>

                <p>
                  The journal aims to support academic communication
                  and the exchange of research knowledge.
                </p>
              </TermsSection>

              

              {/* 3. Manuscript Submission */}
              <TermsSection
                id="submissions"
                title="3. Manuscript Submission"
              >
                <p>
                  Authors must ensure that submitted manuscripts are
                  original, accurate, and prepared according to
                  the journal's submission guidelines.
                </p>

                <p>By submitting a manuscript, authors confirm that:</p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    They have the authority to submit the manuscript.
                  </li>

                  <li>
                    All listed authors have approved the submission.
                  </li>

                  <li>
                    The manuscript does not knowingly infringe
                    third-party intellectual property rights.
                  </li>

                  <li>
                    The manuscript is not simultaneously submitted
                    elsewhere, unless permitted by journal policy.
                  </li>

                  <li>
                    All information provided during submission
                    is accurate and complete.
                  </li>
                </ul>
              </TermsSection>

              {/* 4. Review and Publication */}
              <TermsSection
                id="review"
                title="4. Peer Review and Publication"
              >
                <p>
                  Submitted manuscripts may undergo editorial
                  assessment and peer review in accordance with
                  the journal's review procedures.
                </p>

                <p>
                  Submission does not guarantee acceptance
                  or publication. Editorial decisions are based
                  on the manuscript's quality, originality,
                  relevance, and compliance with journal policies.
                </p>

                <p>
                  IMRJ may request revisions, reject manuscripts,
                  or withdraw published content where justified
                  by editorial or ethical concerns.
                </p>
              </TermsSection>

              {/* 5. Copyright */}
              <TermsSection
                id="copyright"
                title="5. Copyright and Ownership"
              >
                <p>
                  Copyright and ownership of published manuscripts
                  are governed by the applicable publication
                  agreement and journal policy.
                </p>

                <p>
                  Authors are responsible for obtaining permission
                  to use third-party images, figures, tables,
                  and other copyrighted materials.
                </p>

                <p>
                  Website content may not be reproduced or
                  distributed without authorization, except
                  where permitted by law or applicable licence.
                </p>
              </TermsSection>

              {/* 6. Responsibilities */}
              <TermsSection
                id="responsibilities"
                title="6. User Responsibilities"
              >
                <p>
                  Users agree to use the website responsibly
                  and must not:
                </p>

                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Submit false, misleading, or fraudulent information.
                  </li>

                  <li>
                    Upload malicious files or harmful content.
                  </li>

                  <li>
                    Access restricted accounts or information
                    without authorization.
                  </li>

                  <li>
                    Interfere with the website's functionality
                    or security.
                  </li>

                  <li>
                    Use the website for unlawful or fraudulent activities.
                  </li>
                </ul>
              </TermsSection>

              {/* 7. Disclaimer */}
              <TermsSection
                id="disclaimer"
                title="7. Disclaimer"
              >
                <p>
                  Website information is provided for academic
                  and informational purposes. IMRJ makes reasonable
                  efforts to maintain accurate information but
                  does not guarantee that all content is complete,
                  current, or error-free.
                </p>

                <p>
                  Opinions and findings expressed in published
                  research belong to the respective authors
                  and do not necessarily represent the views
                  of the journal or its editorial team.
                </p>
              </TermsSection>

              {/* 8. Limitation of Liability */}
              <TermsSection
                id="liability"
                title="8. Limitation of Liability"
              >
                <p>
                  To the extent permitted by applicable law,
                  IMRJ shall not be responsible for losses
                  arising from website interruptions,
                  technical errors, or reliance on website content.
                </p>

                <p>
                  Nothing in these terms excludes liability
                  that cannot be excluded under applicable law.
                </p>
              </TermsSection>

              {/* 9. Changes */}
              <TermsSection
                id="changes"
                title="9. Changes to These Terms"
              >
                <p>
                  IMRJ may update these Terms and Conditions
                  to reflect changes in its website, services,
                  or journal policies.
                </p>

                <p>
                  Updated terms will be published on this page
                  with a revised date. Continued use of the
                  website constitutes acceptance of the
                  updated terms, where applicable.
                </p>
              </TermsSection>

              {/* 10. Contact Us */}
              <section
                id="contact"
                className="scroll-mt-28 rounded-[28px] bg-gradient-to-br from-[#173D35] via-[#19463C] to-[#12382F] p-8 text-white shadow-xl md:p-10"
              >

                {/* Contact Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={24} />
                </div>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#D7BD7D]">
                  Contact Us
                </p>

                <h2 className="mb-3 font-serif text-3xl font-bold md:text-4xl">
                  Get in Touch
                </h2>

                <p className="mb-8 text-base leading-8 text-white/80">
                  Have questions about these Terms and Conditions?
                  Our support team is here to assist you.
                </p>

                {/* Contact Details */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">

                  {/* Email Support */}
                  <a
                    href="mailto:dasglobal08@gmail.com"
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
                    href="tel:+918109115483"
                    className="group flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C6A45D] text-[#173D35] transition-transform group-hover:scale-110">
                      <Phone size={21} />
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#D7BD7D]">
                        Contact Number
                      </p>

                      <p className="text-base text-white transition-colors group-hover:text-[#D7BD7D]">
                        +91 8109115483
                      </p>
                    </div>
                  </a> */}

                </div>

                {/* Divider */}
                <div className="my-7 border-t border-white/20" />

                <p className="font-serif text-base italic text-white/90">
                  We typically respond within 24–48 hours.
                </p>

              </section>

              

              {/* Privacy Policy Link */}
              <div className="border-t border-[#E7E3D9] pt-8">

                <Link
                  to="/privacy-policy"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#173D35] transition hover:text-[#B89B64]"
                >
                  <ShieldCheck size={18} />
                  Read our Privacy Policy
                </Link>

              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}