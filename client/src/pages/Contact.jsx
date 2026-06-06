import { useState } from "react";
import {
  Mail,
  Bug,
  Lightbulb,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { userService } from "../services/userService";

export default function Contact() {
  const [activeTab, setActiveTab] = useState("contact");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [suggestionForm, setSuggestionForm] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
  });

  const [bugForm, setBugForm] = useState({
    name: "",
    email: "",
    bugTitle: "",
    description: "",
    stepsToReproduce: "",
  });

  const inputStyle =
    "w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300";

  const textareaStyle =
    "w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300 resize-none";

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const submitData = async (payload, resetForm) => {
    try {
      setLoading(true);
      clearMessages();

      await userService.submitContactData(payload);

      setSuccess("Submitted successfully.");
      resetForm();
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 py-8 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="uppercase tracking-[6px] text-cyan-800 text-sm font-semibold mb-4">
              Contact Center
            </p>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight text-white">
              Let’s Build
              <span className="block text-cyan-900">
                Something Better
              </span>
            </h1>

            <p className="text-gray-200 mt-6 leading-relaxed text-lg">
              Questions, suggestions, or bug reports — send your feedback and
              help improve the platform experience.
            </p>
          </div>

          {/* CARDS */}
          <div className="space-y-5">
            {/* EMAIL */}
            <div className="group bg-white/10 hover:bg-white/15 border border-white/10 rounded-3xl p-3 backdrop-blur-xl transition duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-blue-400/20 p-4 rounded-2xl">
                  <Mail className="text-cyan-900" size={24} />
                </div>

                <div>
                  <p className="text-cyan-900 text-sm mb-1">Email</p>
                  <h3 className="text-white font-semibold text-lg">
                    itszarqan@gmail.com
                  </h3>
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="group bg-white/10 hover:bg-white/15 border border-white/10 rounded-3xl p-3 backdrop-blur-xl transition duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-green-400/20 p-4 rounded-2xl">
                  <Phone className="text-green-300" size={24} />
                </div>

                <div>
                  <p className="text-cyan-900 text-sm mb-1">Phone</p>
                  <h3 className="text-white font-semibold text-lg">
                    +91 8017927972
                  </h3>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="group bg-white/10 hover:bg-white/15 border border-white/10 rounded-3xl p-3 backdrop-blur-xl transition duration-300">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-400/20 p-4 rounded-2xl">
                  <MapPin className="text-yellow-300" size={24} />
                </div>

                <div>
                  <p className="text-cyan-900 text-sm mb-1">Location</p>
                  <h3 className="text-white font-semibold text-lg">
                    India, West Bengal
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-3">
          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
            {/* TABS */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                {
                  key: "contact",
                  label: "Contact",
                  icon: <Mail size={18} />,
                },
                {
                  key: "suggestion",
                  label: "Suggestion",
                  icon: <Lightbulb size={18} />,
                },
                {
                  key: "bug",
                  label: "Bug Report",
                  icon: <Bug size={18} />,
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    clearMessages();
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                  
                  ${
                    activeTab === tab.key
                      ? "bg-cyan-900 text-white shadow-lg scale-105"
                      : "bg-white/10 hover:bg-white/20 text-cyan-900"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SUCCESS */}
            {success && (
              <div className="mb-6 bg-green-500/10 border border-green-400/30 rounded-2xl p-4 flex items-center gap-3 text-green-300">
                <CheckCircle2 size={22} />
                <p>{success}</p>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-400/30 rounded-2xl p-4 flex items-center gap-3 text-red-300">
                <AlertCircle size={22} />
                <p>{error}</p>
              </div>
            )}

            {/* CONTACT FORM */}
            {activeTab === "contact" && (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();

                  submitData(
                    {
                      type: "contact",
                      ...contactForm,
                    },
                    () =>
                      setContactForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      })
                  );
                }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputStyle}
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    className={inputStyle}
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Subject"
                  className={inputStyle}
                  value={contactForm.subject}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      subject: e.target.value,
                    })
                  }
                />

                <textarea
                  rows={6}
                  required
                  placeholder="Write your message..."
                  className={textareaStyle}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({
                      ...contactForm,
                      message: e.target.value,
                    })
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-900 hover:bg-cyan-800 text-white font-bold py-4 rounded-2xl transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={18} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}

            {/* SUGGESTION FORM */}
            {activeTab === "suggestion" && (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();

                  submitData(
                    {
                      type: "suggestion",
                      ...suggestionForm,
                    },
                    () =>
                      setSuggestionForm({
                        name: "",
                        email: "",
                        title: "",
                        description: "",
                      })
                  );
                }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputStyle}
                    value={suggestionForm.name}
                    onChange={(e) =>
                      setSuggestionForm({
                        ...suggestionForm,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    className={inputStyle}
                    value={suggestionForm.email}
                    onChange={(e) =>
                      setSuggestionForm({
                        ...suggestionForm,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Suggestion title"
                  className={inputStyle}
                  value={suggestionForm.title}
                  onChange={(e) =>
                    setSuggestionForm({
                      ...suggestionForm,
                      title: e.target.value,
                    })
                  }
                />

                <textarea
                  rows={6}
                  required
                  placeholder="Describe your suggestion..."
                  className={textareaStyle}
                  value={suggestionForm.description}
                  onChange={(e) =>
                    setSuggestionForm({
                      ...suggestionForm,
                      description: e.target.value,
                    })
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-900 hover:bg-cyan-200 text-primary-900 font-bold py-4 rounded-2xl transition duration-300 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Suggestion"}
                </button>
              </form>
            )}

            {/* BUG FORM */}
            {activeTab === "bug" && (
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();

                  submitData(
                    {
                      type: "bug",
                      ...bugForm,
                    },
                    () =>
                      setBugForm({
                        name: "",
                        email: "",
                        bugTitle: "",
                        description: "",
                        stepsToReproduce: "",
                      })
                  );
                }}
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className={inputStyle}
                    value={bugForm.name}
                    onChange={(e) =>
                      setBugForm({
                        ...bugForm,
                        name: e.target.value,
                      })
                    }
                  />

                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    className={inputStyle}
                    value={bugForm.email}
                    onChange={(e) =>
                      setBugForm({
                        ...bugForm,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Bug title"
                  className={inputStyle}
                  value={bugForm.bugTitle}
                  onChange={(e) =>
                    setBugForm({
                      ...bugForm,
                      bugTitle: e.target.value,
                    })
                  }
                />

                <textarea
                  rows={4}
                  required
                  placeholder="Describe the issue..."
                  className={textareaStyle}
                  value={bugForm.description}
                  onChange={(e) =>
                    setBugForm({
                      ...bugForm,
                      description: e.target.value,
                    })
                  }
                />

                <textarea
                  rows={4}
                  placeholder="Steps to reproduce..."
                  className={textareaStyle}
                  value={bugForm.stepsToReproduce}
                  onChange={(e) =>
                    setBugForm({
                      ...bugForm,
                      stepsToReproduce: e.target.value,
                    })
                  }
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-cyan-900 hover:bg-cyan-200 text-primary-900 font-bold py-4 rounded-2xl transition duration-300 disabled:opacity-50"
                >
                  {loading ? "Reporting..." : "Report Bug"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}