# Backend Documentation - Express.js Blogging API

## Table of Contents
1. [Backend Overview](#backend-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [File Structure](#file-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Database Configuration](#database-configuration)
7. [Models and Schemas](#models-and-schemas)
8. [Controllers](#controllers)
9. [Routes](#routes)
10. [Middleware](#middleware)
11. [Authentication](#authentication)
12. [API Endpoints](#api-endpoints)
13. [Error Handling](#error-handling)
14. [Security](#security)
15. [Testing](#testing)
16. [Deployment](#deployment)
17. [Best Practices](#best-practices)
18. [Troubleshooting](#troubleshooting)

## Backend Overview

The backend is a RESTful API built with Express.js and MongoDB using Mongoose ODM. It provides authentication services and CRUD operations for a blogging platform. The API handles user registration, login, and blog post management with proper data validation and error handling.

### Key Features
- **RESTful API Design** following HTTP standards
- **MongoDB Integration** with Mongoose ODM
- **User Authentication** with bcryptjs password hashing
- **CRUD Operations** for users and blog posts
- **Data Validation** at the database level
- **CORS Support** for cross-origin requests
- **Error Handling** with consistent response formats
- **Database Relationships** between users and blog posts

## Technology Stack

### Core Technologies
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL document database
- **Mongoose**: MongoDB object modeling for Node.js

### Security and Authentication
- **bcryptjs**: Password hashing library
- **CORS**: Cross-Origin Resource Sharing middleware

### Development Tools
- **Nodemon**: Auto-restart development server
- **npm**: Package management

### Database
- **MongoDB Atlas**: Cloud database service
- **Mongoose**: ODM for MongoDB

## Project Architecture

### MVC Pattern
```
Request → Routes → Controllers → Models → Database
                      ↓
Response ← Controllers ← Models ← Database
```

### Data Flow
1. **Client Request** → Express.js receives HTTP request
2. **Routing** → Route handler determines endpoint
3. **Controller** → Business logic processes request
4. **Model** → Database operations via Mongoose
5. **Response** → JSON response sent back to client

### Database Design
```
Users Collection
├── _id (ObjectId)
├── name (String)
├── email (String, unique)
├── password (String, hashed)
└── blogs (Array of ObjectIds → references Blog)

Blogs Collection
├── _id (ObjectId)
├── title (String)
├── desc (String)
├── img (String)
├── user (ObjectId → references User)
└── date (Date)
```

## File Structure

```
server/
├── config/
│   └── db.js                    # MongoDB connection configuration
├── controller/
│   ├── user.js                  # User-related business logic
│   └── blog.js                  # Blog-related business logic
├── model/
│   ├── User.js                  # User schema and model
│   └── Blog.js                  # Blog schema and model
├── routes/
│   ├── user.js                  # User authentication routes
│   └── blog.js                  # Blog CRUD routes
├── server.js                    # Main application entry point
├── package.json                 # Dependencies and scripts
└── package-lock.json            # Locked dependency versions
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account or local MongoDB installation
- Basic understanding of JavaScript and Node.js

### Installation Steps

1. **Navigate to server directory**:
```bash
cd server
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure database connection**:
   - Update MongoDB connection string in `config/db.js`
   - Replace with your own MongoDB Atlas connection string

4. **Start the development server**:
```bash
npm start
```

The server will start on `http://localhost:5001`

### Package Dependencies

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",       // Password hashing
    "cors": "^2.8.5",           // Cross-origin resource sharing
    "express": "^4.18.1",       // Web framework
    "mongoose": "^6.3.4"        // MongoDB ODM
  },
  "devDependencies": {
    "nodemon": "^2.0.16"        // Development auto-restart
  }
}
```

### Available Scripts

```json
{
  "scripts": {
    "start": "nodemon server.js"  // Start development server with auto-restart
  }
}
```

## Database Configuration

### MongoDB Connection (`config/db.js`)

```javascript
const mongoose = require("mongoose");

// Configure mongoose settings
mongoose.set("strictQuery", false);

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });
```

**Features:**
- **Connection String**: MongoDB Atlas cloud database
- **Error Handling**: Proper connection error handling
- **Configuration**: Mongoose strict query settings

### Environment Variables Setup

Create a `.env` file in the server directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blogdb?retryWrites=true&w=majority

# Server Configuration
PORT=5001
NODE_ENV=development

# Security (for future enhancements)
JWT_SECRET=your_jwt_secret_key
BCRYPT_ROUNDS=12
```

### Updated Database Configuration with Environment Variables

```javascript
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Models and Schemas

### User Model (`model/User.js`)

```javascript
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  blogs: [{ 
    type: mongoose.Types.ObjectId, 
    ref: "Blog", 
    required: true 
  }],
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for performance
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
```

**Features:**
- **Validation**: Built-in field validation
- **Relationships**: References to Blog documents
- **Indexing**: Email field indexed for performance
- **Timestamps**: Automatic creation and update timestamps

### Blog Model (`model/Blog.js`)

```javascript
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"]
  },
  desc: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [5000, "Description cannot exceed 5000 characters"]
  },
  img: {
    type: String,
    required: [true, "Image URL is required"],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: "Please enter a valid image URL"
    }
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User reference is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true
});

// Indexes for performance
blogSchema.index({ user: 1 });
blogSchema.index({ date: -1 });
blogSchema.index({ title: "text", desc: "text" }); // Text search

module.exports = mongoose.model("Blog", blogSchema);
```

**Features:**
- **Validation**: Title, description, and image URL validation
- **Relationships**: Reference to User document
- **Indexing**: Multiple indexes for query optimization
- **Text Search**: Full-text search capability

## Controllers

### User Controller (`controller/user.js`)

```javascript
const User = require("../model/User");
const bcrypt = require("bcryptjs");

// Get all users (admin functionality)
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    
    if (!users || users.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No users found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      count: users.length,
      users 
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// User registration
const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "User already exists with this email" 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      blogs: [],
    });

    const savedUser = await user.save();

    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    return res.status(201).json({ 
      success: true,
      message: "User created successfully",
      user: userResponse 
    });
  } catch (error) {
    console.error("Sign up error:", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// User login
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    // Find user
    const existingUser = await User.findOne({ 
      email: email.toLowerCase().trim() 
    });
    
    if (!existingUser) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Remove password from response
    const userResponse = existingUser.toObject();
    delete userResponse.password;

    return res.status(200).json({ 
      success: true,
      message: "Login successful",
      user: userResponse 
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

module.exports = { getAllUser, signUp, logIn };
```

**Features:**
- **Error Handling**: Comprehensive error handling with try-catch
- **Validation**: Input validation and sanitization
- **Security**: Password hashing with bcryptjs
- **Response Format**: Consistent JSON response structure
- **Password Exclusion**: Passwords never sent in responses

### Blog Controller (`controller/blog.js`)

```javascript
const mongoose = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");

// Get all blogs with pagination
const getAllBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate('user', 'name email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments();

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No blogs found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      count: blogs.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      blogs 
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// Create new blog
const addBlog = async (req, res, next) => {
  try {
    const { title, desc, img, user } = req.body;

    // Validation
    if (!title || !desc || !img || !user) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Verify user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Create blog
    const blog = new Blog({
      _id: new mongoose.Types.ObjectId(),
      title: title.trim(),
      desc: desc.trim(),
      img: img.trim(),
      user,
      date: new Date(),
    });

    // Use transaction for data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const savedBlog = await blog.save({ session });
      existingUser.blogs.push(savedBlog._id);
      await existingUser.save({ session });
      await session.commitTransaction();

      // Populate user data in response
      await savedBlog.populate('user', 'name email');

      return res.status(201).json({ 
        success: true,
        message: "Blog created successfully",
        blog: savedBlog 
      });
    } catch (transactionError) {
      await session.abortTransaction();
      throw transactionError;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Add blog error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// Update blog
const updateBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const { title, desc } = req.body;

    // Validation
    if (!title || !desc) {
      return res.status(400).json({ 
        success: false,
        message: "Title and description are required" 
      });
    }

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { 
        title: title.trim(), 
        desc: desc.trim(),
        updatedAt: new Date()
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('user', 'name email');

    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: "Blog not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: "Blog updated successfully",
      blog 
    });
  } catch (error) {
    console.error("Update blog error:", error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors
      });
    }

    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// Get blog by ID
const getById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid blog ID" 
      });
    }

    const blog = await Blog.findById(id).populate('user', 'name email');

    if (!blog) {
      return res.status(404).json({ 
        success: false,
        message: "Blog not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      blog 
    });
  } catch (error) {
    console.error("Get blog by ID error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// Delete blog
const deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid blog ID" 
      });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const blog = await Blog.findByIdAndDelete(id, { session }).populate("user");

      if (!blog) {
        await session.abortTransaction();
        return res.status(404).json({ 
          success: false,
          message: "Blog not found" 
        });
      }

      // Remove blog from user's blogs array
      const user = blog.user;
      user.blogs.pull(blog._id);
      await user.save({ session });

      await session.commitTransaction();

      return res.status(200).json({ 
        success: true,
        message: "Blog deleted successfully" 
      });
    } catch (transactionError) {
      await session.abortTransaction();
      throw transactionError;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Delete blog error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

// Get blogs by user ID
const getByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid user ID" 
      });
    }

    const userBlogs = await User.findById(userId)
      .populate({
        path: 'blogs',
        options: { sort: { date: -1 } }
      });

    if (!userBlogs) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    return res.status(200).json({ 
      success: true,
      user: userBlogs 
    });
  } catch (error) {
    console.error("Get blogs by user ID error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
};
```

**Features:**
- **Transactions**: Database transactions for data consistency
- **Validation**: Comprehensive input validation
- **Pagination**: Support for paginated blog listing
- **Population**: User data populated in blog responses
- **Error Handling**: Detailed error handling and logging

## Routes

### User Routes (`routes/user.js`)

```javascript
const express = require("express");
const { getAllUser, signUp, logIn } = require("../controller/user");

const userRouter = express.Router();

// Route definitions
userRouter.get("/", getAllUser);           // GET /api/users
userRouter.post("/signup", signUp);        // POST /api/users/signup
userRouter.post("/login", logIn);          // POST /api/users/login

module.exports = userRouter;
```

**Route Documentation:**

| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| GET | `/api/users` | Get all users | None | `{ success, users }` |
| POST | `/api/users/signup` | Register user | `{ name, email, password }` | `{ success, user }` |
| POST | `/api/users/login` | Login user | `{ email, password }` | `{ success, user }` |

### Blog Routes (`routes/blog.js`)

```javascript
const express = require("express");
const blogRouter = express.Router();
const {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
} = require("../controller/blog");

// Route definitions
blogRouter.get("/", getAllBlogs);          // GET /api/blogs
blogRouter.post("/add", addBlog);          // POST /api/blogs/add
blogRouter.put("/update/:id", updateBlog); // PUT /api/blogs/update/:id
blogRouter.get("/:id", getById);           // GET /api/blogs/:id
blogRouter.delete("/:id", deleteBlog);     // DELETE /api/blogs/:id
blogRouter.get("/user/:id", getByUserId);  // GET /api/blogs/user/:id

module.exports = blogRouter;
```

**Route Documentation:**

| Method | Endpoint | Description | Parameters | Body | Response |
|--------|----------|-------------|------------|------|----------|
| GET | `/api/blogs` | Get all blogs | `page`, `limit` | None | `{ success, blogs }` |
| POST | `/api/blogs/add` | Create blog | None | `{ title, desc, img, user }` | `{ success, blog }` |
| GET | `/api/blogs/:id` | Get blog by ID | `id` | None | `{ success, blog }` |
| PUT | `/api/blogs/update/:id` | Update blog | `id` | `{ title, desc }` | `{ success, blog }` |
| DELETE | `/api/blogs/:id` | Delete blog | `id` | None | `{ success, message }` |
| GET | `/api/blogs/user/:id` | Get user's blogs | `id` | None | `{ success, user }` |

## Middleware

### CORS Configuration
```javascript
const cors = require("cors");

// Configure CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",  // Development frontend
    "https://yourdomain.com"  // Production frontend
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### Request Logging Middleware
```javascript
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
};

app.use(requestLogger);
```

### Error Handling Middleware
```javascript
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
};

app.use(errorHandler);
```

## Authentication

### Password Hashing with bcryptjs

```javascript
const bcrypt = require('bcryptjs');

// Hash password during registration
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password during login
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
```

### JWT Authentication (Future Enhancement)

```javascript
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Verify JWT token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};
```

## API Endpoints

### Complete API Reference

#### User Endpoints

**1. Register User**
```http
POST /api/users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "blogs": [],
    "createdAt": "2023-08-01T10:30:00.000Z",
    "updatedAt": "2023-08-01T10:30:00.000Z"
  }
}
```

**2. Login User**
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "blogs": ["60d0fe4f5311236168a109cb"]
  }
}
```

**3. Get All Users**
```http
GET /api/users
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "users": [
    {
      "_id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "email": "john@example.com",
      "blogs": ["60d0fe4f5311236168a109cb"]
    }
  ]
}
```

#### Blog Endpoints

**1. Get All Blogs**
```http
GET /api/blogs?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 50,
  "page": 1,
  "totalPages": 5,
  "blogs": [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "title": "My First Blog",
      "desc": "This is my first blog post...",
      "img": "https://example.com/image.jpg",
      "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "date": "2023-08-01T10:30:00.000Z"
    }
  ]
}
```

**2. Create Blog**
```http
POST /api/blogs/add
Content-Type: application/json

