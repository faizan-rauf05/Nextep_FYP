'use client'

import { CheckCircle } from 'lucide-react'

interface SaveNotificationProps {
  message: string
}

export function SaveNotification({ message }: SaveNotificationProps) {
  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 animate-in slide-in-from-bottom-2 z-50">
      <div className="rounded-lg border border-border bg-background shadow-lg p-4 flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0" />
        <p className="text-sm font-medium text-foreground">{message}</p>
      </div>
    </div>
  )
}
