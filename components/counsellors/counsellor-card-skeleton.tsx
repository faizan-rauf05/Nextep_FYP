import { Skeleton } from "@/components/ui/skeleton"

export function CounsellorCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-[4/3] rounded-none" />

      {/* Content */}
      <div className="p-5">
        {/* Name & Expertise */}
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-24" />

        {/* Bio */}
        <div className="mt-3 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    </div>
  )
}
