# Frontend Documentation - Next.js Blogging Application

## Table of Contents

1. [Frontend Overview](#frontend-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [File Structure](#file-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Configuration](#configuration)
7. [Pages and Routing](#pages-and-routing)
8. [Components](#components)
9. [State Management](#state-management)
10. [API Integration](#api-integration)
11. [Styling and UI](#styling-and-ui)
12. [Forms and Validation](#forms-and-validation)
13. [TypeScript Integration](#typescript-integration)
14. [Performance Optimization](#performance-optimization)
15. [Deployment](#deployment)
16. [Best Practices](#best-practices)
17. [Troubleshooting](#troubleshooting)

## Frontend Overview

The frontend is built with Next.js 14 using the App Router, TypeScript, and Tailwind CSS. It provides a modern, responsive interface for a blogging platform with user authentication, blog management, and a clean reading experience.

### Key Features

- **Server-Side Rendering (SSR)** with Next.js App Router
- **TypeScript** for type safety
- **Responsive Design** using Tailwind CSS
- **Component Library** with shadcn/ui
- **Form Handling** with React Hook Form and Zod validation
- **Toast Notifications** for user feedback
- **Client-Side Routing** with Next.js navigation
- **Image Optimization** with Next.js Image component

## Technology Stack

### Core Technologies

- **Next.js 14**: React framework with App Router
- **React 18**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework

### UI and Styling

- **shadcn/ui**: Modern React component library
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Beautiful & consistent icons
- **React Icons**: Popular icon libraries
- **Tailwind CSS Animate**: Animation utilities

### Form Management

- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Validation library resolvers

### HTTP and State

- **Axios**: Promise-based HTTP client
- **React Hooks**: Built-in state management
- **localStorage**: Client-side storage for user sessions

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Tailwind CSS IntelliSense**: VS Code extension support

## Project Architecture

### App Router Structure

```
src/app/
├── layout.tsx          # Root layout (wrapper for all pages)
├── page.tsx            # Homepage (/)
├── globals.css         # Global styles
├── not-found.tsx       # 404 page
├── blog/
│   └── [id]/
│       └── page.tsx    # Dynamic blog detail page (/blog/[id])
└── dashboard/
    └── page.tsx        # User dashboard (/dashboard)
```

### Component Architecture

```
src/components/
├── ui/                 # shadcn/ui base components
├── auth/               # Authentication-related components
├── dashboard/          # Dashboard-specific components
├── header.tsx          # Global header
└── footer.tsx          # Global footer
```

### Data Flow

1. **User Interaction** → Component state changes
2. **API Calls** → Axios requests to backend
3. **State Updates** → React re-renders
4. **UI Updates** → User sees changes

## File Structure

```
client/
├── public/                          # Static assets
│   ├── next.svg                     # Next.js logo
│   └── vercel.svg                   # Vercel logo
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout component
│   │   ├── page.tsx                 # Homepage component
│   │   ├── globals.css              # Global CSS styles
│   │   ├── not-found.tsx            # 404 error page
│   │   ├── blog/
│   │   │   └── [id]/
│   │   │       └── page.tsx         # Individual blog post page
│   │   └── dashboard/
│   │       └── page.tsx             # User dashboard page
│   ├── components/                  # Reusable React components
│   │   ├── header.tsx               # Site header with navigation
│   │   ├── footer.tsx               # Site footer
│   │   ├── auth/                    # Authentication components
│   │   │   ├── signIn.tsx           # Login/Register modal
│   │   │   └── userButton.tsx       # User profile dropdown
│   │   ├── dashboard/               # Dashboard components
│   │   │   ├── add-blog.tsx         # Create new blog form
│   │   │   ├── edit-blog.tsx        # Edit existing blog form
│   │   │   └── writer.tsx           # Display author name
│   │   └── ui/                      # shadcn/ui components
│   │       ├── avatar.tsx           # User avatar component
│   │       ├── button.tsx           # Button component
│   │       ├── card.tsx             # Card component
│   │       ├── dialog.tsx           # Modal dialog component
│   │       ├── dropdown-menu.tsx    # Dropdown menu component
│   │       ├── form.tsx             # Form components
│   │       ├── input.tsx            # Input field component
│   │       ├── label.tsx            # Label component
│   │       ├── pagination.tsx       # Pagination component
│   │       ├── sonner.tsx           # Toast notification component
│   │       └── textarea.tsx         # Textarea component
│   └── lib/                         # Utility functions and types
│       ├── types.ts                 # TypeScript type definitions
│       └── utils.ts                 # Utility functions
├── components.json                  # shadcn/ui configuration
├── next-env.d.ts                    # Next.js TypeScript definitions
├── next.config.mjs                  # Next.js configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.mjs               # PostCSS configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

## Setup and Installation

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Basic knowledge of React and TypeScript

### Installation Steps

1. **Navigate to client directory**:

```bash
cd client
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start development server**:

```bash
npm run dev
```

4. **Open browser**:
   Navigate to `http://localhost:3000`

### Available Scripts

```json
{
  "scripts": {
    "dev": "next dev", // Start development server
    "build": "next build", // Build for production
    "start": "next start", // Start production server
    "lint": "next lint" // Run ESLint
  }
}
```

## Configuration

### Next.js Configuration (`next.config.mjs`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

### Tailwind CSS Configuration (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color scheme
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... more colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### TypeScript Configuration (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Pages and Routing

### App Router Structure

Next.js 14 uses the App Router for file-based routing:

#### 1. Root Layout (`src/app/layout.tsx`)

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reader's Blog",
  description: "A modern blogging platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
```

**Features:**

- Global layout wrapper for all pages
- Font optimization with Google Fonts
- Global components (Header, Footer, Toaster)
- SEO metadata configuration

#### 2. Homepage (`src/app/page.tsx`)

```typescript
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import type { Blog } from "@/lib/types";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          "https://mern-blogging-website-using-nextjs.onrender.com/api/blogs"
        );
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="container mx-auto grid py-4 space-y-4">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </main>
  );
}
```

**Features:**

- Displays all blog posts
- API integration with useEffect
- Responsive grid layout
- Blog card components

#### 3. Dynamic Blog Page (`src/app/blog/[id]/page.tsx`)

```typescript
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import type { Blog } from "@/lib/types";

export default function BlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch blog data and handle edit/delete

  return (
    <main className="container mx-auto">
      {/* Blog content display */}
      {/* Edit/Delete buttons for blog owner */}
    </main>
  );
}
```

**Features:**

- Dynamic routing with `[id]` parameter
- Individual blog post display
- Owner-only edit/delete functionality
- Back navigation

#### 4. Dashboard Page (`src/app/dashboard/page.tsx`)

```typescript
"use client";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Check authentication
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/";
      return;
    }

    // Fetch user's blogs
  }, []);

  return (
    <main className="container mx-auto">
      {/* User's blog management interface */}
    </main>
  );
}
```

**Features:**

- Protected route (authentication required)
- User's personal blog management
- Create new blog functionality
- Blog listing with management options

## Components

### Authentication Components

#### 1. Sign In Component (`src/components/auth/signIn.tsx`)

```typescript
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const SignIn = ({ setUserId, setUserName }: AuthProps) => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Handle login logic
  }

  return <Dialog>{/* Login form with validation */}</Dialog>;
};
```

**Features:**

- Dual login/register forms
- Zod schema validation
- React Hook Form integration
- Toast notifications
- Local storage session management

#### 2. User Button Component (`src/components/auth/userButton.tsx`)

```typescript
"use client";

const UserButton = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage for user session
  }, []);

  if (userId) {
    return <DropdownMenu>{/* User profile dropdown */}</DropdownMenu>;
  }

  return <SignIn setUserId={setUserId} setUserName={setUserName} />;
};
```

**Features:**

- Conditional rendering based on auth state
- User profile dropdown
- Session management
- Sign out functionality

### Dashboard Components

#### 1. Add Blog Component (`src/components/dashboard/add-blog.tsx`)

```typescript
const AddBlog = ({ setBlogs }: { setBlogs: any }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: BlogFormData) {
    // Create new blog post
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Blog creation form */}
    </Dialog>
  );
};
```

**Features:**

- Modal dialog form
- Form validation with Zod
- Image URL input
- Real-time state updates

#### 2. Edit Blog Component (`src/components/dashboard/edit-blog.tsx`)

```typescript
const EditBlog = ({ id, setBlog }: EditBlogProps) => {
  // Similar structure to AddBlog but for editing

  async function onSubmit(values: EditFormData) {
    // Update existing blog post
  }

  return <Dialog>{/* Blog editing form */}</Dialog>;
};
```

**Features:**

- Pre-populated form with existing data
- Update functionality
- Optimistic UI updates

#### 3. Writer Component (`src/components/dashboard/writer.tsx`)

```typescript
const Writer = ({ id }: { id: string }) => {
  const [writer, setWriter] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user information by ID
  }, [id]);

  return <>{writer?.name}</>;
};
```

**Features:**

- Fetch and display author name
- API integration
- Simple display component

### Layout Components

#### 1. Header Component (`src/components/header.tsx`)

```typescript
const Header = () => {
  return (
    <header className="px-4 py-3 bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <FaBookReader className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold">Reader's Blog</span>
        </Link>
        <UserButton />
      </div>
    </header>
  );
};
```

**Features:**

- Responsive navigation
- Brand logo and title
- User authentication state
- Clean, modern design

#### 2. Footer Component (`src/components/footer.tsx`)

```typescript
const Footer = () => {
  return (
    <footer className="bg-card py-4 mt-auto">{/* Footer content */}</footer>
  );
};
```

## State Management

### Local Component State

```typescript
// Using useState for component-level state
const [blogs, setBlogs] = useState<Blog[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Session Management

```typescript
// localStorage for user sessions
useEffect(() => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  if (userId) {
    setUserId(userId);
    setUserName(userName);
  }
}, []);

// Setting user session
localStorage.setItem("userId", user._id);
localStorage.setItem("userName", user.name);

// Clearing session
localStorage.removeItem("userId");
localStorage.removeItem("userName");
```

### Form State

```typescript
// React Hook Form for form state
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    title: "",
    desc: "",
    image: "",
  },
});
```

## API Integration

### Axios Configuration

```typescript
import axios from "axios";

// Base API URL (can be environment variable)
const API_URL = "https://mern-blogging-website-using-nextjs.onrender.com/api";

// Example API calls
const fetchBlogs = async () => {
  try {
    const res = await axios.get(`${API_URL}/blogs`);
    return res.data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

const createBlog = async (blogData: BlogData) => {
  try {
    const res = await axios.post(`${API_URL}/blogs/add`, blogData);
    return res.data.blog;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};
```

### Error Handling

```typescript
const handleAPICall = async () => {
  try {
    setLoading(true);
    const data = await apiFunction();
    setData(data);
    toast.success("Operation successful");
  } catch (error) {
    console.error(error);
    toast.error("Operation failed");
  } finally {
    setLoading(false);
  }
};
```

## Styling and UI

### Tailwind CSS Usage

#### Responsive Design

```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid layout */}
</div>

<div className="hidden md:inline-flex">
  {/* Hide on mobile, show on desktop */}
</div>
```

#### Component Styling

```tsx
<article className="bg-card rounded-lg shadow overflow-hidden">
  <Image className="w-full h-[300px] object-cover" />
  <div className="p-6">
    <h2 className="text-2xl font-bold mt-2">{title}</h2>
    <p className="text-muted-foreground mt-4">{description}</p>
  </div>
</article>
```

### shadcn/ui Integration

#### Button Component

```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline" size="sm">
  Click me
</Button>

<Button variant="destructive">
  Delete
</Button>
```

#### Dialog Component

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>;
```

### CSS Custom Properties

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... more custom properties */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... dark mode colors */
  }
}
```

## Forms and Validation

### React Hook Form Setup

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define schema
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name must be at least 3 characters"),
});

