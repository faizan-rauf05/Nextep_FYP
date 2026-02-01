"use client"

import { useState } from "react"
import { StatCard } from "@/components/admin/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Receipt,
  Search,
  Calendar as CalendarIcon,
  Eye,
  Download,
  ArrowUpRight,
  Banknote,
  Wallet,
} from "lucide-react"
import { format } from "date-fns"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Mock data for revenue over time
const revenueOverTime = [
  { month: "Aug", revenue: 32500 },
  { month: "Sep", revenue: 38200 },
  { month: "Oct", revenue: 42800 },
  { month: "Nov", revenue: 39500 },
  { month: "Dec", revenue: 51200 },
  { month: "Jan", revenue: 58600 },
]

// Mock data for monthly earnings comparison
const monthlyEarnings = [
  { month: "Aug", counsellorEarnings: 26000, platformFee: 6500 },
  { month: "Sep", counsellorEarnings: 30560, platformFee: 7640 },
  { month: "Oct", counsellorEarnings: 34240, platformFee: 8560 },
  { month: "Nov", counsellorEarnings: 31600, platformFee: 7900 },
  { month: "Dec", counsellorEarnings: 40960, platformFee: 10240 },
  { month: "Jan", counsellorEarnings: 46880, platformFee: 11720 },
]

// Mock data for payment method distribution
const paymentMethodData = [
  { name: "Credit Card", value: 58 },
  { name: "Debit Card", value: 24 },
  { name: "PayPal", value: 12 },
  { name: "Bank Transfer", value: 6 },
]

// Mock transactions data
const transactions = [
  {
    id: "TXN-001234",
    student: { name: "Alex Johnson", email: "alex.j@email.com" },
    counsellor: { name: "Dr. Amanda Foster", email: "amanda.f@email.com" },
    sessionId: "SES-4521",
    amount: 120,
    platformFee: 24,
    counsellorPayout: 96,
    paymentMethod: "Credit Card",
    status: "paid",
    date: "Jan 24, 2026",
    time: "10:32 AM",
  },
  {
    id: "TXN-001233",
    student: { name: "Sarah Williams", email: "sarah.w@email.com" },
    counsellor: { name: "Lisa Thompson", email: "lisa.t@email.com" },
    sessionId: "SES-4520",
    amount: 90,
    platformFee: 18,
    counsellorPayout: 72,
    paymentMethod: "PayPal",
    status: "pending",
    date: "Jan 24, 2026",
    time: "09:15 AM",
  },
  {
    id: "TXN-001232",
    student: { name: "Michael Chen", email: "michael.c@email.com" },
    counsellor: { name: "David Martinez", email: "david.m@email.com" },
    sessionId: "SES-4519",
    amount: 100,
    platformFee: 20,
    counsellorPayout: 80,
    paymentMethod: "Debit Card",
    status: "paid",
    date: "Jan 23, 2026",
    time: "03:45 PM",
  },
  {
    id: "TXN-001231",
    student: { name: "Emily Davis", email: "emily.d@email.com" },
    counsellor: { name: "Robert Kim", email: "robert.k@email.com" },
    sessionId: "SES-4518",
    amount: 50,
    platformFee: 10,
    counsellorPayout: 40,
    paymentMethod: "Credit Card",
    status: "failed",
    date: "Jan 23, 2026",
    time: "02:20 PM",
  },
  {
    id: "TXN-001230",
    student: { name: "James Wilson", email: "james.w@email.com" },
    counsellor: { name: "Dr. Amanda Foster", email: "amanda.f@email.com" },
    sessionId: "SES-4517",
    amount: 120,
    platformFee: 24,
    counsellorPayout: 96,
    paymentMethod: "Credit Card",
    status: "paid",
    date: "Jan 23, 2026",
    time: "11:00 AM",
  },
  {
    id: "TXN-001229",
    student: { name: "Rachel Green", email: "rachel.g@email.com" },
    counsellor: { name: "Marcus Johnson", email: "marcus.j@email.com" },
    sessionId: "SES-4516",
    amount: 200,
    platformFee: 40,
    counsellorPayout: 160,
    paymentMethod: "Bank Transfer",
    status: "paid",
    date: "Jan 22, 2026",
    time: "04:30 PM",
  },
  {
    id: "TXN-001228",
    student: { name: "David Kim", email: "david.k@email.com" },
    counsellor: { name: "Jennifer Lee", email: "jennifer.l@email.com" },
    sessionId: "SES-4515",
    amount: 140,
    platformFee: 28,
    counsellorPayout: 112,
    paymentMethod: "Debit Card",
    status: "paid",
    date: "Jan 22, 2026",
    time: "10:15 AM",
  },
  {
    id: "TXN-001227",
    student: { name: "Amanda Stone", email: "amanda.s@email.com" },
    counsellor: { name: "Lisa Thompson", email: "lisa.t@email.com" },
    sessionId: "SES-4514",
    amount: 90,
    platformFee: 18,
    counsellorPayout: 72,
    paymentMethod: "PayPal",
    status: "pending",
    date: "Jan 22, 2026",
    time: "09:00 AM",
  },
]

