# API Endpoint Request Fields

This file lists the request fields required to hit each active endpoint in the backend. For protected routes, authentication is required via the app's auth middleware.

Base URL for all routes: `/api`

## Auth Routes

### POST /api/auth/sendotp
- Body: `email`

### POST /api/auth/signup
- Body: `name`, `email`, `password`, `role`, `otp`

### POST /api/auth/login
- Body: `email`, `password`

### POST /api/auth/logout
- No body required
- Auth required

### PUT /api/auth/password
- Body: `password`, `newPassword`, `newConfirmPassword`
- Auth required

### POST /api/auth/reset-password
- Body: `email`

### PUT /api/auth/reset-password/:token
- Params: `token`
- Body: `newPassword`, `newConfirmPassword`

## User Routes

### PUT /api/user/profile
- Body/Form-data: any of `mobile`, `location`, `gender`, `bio`
- File: `avatar` (optional, form-data image upload)
- Auth required

### GET /api/user/profile
- No body required
- Auth required

### GET /api/user/mydata
- No body required
- Auth required

### GET /api/user/getMyTeacherCourse
- No body required
- Auth required, teacher role

### GET /api/user/getMyStudentCourse
- No body required
- Auth required, student role

## Course Routes

### POST /api/course/create
- Body/Form-data: `title`, `description`, `timing`, `days`, `classes`, `price`, `language`
- Files: `thumbnail` (image), `demoVideo` (video)
- Auth required, teacher role

### PUT /api/course/update-details
- Body/Form-data: `courseId` (required)
- Optional: `title`, `description`, `timing`, `days`, `classes`, `price`, `language`
- Files: `thumbnail` (image), `demoVideo` (video) are optional
- Auth required, teacher role

### POST /api/course/ratingandreview
- Body: `courseId`, `rating`, `review`
- Auth required, student role

### GET /api/course/search
- Query: optional `category`, optional `maxPrice`, optional `title`

### GET /api/course/courses
- No body required

### GET /api/course/:id
- Params: `id`

### POST /api/course/capture-payment
- Body: `courseId`
- Auth required, student role

### POST /api/course/verify-payment
- Body: `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`, `courseId`
- Auth required, student role

## Book Routes

### POST /api/book/create
- Body/Form-data: `title`, `description`, `condition`, `price`
- File: `thumbnail` (required image upload)
- Auth required

### DELETE /api/book/delete
- Body: `bookId`
- Auth required

### GET /api/book/books
- No body required

## Job Routes

### POST /api/job/create
- Body: `title`, `description`, `requirements`, `salary`, `timing`, `days`
- Auth required, institution role

### PUT /api/job/change-active
- Body: `jobId`
- Auth required, institution role

### DELETE /api/job/delete
- Body: `jobId`
- Auth required, institution role

### POST /api/job/apply
- Body: `jobId`
- Auth required, teacher role

### GET /api/job/jobs
- No body required

