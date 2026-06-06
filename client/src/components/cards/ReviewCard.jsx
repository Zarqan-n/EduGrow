export default function ReviewCard({ review }) {
  return (
    <div className="group bg-white border border-gray-200 hover:border-teal-400/40 hover:shadow-xl transition-all duration-300 rounded-2xl p-5 flex flex-col md:flex-row gap-5 justify-between">
      
      {/* Left Section */}
      <div className="flex items-start gap-4 flex-1">
        
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-100 shadow-sm shrink-0">
          <img
            className="w-full h-full object-cover"
            src={review.profile.avatar}
            alt={review.profile.name}
          />
        </div>

        {/* Name + Review */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">
              {review.profile.name}
            </h3>

            {/* Rating Badge */}
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200">
              <span className="text-sm font-medium text-yellow-700">
                {review.rating}.0
              </span>

              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          {/* Review Text */}
          <p className="text-gray-600 leading-relaxed text-sm md:text-base mt-1">
            “{review.review}”
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 min-w-fit">
        
        {/* Date */}
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <p className="text-xs font-medium text-gray-600">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Optional Verified Badge */}
        <div className="flex items-center gap-1 text-teal-600 text-sm font-medium">
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.414l2.543 2.543 6.543-6.543a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>

          <span>Verified</span>
        </div>
      </div>
    </div>
  );
}