'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

export function SessionTypeSelection({ selectedType, onTypeChange }: SessionTypeSelectionProps) {
  return (
    <div>
      <h3 className="font-semibold mb-4">Select Session Type</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {SESSION_TYPES.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedType === type.id ? 'border-foreground ring-2 ring-foreground' : ''
            }`}
            onClick={() => onTypeChange(type.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground">{type.title}</h4>
                <Badge variant={selectedType === type.id ? 'default' : 'secondary'}>
                  {type.price}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Duration: {type.duration}</span>
                {selectedType === type.id && (
                  <span className="font-medium text-foreground">Selected</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
