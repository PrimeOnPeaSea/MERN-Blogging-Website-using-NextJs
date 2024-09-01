"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const SignIn = ({
  setUserId,
  setUserName,
}: {
  setUserId: any;
  setUserName: any;
}) => {
  // 1. Define your form.
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onLoginFormSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    const res = await axios
      .post(
        "https://mern-blogging-website-using-nextjs.onrender.com/api/users/login",
        {
          email,
          password,
        }
      )
      .catch((err) => console.log(err));
    if (res) {
      res.data.user._id && localStorage.setItem("userId", res.data.user._id);
      res.data.user.name &&
        localStorage.setItem("userName", res.data.user.name);
      setUserId(res.data.user._id);
      setUserName(res.data.user.name);
      toast.success("Login successful");
    } else {
      toast.error("Login failed");
    }
  }

  // 1. Define your form.
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onRegisterFormSubmit(values: z.infer<typeof registerSchema>) {
    const { name, email, password } = values;
    const res = await axios
      .post(
        "https://mern-blogging-website-using-nextjs.onrender.com/api/users/signup",
        {
          name,
          email,
          password,
        }
      )
      .catch((err) => console.log(err));
    if (res) {
      res.data.user._id && localStorage.setItem("userId", res.data.user._id);
      res.data.user.name &&
        localStorage.setItem("userName", res.data.user.name);
      setUserId(res.data.user._id);
      setUserName(res.data.user.name);
      toast.success("Registration successful");
    } else {
      toast.error("Registration failed");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="hidden md:inline-flex">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <div className="text-center flex gap-1">
          <p>Don&apos;t have an account?</p>
          <Dialog>
            <DialogTrigger>Sign Up</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sign Up</DialogTitle>
              </DialogHeader>

              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterFormSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
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
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}
            className="space-y-8"
          >
            <FormField
              control={loginForm.control}
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
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
