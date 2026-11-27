import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CircleHelp,
  Send,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      value: "dasglobal08@gmail.com",
      link: "mailto:dasglobal08@gmail.com",
      description: "Send us your questions anytime.",
    },
    // {
    //   icon: Phone,
    //   title: "Call Us",
    //   value: "+91 8109115483",
    //   link: "tel:+918109115483",
    //   description: "Connect with our support team.",
    // },
    {
      icon: MapPin,
      title: "Our Location",
      value: "Mumbai, Maharashtra",
      link: "https://maps.google.com/?q=Mumbai+Maharashtra",
      description: "India",
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "24–48 Hours",
      link: null,
      description: "We usually respond within two working days.",
    },
  ];

  const commonInquiries = [
    "Manuscript Submission",
    "Publication Process",
    "Editorial & Review",
    "Research Collaboration",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      if (!API_URL) {
        throw new Error(
          "Backend API URL is not configured. Please check your frontend .env file."
        );
      }

      const response = await axios.post(
        `${API_URL.replace(/\/+$/, "")}/api/contact`,
        formData
      );

      if (response.data.success) {
        setSubmitted(true);

        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError(
          response.data.message || "Unable to submit your message."
        );
      }
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      {/* ================= HERO SECTION ================= */}

      <section className="relative flex min-h-[350px] items-center overflow-hidden bg-[#173D35]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102F29] via-[#173D35]/95 to-[#173D35]/80" />

        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "45px 45px",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">

            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B89B64]/50 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8C49A]">
              <MessageCircle size={15} />
              Get In Touch
            </span>

            <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
              Contact <span className="text-[#C7A96B]">Us</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              Have questions about manuscript submission, publication, or
              research collaboration? We are here to help you.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
              <Link to="/" className="transition hover:text-[#D8C49A]">
                Home
              </Link>

              <ArrowRight size={14} />

              <span className="text-[#D8C49A]">Contact Us</span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto max-w-4xl text-center">

          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B89B64]">
            We Would Love To Hear From You
          </span>

          <h2 className="mt-4 font-serif text-3xl font-bold text-[#173D35] md:text-4xl">
            Let's Start a Conversation
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#626B65]">
            At the International Multidisciplinary Research Journal, we value
            communication with researchers, authors, reviewers, and academic
            institutions. Reach out to us for any assistance related to
            research publication or journal activities.
          </p>

          <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-[#B89B64]" />

        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}

      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-5">

          {/* LEFT SIDE */}

          <div className="space-y-8 lg:col-span-2">

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B64]">
                Contact Information
              </span>

              <h2 className="mt-3 font-serif text-3xl font-bold text-[#173D35]">
                Get in Touch
              </h2>

              <p className="mt-4 leading-7 text-[#626B65]">
                Choose your preferred way to contact us. Our team will be
                happy to assist you with your queries.
              </p>
            </div>

            {/* CONTACT CARDS */}

            <div className="space-y-4">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="group flex items-start gap-4 rounded-2xl border border-[#E8E5DC] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B89B64]/60 hover:shadow-lg"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#173D35] text-[#D8C49A] transition group-hover:bg-[#B89B64] group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-[#173D35]">
                        {item.title}
                      </h3>

                      {item.link ? (
                        <a
                          href={item.link}
                          target={
                            item.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.link.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="mt-1 inline-block break-words text-sm font-medium text-[#A5864D] transition hover:text-[#173D35]"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-[#A5864D]">
                          {item.value}
                        </p>
                      )}

                      <p className="mt-1 text-xs leading-5 text-[#7A817C]">
                        {item.description}
                      </p>
                    </div>

                    {item.link && (
                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-[#B89B64] opacity-0 transition group-hover:opacity-100"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* COMMON INQUIRIES */}

            <div className="rounded-2xl bg-[#173D35] p-7 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#D8C49A]">
                  <CircleHelp size={21} />
                </div>

                <h3 className="font-serif text-xl font-semibold">
                  Common Inquiries
                </h3>
              </div>

              <p className="mt-3 text-sm leading-6 text-white/65">
                You can contact us regarding the following topics:
              </p>

              <div className="mt-5 space-y-3">
                {commonInquiries.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-white/85"
                  >
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-[#C7A96B]"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - CONTACT FORM */}

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-[#E8E5DC] bg-white p-6 shadow-lg md:p-10">

              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B89B64]">
                  Send Us a Message
                </span>

                <h2 className="mt-3 font-serif text-3xl font-bold text-[#173D35]">
                  We'd Love to Hear From You
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#737B75]">
                  Fill out the form below and our team will get back to you
                  as soon as possible.
                </p>
              </div>

              {/* SUCCESS MESSAGE */}

              {submitted && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                  <CheckCircle2 size={21} className="mt-0.5 shrink-0" />

                  <div>
                    <p className="font-semibold">
                      Message Submitted Successfully!
                    </p>

                    <p className="mt-1 text-sm">
                      Thank you for contacting us. Your message has been
                      received, and our team will get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                  <AlertCircle size={21} className="mt-0.5 shrink-0" />

                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* FORM */}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NAME AND PHONE */}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#303B35]"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-xl border border-[#E5E3DB] bg-[#FAF9F6] px-4 py-3 text-sm text-[#303B35] outline-none transition placeholder:text-[#A5AAA5] focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-[#303B35]"
                    >
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-[#E5E3DB] bg-[#FAF9F6] px-4 py-3 text-sm text-[#303B35] outline-none transition placeholder:text-[#A5AAA5] focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20"
                    />
                  </div>

                </div>

                {/* EMAIL */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#303B35]"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full rounded-xl border border-[#E5E3DB] bg-[#FAF9F6] px-4 py-3 text-sm text-[#303B35] outline-none transition placeholder:text-[#A5AAA5] focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20"
                  />
                </div>

                {/* SUBJECT */}

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-[#303B35]"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-[#E5E3DB] bg-[#FAF9F6] px-4 py-3 text-sm text-[#303B35] outline-none transition focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20"
                  >
                    <option value="">Select an inquiry type</option>
                    <option value="Manuscript Submission">
                      Manuscript Submission
                    </option>
                    <option value="Publication Process">
                      Publication Process
                    </option>
                    <option value="Editorial Inquiry">
                      Editorial Inquiry
                    </option>
                    <option value="Review Process">
                      Review Process
                    </option>
                    <option value="Research Collaboration">
                      Research Collaboration
                    </option>
                    <option value="General Inquiry">
                      General Inquiry
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* MESSAGE */}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-[#303B35]"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="6"
                    required
                    className="w-full resize-none rounded-xl border border-[#E5E3DB] bg-[#FAF9F6] px-4 py-3 text-sm text-[#303B35] outline-none transition placeholder:text-[#A5AAA5] focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20"
                  />
                </div>

                {/* SUBMIT BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#173D35] px-6 py-4 text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-[#24574A] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={19} className="animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-6 text-[#858B85]">
                  Your information will only be used to respond to your
                  inquiry.
                </p>

              </form>
            </div>
          </div>

        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}

      <section className="px-6 pb-20 md:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#173D35] px-7 py-12 text-center md:px-16 md:py-16">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#D8C49A]">
              <BookOpen size={28} />
            </div>

            <h2 className="mt-6 font-serif text-3xl font-bold text-white md:text-4xl">
              Have a Research Paper to Publish?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              Share your research with the academic community. Explore our
              publication process and submit your manuscript to IMRJ.
            </p>

            <Link
              to="/submit-manuscript"
              className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#C7A96B] px-7 py-4 text-sm font-bold text-[#173D35] transition hover:bg-[#D8C49A]"
            >
              Submit Your Research
              <ArrowUpRight size={18} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;