{
  "title": "My New Blog Post",
  "desc": "This is the content of my blog post...",
  "img": "https://example.com/image.jpg",
  "user": "60d0fe4f5311236168a109ca"
}
```

**3. Get Blog by ID**
```http
GET /api/blogs/60d0fe4f5311236168a109cb
```

**4. Update Blog**
```http
PUT /api/blogs/update/60d0fe4f5311236168a109cb
Content-Type: application/json

{
  "title": "Updated Blog Title",
  "desc": "Updated blog content..."
}
```

**5. Delete Blog**
```http
DELETE /api/blogs/60d0fe4f5311236168a109cb
```

**6. Get User's Blogs**
```http
GET /api/blogs/user/60d0fe4f5311236168a109ca
```

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"] // Optional
}
```

### Common Error Codes

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable Entity | Validation errors |
| 500 | Internal Server Error | Server-side error |

### Error Handling Examples

```javascript
// Validation Error
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Name must be at least 2 characters",
    "Please enter a valid email"
  ]
}

// Authentication Error
{
  "success": false,
  "message": "Invalid credentials"
}

// Not Found Error
{
  "success": false,
  "message": "Blog not found"
}

// Server Error
{
  "success": false,
  "message": "Internal server error"
}
```

## Security

### Security Best Practices Implemented

