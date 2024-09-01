"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Writer from "@/components/dashboard/writer";
import { FaArrowRight as ArrowRightIcon } from "react-icons/fa";
import type { Blog } from "@/lib/types";

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/blogs");
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
        <article
          key={blog._id}
          className="bg-card rounded-lg shadow overflow-hidden"
        >
          <Image
            src={blog.img || "/placeholder.svg"}
            width={800}
            height={400}
            alt={blog.title}
            className="w-full h-[300px] object-cover"
            style={{ aspectRatio: "800/400", objectFit: "cover" }}
          />
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              by <Writer id={blog?.user || ""} />,
              <div>{new Date(blog.date).toLocaleDateString()}</div>
            </div>
            <h2 className="text-2xl font-bold mt-2">{blog.title}</h2>
            <p className="text-muted-foreground mt-4">{blog.desc}</p>
            <Link
              href={`/blog/${blog._id}`}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline mt-4"
              prefetch={false}
            >
              Read More
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </article>
      ))}
    </main>
  );
}
