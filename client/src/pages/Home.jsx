import { useState, useEffect } from 'react'
import CourseCard from '../components/cards/CourseCard'
import BookCard from '../components/cards/BookCard'
import JobCard from '../components/cards/JobCard'
import { courseService } from '../services/courseService'
import { bookService } from '../services/bookService'
import { jobService } from '../services/jobService'

export default function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([])
  const [books, setBooks] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [courseRes, bookRes, jobRes] = await Promise.all([
        courseService.searchCourses({ limit: 6 }),
        bookService.getAllBooks({ limit: 6 }),
        jobService.getAllJobs({ limit: 6 }),
      ])
      setFeaturedCourses(courseRes.data.modifiedData || [])
      setBooks(bookRes.data.data || [])
      setJobs(jobRes.data.data || [])
    } catch (error) {
      console.error('Error fetching home data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[6px] text-cyan-400 text-sm font-bold mb-4">Welcome to EduGrow</p>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">Learn, Teach & Grow Together</h1>
            <p className="text-lg text-cyan-100 mb-10 leading-relaxed">
              Join thousands of students and teachers on EduGrow. Access quality courses, find learning resources, explore career opportunities, and build your future.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="/courses" className="px-8 py-4 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl font-bold transition duration-300 transform hover:scale-105">
                Explore Courses
              </a>
              <a href="/signup" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white rounded-2xl font-bold transition duration-300">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gradient-to-b from-primary-900 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="uppercase tracking-[4px] text-cyan-400 text-sm font-bold mb-3">Discover Learning</p>
            <h2 className="text-4xl font-black text-white mb-3">Featured Courses</h2>
            <p className="text-cyan-100">Explore our most popular and trending courses</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-cyan-200">Loading amazing courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <a href="/courses" className="inline-block px-8 py-4 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl font-bold transition duration-300 transform hover:scale-105">
              View All Courses
            </a>
          </div>
        </div>
      </section>

      {/* Latest Books */}
      <section className="py-20 bg-gradient-to-b from-primary-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="uppercase tracking-[4px] text-cyan-400 text-sm font-bold mb-3">Resource Hub</p>
            <h2 className="text-4xl font-black text-white mb-3">Latest Books</h2>
            <p className="text-cyan-100">Discover books shared by our community</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-cyan-200">Loading books...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <a href="/books" className="inline-block px-8 py-4 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl font-bold transition duration-300 transform hover:scale-105">
              Browse All Books
            </a>
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-20 bg-gradient-to-b from-primary-900 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="uppercase tracking-[4px] text-cyan-400 text-sm font-bold mb-3">Career Growth</p>
            <h2 className="text-4xl font-black text-white mb-3">Job Opportunities</h2>
            <p className="text-cyan-100">Explore amazing career paths with top institutions</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-cyan-200">Loading job listings...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <a href="/jobs" className="inline-block px-8 py-4 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl font-bold transition duration-300 transform hover:scale-105">
              View All Jobs
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-cyan-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-lg text-cyan-100 mb-10">Join thousands of learners and teachers building their future on EduGrow</p>
          <a href="/signup" className="inline-block px-10 py-4 bg-white text-cyan-900 rounded-2xl font-bold hover:shadow-2xl transition duration-300 transform hover:scale-105">
            Start Your Journey Now
          </a>
        </div>
      </section>
    </div>
  )
}
