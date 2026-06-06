import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from '../components/common/ProtectedRoute'
import RoleProtectedRoute from '../components/common/RoleProtectedRoute'

// Pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import NotFound from '../pages/NotFound'

// Courses
import Courses from '../pages/courses/Courses'
import CourseDetails from '../pages/courses/CourseDetails'
import PaidCourseDetails from '../pages/courses/PaidCourseDetails'

// Books
import Books from '../pages/Books'
import SellBook from '../pages/SellBook'

// Jobs
import Jobs from '../pages/Jobs'

// Student
import StudentDashboard from '../pages/student/Dashboard'
import MyLearning from '../pages/student/MyLearning'

// Teacher
import TeacherDashboard from '../pages/teacher/Dashboard'
import CreateCourse from '../pages/teacher/CreateCourse'
import MyCourses from '../pages/teacher/MyCourses'
import EditCourse from '../pages/teacher/EditCourse'

// Institution
import InstitutionDashboard from '../pages/institution/Dashboard'
import CreateJob from '../pages/institution/CreateJob'
import MyJobs from '../pages/institution/MyJobs'

// User
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'
import Contact from '../pages/Contact'

// Payment
import PaymentSuccess from '../pages/PaymentSuccess'
import PaymentFailed from '../pages/PaymentFailed'

// Layout
import MainLayout from '../layouts/MainLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password/:token',
        element: <ResetPassword />,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      {
        path: 'courses/:id',
        element: <CourseDetails />,
      },
      {
        path: 'paidcourse/:id',
        element: (
          <ProtectedRoute>
            <PaidCourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: 'books',
        element: <Books />,
      },
      {
        path: 'sell-book',
        element: (
          <ProtectedRoute>
            <SellBook />
          </ProtectedRoute>
        ),
      },
      {
        path: 'jobs',
        element: <Jobs />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'student/dashboard',
        element: (
          <RoleProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'student/my-learning',
        element: (
          <RoleProtectedRoute allowedRoles={['student']}>
            <MyLearning />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'teacher/dashboard',
        element: (
          <RoleProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'teacher/create-course',
        element: (
          <RoleProtectedRoute allowedRoles={['teacher']}>
            <CreateCourse />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'teacher/my-courses',
        element: (
          <RoleProtectedRoute allowedRoles={['teacher']}>
            <MyCourses />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'teacher/edit-course/:id',
        element: (
          <RoleProtectedRoute allowedRoles={['teacher']}>
            <EditCourse />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'institution/dashboard',
        element: (
          <RoleProtectedRoute allowedRoles={['institution']}>
            <InstitutionDashboard />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'institution/create-job',
        element: (
          <RoleProtectedRoute allowedRoles={['institution']}>
            <CreateJob />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'institution/my-jobs',
        element: (
          <RoleProtectedRoute allowedRoles={['institution']}>
            <MyJobs />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment/success',
        element: <PaymentSuccess />,
      },
      {
        path: 'payment/failed',
        element: <PaymentFailed />,
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
