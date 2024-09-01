import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-6">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          &copy; 2024 Reader&apos;s Blog. All rights reserved.
        </p>
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="https://github.com/PrimeOnPeaSea"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/parthsingh-sde/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:parth.singh1023@gmail.com"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Email
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