type FormData = z.infer<typeof schema>;

// Use in component
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    email: "",
    password: "",
    name: "",
  },
});
```

### Form Components

```tsx
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>;
```

### Validation Schemas

```typescript
// Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Registration schema
const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// Blog schema
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Must be a valid URL"),
});
```

## TypeScript Integration

### Type Definitions (`src/lib/types.ts`)

```typescript
// Core entity types
type Blog = {
  _id: string;
  title: string;
  desc: string;
  img: string;
  user: string;
  date: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

// Component prop types
interface AuthProps {
  setUserId: (id: string | null) => void;
  setUserName: (name: string | null) => void;
}

interface BlogCardProps {
  blog: Blog;
}

interface EditBlogProps {
  id: string;
  setBlog: (blog: Blog) => void;
}

// API response types
interface BlogsResponse {
  blogs: Blog[];
}

interface UserResponse {
  user: User;
}

export type { Blog, User, AuthProps, BlogCardProps, EditBlogProps };
```

### Component TypeScript Examples

```typescript
// Functional component with props
interface ComponentProps {
  title: string;
  children: React.ReactNode;
  optional?: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({
  title,
  children,
  optional = false,
}) => {
  const [state, setState] = useState<string>("");

  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

// Event handlers
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

## Performance Optimization

### Next.js Image Optimization

```tsx
import Image from "next/image";

<Image
  src={blog.img || "/placeholder.svg"}
  width={800}
  height={400}
  alt={blog.title}
  className="w-full h-[300px] object-cover"
  priority // For above-the-fold images
  placeholder="blur" // Optional blur placeholder
  blurDataURL="data:image/..." // Base64 blur data
/>;
```

### Code Splitting and Dynamic Imports

```typescript
// Dynamic component loading
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("@/components/heavy-component"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
});
```

### Lazy Loading

```typescript
// React lazy loading
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

### Memoization

```typescript
import { useMemo, useCallback } from "react";

const MyComponent = ({ data, onSelect }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map((item) => expensiveOperation(item));
  }, [data]);

  // Memoize callbacks
  const handleClick = useCallback(
    (id: string) => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <div>
      {processedData.map((item) => (
        <Item key={item.id} onClick={() => handleClick(item.id)} />
      ))}
    </div>
  );
};
```

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**:

   - Push code to GitHub/GitLab/Bitbucket
   - Connect repository to Vercel

2. **Environment Variables**:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

3. **Build Configuration**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

### Netlify Deployment

1. **Build Settings**:

   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Next.js Configuration**:

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // For static export if needed
  trailingSlash: true,
  images: {
    unoptimized: true, // For static export
  },
};

export default nextConfig;
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

## Best Practices

### Code Organization

```typescript
// Group related imports
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

// Third-party imports
import axios from "axios";
import { toast } from "sonner";

// UI component imports
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Local component imports
import Header from "@/components/header";

// Type imports
import type { Blog, User } from "@/lib/types";
```

### Component Structure

```typescript
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. State declarations
// 5. Effects
// 6. Event handlers
// 7. Render

interface ComponentProps {
  // Props definition
}

const MyComponent: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Side effects
  }, []);

  // Event handlers
  const handleEvent = useCallback(() => {
    // Event handling logic
  }, []);

  // Early returns
  if (!data) return <Loading />;

  // Main render
  return <div>{/* JSX */}</div>;
};

