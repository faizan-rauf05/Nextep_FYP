'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SessionTypeSelectionProps {
  selectedType: string | null
  onTypeChange: (type: string) => void
}

const SESSION_TYPES = [
  {
    id: 'career-guidance',
    title: 'Career Guidance',
    description: 'General career advice and planning',
    duration: '30 mins',
    price: 'Rs. 1,000',
  },
  {
    id: 'resume-review',
    title: 'Resume Review',
    description: 'Resume feedback and optimization',
    duration: '30 mins',
    price: 'Rs. 1,000',
  },
  {
    id: 'interview-prep',
    title: 'Interview Preparation',
    description: 'Mock interviews and tips',
    duration: '45 mins',
    price: 'Rs. 1,500',
  },
  {
    id: 'career-assessment',
    title: 'Career Assessment',
    description: 'In-depth career compatibility test',
    duration: '60 mins',
    price: 'Rs. 2,000',
  },
]

export function SessionTypeSelection({
  selectedType,
  onTypeChange,
}: SessionTypeSelectionProps) {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-white">
        Select Session Type
      </h3>

      <div className="grid gap-3 md:grid-cols-2">
        {SESSION_TYPES.map((type) => {
          const isSelected = selectedType === type.id

          return (
            <Card
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`
                cursor-pointer transition-all duration-200
                bg-white/5 border border-white/10
                hover:bg-white/10 hover:border-[#0063c4]/50
                ${isSelected ? "border-[#0063c4] bg-[#0063c4]/10 ring-2 ring-[#0063c4]/40" : ""}
              `}
            >
              <CardContent className="p-4">
                
                {/* Title + Price */}
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">
                    {type.title}
                  </h4>

                  <Badge
                    className={`
                      text-xs
                      ${isSelected 
                        ? "bg-[#0063c4] text-white" 
                        : "bg-white/10 text-slate-300"}
                    `}
                  >
                    {type.price}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-3">
                  {type.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Duration: {type.duration}</span>

                  {isSelected && (
                    <span className="text-[#34d399] font-medium">
                      Selected ✓
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}