const COLORS = ["#171717", "#404040", "#737373", "#a3a3a3"]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [dateRange, setDateRange] = useState<Date | undefined>(undefined)
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null)

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.counsellor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter
    const matchesMethod = methodFilter === "all" || txn.paymentMethod.toLowerCase().replace(" ", "-") === methodFilter
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid": return "default"
      case "pending": return "outline"
      case "failed": return "destructive"
      default: return "outline"
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
      case "debit card":
        return <CreditCard className="h-4 w-4" />
      case "paypal":
        return <Wallet className="h-4 w-4" />
      case "bank transfer":
        return <Banknote className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Payments & Revenue</h1>
          <p className="text-muted-foreground text-sm mt-1">Monitor platform earnings and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$262,800"
          change="+28.4% from last year"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="This Month"
          value="$58,600"
          change="+14.5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Transactions"
          value="3,847"
          change="+156 this month"
          changeType="positive"
          icon={Receipt}
        />
        <StatCard
          title="Platform Commission"
          value="$52,560"
          change="20% of total revenue"
          changeType="neutral"
          icon={CreditCard}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Over Time */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Revenue Over Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#171717"
                    strokeWidth={2}
                    dot={{ fill: "#171717", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Earnings Comparison */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Monthly Earnings Breakdown</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(value) => (
                      <span className="text-xs text-muted-foreground">
                        {value === "counsellorEarnings" ? "Counsellor Payouts" : "Platform Fee"}
                      </span>
                    )}
                  />
                  <Bar dataKey="counsellorEarnings" fill="#404040" radius={[4, 4, 0, 0]} stackId="stack" />
                  <Bar dataKey="platformFee" fill="#171717" radius={[4, 4, 0, 0]} stackId="stack" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart & Quick Stats */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Payment Method Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e5e5",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Usage"]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions Summary */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-sm gap-1">
              View All
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer rounded px-2 -mx-2"
                  onClick={() => setSelectedTransaction(txn)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center">
                      {getPaymentMethodIcon(txn.paymentMethod)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{txn.student.name}</p>
                      <p className="text-xs text-muted-foreground">{txn.id} - {txn.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">${txn.amount}</p>
                      <p className="text-xs text-muted-foreground">Fee: ${txn.platformFee}</p>
                    </div>
                    <Badge variant={getStatusVariant(txn.status)} className="capitalize">
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID, student, or counsellor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <CalendarIcon className="h-4 w-4" />
                    {dateRange ? format(dateRange, "MMM d, yyyy") : "Date Range"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={dateRange}
                    onSelect={setDateRange}
                  />
                </PopoverContent>
              </Popover>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-medium">All Transactions</CardTitle>
          <span className="text-sm text-muted-foreground">{filteredTransactions.length} transactions</span>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Transaction</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Counsellor</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Session</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Amount</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Platform Fee</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Method</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-2">
                      <div>
                        <p className="text-sm font-medium">{txn.student.name}</p>
                        <p className="text-xs text-muted-foreground">{txn.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2 hidden md:table-cell">
                      <p className="text-sm">{txn.counsellor.name}</p>
                    </td>
                    <td className="py-4 px-2 hidden lg:table-cell">
                      <p className="text-sm font-mono text-muted-foreground">{txn.sessionId}</p>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <p className="text-sm font-semibold">${txn.amount}</p>
                    </td>
                    <td className="py-4 px-2 hidden xl:table-cell">
                      <p className="text-sm text-muted-foreground">${txn.platformFee}</p>
                    </td>
                    <td className="py-4 px-2 hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        {getPaymentMethodIcon(txn.paymentMethod)}
                        <span className="text-sm">{txn.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <Badge variant={getStatusVariant(txn.status)} className="capitalize">
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-2 hidden sm:table-cell">
                      <div>
                        <p className="text-sm">{txn.date}</p>
                        <p className="text-xs text-muted-foreground">{txn.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setSelectedTransaction(txn)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing 1-{filteredTransactions.length} of {filteredTransactions.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Detail Modal */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Full payment breakdown for transaction {selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant={getStatusVariant(selectedTransaction.status)} className="capitalize">
                  {selectedTransaction.status}
                </Badge>
              </div>

              {/* Payment Breakdown */}
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Session Amount</span>
                  <span className="text-sm font-semibold">${selectedTransaction.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Platform Fee (20%)</span>
                  <span className="text-sm text-muted-foreground">-${selectedTransaction.platformFee}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Counsellor Payout</span>
                    <span className="text-sm font-semibold">${selectedTransaction.counsellorPayout}</span>
                  </div>
                </div>
              </div>

              {/* Session Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Session Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Session ID</p>
                    <p className="font-mono">{selectedTransaction.sessionId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date & Time</p>
                    <p>{selectedTransaction.date} at {selectedTransaction.time}</p>
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Student</h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center font-medium text-sm">
                    {selectedTransaction.student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedTransaction.student.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedTransaction.student.email}</p>
                  </div>
                </div>
              </div>

              {/* Counsellor Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Counsellor</h4>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium text-sm">
                    {selectedTransaction.counsellor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedTransaction.counsellor.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedTransaction.counsellor.email}</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between py-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Payment Method</span>
                <div className="flex items-center gap-2">
                  {getPaymentMethodIcon(selectedTransaction.paymentMethod)}
                  <span className="text-sm">{selectedTransaction.paymentMethod}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {selectedTransaction?.status === "paid" && (
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Receipt
              </Button>
            )}
            {selectedTransaction?.status === "paid" && (
              <Button variant="destructive">
                Process Refund
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
