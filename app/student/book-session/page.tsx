'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CounsellorCard } from '@/components/student/counsellor-select-card'
import { DateTimeSelection } from '@/components/student/date-time-selection'
import { SessionTypeSelection } from '@/components/student/session-type-selection'
import { BookingConfirmation } from '@/components/student/booking-confirmation'
import { CheckCircle } from 'lucide-react'

// Mock data
const COUNSELLORS = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    photo: '/api/placeholder/80/80',
    specialization: 'Career Strategy & Leadership',
    experience: 8,
    rating: 4.9,
    totalReviews: 127,
    availability: ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
    sessionPrice: 1500,
    bio: 'Expert in helping professionals navigate career transitions and develop leadership skills.',
  },
  {
    id: '2',
    name: 'Md. Hassan Khan',
    photo: '/api/placeholder/80/80',
    specialization: 'Technical Roles & Startups',
    experience: 6,
    rating: 4.8,
    totalReviews: 95,
    availability: ['10:00 AM', '11:00 AM', '3:00 PM', '5:00 PM'],
    sessionPrice: 1200,
    bio: 'Specialized in tech careers, interview prep, and startup guidance for aspiring entrepreneurs.',
  },
  {
    id: '3',
    name: 'Ms. Fatima Hassan',
    photo: '/api/placeholder/80/80',
    specialization: 'Career Assessment & Planning',
    experience: 10,
    rating: 5.0,
    totalReviews: 156,
    availability: ['9:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '4:00 PM', '5:00 PM'],
    sessionPrice: 1500,
    bio: 'Comprehensive career assessment and personalized career planning for all career stages.',
  },
  {
    id: '4',
    name: 'Dr. Ahmed Ali',
    photo: '/api/placeholder/80/80',
    specialization: 'MBA & Advanced Careers',
    experience: 12,
    rating: 4.9,
    totalReviews: 203,
    availability: ['9:30 AM', '2:00 PM', '3:30 PM', '4:30 PM'],
    sessionPrice: 2000,
    bio: 'Experienced in guiding professionals towards MBA and executive career paths.',
  },
]

const SESSION_TYPES = {
  'career-guidance': {
    title: 'Career Guidance',
    duration: '30 mins',
    price: 1000,
  },
  'resume-review': {
    title: 'Resume Review',
    duration: '30 mins',
    price: 1000,
  },
  'interview-prep': {
    title: 'Interview Preparation',
    duration: '45 mins',
    price: 1500,
  },
  'career-assessment': {
    title: 'Career Assessment',
    duration: '60 mins',
    price: 2000,
  },
}

type Step = 'counsellor' | 'datetime' | 'sessiontype' | 'confirmation' | 'success'

