"use client";

import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import Link from "next/link";
import SignIn from "./signIn";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserButton = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (userId) {
      setUserId(userId);
      setUserName(userName);
    }
  }, []);

  if (userId) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-primary rounded-3xl p-1 flex items-center gap-2 group">
          <Avatar>
            <AvatarFallback>
              {userName?.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-semibold text-white mr-2 group-hover:underline">
            {userName}
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem>
            <DropdownMenuLabel>
              <Link className="flex items-center" href="/dashboard">
                <RiDashboardFill className="mr-2" />
                Dashboard
              </Link>
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("userName");
              setUserId(null);
              setUserName(null);
              window.location.href = "/";
              toast.success("Sign out successful");
            }}
          >
            <DropdownMenuLabel className="flex items-center">
              <FaSignOutAlt className="mr-2" />
              Sign out
            </DropdownMenuLabel>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else return <SignIn setUserId={setUserId} setUserName={setUserName} />;
};

export default UserButton;
