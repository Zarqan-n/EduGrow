import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CheckCircle2,
  Clock3,
  Globe,
  GraduationCap,
  IndianRupee,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import ReviewCard from "../../components/cards/ReviewCard";
import { courseService } from "../../services/courseService";
import { userService } from "../../services/userService";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchCourse();
    checkPurchased();
  }, [id, isAuthenticated]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await courseService.getCourseById(id);
      setCourse(response.data.data);
      const reviewsRes = await courseService.getReviews({ courseId: id });
      setReviews(reviewsRes.data.reviews || []);
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkPurchased = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await userService.getMyStudentCourses();
      setPurchased(
        (response.data.modifiedData || []).some((item) => item._id === id),
      );
    } catch (error) {
      console.error("Error checking purchased courses:", error);
    }
  };

  const handleBuyCourse = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await courseService.capturePayment({ courseId: id });
      const order = response.data.order;
      const user = response.data.user;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "EduGrow",
        description: "Course Purchase",
        image: "/logo.png",
        handler: async function (paymentResponse) {
          const res = await courseService.verifyPayment({
            courseId: id,
            ...paymentResponse,
          });
          setPurchased(res.data.success);
          if (res.data.success) navigate(`/paidcourse/${id}`);
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#164E63",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error starting payment:", error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await courseService.addReview({
        courseId: id,
        review: reviewText,
        rating,
      });
      setReviewText("");
      setRating(5);
      fetchCourse();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const averageRating = useMemo(() => {
    if (!course?.ratingAndReview?.length) return "0.0";
    const total = course.ratingAndReview.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    return (total / course.ratingAndReview.length).toFixed(1);
  }, [course]);

  if (loading) {
    return <div className="app-page py-16 text-center">Loading course...</div>;
  }

  if (!course) {
    return <div className="app-page py-16 text-center">Course not found</div>;
  }

  const teacherName = course.teacherId?.name || "EduGrow";

  return (
    <div className="app-page">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <section className="relative overflow-hidden rounded-[32px] shadow-2xl">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-[420px] w-full object-cover md:h-[540px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[5px] text-cyan-300">
                  Course Details
                </p>
                <h1 className="max-w-4xl text-4xl font-black leading-tight text-white md:text-5xl">
                  {course.title}
                </h1>
                <p className="mt-4 max-w-3xl text-cyan-100/85">
                  {course.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { icon: <GraduationCap size={18} />, label: teacherName },
                    { icon: <Globe size={18} />, label: course.language },
                    { icon: <Users size={18} />, label: `${course.enrolledStudents?.length || 0} students` },
                    { icon: <Star size={18} />, label: averageRating },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl"
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-4 grid-cols-2 md:grid-cols-4">
              {[
                { label: "Language", value: course.language, icon: <Globe /> },
                { label: "Schedule", value: course.timing, icon: <Clock3 /> },
                { label: "Duration", value: course.duration, icon: <PlayCircle /> },
                { label: "Reviews", value: course.ratingAndReview?.length || 0, icon: <Star /> },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-3xl p-5">
                  <div className="mb-4 inline-flex rounded-2xl bg-cyan-400/20 p-3 text-cyan-200">
                    {item.icon}
                  </div>
                  <p className="text-sm text-cyan-100/70">{item.label}</p>
                  <h3 className="mt-1 text-lg font-black text-white">
                    {item.value}
                  </h3>
                </div>
              ))}
            </section>

            {course.demoVideo && (
              <section className="glass-panel rounded-[32px] p-6 md:p-8">
                <h2 className="mb-2 text-3xl font-black text-white">
                  Course Preview
                </h2>
                <p className="mb-6 text-cyan-100/75">
                  Watch the demo lecture before enrolling.
                </p>
                <video
                  controls
                  src={course.demoVideo}
                  className="aspect-video w-full rounded-3xl bg-black object-cover"
                />
              </section>
            )}

            <section className="glass-panel rounded-[32px] p-6 md:p-8">
              <h2 className="mb-5 text-3xl font-black text-white">
                About This Course
              </h2>
              <p className="leading-8 text-cyan-100/85">{course.description}</p>
            </section>

            <section className="glass-panel rounded-[32px] p-6 md:p-8">
              <h2 className="mb-6 text-3xl font-black text-white">
                What You Will Learn
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Build real-world projects",
                  "Understand practical workflows",
                  "Learn beginner to advanced concepts",
                  "Practice with instructor-led guidance",
                  "Follow a structured class plan",
                  "Get lifetime access after purchase",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/10 p-4"
                  >
                    <CheckCircle2 className="mt-0.5 text-cyan-300" size={20} />
                    <p className="font-semibold text-cyan-50">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {purchased && (
              <section className="glass-panel rounded-[32px] p-6 md:p-8">
                <h2 className="mb-6 text-3xl font-black text-white">
                  Write a Review
                </h2>
                <form onSubmit={handleAddReview}>
                  <div className="mb-6 flex gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className={`text-4xl transition ${
                          value <= rating
                            ? "scale-110 text-yellow-400"
                            : "text-white/30"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="5"
                    placeholder="Share your learning experience..."
                    className="glass-input resize-none"
                  />
                  <button type="submit" className="primary-button mt-6">
                    Submit Review
                  </button>
                </form>
              </section>
            )}

            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-black text-white">
                  Student Reviews
                </h2>
                <div className="rounded-full border border-yellow-300/20 bg-yellow-400/20 px-5 py-2 font-semibold text-yellow-100">
                  {reviews.length} Reviews
                </div>
              </div>
              <div className="space-y-5">
                {reviews.length === 0 ? (
                  <div className="glass-panel rounded-3xl p-10 text-center text-cyan-100/75">
                    No reviews yet
                  </div>
                ) : (
                  reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))
                )}
              </div>
            </section>
          </div>

          <aside>
            <div className="glass-panel sticky top-24 rounded-[32px] p-8">
              <p className="mb-2 text-cyan-100/70">Course Price</p>
              <div className="mb-8 flex items-center text-5xl font-black text-white">
                <IndianRupee size={40} />
                {course.price}
              </div>

              {purchased ? (
                <button
                  onClick={() => navigate(`/paidcourse/${id}`)}
                  className="primary-button w-full py-5 text-lg"
                >
                  Continue Learning
                </button>
              ) : (
                <button
                  onClick={handleBuyCourse}
                  className="primary-button w-full py-5 text-lg"
                >
                  Buy Course
                </button>
              )}

              <div className="mt-8 space-y-5">
                {[
                  ["Instructor", teacherName],
                  ["Language", course.language],
                  ["Students", course.enrolledStudents?.length || 0],
                  ["Reviews", course.ratingAndReview?.length || 0],
                  ["Rating", averageRating],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between border-b border-white/10 pb-4"
                  >
                    <span className="text-cyan-100/70">{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6">
                <h3 className="mb-4 font-bold text-white">
                  This Course Includes
                </h3>
                <div className="space-y-3 text-sm text-cyan-100/80">
                  <div>✓ Lifetime access</div>
                  <div>✓ Full course workspace</div>
                  <div>✓ Instructor support</div>
                  <div>✓ Practical projects</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
