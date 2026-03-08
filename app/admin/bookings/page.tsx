  "use client"

  import { useState, useEffect } from "react"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Input } from "@/components/ui/input"
  import { Search } from "lucide-react"

  export default function BookingsPage() {

    const [sessions, setSessions] = useState<any[]>([])
    const [stats, setStats] = useState<any>({
      total: 0,
      today: 0,
      revenue: 0,
      completed: 0,
    })

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    const fetchMeetings = async () => {

      try {

        const res = await fetch("/api/admin/meetings")

        const data = await res.json()
        console.log(data);

        setSessions(data.meetings)

        setStats(data.stats)

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }
    }

    useEffect(() => {

      fetchMeetings()

    }, [])

    const filteredSessions = sessions.filter((s) => {

      const student =
        `${s.student?.firstName} ${s.student?.lastName}`.toLowerCase()

      const counsellor =
        `${s.counsellor?.firstName} ${s.counsellor?.lastName}`.toLowerCase()

      return (
        student.includes(search.toLowerCase()) ||
        counsellor.includes(search.toLowerCase())
      )
    })

    const getStatusColor = (status: string) => {

      switch (status) {

        case "scheduled":
          return "default"

        case "completed":
          return "secondary"

        case "cancelled":
          return "destructive"

        default:
          return "outline"
      }
    }

    if (loading) {

      return (
        <div className="p-10 text-center text-muted-foreground">
          Loading meetings...
        </div>
      )
    }

    return (
      <div className="space-y-6">

        {/* HEADER */}

        <div>

          <h1 className="text-2xl font-semibold">
            Meetings & Bookings
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage all counselling sessions
          </p>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-4 gap-4">

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Total Meetings
              </p>
              <p className="text-2xl font-semibold">
                {stats.total}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Today Sessions
              </p>
              <p className="text-2xl font-semibold">
                {stats.today}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Completed
              </p>
              <p className="text-2xl font-semibold">
                {stats.completed}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Revenue
              </p>
              <p className="text-2xl font-semibold">
                ${stats.revenue}
              </p>
            </CardContent>
          </Card>

        </div>

        {/* SEARCH */}

        <Card>

          <CardContent className="pt-6">

            <div className="relative">

              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search student or counsellor..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </CardContent>

        </Card>

        {/* TABLE */}

        <Card>

          <CardHeader>
            <CardTitle>
              All Sessions
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">

            <table className="w-full text-sm">

              <thead className="border-b bg-muted/50">

                <tr className="text-left">

                  <th className="p-4">Student</th>

                  <th className="p-4">Counsellor</th>

                  <th className="p-4">Session</th>

                  <th className="p-4">Date</th>

                  <th className="p-4">Price</th>

                  <th className="p-4">Status</th>

                </tr>

              </thead>

              <tbody>

                {filteredSessions.map((session) => (

                  <tr
                    key={session._id}
                    className="border-b hover:bg-muted/50"
                  >

                    <td className="p-4">

                      <div>

                        <p className="font-medium">
                          {session.student?.firstName} {session.student?.lastName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {session.student?.email}
                        </p>

                      </div>

                    </td>

                    <td className="p-4">

                      <div>

                        <p>
                          {session.counsellor?.firstName} {session.counsellor?.lastName}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {session.counsellor?.specialization}
                        </p>

                      </div>

                    </td>

                    <td className="p-4">
                      {session.sessionType}
                    </td>

                    <td className="p-4">
                      {new Date(session.date).toLocaleDateString()} • {session.time}
                    </td>

                    <td className="p-4">
                      ${session.totalAmount}
                    </td>

                    <td className="p-4">

                      <Badge variant={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </CardContent>

        </Card>

      </div>
    )
  }