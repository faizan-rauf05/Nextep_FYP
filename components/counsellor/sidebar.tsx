"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/counsellor", icon: LayoutDashboard },
  { label: "My Sessions", href: "/counsellor/my-sessions", icon: BookOpen },
  { label: "Availability", href: "/counsellor/availability", icon: Clock },
  { label: "Earnings", href: "/counsellor/earnings", icon: TrendingUp },
  { label: "Reviews & Feedback", href: "/counsellor/reviews", icon: Star },
  { label: "Profile Settings", href: "/counsellor/settings", icon: User },
]

export function CounsellorSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%)",
        borderRight: "1px solid rgba(0,99,196,0.25)",
      }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center justify-between px-4"
        style={{
          borderBottom: "1px solid rgba(0,99,196,0.2)",
        }}
      >
        {!collapsed && (
          <Link
            href="/counsellor"
            className="font-bold text-lg tracking-tight text-white"
          >
            <img src="/logo-white.png" alt="NexStep" />
          </Link>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-white/10"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    collapsed && "justify-center px-2"
                  )}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(0,99,196,0.35), rgba(0,74,147,0.25))",
                          border: "1px solid rgba(0,99,196,0.5)",
                          color: "#ffffff",
                          boxShadow: "0 4px 15px rgba(0,99,196,0.2)",
                        }
                      : {
                          color: "rgba(255,255,255,0.65)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      ;(e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)")
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      ;(e.currentTarget.style.background = "transparent")
                    }
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon
                    className="h-5 w-5 shrink-0"
                    style={{ color: isActive ? "#60a5fa" : "inherit" }}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div
        className="p-2"
        style={{
          borderTop: "1px solid rgba(0,99,196,0.2)",
        }}
      >
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 text-white hover:bg-red-500/10 hover:text-red-400",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  )
}