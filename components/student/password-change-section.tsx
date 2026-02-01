'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SaveNotification } from './save-notification'
import { Lock } from 'lucide-react'

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function PasswordChangeSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleEdit = () => {
    setIsEditing(true)
    setError(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setError(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleSave = async () => {
    // Validation
    if (!formData.currentPassword) {
      setError('Please enter your current password')
      return
    }
    if (!formData.newPassword) {
      setError('Please enter a new password')
      return
    }
    if (formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password')
      return
    }

    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 3000)
  }

  return (
    <>
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isEditing ? (
            <div>
              <p className="text-muted-foreground mb-4">
                Manage your password to keep your account secure.
              </p>
              <Button onClick={handleEdit}>
                Change Password
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="currentPassword" className="text-xs font-semibold mb-2 block">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-xs font-semibold mb-2 block">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter your new password (min 8 characters)"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-xs font-semibold mb-2 block">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                <p className="font-semibold mb-1">Password requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>At least 8 characters</li>
                  <li>Mix of uppercase and lowercase letters</li>
                  <li>At least one number</li>
                  <li>At least one special character (!@#$%^&*)</li>
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? 'Updating...' : 'Update Password'}
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
        <SaveNotification message="Password changed successfully!" />
      )}
    </>
  )
}
