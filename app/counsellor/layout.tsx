import React from "react"
import { CounsellorSidebar } from "@/components/counsellor/sidebar"
import { CounsellorHeader } from "@/components/counsellor/header"

export default function CounsellorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <CounsellorSidebar />
      </div>
      
      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300">
        <CounsellorHeader />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
