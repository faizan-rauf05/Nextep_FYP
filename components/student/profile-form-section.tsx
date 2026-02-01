'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SaveNotification } from './save-notification'
import { User } from 'lucide-react'

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
}

export function ProfileFormSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+92 300 1234567',
    dateOfBirth: '1998-05-15',
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
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    First Name
                  </Label>
                  <p className="text-foreground">{formData.firstName}</p>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Last Name
                  </Label>
                  <p className="text-foreground">{formData.lastName}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Email
                  </Label>
                  <p className="text-foreground">{formData.email}</p>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                    Phone
                  </Label>
                  <p className="text-foreground">{formData.phone}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-muted-foreground mb-2 block">
                  Date of Birth
                </Label>
                <p className="text-foreground">{formData.dateOfBirth}</p>
              </div>

              <Button onClick={handleEdit} className="mt-4">
                Edit Information
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-xs font-semibold mb-2 block">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-xs font-semibold mb-2 block">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-xs font-semibold mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs font-semibold mb-2 block">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dateOfBirth" className="text-xs font-semibold mb-2 block">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={editData.dateOfBirth}
                  onChange={handleChange}
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
        <SaveNotification message="Personal information updated successfully!" />
      )}
    </>
  )
}
