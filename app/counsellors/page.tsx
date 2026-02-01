"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FilterSidebar } from "@/components/counsellors/filter-sidebar"
import { CounsellorCard, type CounsellorData } from "@/components/counsellors/counsellor-card"
import { CounsellorCardSkeleton } from "@/components/counsellors/counsellor-card-skeleton"
import { EmptyState } from "@/components/counsellors/empty-state"
import { SlidersHorizontal, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"

// Mock data
const mockCounsellors: CounsellorData[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    expertise: "Technology & Leadership",
    bio: "Former Google engineering manager helping tech professionals navigate career transitions and leadership roles.",
    experience: 12,
    rating: 4.9,
    reviewCount: 342,
    pricePerSession: 150,
    availableToday: true,
    image: null,
  },
  {
    id: "2",
    name: "Michael Roberts",
    expertise: "Finance & Consulting",
    bio: "Ex-McKinsey consultant specializing in career pivots from finance to tech and strategic career planning.",
    experience: 8,
    rating: 4.8,
    reviewCount: 256,
    pricePerSession: 120,
    availableToday: false,
    image: null,
  },
  {
    id: "3",
    name: "Emma Williams",
    expertise: "Creative Industries",
    bio: "Award-winning creative director guiding designers and marketers to build impactful portfolios and careers.",
    experience: 10,
    rating: 4.9,
    reviewCount: 198,
    pricePerSession: 100,
    availableToday: true,
    image: null,
  },
  {
    id: "4",
    name: "James Anderson",
    expertise: "Healthcare & Medicine",
    bio: "Medical career advisor helping healthcare professionals explore clinical and non-clinical career paths.",
    experience: 15,
    rating: 4.7,
    reviewCount: 287,
    pricePerSession: 130,
    availableToday: false,
    image: null,
  },
  {
    id: "5",
    name: "Lisa Park",
    expertise: "Product Management",
    bio: "VP of Product at a unicorn startup, passionate about mentoring aspiring and transitioning product managers.",
    experience: 9,
    rating: 4.9,
    reviewCount: 412,
    pricePerSession: 175,
    availableToday: true,
    image: null,
  },
  {
    id: "6",
    name: "David Martinez",
    expertise: "Entrepreneurship",
    bio: "Serial entrepreneur and Y Combinator alumnus helping founders and aspiring entrepreneurs build successful ventures.",
    experience: 14,
    rating: 4.8,
    reviewCount: 189,
    pricePerSession: 200,
    availableToday: false,
    image: null,
  },
  {
    id: "7",
    name: "Rachel Thompson",
    expertise: "Data Science & AI",
    bio: "AI researcher turned career coach, specializing in helping professionals break into the data science field.",
    experience: 7,
    rating: 4.9,
    reviewCount: 156,
    pricePerSession: 140,
    availableToday: true,
    image: null,
  },
  {
    id: "8",
    name: "Kevin Nguyen",
    expertise: "Engineering Management",
    bio: "Engineering leader at FAANG companies, coaching engineers on technical leadership and management transitions.",
    experience: 11,
    rating: 4.8,
    reviewCount: 278,
    pricePerSession: 160,
    availableToday: true,
    image: null,
  },
  {
    id: "9",
    name: "Amanda Foster",
    expertise: "Human Resources",
    bio: "HR executive helping professionals understand hiring processes and optimize their job search strategies.",
    experience: 13,
    rating: 4.7,
    reviewCount: 234,
    pricePerSession: 90,
    availableToday: false,
    image: null,
  },
]

export default function CounsellorsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [counsellors, setCounsellors] = useState<CounsellorData[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const itemsPerPage = 6
  const totalPages = Math.ceil(mockCounsellors.length / itemsPerPage)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounsellors(mockCounsellors)
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleApplyFilters = () => {
    setMobileFiltersOpen(false)
  }

  const handleClearFilters = () => {
    // Reset to original data
    setCounsellors(mockCounsellors)
  }

  // Sort counsellors
  const sortedCounsellors = [...counsellors].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerSession - b.pricePerSession
      case "price-high":
        return b.pricePerSession - a.pricePerSession
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Paginate
  const paginatedCounsellors = sortedCounsellors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Find a Career Counsellor
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Connect with experienced professionals who can guide your career journey.
          </p>
          {/* Divider */}
          <div className="h-px bg-border mt-6" />
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
              <h2 className="font-semibold text-foreground mb-5">Filters</h2>
              <FilterSidebar
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              {/* Results Count */}
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{counsellors.length}</span> counsellors found
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden rounded-xl bg-transparent"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar
                        onApplyFilters={handleApplyFilters}
                        onClearFilters={handleClearFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 rounded-xl bg-transparent">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Counsellor Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CounsellorCardSkeleton key={i} />
                ))}
              </div>
            ) : paginatedCounsellors.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedCounsellors.map((counsellor) => (
                    <CounsellorCard key={counsellor.id} counsellor={counsellor} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="rounded-full bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="icon"
                        onClick={() => setCurrentPage(i + 1)}
                        className={`rounded-full ${currentPage !== i + 1 ? "bg-transparent" : ""}`}
                      >
                        {i + 1}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="rounded-full bg-transparent"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
