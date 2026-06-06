import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  XCircle,
} from "lucide-react";

export default function JobCard({ job, onApply }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden glass-card rounded-3xl"
    >
      <div className="h-2 bg-gradient-to-r from-cyan-400 via-cyan-100 to-primary-700" />

      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-cyan-200 shadow-sm">
              <img
                className="h-full w-full object-cover"
                src={job.userId?.profile?.avatar}
                alt={job.userId?.name || "Institution"}
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{job.title}</h2>
              <div className="mt-1 flex items-center gap-2 text-cyan-100/80">
                <Building2 className="h-4 w-4" />
                <p className="text-sm font-medium">
                  {job.userId?.name || "Unknown Institution"}
                </p>
              </div>
            </div>
          </div>

          {job.isActive ? (
            <div className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Active
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-full border border-red-200 bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
              <XCircle className="h-4 w-4" />
              Closed
            </div>
          )}
        </div>

        <p className="mb-5 line-clamp-2 text-sm font-medium leading-relaxed text-cyan-100/80">
          {job.description}
        </p>

        <div className="mb-5 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-cyan-100/70">
              <IndianRupee className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Salary
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">₹{job.salary}</h3>
            <p className="mt-1 text-xs text-cyan-100/60">Per Month</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-cyan-100/70">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">
                Timing
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{job.timing}</h3>
            <p className="mt-1 text-xs text-cyan-100/60">{job.days}</p>
          </div>
        </div>

        {job.requirements && (
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-cyan-300" />
              <h4 className="text-sm font-semibold text-white">
                Requirements
              </h4>
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-cyan-100/75">
              {job.requirements}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-xs text-cyan-100/55">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </p>

          {onApply && (
            <button
              onClick={() => onApply(job._id)}
              disabled={!job.isActive}
              className={`group/btn flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                job.isActive
                  ? "bg-cyan-900 text-white hover:bg-cyan-800"
                  : "cursor-not-allowed bg-white/10 text-cyan-100/50"
              }`}
            >
              Apply Now
              {job.isActive && (
                <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