1. **Password Security**
   - Passwords hashed with bcryptjs
   - Salt rounds set to 12 for strong hashing
   - Passwords never returned in API responses

2. **Input Validation**
   - Mongoose schema validation
   - Email format validation
   - Required field validation
   - String length limits

3. **Data Sanitization**
   - Input trimming
   - Email normalization (lowercase)
   - ObjectId validation

4. **CORS Configuration**
   - Specific origin allowlist
   - Credentials support configured

### Additional Security Enhancements (Recommendations)

```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api', limiter);

// Security headers
const helmet = require('helmet');
app.use(helmet());

// Request size limiting
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Input sanitization
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
```

## Testing

### Manual Testing with Postman

**1. Create a Collection**
```json
{
  "info": {
    "name": "Blog API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:5001/api/users/signup",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5001",
          "path": ["api", "users", "signup"]
        }
      }
    }
  ]
}
```

### Unit Testing with Jest (Future Enhancement)

```javascript
// tests/user.test.js
const request = require('supertest');
const app = require('../server');

describe('User Authentication', () => {
  test('Should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe('test@example.com');
  });

  test('Should login existing user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

## Deployment

### Render Deployment

**1. Prepare for Deployment**

Create `render.yaml`:
```yaml
services:
  - type: web
    name: blog-api
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        fromDatabase:
          name: mongodb
          property: connectionString
