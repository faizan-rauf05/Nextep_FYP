import React from "react";
import { StudentSidebar } from "@/components/student/sidebar";
import { StudentHeader } from "@/components/student/header";

const pageBackground: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)",
  minHeight: "100vh",
};

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={pageBackground}
    >
      {/* Background Blobs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{
          background: "rgba(0,99,196,0.18)",
        }}
      />

      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{
          background: "rgba(0,99,196,0.12)",
        }}
      />

      {/* Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen z-50">
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 relative z-10">
        
        {/* Header Wrapper */}
        <div
          className="sticky top-0 z-40 backdrop-blur-xl"
          style={{
            background: "rgba(10,22,40,0.7)",
            borderBottom: "1px solid rgba(0,99,196,0.15)",
          }}
        >
          <StudentHeader />
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <div
            className="rounded-3xl min-h-[calc(100vh-120px)]"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(0,99,196,0.18)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div className="p-4 lg:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}