export default function BookSessionPage() {
  const [currentStep, setCurrentStep] = useState<Step>('counsellor')
  const [selectedCounsellorId, setSelectedCounsellorId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedSessionType, setSelectedSessionType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const selectedCounsellor = COUNSELLORS.find((c) => c.id === selectedCounsellorId)

  const handleStepOne = () => {
    if (selectedCounsellorId) {
      setCurrentStep('datetime')
    }
  }

  const handleStepTwo = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep('sessiontype')
    }
  }

  const handleStepThree = () => {
    if (selectedSessionType) {
      setCurrentStep('confirmation')
    }
  }

  const handleConfirmBooking = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setCurrentStep('success')
  }

  const handleStartOver = () => {
    setCurrentStep('counsellor')
    setSelectedCounsellorId(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setSelectedSessionType(null)
  }

  // Success State
  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-6 py-12">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Session Booked!</h1>
              <p className="text-muted-foreground">
                Your career counseling session has been successfully booked.
              </p>
            </div>

            <Card className="bg-muted/50 border-border text-left">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium">Counselor</p>
                    <p className="text-foreground">{selectedCounsellor?.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Session Type</p>
                    <p className="text-foreground">{SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES]?.title}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Date & Time</p>
                    <p className="text-foreground">
                      {selectedDate?.toLocaleDateString()} at {selectedTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Total Amount</p>
                    <p className="text-foreground font-semibold">
                      Rs. {(SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES]?.price || 0) + 50}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Confirmation email sent to your registered email address.</p>
                  <p className="text-xs text-muted-foreground">Join link will be sent 30 minutes before the session.</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-center pt-4">
              <Button variant="outline" asChild>
                <a href="/student/my-sessions">View All Sessions</a>
              </Button>
              <Button onClick={handleStartOver}>
                Book Another Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book a Counseling Session</h1>
          <p className="text-muted-foreground">
            Connect with experienced career counselors and get personalized guidance.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            {['counsellor', 'datetime', 'sessiontype', 'confirmation'].map((step, index) => {
              const stepOrder = ['counsellor', 'datetime', 'sessiontype', 'confirmation']
              const stepIndex = stepOrder.indexOf(step)
              const currentStepIndex = stepOrder.indexOf(currentStep)
              const isCompleted = stepIndex < currentStepIndex
              const isActive = step === currentStep

              return (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      isActive || isCompleted
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground border border-border'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {index < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        isCompleted ? 'bg-foreground' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between gap-2 md:gap-4 mt-2 text-xs md:text-sm text-muted-foreground">
            <span>Select Counselor</span>
            <span className="hidden md:inline">Choose Date & Time</span>
            <span className="hidden md:inline">Session Type</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'counsellor' && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Select a Counselor
                </h2>
                <div className="space-y-4">
                  {COUNSELLORS.map((counsellor) => (
                    <CounsellorCard
                      key={counsellor.id}
                      counsellor={counsellor}
                      isSelected={selectedCounsellorId === counsellor.id}
                      onSelect={setSelectedCounsellorId}
                    />
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'datetime' && (
              <Card>
                <CardContent className="p-6">
                  <DateTimeSelection
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onDateChange={setSelectedDate}
                    onTimeChange={setSelectedTime}
                    availableTimeSlots={selectedCounsellor?.availability || []}
                  />
                </CardContent>
              </Card>
            )}

            {currentStep === 'sessiontype' && (
              <Card>
                <CardContent className="p-6">
                  <SessionTypeSelection
                    selectedType={selectedSessionType}
                    onTypeChange={setSelectedSessionType}
                  />
                </CardContent>
              </Card>
            )}

            {currentStep === 'confirmation' && selectedCounsellor && selectedDate && selectedTime && selectedSessionType && (
              <BookingConfirmation
                counsellor={{
                  name: selectedCounsellor.name,
                  photo: selectedCounsellor.photo,
                  specialization: selectedCounsellor.specialization,
                  sessionPrice: selectedCounsellor.sessionPrice,
                }}
                date={selectedDate}
                time={selectedTime}
                sessionType={SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES]}
                onConfirm={handleConfirmBooking}
                onCancel={() => setCurrentStep('counsellor')}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Counselor Summary */}
                {selectedCounsellorId && (
                  <div className="pb-4 border-b border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">COUNSELOR</p>
                    <p className="font-semibold text-foreground">{selectedCounsellor?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedCounsellor?.specialization}
                    </p>
                  </div>
                )}

                {/* Date & Time Summary */}
                {selectedDate && selectedTime && (
                  <div className="pb-4 border-b border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">DATE & TIME</p>
                    <p className="font-semibold text-foreground">
                      {selectedDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedTime}</p>
                  </div>
                )}

                {/* Session Type Summary */}
                {selectedSessionType && (
                  <div className="pb-4 border-b border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2">SESSION TYPE</p>
                    <p className="font-semibold text-foreground">
                      {SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES]?.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES]?.duration}
                    </p>
                  </div>
                )}

                {/* Price */}
                {selectedSessionType && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Session Price</span>
                      <span className="font-medium">
                        Rs. {SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES]?.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Platform Fee</span>
                      <span className="font-medium">Rs. 50</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
                      <span>Total</span>
                      <span>
                        Rs. {(SESSION_TYPES[selectedSessionType as keyof typeof SESSION_TYPES]?.price || 0) + 50}
                      </span>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-2 pt-4 border-t border-border">
                  {currentStep === 'counsellor' && (
                    <Button
                      onClick={handleStepOne}
                      disabled={!selectedCounsellorId}
                      className="w-full"
                    >
                      Continue to Date & Time
                    </Button>
                  )}

                  {currentStep === 'datetime' && (
                    <div className="space-y-2">
                      <Button
                        onClick={handleStepTwo}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full"
                      >
                        Continue to Session Type
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep('counsellor')}
                        className="w-full"
                      >
                        Back
                      </Button>
                    </div>
                  )}

                  {currentStep === 'sessiontype' && (
                    <div className="space-y-2">
                      <Button
                        onClick={handleStepThree}
                        disabled={!selectedSessionType}
                        className="w-full"
                      >
                        Review Booking
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep('datetime')}
                        className="w-full"
                      >
                        Back
                      </Button>
                    </div>
                  )}

                  {currentStep === 'confirmation' && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('counsellor')}
                      className="w-full"
                    >
                      Start Over
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
