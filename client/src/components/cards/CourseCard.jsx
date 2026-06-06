import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Star, Users } from "lucide-react";

export default function CourseCard({
  course,
  ctaPath,
  ctaLabel = "View Course",
}) {
  const detailPath = ctaPath || `/courses/${course._id}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group glass-card rounded-3xl overflow-hidden flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-bold text-primary-900 shadow">
          ₹{course.price}
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
          <Globe size={14} />
          <span>{course.language}</span>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-5">
        <p className="mb-2 text-sm font-medium text-cyan-300">
          By {course.teacherName || course.teacherId?.name || "EduGrow"}
        </p>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">
          {course.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-cyan-100/80">
          {course.description}
        </p>

        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-white">
              {Number(course.avgRating || course.averageRating || 0).toFixed(1)}
            </span>
            <span className="text-xs text-cyan-100/70">
              ({course.totalReviews || course.ratingAndReview?.length || 0})
            </span>
          </div>

          <div className="flex items-center gap-1 text-cyan-100/80">
            <Users size={15} />
            <span className="text-sm">
              {course.enrolledStudentsCount || course.enrolledStudents?.length || 0}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <Link
            to={detailPath}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-900 py-3 font-bold text-white transition hover:bg-cyan-800"
          >
            {ctaLabel}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
