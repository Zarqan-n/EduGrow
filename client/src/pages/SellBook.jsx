import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileUpload from '../components/common/FileUpload'
import { bookService } from '../services/bookService'

export default function SellBook() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'good',
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    setImage(e.target.files?.[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const form = new FormData()
      Object.keys(formData).forEach((key) => form.append(key, formData[key]))
      if (image) form.append('thumbnail', image)

      await bookService.createBook(form)
      navigate('/books')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list book')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 bg-bg-pale rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Book</h1>
        <p className="text-gray-600 mb-8">Fill in the details below to sell your book</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-600"
              >
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="acceptable">Acceptable</option>
              </select>
            </div>
          </div>

          <FileUpload label="Book Cover Image" accept="image/*" onChange={handleImageChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition disabled:opacity-50"
          >
            {loading ? 'Listing...' : 'List Book'}
          </button>
        </form>
      </div>
    </div>
  )
}
