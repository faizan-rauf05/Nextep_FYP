"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  Star,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/counsellor", icon: LayoutDashboard },
  { label: "My Sessions", href: "/counsellor/my-sessions", icon: BookOpen },
  { label: "Student Profiles", href: "/counsellor/student-profiles", icon: Users },
  { label: "Availability", href: "/counsellor/availability", icon: Clock },
  { label: "Earnings", href: "/counsellor/earnings", icon: TrendingUp },
  { label: "Reviews & Feedback", href: "/counsellor/reviews", icon: Star },
  { label: "Messages", href: "/counsellor/messages", icon: MessageSquare },
  { label: "Profile Settings", href: "/counsellor/settings", icon: User },
]

export function CounsellorMobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        <Link href="/counsellor" className="font-semibold text-lg tracking-tight">
          PathFinder
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname === "/counsellor" && item.href === "/counsellor")
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )
}