export default MyComponent;
```

### Error Handling

```typescript
// API error handling
const fetchData = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await axios.get("/api/data");
    setData(response.data);
  } catch (error) {
    const message = error.response?.data?.message || "An error occurred";
    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};

// Error boundaries
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### Accessibility

```tsx
// Semantic HTML
<main role="main">
  <article>
    <h1>Blog Title</h1>
    <p>Content...</p>
  </article>
</main>

// ARIA labels
<button
  aria-label="Delete blog post"
  onClick={handleDelete}
>
  <TrashIcon />
</button>

// Form accessibility
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!errors.email}
/>
{errors.email && (
  <span id="email-error" role="alert">
    {errors.email.message}
  </span>
)}
```

### SEO Optimization

```typescript
// Page metadata
export const metadata: Metadata = {
  title: "Blog Title | Reader's Blog",
  description: "Blog description for SEO",
  keywords: "blog, nextjs, react",
  openGraph: {
    title: "Blog Title",
    description: "Blog description",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Title",
    description: "Blog description",
    images: ["/twitter-image.jpg"],
  },
};

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const blog = await fetchBlog(params.id);

  return {
    title: blog.title,
    description: blog.desc.substring(0, 160),
  };
}
```

## Troubleshooting

### Common Issues and Solutions

#### 1. **Hydration Mismatch**

