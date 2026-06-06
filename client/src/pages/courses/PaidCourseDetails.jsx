import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Globe,
  GraduationCap,
  Layers3,
  Lock,
  PlayCircle,
  Star,
  Users,
  Video,
} from "lucide-react";
import { courseService } from "../../services/courseService";



export default function PaidCourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedSection, setExpandedSection] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await courseService.getCourseById(id);
        console.log(response.data.data)
        setCourse(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load this paid course.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const sections = useMemo(() => (course?.section ? course.section : []), [course]);
  const rating = useMemo(() => {
    if (!course?.ratingAndReview?.length) return "0.0";
    const sum = course.ratingAndReview.reduce(
      (total, review) => total + review.rating,
      0,
    );
    return (sum / course.ratingAndReview.length).toFixed(1);
  }, [course]);

  if (loading) {
    return (
      <div className="app-page flex items-center justify-center px-4 py-16">
        <div className="glass-panel rounded-3xl px-8 py-6 text-cyan-100">
          Loading course workspace...
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="app-page flex items-center justify-center px-4 py-16">
        <div className="glass-panel max-w-md rounded-3xl p-8 text-center">
          <Lock className="mx-auto mb-4 text-cyan-300" size={36} />
          <h1 className="mb-3 text-2xl font-black text-white">
            Course unavailable
          </h1>
          <p className="mb-6 text-cyan-100/80">{error || "Course not found."}</p>
          <Link to="/student/my-learning" className="primary-button">
            Back to My Learning
          </Link>
        </div>
      </div>
    );
  }

  const active = sections[expandedSection] || sections[0];

  return (
    <div className="app-page">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[5px] text-cyan-300">
              Paid Course
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-3xl text-cyan-100/85">
              {course.description}
            </p>
          </div>

          <Link to="/student/my-learning" className="ghost-button">
            My Learning
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <div className="glass-panel overflow-hidden rounded-[32px]">
              {course.demoVideo ? (
                <video
                  src={course.demoVideo}
                  controls
                  className="aspect-video w-full bg-black object-cover"
                  poster={course.thumbnail}
                />
              ) : (
                <div className="relative aspect-video overflow-hidden bg-primary-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-white/15 p-5 backdrop-blur-xl">
                      <PlayCircle className="text-white" size={54} />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-400/20 p-3 text-cyan-200">
                    <PlayCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-cyan-200/70">
                      Course preview
                    </p>
                    <h2 className="text-2xl font-black text-white">
                      {course.title}
                    </h2>
                  </div>
                </div>
                <p className="text-cyan-100/80">
                  Watch the course preview to see what you'll learn. Access full course content and {sections.length} detailed sections below.
                </p>
              </div>
            </div>

            <section className="glass-panel rounded-[32px] p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[4px] text-cyan-300">
                    Course Content
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-white">
                    Learning Sections
                  </h2>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-bold text-cyan-100">
                  {sections.length} sections
                </div>
              </div>

              <div className="space-y-3">
                {sections.map((section, index) => (
                  <div
                    key={section._id || index}
                    className="rounded-3xl border border-white/10 overflow-hidden bg-white/5 transition hover:bg-white/10"
                  >
                    <button
                      onClick={() =>
                        setExpandedSection(expandedSection === index ? -1 : index)
                      }
                      className="w-full p-5 text-left flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="rounded-2xl bg-cyan-400/20 p-3 text-cyan-200 flex-shrink-0">
                          <Video size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-white truncate">
                            {section.topic}
                          </h3>
                          <p className="text-sm text-cyan-100/70 mt-1">
                            {section.duration}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-cyan-300 flex-shrink-0 transition transform ${
                          expandedSection === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedSection === index && (
                      <div className="border-t border-white/10 bg-white/5 p-5">
                        {section.videoUrl ? (
                          <div className="space-y-4">
                            <div className="rounded-2xl overflow-hidden bg-black">
                              <video
                                src={section.videoUrl}
                                controls
                                className="aspect-video w-full object-cover"
                              />
                            </div>
                            <div className="flex items-center gap-3 text-sm text-cyan-100/80">
                              <CheckCircle2 size={18} className="text-green-400" />
                              <span>Video content for this section</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-cyan-100/70">
                            No video available for this section
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: <FileText size={22} />,
                  title: "Notes",
                  text: "Review the lesson summary after each section.",
                },
                {
                  icon: <BookOpen size={22} />,
                  title: "Practice",
                  text: "Use the class plan to repeat important concepts.",
                },
                {
                  icon: <CheckCircle2 size={22} />,
                  title: "Progress",
                  text: "Complete every section before your final review.",
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-3xl p-5">
                  <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/20 p-3 text-cyan-200">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 font-black text-white">{item.title}</h3>
                  <p className="text-sm text-cyan-100/75">{item.text}</p>
                </div>
              ))}
            </section>
          </div>

          <aside className="space-y-6">
            <div className="glass-panel sticky top-24 rounded-[32px] p-6">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="mb-6 aspect-video w-full rounded-3xl object-cover"
              />

              <div className="space-y-4">
                {[
                  {
                    label: "Instructor",
                    value: course.teacherId?.name || "EduGrow",
                    icon: <GraduationCap size={20} />,
                  },
                  {
                    label: "Language",
                    value: course.language,
                    icon: <Globe size={20} />,
                  },
                  {
                    label: "Schedule",
                    value: course.timing,
                    icon: <Clock3 size={20} />,
                  },
                  {
                    label: "Students",
                    value: course.enrolledStudents?.length || 0,
                    icon: <Users size={20} />,
                  },
                  {
                    label: "Rating",
                    value: rating,
                    icon: <Star size={20} />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
                  >
                    <div className="flex items-center gap-3 text-cyan-100/75">
                      <span className="text-cyan-300">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-cyan-300/15 p-5">
                <p className="text-sm text-cyan-100/75">Included access</p>
                <h3 className="mt-1 text-2xl font-black text-white">
                  Full course unlocked
                </h3>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
