'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { SaveNotification } from './save-notification'
import { Briefcase } from 'lucide-react'

const CAREER_OPTIONS = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Entrepreneurship',
  'Marketing',
  'Design',
  'Consulting',
  'Human Resources',
  'Sales',
  'Operations',
  'Other',
]

interface CareerInterests {
  roles: string[]
  industries: string[]
  yearsExperience: string
  targetPosition: string
}

export function CareerInterestsFormSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [formData, setFormData] = useState<CareerInterests>({
    roles: ['Technology', 'Entrepreneurship'],
    industries: 'Software Engineer, Product Manager, Data Analyst',
    yearsExperience: '0-2 years',
    targetPosition: 'Product Manager at a Tech Startup',
  })
  const [editData, setEditData] = useState(formData)

  const handleEdit = () => {
    setEditData(formData)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData(formData)
  }

  const handleIndustryToggle = (industry: string) => {
    setEditData((prev) => ({
      ...prev,
      roles: prev.roles.includes(industry)
        ? prev.roles.filter((r) => r !== industry)
        : [...prev.roles, industry],
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setFormData(editData)
    setIsSaving(false)
    setIsEditing(false)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 3000)
  }

  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Career Interests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Industries of Interest
                </Label>
                <div className="flex flex-wrap gap-2">
                  {formData.roles.length > 0 ? (
                    formData.roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 bg-muted text-foreground rounded-full text-sm"
                      >
                        {role}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Not selected</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Desired Roles
                </Label>
                <p className="text-foreground">{formData.industries}</p>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Years of Experience
                </Label>
                <p className="text-foreground">{formData.yearsExperience}</p>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Target Position/Role
                </Label>
                <p className="text-foreground">{formData.targetPosition}</p>
              </div>

              <Button onClick={handleEdit} className="mt-4">
                Edit Career Interests
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-semibold mb-3 block">
                  Industries of Interest
                </Label>
                <div className="space-y-3">
                  {CAREER_OPTIONS.map((industry) => (
                    <div key={industry} className="flex items-center gap-3">
                      <Checkbox
                        id={industry}
                        checked={editData.roles.includes(industry)}
                        onCheckedChange={() => handleIndustryToggle(industry)}
                      />
                      <Label htmlFor={industry} className="cursor-pointer font-normal">
                        {industry}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="industries" className="text-xs font-semibold mb-2 block">
                  Desired Roles (comma-separated)
                </Label>
                <Input
                  id="industries"
                  name="industries"
                  value={editData.industries}
                  onChange={handleChange}
                  placeholder="e.g., Software Engineer, Product Manager, Data Analyst"
                />
              </div>

              <div>
                <Label htmlFor="yearsExperience" className="text-xs font-semibold mb-2 block">
                  Years of Experience
                </Label>
                <Input
                  id="yearsExperience"
                  name="yearsExperience"
                  value={editData.yearsExperience}
                  onChange={handleChange}
                  placeholder="e.g., 0-2 years"
                />
              </div>

              <div>
                <Label htmlFor="targetPosition" className="text-xs font-semibold mb-2 block">
                  Target Position/Role
                </Label>
                <Input
                  id="targetPosition"
                  name="targetPosition"
                  value={editData.targetPosition}
                  onChange={handleChange}
                  placeholder="Describe your ideal role"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showSaved && (
        <SaveNotification message="Career interests updated successfully!" />
      )}
    </>
  )
}
