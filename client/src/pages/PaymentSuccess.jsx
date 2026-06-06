export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-cream">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="mx-auto w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Payment Successful!</h1>
        <p className="text-gray-300 mb-8">Your enrollment is confirmed. Start learning now!</p>
        <div className="space-y-3">
          <a href="/student/dashboard" className="block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Go to Dashboard
          </a>
          <a href="/courses" className="block px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition">
            Browse More Courses
          </a>
        </div>
      </div>
    </div>
  )
}
