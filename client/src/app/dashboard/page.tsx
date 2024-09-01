"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";
import AddBlog from "@/components/dashboard/add-blog";
import type { Blog } from "@/lib/types";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId === null) {
      window.location.href = "/";
    }
    const asyncFn = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/blogs/user/${userId}`
        );
        setBlogs(res.data.user.blogs);
      } catch (error) {
        console.error(error);
      }
    };
    asyncFn();
  }, []);

  return (
    <main className="container mx-auto mt-10 min-h-[80dvh]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">My Blog Posts</h3>
            <AddBlog setBlogs={setBlogs} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold">{blog.title}</h4>
          <p className="text-muted-foreground text-sm">
            {blog.date && new Date(blog.date).toDateString()}
          </p>
        </div>
        <Link
          href={`/blog/${blog._id}`}
          className="text-primary"
          prefetch={false}
        >
          <Button variant="outline">Read more</Button>
        </Link>
      </div>
      <p className="text-muted-foreground mt-2">
        {blog?.desc?.slice(0, 125)}...
      </p>
    </Card>
  );
};

export default Dashboard;