```

**2. Environment Variables**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogdb
PORT=10000
```

**3. Update server.js for production**
```javascript
const express = require("express");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
require("./config/db");
const cors = require("cors");

const app = express();

// CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com']
    : ['http://localhost:3000'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Catch all handler
app.use("/api", (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Endpoint not found" 
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
USER nodejs

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5001/health || exit 1

# Start application
CMD ["npm", "start"]
```

### Database Migration

```javascript
// scripts/migrate.js
const mongoose = require('mongoose');
require('dotenv').config();

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Create indexes
    await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.db.collection('blogs').createIndex({ user: 1 });
    await mongoose.connection.db.collection('blogs').createIndex({ date: -1 });
    
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrate();
```

## Best Practices

### Code Organization

```javascript
// Project structure best practices
server/
├── config/          # Configuration files
├── controllers/     # Business logic
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── validation/      # Input validation schemas
├── tests/           # Test files
└── scripts/         # Deployment/migration scripts
```

### Database Best Practices

```javascript
// Connection management
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // Disable mongoose buffering
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});
```

### Error Handling Patterns

```javascript
// Async error wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage in controllers
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({ success: true, blogs });
});

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

### Validation Patterns

```javascript
// Joi validation (alternative to Mongoose validation)
const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};
```

### Response Formatting

```javascript
// Response utility
class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  static error(res, message = 'Error', statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    });
  }
}

