"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Bell, Menu, User, Settings, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CounsellorMobileSidebar } from "./mobile-sidebar";

export function CounsellorHeader() {
  const [notifications] = useState([
    { id: 1, message: "New student profile - Sarah Johnson", time: "5m ago" },
    {
      id: 2,
      message: "Session completed with feedback pending",
      time: "1h ago",
    },
    {
      id: 3,
      message: "Earnings update: Rs. 4,500 added this week",
      time: "2h ago",
    },
  ]);

  return (
    <header
      className="h-16 flex items-center justify-between px-4 lg:px-6"
      style={{
        background: "rgba(10, 22, 40, 0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,99,196,0.2)",
      }}
    >
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-64"
          style={{
            background: "linear-gradient(180deg, #0a1628, #0d1f3c)",
          }}
        >
          <CounsellorMobileSidebar />
        </SheetContent>
      </Sheet>

      {/* Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full"></div>
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        {/* <Button variant="ghost" size="icon" className="relative text-white">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-400 rounded-full" />
        </Button> */}

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 pl-2 pr-3 text-white hover:bg-white/10"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback
                  style={{
                    background: "linear-gradient(135deg, #0063c4, #004a93)",
                    color: "white",
                  }}
                >
                  DC
                </AvatarFallback>
              </Avatar>

              <span className="hidden sm:inline text-sm font-medium">
                Counsellor
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-48"
            style={{
              background: "#0a1628",
              border: "1px solid rgba(0,99,196,0.25)",
              color: "white",
            }}
          >
            <DropdownMenuLabel>Dashboards</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <a href="/admin">Admin Dashboard</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/student">Student Dashboard</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/counsellor">Counsellor Dashboard</a>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-400">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
