import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

interface StudentStatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
}

export function StudentStatCard({ title, value, subtitle, icon: Icon }: StudentStatCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
          <Icon className="h-5 w-5 text-foreground" />
        </div>
      </div>
    </div>
  )
}
