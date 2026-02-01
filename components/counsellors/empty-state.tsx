'use client';

import { Button } from "@/components/ui/button"
import { SearchX, RotateCcw } from "lucide-react"

interface EmptyStateProps {
  onClearFilters?: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Illustration */}
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-muted-foreground" />
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No counsellors found
      </h3>
      <p className="text-muted-foreground max-w-sm leading-relaxed">
        We couldn&apos;t find any counsellors matching your criteria. Try adjusting your filters or search terms.
      </p>

      {/* Action */}
      {onClearFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="mt-6 rounded-full px-6 bg-transparent"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  )
}
