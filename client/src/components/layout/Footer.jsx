export default function Footer() {
  return (
    <footer className="bg-primary-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">EduGrow</h3>
            <p className="text-sm text-gray-400">Learn, teach, and grow together</p>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4">Courses</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/courses" className="hover:text-primary-400 transition">
                  Browse Courses
                </a>
              </li>
              <li>
                <a href="/teacher/dashboard" className="hover:text-primary-400 transition">
                  Teach with Us
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/books" className="hover:text-primary-400 transition">
                  Books
                </a>
              </li>
              <li>
                <a href="/jobs" className="hover:text-primary-400 transition">
                  Jobs
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary-400 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-primary-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            © 2026 EduGrow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