```typescript
// Problem: Server and client render differently
// Solution: Use useEffect for client-only code
useEffect(() => {
  setIsClient(true);
}, []);

if (!isClient) return null;
```

#### 2. **localStorage is not defined**

```typescript
// Problem: localStorage accessed during SSR
// Solution: Check if window exists
const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId");
  }
  return null;
};
```

#### 3. **API Calls Failing**

```typescript
// Debug API calls
const apiCall = async () => {
  try {
    console.log("Making API call to:", url);
    const response = await axios.get(url);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};
```

#### 4. **Image Loading Issues**

```tsx
// Handle broken images
<Image
  src={src}
  alt={alt}
  onError={(e) => {
    e.currentTarget.src = "/fallback-image.jpg";
  }}
/>
```

#### 5. **Form Validation Not Working**

```typescript
// Ensure schema matches form fields
const schema = z.object({
  // Make sure field names match exactly
  email: z.string().email(),
  password: z.string().min(6),
});

// Check resolver setup
const form = useForm({
  resolver: zodResolver(schema), // Ensure this is correct
  defaultValues: {
    email: "", // Must match schema
    password: "", // Must match schema
  },
});
```

### Debugging Tools

#### React Developer Tools

- Install React DevTools browser extension
- Inspect component state and props
- Profile component performance

#### Next.js Debugging

```javascript
// next.config.mjs
const nextConfig = {
  // Enable source maps in production
  productionBrowserSourceMaps: true,

  // Webpack configuration for debugging
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.devtool = "source-map";
    }
    return config;
  },
};
```

#### Network Debugging

```typescript
// Axios interceptors for debugging
axios.interceptors.request.use((request) => {
  console.log("Starting Request:", request);
  return request;
});

axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log("Response Error:", error);
    return Promise.reject(error);
  }
);
```

This comprehensive frontend documentation provides everything needed to understand, develop, and maintain the Next.js blogging application frontend. Each section includes practical examples and real-world usage patterns specific to this project.
