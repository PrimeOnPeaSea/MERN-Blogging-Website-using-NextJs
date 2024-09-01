"use client";

import { useState, useEffect } from "react";
import type { Blog } from "@/lib/types";
import { FaArrowAltCircleLeft, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import EditBlog from "@/components/dashboard/edit-blog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import Writer from "@/components/dashboard/writer";

const Blog = ({ params }: { params: { id: string } }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserId(userId);
    }
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/blogs/${params.id}`
        );
        setBlog(res.data.blog);
        console.log(res.data.blog);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [params.id]);

  return (
    <main className="container mx-auto grid min-h-[80dvh] mt-6">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-primary hover:underline text-center flex justify-start items-center gap-2"
        >
          <FaArrowAltCircleLeft className="inline-block h-4 w-4" />
          Back to Home
        </Link>
        {userId === blog?.user && (
          <div className="flex gap-2">
            <EditBlog id={params.id} setBlog={setBlog} />
            <Dialog>
              <DialogTrigger>
                <Button
                  className="text-background hover:underline text-center flex justify-start items-center gap-2"
                  variant="destructive"
                >
                  <FaTrashAlt className="inline-block h-4 w-4" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-end">
                  <Button
                    className="text-background hover:underline text-center flex justify-start items-center gap-2"
                    variant="destructive"
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://localhost:5001/api/blogs/${params.id}`
                        );
                        toast.success("Blog Deleted Successfully!");
                        window.location.href = "/";
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <FaTrashAlt className="inline-block h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <article className="space-y-4">
        <Image
          src={blog?.img || "/placeholder.svg"}
          alt="Featured Image"
          width={800}
          height={400}
          className="aspect-video overflow-hidden rounded-lg object-cover"
        />
        <div className="space-y-2 not-prose">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {blog?.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            by <Writer id={blog?.user || ""} />,
            <time dateTime="2023-08-24">
              {blog?.date && new Date(blog.date).toLocaleDateString()}
            </time>
          </div>
        </div>
        <p>{blog?.desc}</p>
      </article>
    </main>
  );
};

export default Blog;
