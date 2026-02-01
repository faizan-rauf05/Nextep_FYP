import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/student">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Career Recommendations</h1>
          <p className="text-muted-foreground text-sm mt-1">Personalized career paths based on your profile</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recommended Careers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Career recommendations will appear here...</p>
        </CardContent>
      </Card>
    </div>
  )
}
