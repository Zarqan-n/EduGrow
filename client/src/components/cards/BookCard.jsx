import { motion } from "framer-motion";
import { BookOpen, IndianRupee, User, Sparkles } from "lucide-react";

export default function BookCard({ book }) {
  const conditionStyles = {
    new: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    "like-new": "bg-blue-100 text-blue-700 border border-blue-200",
    used: "bg-amber-100 text-amber-700 border border-amber-200",
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative glass-card rounded-3xl overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/4] overflow-hidden">
        {book.thumbnail ? (
          <>
            <img
              src={book.thumbnail}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Condition Badge */}
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md shadow-md ${
                  conditionStyles[book.condition] ||
                  "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {book.condition || "Used"}
              </span>
            </div>

            {/* Price Floating */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-lg text-gray-900">
                {book.price}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex flex-col items-center justify-center">
            <BookOpen className="w-16 h-16 text-slate-500 mb-3" />
            <p className="text-slate-600 font-medium">No Image</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-white line-clamp-1 mb-2 transition">
          {book.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-cyan-100/75 line-clamp-2 leading-relaxed mb-4">
          {book.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-teal-100 shadow-sm shrink-0">
              <img
                className="w-full h-full object-cover"
                src={book.userId.profile.avatar}
                alt={book.userId.name}
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-white leading-none">
                {book.userId?.name}
              </p>
              <p className="text-xs text-cyan-100/65 mt-1">Student Seller</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-500">
            <Sparkles className="w-4 h-4 fill-amber-400" />
            <span className="text-xs font-medium text-cyan-100/75">Trusted</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4">
          <button className="flex-1 py-3 rounded-2xl bg-cyan-900 hover:bg-cyan-800 text-white font-semibold transition">
            View Details
          </button>

          <button className="p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition">
            <User className="w-5 h-5 text-cyan-100" />
          </button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 blur-3xl rounded-full" />
      </div>
    </motion.div>
  );
}
