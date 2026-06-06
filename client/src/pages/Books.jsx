import { useState, useEffect } from 'react'
import BookCard from '../components/cards/BookCard'
import { bookService } from '../services/bookService'
import { ChevronDown } from 'lucide-react'

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    condition: '',
  })
  const ITEMS_PER_PAGE = 12

  useEffect(() => {
    setPage(1)
    setBooks([])
    fetchBooks(1)
  }, [filters])

  const fetchBooks = async (pageNum) => {
    try {
      pageNum === 1 ? setLoading(true) : setLoadingMore(true)
      const skip = (pageNum - 1) * ITEMS_PER_PAGE
      const params = {
        condition: filters.condition,
        skip,
        limit: ITEMS_PER_PAGE,
      }
      if (filters.search) params.title = filters.search
      const response = await bookService.getAllBooks(params)
      const newBooks = response.data.data || []
      
      if (pageNum === 1) {
        setBooks(newBooks)
      } else {
        setBooks(prev => [...prev, ...newBooks])
      }
      
      setHasMore(newBooks.length === ITEMS_PER_PAGE)
      setPage(pageNum)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      pageNum === 1 ? setLoading(false) : setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    fetchBooks(page + 1)
  }

  return (
    <div className="app-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="uppercase tracking-[4px] text-cyan-300 text-xs font-bold mb-3">
            Resource Hub
          </p>
          <h1 className="text-4xl font-black text-white">Buy & Sell Books</h1>
        </div>

        {/* Filters */}
        <div className="glass-panel rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search books..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="glass-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-cyan-300 mb-2">Condition</label>
            <select
              value={filters.condition}
              onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
              className="glass-input"
            >
              <option value="" className="bg-primary-900">All Conditions</option>
              <option value="new" className="bg-primary-900">New</option>
              <option value="like-new" className="bg-primary-900">Like New</option>
              <option value="good" className="bg-primary-900">Good</option>
              <option value="acceptable" className="bg-primary-900">Acceptable</option>
            </select>
          </div>

          <div className="flex items-end">
            <a href="/sell-book" className="primary-button w-full">
              Sell a Book
            </a>
          </div>
        </div>

        {/* Results Count */}
        {!loading && books.length > 0 && (
          <p className="text-sm text-cyan-300 font-semibold mb-4">
            Showing {books.length} book{books.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Books Grid */}
        {loading ? (
          <div className="text-center py-12 text-cyan-100">Loading books...</div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 text-cyan-100">No books found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-cyan-900 hover:bg-cyan-800 disabled:bg-cyan-900/50 text-white rounded-2xl font-bold transition flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Loading more...
                    </>
                  ) : (
                    <>
                      Load More Books
                      <ChevronDown size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
