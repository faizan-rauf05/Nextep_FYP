import { type LucideIcon } from "lucide-react"

interface StudentStatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
}

export function StudentStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StudentStatCardProps) {
  return (
    <div
      className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(0,99,196,0.25)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full blur-2xl"
        style={{
          background: "rgba(0,99,196,0.15)",
        }}
      />

      <div className="relative flex items-start justify-between">
        {/* Text Content */}
        <div className="space-y-2">
          <p
            className="text-sm font-medium"
            style={{
              color: "#94a3b8",
            }}
          >
            {title}
          </p>

          <h3
            className="font-bold tracking-tight"
            style={{
              color: "#ffffff",
              fontSize: "2rem",
              lineHeight: 1.1,
            }}
          >
            {value}
          </h3>

          {subtitle && (
            <p
              className="text-sm"
              style={{
                color: "#64748b",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Icon */}
        <div
          className="flex items-center justify-center rounded-xl"
          style={{
            height: 48,
            width: 48,
            background:
              "linear-gradient(135deg, rgba(0,99,196,0.30), rgba(0,74,147,0.18))",
            border: "1px solid rgba(0,99,196,0.4)",
            boxShadow: "0 4px 18px rgba(0,99,196,0.15)",
          }}
        >
          <Icon
            size={22}
            style={{
              color: "#60a5fa",
            }}
          />
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,99,196,0), rgba(0,99,196,0.8), rgba(0,99,196,0))",
        }}
      />
    </div>
  )
}