export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-cream">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-200 mb-2">Page Not Found</h2>
        <p className="text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
          Go Home
        </a>
      </div>
    </div>
  )
}
