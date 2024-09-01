import React from "react";
import { FaBookReader } from "react-icons/fa";
import Link from "next/link";
import UserButton from "@/components/auth/userButton";

const Header = () => {
  return (
    <header className="px-4 py-3 bg-card shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <FaBookReader className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold">Reader&apos;s Blog</span>
        </Link>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
