"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Search,
  Bell,
  Menu,
  Sparkles,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { StudentMobileSidebar } from "./mobile-sidebar";

export function StudentHeader() {
  const [notifications] = useState([
    {
      id: 1,
      message: "Your session with Dr. Amanda is in 2 hours",
      time: "10m ago",
    },
    {
      id: 2,
      message: "New career recommendations available",
      time: "1h ago",
    },
    {
      id: 3,
      message: "Session feedback received",
      time: "3h ago",
    },
  ]);

  return (
    <header
      className="h-16 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-50"
      style={{
        background: "rgba(10,22,40,0.72)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,99,196,0.15)",
      }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden border-0"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,99,196,0.2)",
                color: "#60a5fa",
              }}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-0 w-64 border-0"
            style={{
              background:
                "linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%)",
              borderRight: "1px solid rgba(0,99,196,0.2)",
            }}
          >
            <StudentMobileSidebar />
          </SheetContent>
        </Sheet>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          {/* <div className="relative w-full">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "#64748b" }}
            />

            <Input
              placeholder="Search counsellors, sessions..."
              className="pl-11 h-11 rounded-2xl border-0 text-sm text-white placeholder:text-slate-500"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,99,196,0.18)",
                backdropFilter: "blur(10px)",
                color: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
            />
          </div> */}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* Mobile Search */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden border-0"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(0,99,196,0.18)",
            color: "#60a5fa",
          }}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* AI Badge */}
        

        

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>

            <Button
              variant="ghost"
              className="h-11 px-2 pr-3 gap-3 rounded-2xl border-0"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(0,99,196,0.18)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Avatar
                className="h-8 w-8"
                style={{
                  border: "1px solid rgba(0,99,196,0.3)",
                }}
              >
                <AvatarFallback
                  className="text-xs font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, #0063c4, #004a93)",
                    color: "white",
                  }}
                >
                  SJ
                </AvatarFallback>
              </Avatar>

              <div className="hidden sm:flex flex-col items-start">
                <span
                  className="text-sm font-semibold leading-none"
                  style={{ color: "white" }}
                >
                  Student
                </span>

                <span
                  className="text-xs mt-1"
                  style={{ color: "#64748b" }}
                >
                  Dashboard
                </span>
              </div>
            </Button>

          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
}