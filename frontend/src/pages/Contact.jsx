import { useState } from "react";
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
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend demonstration only.
    // Connect an API/backend to actually store or send messages.
    setSubmitted(true);

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactCards = [
    {
      icon: <Mail size={22} />,
      title: "Email Address",
      content: "dasglobal08@gmail.com",
      detail: "Send us your questions anytime.",
      link: "mailto:drssasho@gmail.com",
    },
    {
      icon: <Phone size={22} />,
      title: "Phone Number",
      content: "+91 8109115483",
      detail: "Connect with our support team.",
      link: "tel:+918109115483",
    },
    {
      icon: <MapPin size={22} />,
      title: "Our Location",
      content: "Mumbai, Maharashtra",
      detail: "India",
      link: null,
    },
    {
      icon: <Clock size={22} />,
      title: "Response Time",
      content: "24–48 Hours",
      detail: "During regular business days.",
      link: null,
    },
  ];

  const inquiries = [
    "Manuscript submission guidelines",
    "Peer review process",
    "Publication fees and charges",
    "Copyright and licensing",
    "Article processing status",
  ];

  const inputStyle =
    "w-full rounded-lg border border-[#E8E3D8] bg-[#FAF9F6] px-4 py-3.5 text-sm text-[#252B29] placeholder:text-[#A0A39D] outline-none transition duration-300 focus:border-[#B89B64] focus:ring-2 focus:ring-[#B89B64]/20";

  return (
    <div className="min-h-screen bg-[#FAF9F6]">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[380px] flex items-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#102F29]/95 via-[#173D35]/85 to-[#173D35]/60" />

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
                We'd Love to Hear From You
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl text-white leading-tight mb-6">
              Get in <span className="text-[#D1BC91] italic">Touch</span>
            </h1>

            <p className="text-gray-200 text-base md:text-lg leading-8 max-w-2xl">
              Have a question about research, manuscript submissions, or
              publication? Our team is here to assist you. Connect with
              IMRJ and let's move research forward together.
            </p>

            <div className="flex items-center gap-3 mt-8 text-sm text-gray-300">
              <Link to="/" className="hover:text-[#D1BC91] transition">
                Home
              </Link>

              <span className="text-[#B89B64]">/</span>

              <span className="text-[#D1BC91]">Contact</span>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-64 h-64 border border-white/10 rounded-full translate-x-1/3 translate-y-1/2" />
        <div className="absolute bottom-0 right-20 w-40 h-40 border border-[#B89B64]/20 rounded-full translate-y-1/2" />

      </section>


      {/* ================= INTRODUCTION ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-12">

        <div className="max-w-3xl mx-auto text-center animate-fade-up">

          <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
            Contact Our Team
          </span>

          <h2 className="text-3xl md:text-4xl text-[#173D35] mt-4 mb-5">
            Let's Start a <span className="italic">Conversation</span>
          </h2>

          <p className="text-[#777D76] leading-8 text-sm md:text-base">
            Whether you are a researcher, author, academician, or reader,
            we welcome your questions and suggestions. Reach out to us
            using the details below or send us a message through the form.
          </p>

          <div className="w-16 h-[2px] bg-[#B89B64] mx-auto mt-7" />

        </div>

      </section>


      {/* ================= MAIN CONTACT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-7">

            <div>
              <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
                Contact Information
              </span>

              <h3 className="text-2xl md:text-3xl text-[#173D35] mt-3">
                We're Here to Help
              </h3>

              <p className="text-sm text-[#777D76] leading-7 mt-3">
                Get in touch with our editorial and support team for
                assistance with your research and publication queries.
              </p>
            </div>


            {/* CONTACT CARDS */}
            <div className="space-y-4">

              {contactCards.map((card, index) => {
                const CardContent = (
                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 shrink-0 rounded-lg bg-[#173D35] text-[#D1BC91] flex items-center justify-center group-hover:bg-[#B89B64] group-hover:text-white transition duration-300">
                      {card.icon}
                    </div>

                    <div>
                      <h4 className="text-[#173D35] font-semibold text-base mb-1">
                        {card.title}
                      </h4>

                      <p className="text-[#252B29] text-sm font-medium break-words">
                        {card.content}
                      </p>

                      <p className="text-xs text-[#898D86] mt-1">
                        {card.detail}
                      </p>
                    </div>

                    {card.link && (
                      <ArrowUpRight
                        size={17}
                        className="ml-auto shrink-0 text-[#B89B64] opacity-0 group-hover:opacity-100 transition"
                      />
                    )}

                  </div>
                );

                return (
                  <div
                    key={index}
                    className="bg-white border border-[#E8E3D8] rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-[#B89B64]/50 transition duration-300 group animate-fade-up"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    {card.link ? (
                      <a href={card.link} className="block">
                        {CardContent}
                      </a>
                    ) : (
                      CardContent
                    )}
                  </div>
                );
              })}

            </div>


            {/* COMMON INQUIRIES */}
            <div className="bg-[#173D35] rounded-xl p-6 md:p-7 relative overflow-hidden">

              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full border border-white/10" />
              <div className="absolute -right-5 -top-5 w-24 h-24 rounded-full border border-[#B89B64]/20" />

              <div className="relative z-10">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-10 h-10 bg-[#B89B64]/20 text-[#D1BC91] rounded-lg flex items-center justify-center">
                    <CircleHelp size={21} />
                  </div>

                  <h3 className="text-white font-semibold text-lg">
                    Common Inquiries
                  </h3>

                </div>

                <p className="text-gray-300 text-sm leading-6 mb-5">
                  You can contact us regarding the following topics:
                </p>

                <ul className="space-y-4">

                  {inquiries.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-200"
                    >
                      <CheckCircle2
                        size={17}
                        className="text-[#D1BC91] shrink-0 mt-0.5"
                      />

                      {item}
                    </li>
                  ))}

                </ul>

              </div>
            </div>

          </div>


          {/* RIGHT SIDE - CONTACT FORM */}
          <div className="lg:col-span-3">

            <div className="bg-white border border-[#E8E3D8] rounded-2xl shadow-sm overflow-hidden">

              {/* FORM HEADER */}
              <div className="bg-[#173D35] px-6 md:px-9 py-8 relative overflow-hidden">

                <div className="absolute -right-10 -top-20 w-60 h-60 rounded-full border border-white/10" />

                <div className="relative z-10">

                  <div className="flex items-center gap-3 mb-4">

                    <div className="w-11 h-11 rounded-lg bg-[#B89B64]/20 text-[#D1BC91] flex items-center justify-center">
                      <MessageCircle size={22} />
                    </div>

                    <span className="text-[#D1BC91] uppercase tracking-[3px] text-xs font-semibold">
                      Contact Form
                    </span>

                  </div>

                  <h2 className="text-3xl md:text-4xl text-white mb-3">
                    Send Us a Message
                  </h2>

                  <p className="text-gray-300 text-sm leading-6 max-w-lg">
                    Fill out the form below and share your query with us.
                    We'll get back to you as soon as possible.
                  </p>

                </div>

              </div>


              {/* FORM BODY */}
              <div className="p-6 md:p-9">

                {submitted && (
                  <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">

                    <CheckCircle2
                      size={20}
                      className="text-green-700 shrink-0"
                    />

                    <div>
                      <p className="text-green-800 font-semibold text-sm">
                        Thank you for contacting us!
                      </p>

                      <p className="text-green-700 text-xs mt-1">
                        Your form was submitted in this demo. Connect a
                        backend to deliver and store actual messages.
                      </p>
                    </div>

                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  onChange={() => setSubmitted(false)}
                  className="space-y-6"
                >

                  {/* NAME AND PHONE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-[#252B29] mb-2">
                        Full Name <span className="text-[#B89B64]">*</span>
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        autoComplete="name"
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#252B29] mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        autoComplete="tel"
                        className={inputStyle}
                      />
                    </div>

                  </div>


                  {/* EMAIL */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B29] mb-2">
                      Email Address <span className="text-[#B89B64]">*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      autoComplete="email"
                      className={inputStyle}
                    />
                  </div>


                  {/* SUBJECT */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B29] mb-2">
                      Subject <span className="text-[#B89B64]">*</span>
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is your inquiry about?"
                      required
                      className={inputStyle}
                    />
                  </div>


                  {/* MESSAGE */}
                  <div>
                    <label className="block text-sm font-semibold text-[#252B29] mb-2">
                      Your Message <span className="text-[#B89B64]">*</span>
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows={6}
                      required
                      className={`${inputStyle} resize-none`}
                    />
                  </div>


                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full bg-[#173D35] hover:bg-[#245448] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition duration-300 shadow-md hover:shadow-lg group"
                  >
                    Send Message

                    <Send
                      size={17}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition"
                    />
                  </button>

                  <p className="text-xs text-center text-[#92958E]">
                    Your information should only be used to respond to your inquiry.
                  </p>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-[#F2F0E9] border-t border-[#E8E3D8]">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="max-w-2xl text-center md:text-left">

              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <BookOpen size={19} className="text-[#A58A56]" />

                <span className="text-[#A58A56] uppercase tracking-[3px] text-xs font-bold">
                  Explore IMRJ
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl text-[#173D35] mb-3">
                Have Research to Share?
              </h2>

              <p className="text-[#777D76] text-sm leading-7">
                Explore our journal and take the next step in sharing
                your research with the academic community.
              </p>

            </div>

            <div className="flex flex-wrap justify-center gap-4">

              <Link
                to="/about"
                className="px-7 py-3.5 border border-[#173D35] text-[#173D35] rounded-lg font-semibold text-sm hover:bg-[#173D35] hover:text-white transition duration-300"
              >
                About IMRJ
              </Link>

              <Link
                to="/current-issue"
                className="px-7 py-3.5 bg-[#173D35] text-white rounded-lg font-semibold text-sm hover:bg-[#245448] transition duration-300 flex items-center gap-2"
              >
                Explore Journal
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;