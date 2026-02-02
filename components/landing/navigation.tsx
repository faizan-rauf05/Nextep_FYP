"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown, LayoutDashboard } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-primary/10 shadow-sm">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent">
              <span className="text-white font-bold text-sm">PF</span>
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PathFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/counsellors" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Counsellors
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              How it Works
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 outline-none">
                Dashboard
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/student" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Student Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/counsellor" className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4" />
                    Counsellor Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link 
              href="/login" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Login
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              className="rounded-full px-6 font-medium bg-white hover:bg-primary/5 border-primary/20 text-foreground hover:border-primary/50 transition-all" 
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button className="rounded-full px-6 font-medium bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105">
              Book a Session
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary/10 bg-gradient-to-b from-background to-blue-50/30 animate-fade-in-down">
            <div className="flex flex-col gap-4">
              <Link 
                href="#" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/counsellors" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Counsellors
              </Link>
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                How it Works
              </Link>
              <div className="space-y-2">
                <span className="text-sm font-medium text-foreground">Dashboard</span>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/admin" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                  <Link 
                    href="/student" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Student Dashboard
                  </Link>
                  <Link 
                    href="/counsellor" 
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Counsellor Dashboard
                  </Link>
                </div>
              </div>
              <Link 
                href="/login" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" className="rounded-full w-full font-medium bg-white hover:bg-primary/5 border-primary/20" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button className="rounded-full w-full font-medium bg-gradient-to-r from-primary to-accent">
                  Book a Session
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