// Usage in controllers
return ApiResponse.success(res, blogs, 'Blogs retrieved successfully');
return ApiResponse.error(res, 'Blog not found', 404);
```

## Troubleshooting

### Common Issues and Solutions

#### 1. **Database Connection Issues**

**Problem**: Cannot connect to MongoDB
```bash
Error: connection ECONNREFUSED 127.0.0.1:27017
```

**Solutions**:
```javascript
// Check connection string format
const MONGODB_URI = "mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority";

// Add connection error handling
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Check network connectivity
// Verify MongoDB Atlas IP whitelist
// Ensure credentials are correct
```

#### 2. **CORS Errors**

**Problem**: Cross-origin request blocked
```
Access to fetch at 'http://localhost:5001/api/blogs' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution**:
```javascript
// Configure CORS properly
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

#### 3. **Validation Errors**

**Problem**: Data not saving due to validation
```
ValidationError: Path `email` is required.
```

**Solution**:
```javascript
// Debug validation issues
const handleValidationError = (error) => {
  console.log('Validation Error Details:');
  Object.keys(error.errors).forEach(key => {
    console.log(`${key}: ${error.errors[key].message}`);
  });
};

// Add better error messages
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: (email) => /\S+@\S+\.\S+/.test(email),
      message: 'Please enter a valid email address'
    }
  }
});
```

#### 4. **Password Hashing Issues**

**Problem**: Login always fails
```javascript
// Debug password comparison
const debugLogin = async (plainPassword, hashedPassword) => {
  console.log('Plain password:', plainPassword);
  console.log('Hashed password:', hashedPassword);
  console.log('Comparison result:', await bcrypt.compare(plainPassword, hashedPassword));
};

// Ensure consistent hashing
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};
```

#### 5. **Memory Leaks**

**Problem**: Server memory usage increasing over time

**Solutions**:
```javascript
// Proper connection cleanup
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

// Limit connection pool
mongoose.connect(uri, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
});

// Use pagination for large datasets
const getBlogs = async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const skip = (parseInt(req.query.page) || 1 - 1) * limit;
  
  const blogs = await Blog.find()
    .limit(limit)
    .skip(skip)
    .lean(); // Returns plain JavaScript objects
    
  res.json({ blogs });
};
```

#### 6. **Performance Issues**

**Problem**: Slow API responses

**Solutions**:
```javascript
// Add database indexes
blogSchema.index({ user: 1 });
blogSchema.index({ date: -1 });
blogSchema.index({ title: 'text', desc: 'text' });

// Use lean() for read-only operations
const blogs = await Blog.find().lean();

// Implement caching
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

const getCachedBlogs = async () => {
  const cacheKey = 'all_blogs';
  let blogs = cache.get(cacheKey);
  
  if (!blogs) {
    blogs = await Blog.find().lean();
    cache.set(cacheKey, blogs);
  }
  
  return blogs;
};
```

### Debug Tools

#### 1. **MongoDB Compass**
- Visual database browser
- Query performance analysis
- Index management

#### 2. **Postman/Insomnia**
- API testing and debugging
- Request/response inspection
- Environment variables

#### 3. **Node.js Debugging**
```javascript
// Enable debug logging
const debug = require('debug')('app');

debug('Starting server...');
debug('Database connected');

// Use in development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
  });
}
```

#### 4. **Performance Monitoring**
```javascript
// Response time logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

This comprehensive backend documentation provides everything needed to understand, develop, and maintain the Express.js blogging API. It includes practical examples, best practices, and troubleshooting guides specific to this project.
