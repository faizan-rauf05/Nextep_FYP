"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Lightbulb,
  MessageSquare,
  CreditCard,
  User,
  LogOut,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Book a Session", href: "/student/book-session", icon: Calendar },
  { label: "My Sessions", href: "/student/my-sessions", icon: BookOpen },
  { label: "Career Recommendations", href: "/student/recommendations", icon: Lightbulb },
  { label: "Messages", href: "/student/messages", icon: MessageSquare },
  { label: "Payments", href: "/student/payments", icon: CreditCard },
  { label: "Profile Settings", href: "/student/settings", icon: User },
]

export function StudentMobileSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        <Link href="/student" className="font-semibold text-lg tracking-tight">
          PathFinder
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname === "/student" && item.href === "/student")
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
