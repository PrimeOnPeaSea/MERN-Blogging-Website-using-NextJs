# MERN Blogging Website - Complete Application Documentation

## Table of Contents

1. [Application Overview](#application-overview)
2. [Technology Stack](#technology-stack)
3. [Application Architecture](#application-architecture)
4. [Features](#features)
5. [Project Structure](#project-structure)
6. [Installation and Setup](#installation-and-setup)
7. [Environment Configuration](#environment-configuration)
8. [API Endpoints](#api-endpoints)
9. [Database Schema](#database-schema)
10. [Frontend Pages and Components](#frontend-pages-and-components)
11. [Security Features](#security-features)
12. [Deployment](#deployment)
13. [Development Workflow](#development-workflow)
14. [Troubleshooting](#troubleshooting)

## Application Overview

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) blogging application built with Next.js 14 for the frontend and Express.js for the backend. The application allows users to register, login, create, edit, delete, and view blog posts. It features a modern, responsive design using Tailwind CSS and shadcn/ui components.

### Key Capabilities

- User authentication (registration and login)
- Blog post creation, editing, and deletion
- Blog post viewing and listing
- User dashboard for managing personal blogs
- Responsive design for all devices
- Real-time toast notifications
- Image support for blog posts

## Technology Stack

### Frontend

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: React Icons (Lucide, FontAwesome)
- **Notifications**: Sonner (Toast notifications)

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcryptjs for password hashing
- **Development**: Nodemon for auto-restart

### Development Tools

- **Build Tools**: Next.js built-in webpack config
- **Linting**: ESLint with Next.js config
- **Package Management**: npm
- **Development Server**: Next.js dev server & Nodemon

## Application Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   Next.js App   │ ←──────────────→ │  Express.js API │
│   (Frontend)    │                  │   (Backend)     │
└─────────────────┘                  └─────────────────┘
         │                                     │
         │                                     │
         ▼                                     ▼
┌─────────────────┐                  ┌─────────────────┐
│  Browser/Client │                  │  MongoDB Atlas  │
│   Local Storage │                  │   (Database)    │
└─────────────────┘                  └─────────────────┘
```

### Data Flow

1. User interacts with Next.js frontend
2. Frontend makes API calls to Express.js backend
3. Backend processes requests and interacts with MongoDB
4. Database operations return data to backend
5. Backend sends response to frontend
6. Frontend updates UI based on response

## Features

### User Management

- **User Registration**: Create new user accounts with name, email, and password
- **User Login**: Authenticate existing users
- **Session Management**: Client-side session storage using localStorage
- **User Profile**: Display user information in header dropdown

### Blog Management

- **View All Blogs**: Homepage displays all published blogs
- **Create Blog Post**: Authenticated users can create new blog posts
- **Edit Blog Post**: Users can edit their own blog posts
- **Delete Blog Post**: Users can delete their own blog posts
- **View Single Blog**: Detailed view of individual blog posts
- **User Dashboard**: Personal dashboard showing user's own blogs

### UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Theme Support**: Theme system integration
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: User feedback during API operations
- **Form Validation**: Client-side validation with error messages

## Project Structure

```
MERN-Blogging-Website-using-NextJs/
├── client/                          # Frontend Next.js application
│   ├── src/
│   │   ├── app/                     # Next.js App Router pages
│   │   │   ├── layout.tsx           # Root layout component
│   │   │   ├── page.tsx             # Homepage (blog listing)
│   │   │   ├── globals.css          # Global styles
│   │   │   ├── blog/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx     # Dynamic blog detail page
│   │   │   └── dashboard/
│   │   │       └── page.tsx         # User dashboard
│   │   ├── components/              # Reusable React components
│   │   │   ├── header.tsx           # Main navigation header
│   │   │   ├── footer.tsx           # Site footer
│   │   │   ├── auth/                # Authentication components
│   │   │   │   ├── signIn.tsx       # Login/Register forms
│   │   │   │   └── userButton.tsx   # User menu dropdown
│   │   │   ├── dashboard/           # Dashboard-specific components
│   │   │   │   ├── add-blog.tsx     # Create blog form
│   │   │   │   ├── edit-blog.tsx    # Edit blog form
│   │   │   │   └── writer.tsx       # User name display component
│   │   │   └── ui/                  # shadcn/ui components
│   │   └── lib/                     # Utility functions and types
│   │       ├── types.ts             # TypeScript type definitions
│   │       └── utils.ts             # Utility functions
│   ├── package.json                 # Frontend dependencies
│   ├── tailwind.config.ts           # Tailwind CSS configuration
│   ├── next.config.mjs              # Next.js configuration
│   └── tsconfig.json                # TypeScript configuration
├── server/                          # Backend Express.js application
│   ├── config/
│   │   └── db.js                    # MongoDB connection configuration
│   ├── controller/                  # Route handlers/controllers
│   │   ├── user.js                  # User-related operations
│   │   └── blog.js                  # Blog-related operations
│   ├── model/                       # Mongoose models/schemas
│   │   ├── User.js                  # User schema definition
│   │   └── Blog.js                  # Blog schema definition
│   ├── routes/                      # Express.js routes
│   │   ├── user.js                  # User authentication routes
│   │   └── blog.js                  # Blog CRUD routes
│   ├── server.js                    # Main server entry point
│   └── package.json                 # Backend dependencies
├── README.md                        # Project README
└── LICENSE                          # License file
```

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- Git

### Backend Setup

1. **Navigate to server directory**:

```bash
cd server
```

2. **Install dependencies**:

```bash
npm install
```

3. **Configure MongoDB connection**:

   - Update `config/db.js` with your MongoDB connection string
   - Replace the existing connection string with your own

4. **Start the development server**:

```bash
npm start
```

The backend server will start on `http://localhost:5001`

### Frontend Setup

1. **Navigate to client directory**:

```bash
cd client
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm run dev
```

The frontend application will start on `http://localhost:3000`

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the server directory:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env.local` file in the client directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## API Endpoints

### User Routes (`/api/users`)

| Method | Endpoint  | Description       | Request Body                | Response            |
| ------ | --------- | ----------------- | --------------------------- | ------------------- |
| GET    | `/`       | Get all users     | None                        | `{ users: User[] }` |
| POST   | `/signup` | Register new user | `{ name, email, password }` | `{ user: User }`    |
| POST   | `/login`  | Authenticate user | `{ email, password }`       | `{ user: User }`    |

### Blog Routes (`/api/blogs`)

| Method | Endpoint      | Description      | Request Body                 | Response              |
| ------ | ------------- | ---------------- | ---------------------------- | --------------------- |
| GET    | `/`           | Get all blogs    | None                         | `{ blogs: Blog[] }`   |
| POST   | `/add`        | Create new blog  | `{ title, desc, img, user }` | `{ blog: Blog }`      |
| GET    | `/:id`        | Get blog by ID   | None                         | `{ blog: Blog }`      |
| PUT    | `/update/:id` | Update blog      | `{ title, desc }`            | `{ blog: Blog }`      |
| DELETE | `/:id`        | Delete blog      | None                         | `{ message: string }` |
| GET    | `/user/:id`   | Get user's blogs | None                         | `{ user: User }`      |

## Database Schema

### User Schema

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, min: 6),
  blogs: [ObjectId] (references Blog)
}
```

### Blog Schema

```javascript
{
  _id: ObjectId,
  title: String (required),
  desc: String (required),
  img: String (required),
  user: ObjectId (required, references User),
  date: Date (default: Date.now)
}
```

## Frontend Pages and Components

### Pages

1. **Homepage (`/`)**

   - Displays all blog posts
   - Blog cards with title, description, author, and date
   - Navigation to individual blog posts

2. **Blog Detail Page (`/blog/[id]`)**

   - Full blog post view
   - Edit/Delete buttons for blog owner
   - Back navigation to homepage

3. **Dashboard (`/dashboard`)**
   - User's personal blog management
   - List of user's own blogs
   - Create new blog functionality

### Key Components

1. **Header (`components/header.tsx`)**

   - Site branding and navigation
   - User authentication state
   - User dropdown menu

2. **Authentication (`components/auth/`)**

   - Login and registration forms
   - Form validation with Zod
   - User session management

3. **Blog Management (`components/dashboard/`)**
   - Blog creation and editing forms
   - Blog listing components
   - User name display

## Security Features

### Password Security

- Password hashing using bcryptjs
- Minimum password length enforcement
- Secure password comparison

### Input Validation

- Client-side validation using Zod schemas
- Form validation for all user inputs
- Email format validation

### Authentication

- User session management via localStorage
- Protected routes for authenticated users
- User ownership verification for blog operations

### CORS

- Cross-Origin Resource Sharing configured
- Allows frontend-backend communication

## Deployment

### Backend Deployment (Render/Heroku)

1. **Prepare for deployment**:

   - Ensure all environment variables are set
   - Update database connection for production
   - Configure CORS for production URLs

2. **Deploy to Render**:
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Configure environment variables

### Frontend Deployment (Vercel/Netlify)

1. **Update API URLs**:

   - Change API endpoints to production URLs
   - Update environment variables

2. **Deploy to Vercel**:
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Configure environment variables

## Development Workflow

### Adding New Features

1. **Backend Development**:

   - Create/update models in `model/`
   - Add controllers in `controller/`
   - Define routes in `routes/`
   - Test API endpoints

2. **Frontend Development**:
   - Create/update pages in `src/app/`
   - Add components in `src/components/`
   - Update types in `src/lib/types.ts`
   - Style with Tailwind CSS

### Code Standards

1. **TypeScript**:

   - Use proper type definitions
   - Avoid `any` types
   - Define interfaces for API responses

2. **React Best Practices**:

   - Use functional components with hooks
   - Implement proper error handling
   - Use proper component composition

3. **API Development**:
   - Follow RESTful conventions
   - Implement proper error handling
   - Use consistent response formats

## Troubleshooting

### Common Issues

1. **Database Connection Issues**:

   - Verify MongoDB connection string
   - Check network connectivity
   - Ensure MongoDB Atlas IP whitelist

2. **CORS Errors**:

   - Verify CORS configuration in server
   - Check API URL configuration in frontend
   - Ensure proper headers in requests

3. **Authentication Issues**:

   - Check localStorage for user data
   - Verify API endpoints are correct
   - Ensure password hashing is working

4. **Build Issues**:
   - Clear `node_modules` and reinstall
   - Check for TypeScript errors
   - Verify all dependencies are installed

### Performance Optimization

1. **Frontend**:

   - Implement image optimization
   - Use Next.js built-in optimization features
   - Add loading states for better UX

2. **Backend**:

   - Implement database indexing
   - Add request rate limiting
   - Use proper error handling

3. **Database**:
   - Optimize queries with population
   - Use proper indexing strategies
   - Implement data validation

This documentation provides a comprehensive guide for understanding, developing, and maintaining the MERN blogging application. For specific frontend or backend development details, refer to the separate frontend and backend documentation files.
