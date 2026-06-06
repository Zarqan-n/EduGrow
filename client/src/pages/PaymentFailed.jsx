export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-cream">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Payment Failed</h1>
        <p className="text-gray-300 mb-8">Something went wrong with your payment. Please try again.</p>
        <div className="space-y-3 px-4">
          <button onClick={() => window.history.back()} className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Try Again
          </button>
          <a href="/courses" className="block px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition">
            Back to Courses
          </a>
        </div>
      </div>
    </div>
  )
}
