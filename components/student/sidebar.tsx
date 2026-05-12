"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  MessageSquare,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Map,
} from "lucide-react"

const navItems = [
  { label: "Dashboard",        href: "/student",               icon: LayoutDashboard },
  { label: "Book a Session",   href: "/student/book-session",  icon: Calendar },
  { label: "My Sessions",      href: "/student/my-sessions",   icon: BookOpen },
  { label: "Roadmaps",         href: "/student/roadmap",       icon: Map },
  { label: "Chat Bot",         href: "/student/chat",          icon: MessageSquare },
  { label: "Profile Settings", href: "/student/settings",      icon: User },
]

export function StudentSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 100%)",
        borderRight: "1px solid rgba(0,99,196,0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* ── Logo ── */}
      <div
        className="h-16 flex items-center justify-between px-4"
        style={{ borderBottom: "1px solid rgba(0,99,196,0.2)" }}
      >
        {!collapsed && (
          <Link
            href="/student"
            className="font-bold text-lg tracking-tight"
            style={{
              background: "linear-gradient(90deg, #60a5fa, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <img className="mt-2 w-[230px] " src="/logo-white.png" alt="logo" />
          </Link>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8 flex items-center justify-center rounded-lg transition-all", collapsed && "mx-auto")}
          style={{
            background: "rgba(0,99,196,0.15)",
            border: "1px solid rgba(0,99,196,0.3)",
            color: "#60a5fa",
            cursor: "pointer",
          }}
        >
          {collapsed
            ? <ChevronRight className="h-4 w-4" />
            : <ChevronLeft className="h-4 w-4" />
          }
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname === "/student" && item.href === "/student")

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    collapsed && "justify-center px-2"
                  )}
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(0,99,196,0.35), rgba(0,74,147,0.25))"
                      : "transparent",
                    border: isActive
                      ? "1px solid rgba(0,99,196,0.5)"
                      : "1px solid transparent",
                    color: isActive ? "#ffffff" : "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = "rgba(0,99,196,0.1)"
                      el.style.color = "#ffffff"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = "transparent"
                      el.style.color = "#64748b"
                    }
                  }}
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

      {/* ── Logout ── */}
      <div
        className="p-2"
        style={{ borderTop: "1px solid rgba(0,99,196,0.2)" }}
      >
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: "#64748b",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.background = "rgba(239,68,68,0.1)"
            el.style.border = "1px solid rgba(239,68,68,0.25)"
            el.style.color = "#f87171"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.background = "transparent"
            el.style.border = "1px solid transparent"
            el.style.color = "#64748b"
          }}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}