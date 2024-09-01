"use client";

import { z } from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RiAddFill } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Blog } from "@/lib/types";

const formSchema = z.object({
  title: z.string(),
  desc: z.string(),
  image: z.string(),
});

const AddBlog = ({ setBlogs }: { setBlogs: any }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, desc, image } = values;
    try {
      const res = await axios
        .post(
          "https://mern-blogging-website-using-nextjs.onrender.com/api/blogs/add",
          {
            title: title,
            desc: desc,
            img: image,
            user: localStorage.getItem("userId"),
          }
        )
        .catch((err) => console.log(err));
      if (res) {
        const blog = res.data.blog;
        setBlogs((prevBlogs: Blog[]) => [...prevBlogs, blog]);
        setOpen(false);
        form.reset();
        toast.success("Blog added successfully");
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <RiAddFill className="mr-2 h-4 w-4" />
          Create New Blog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Blog</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the title of your blog"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the description of your blog"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the image URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlog;
