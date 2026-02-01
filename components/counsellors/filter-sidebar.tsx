"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Search, Star, X, RotateCcw } from "lucide-react"

const expertiseOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Marketing",
  "Engineering",
  "Design",
  "Education",
  "Consulting",
]

const experienceLevels = [
  { id: "junior", label: "Junior (1-3 years)" },
  { id: "mid", label: "Mid (4-7 years)" },
  { id: "senior", label: "Senior (8+ years)" },
]

const sessionTypes = [
  { id: "career-guidance", label: "Career Guidance" },
  { id: "resume-review", label: "Resume Review" },
  { id: "mock-interview", label: "Mock Interview" },
  { id: "salary-negotiation", label: "Salary Negotiation" },
]

const availabilityOptions = [
  { id: "today", label: "Available Today" },
  { id: "this-week", label: "This Week" },
]

interface FilterSidebarProps {
  onApplyFilters?: () => void
  onClearFilters?: () => void
  className?: string
}

export function FilterSidebar({ onApplyFilters, onClearFilters, className }: FilterSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [selectedSessionTypes, setSelectedSessionTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedExpertise([])
    setSelectedExperience([])
    setSelectedSessionTypes([])
    setPriceRange([0, 200])
    setSelectedAvailability([])
    setMinRating(null)
    onClearFilters?.()
  }

  const hasActiveFilters =
    searchQuery ||
    selectedExpertise.length > 0 ||
    selectedExperience.length > 0 ||
    selectedSessionTypes.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 200 ||
    selectedAvailability.length > 0 ||
    minRating !== null

  return (
    <div className={className}>
      {/* Search */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-2 block">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Name, keyword, expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl bg-secondary border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Expertise */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-3 block">Expertise</Label>
        <div className="space-y-2.5">
          {expertiseOptions.map((expertise) => (
            <div key={expertise} className="flex items-center gap-2.5">
              <Checkbox
                id={expertise}
                checked={selectedExpertise.includes(expertise)}
                onCheckedChange={() =>
                  toggleSelection(expertise, selectedExpertise, setSelectedExpertise)
                }
                className="rounded"
              />
              <label
                htmlFor={expertise}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {expertise}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-3 block">Experience Level</Label>
        <div className="space-y-2.5">
          {experienceLevels.map((level) => (
            <div key={level.id} className="flex items-center gap-2.5">
              <Checkbox
                id={level.id}
                checked={selectedExperience.includes(level.id)}
                onCheckedChange={() =>
                  toggleSelection(level.id, selectedExperience, setSelectedExperience)
                }
                className="rounded"
              />
              <label
                htmlFor={level.id}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {level.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Session Type */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-3 block">Session Type</Label>
        <div className="space-y-2.5">
          {sessionTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2.5">
              <Checkbox
                id={type.id}
                checked={selectedSessionTypes.includes(type.id)}
                onCheckedChange={() =>
                  toggleSelection(type.id, selectedSessionTypes, setSelectedSessionTypes)
                }
                className="rounded"
              />
              <label
                htmlFor={type.id}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-foreground">Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={200}
          step={10}
          className="mt-2"
        />
      </div>

      {/* Availability */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-foreground mb-3 block">Availability</Label>
        <div className="space-y-2.5">
          {availabilityOptions.map((option) => (
            <div key={option.id} className="flex items-center gap-2.5">
              <Checkbox
                id={option.id}
                checked={selectedAvailability.includes(option.id)}
                onCheckedChange={() =>
                  toggleSelection(option.id, selectedAvailability, setSelectedAvailability)
                }
                className="rounded"
              />
              <label
                htmlFor={option.id}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <Label className="text-sm font-medium text-foreground mb-3 block">Minimum Rating</Label>
        <div className="flex gap-2">
          {[4, 4.5, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinRating(minRating === rating ? null : rating)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                minRating === rating
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-muted"
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${minRating === rating ? "fill-primary-foreground" : "fill-muted-foreground"}`} />
              {rating}+
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          onClick={onApplyFilters}
          className="w-full rounded-xl font-medium h-11 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="w-full rounded-xl font-medium text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  )
}
