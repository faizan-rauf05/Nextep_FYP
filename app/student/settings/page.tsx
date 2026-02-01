'use client'

import { ProfileFormSection } from '@/components/student/profile-form-section'
import { EducationFormSection } from '@/components/student/education-form-section'
import { CareerInterestsFormSection } from '@/components/student/career-interests-form-section'
import { PasswordChangeSection } from '@/components/student/password-change-section'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your personal information, education, career interests, and account security.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Personal Information */}
        <ProfileFormSection />

        {/* Education Details */}
        <EducationFormSection />

        {/* Career Interests */}
        <CareerInterestsFormSection />

        {/* Password & Security */}
        <PasswordChangeSection />

        {/* Footer */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Check our FAQ or contact support for any questions about your profile.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/student">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
