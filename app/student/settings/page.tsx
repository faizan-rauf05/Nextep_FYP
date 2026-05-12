'use client'

import { ProfileFormSection } from '@/components/student/profile-form-section'
import { EducationFormSection } from '@/components/student/education-form-section'
import { CareerInterestsFormSection } from '@/components/student/career-interests-form-section'
import { PasswordChangeSection } from '@/components/student/password-change-section'
import { Button } from '@/components/ui/button'
import { Settings, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const glassCardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(0,99,196,0.25)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderRadius: '1rem',
  padding: '1.5rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
}

export default function SettingsPage() {
  return (
    <div
      className="relative space-y-8 overflow-hidden"
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)',
        padding: '1.5rem',
      }}
    >
      {/* Decorative Blobs */}
      <div
        className="pointer-events-none fixed -top-32 -left-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{
          background: 'rgba(0,99,196,0.20)',
        }}
      />

      <div
        className="pointer-events-none fixed -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl -z-10"
        style={{
          background: 'rgba(0,99,196,0.15)',
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1
            className="font-bold text-white"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
              letterSpacing: '-0.03em',
              marginBottom: '0.35rem',
            }}
          >
            Profile Settings
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: 14,
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            Manage your personal information, education, career interests,
            and account security.
          </p>
        </div>

        <div
          style={{
            height: 42,
            width: 42,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.75rem',
            background:
              'linear-gradient(135deg, rgba(0,99,196,0.30), rgba(0,74,147,0.18))',
            border: '1px solid rgba(0,99,196,0.4)',
            boxShadow: '0 4px 20px rgba(0,99,196,0.15)',
          }}
        >
          <Settings size={18} color="#60a5fa" />
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">

        {/* Personal Information */}
        <div style={glassCardStyle}>
          <div
            className="
              [&_*]:bg-transparent
              [&_*]:text-white
              [&_input]:bg-[rgba(255,255,255,0.04)]
              [&_input]:border-[rgba(0,99,196,0.25)]
              [&_input]:text-white
              [&_input]:placeholder:text-slate-500
              [&_textarea]:bg-[rgba(255,255,255,0.04)]
              [&_textarea]:border-[rgba(0,99,196,0.25)]
              [&_textarea]:text-white
              [&_select]:bg-[rgba(255,255,255,0.04)]
              [&_select]:border-[rgba(0,99,196,0.25)]
              [&_label]:text-slate-300
              [&_.bg-white]:!bg-transparent
              [&_.border]:border-[rgba(0,99,196,0.2)]
            "
          >
            <ProfileFormSection />
          </div>
        </div>

        {/* Education Details */}
        <div style={glassCardStyle}>
          <div
            className="
              [&_*]:bg-transparent
              [&_*]:text-white
              [&_input]:bg-[rgba(255,255,255,0.04)]
              [&_input]:border-[rgba(0,99,196,0.25)]
              [&_input]:text-white
              [&_input]:placeholder:text-slate-500
              [&_textarea]:bg-[rgba(255,255,255,0.04)]
              [&_textarea]:border-[rgba(0,99,196,0.25)]
              [&_textarea]:text-white
              [&_select]:bg-[rgba(255,255,255,0.04)]
              [&_select]:border-[rgba(0,99,196,0.25)]
              [&_label]:text-slate-300
              [&_.bg-white]:!bg-transparent
              [&_.border]:border-[rgba(0,99,196,0.2)]
            "
          >
            <EducationFormSection />
          </div>
        </div>

        {/* Career Interests */}
        {/*
        <div style={glassCardStyle}>
          <div
            className="
              [&_*]:bg-transparent
              [&_*]:text-white
              [&_input]:bg-[rgba(255,255,255,0.04)]
              [&_input]:border-[rgba(0,99,196,0.25)]
              [&_input]:text-white
              [&_input]:placeholder:text-slate-500
              [&_label]:text-slate-300
            "
          >
            <CareerInterestsFormSection />
          </div>
        </div>
        */}

        {/* Password Section */}
        {/*
        <div style={glassCardStyle}>
          <div
            className="
              [&_*]:bg-transparent
              [&_*]:text-white
              [&_input]:bg-[rgba(255,255,255,0.04)]
              [&_input]:border-[rgba(0,99,196,0.25)]
              [&_input]:text-white
              [&_input]:placeholder:text-slate-500
              [&_label]:text-slate-300
            "
          >
            <PasswordChangeSection />
          </div>
        </div>
        */}

        {/* Footer */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(0,99,196,0.18)',
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: '#94a3b8',
              marginBottom: '1rem',
              lineHeight: 1.6,
            }}
          >
            Need help? Check our FAQ or contact support for any questions
            regarding your profile and account settings.
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              asChild
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,99,196,0.3)',
                color: '#60a5fa',
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                borderRadius: '0.8rem',
                padding: '0 1rem',
                height: 44,
              }}
            >
              <Link href="/student">
                <ArrowLeft size={15} />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}