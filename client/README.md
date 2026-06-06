# EduGrow Frontend

A production-ready React + Vite frontend for the EduGrow learning platform.

## Features

- **Authentication**: Multi-role support (Student, Teacher, Institution)
- **Course Management**: Browse, enroll, and manage courses
- **Book Marketplace**: Buy and sell books within the community
- **Job Board**: Teachers can find opportunities, institutions can post jobs
- **User Profiles**: Manage personal information and preferences
- **Role-Based Access**: Protected routes with role-based authorization
- **Payment Integration**: Ready for Razorpay integration
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **React 18** - UI framework
- **Vite** - Fast build tool
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **Framer Motion** - Animations

## Project Structure

```
src/
├── api/               # API endpoints definitions
├── pages/             # Page components organized by feature
│   ├── courses/
│   ├── student/
│   ├── teacher/
│   └── institution/
├── components/        # Reusable components
│   ├── layout/        # Layout components (Navbar, Footer)
│   ├── common/        # Common components (Modal, Toast, etc)
│   └── cards/         # Card components
├── layouts/           # Page layout wrappers
├── routes/            # Route configuration
├── store/             # Redux store and slices
├── services/          # API service calls
├── hooks/             # Custom React hooks
├── context/           # Context API providers
├── utils/             # Utility functions
├── assets/            # Images and icons
└── features/          # Feature-specific modules
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Configuration

### API Base URL

Update the API base URL in `src/utils/axiosInstance.js`:

```javascript
const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:5000/api',
})
```

### Redux Store

The Redux store is configured in `src/store/index.js` with slices for:
- `auth` - Authentication state
- `courses` - Course management
- `users` - User data
- `books` - Book listings
- `jobs` - Job postings

## Routes Overview

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/forgot-password` - Forgot password
- `/courses` - Browse courses
- `/books` - Browse books
- `/jobs` - Browse jobs

### Protected Routes (Authenticated users)
- `/profile` - User profile
- `/settings` - Settings page

### Student Routes
- `/student/dashboard` - Dashboard
- `/student/my-learning` - My learning progress

### Teacher Routes
- `/teacher/dashboard` - Dashboard
- `/teacher/create-course` - Create course
- `/teacher/my-courses` - My courses
- `/teacher/edit-course/:id` - Edit course

### Institution Routes
- `/institution/dashboard` - Dashboard
- `/institution/create-job` - Post job
- `/institution/my-jobs` - Manage jobs

## Components

### Layout Components
- **Navbar** - Top navigation bar
- **Footer** - Footer section
- **MainLayout** - Main layout wrapper

### Common Components
- **ProtectedRoute** - Route protection for authenticated users
- **RoleProtectedRoute** - Route protection based on user role
- **Loader** - Loading spinner
- **Modal** - Modal dialog
- **Toast** - Toast notification
- **SearchBar** - Search input
- **Pagination** - Pagination controls
- **FileUpload** - File upload input

### Card Components
- **CourseCard** - Course listing card
- **BookCard** - Book listing card
- **JobCard** - Job listing card
- **ReviewCard** - Review display card

## Services

API services are organized by feature:
- `authService` - Authentication APIs
- `courseService` - Course management APIs
- `userService` - User profile APIs
- `bookService` - Book marketplace APIs
- `jobService` - Job posting APIs

## Styling

The project uses Tailwind CSS with custom color configuration:
- **Primary Color**: Sky Blue (#0ea5e9)
- **Secondary Color**: Purple (#a855f7)

Customize colors in `tailwind.config.js`.

## Environment Variables

Create a `.env.local` file:

```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=EduGrow
```

## Production Build

```bash
npm run build
```

The optimized build will be in the `dist` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting by route
- Image lazy loading
- CSS optimization with Tailwind
- Minimal animations for better performance

## Contributing

1. Follow the existing code structure
2. Keep components reusable and focused
3. Use Redux for global state management
4. Use Context API for local state
5. Write clean, readable code
6. Add proper error handling

## License

MIT License
