import React from "react"
import { CounsellorSidebar } from "@/components/counsellor/sidebar"
import { CounsellorHeader } from "@/components/counsellor/header"

export default function CounsellorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
      }}
    >
      {/* Sidebar */}
      <div className="hidden lg:block">
        <CounsellorSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300 min-h-screen">
        {/* subtle glow background (like other pages) */}
        <div
          className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
          style={{ background: "rgba(0,99,196,0.2)" }}
        />

        <div
          className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
          style={{ background: "rgba(0,99,196,0.15)" }}
        />

        <CounsellorHeader />

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}