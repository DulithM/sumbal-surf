"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  CreditCard,
  Wallet,
  Activity,
  Download,
  Calendar,
  Target,
  AlertTriangle
} from "lucide-react"
import { formatCurrency, formatAmount, formatDate } from "@/lib/utils"
import type { Analytics } from "@/lib/types"

interface AnalyticsDashboardProps {
  companyId: string
}

export function AnalyticsDashboard({ companyId }: AnalyticsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly')
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock analytics data
  const mockAnalytics: Analytics = {
    companyId: "comp_1",
    period: "monthly",
    date: new Date("2024-12-15"),
    metrics: {
      totalOrders: 1247,
      totalRevenue: 2520000,
      totalEmployees: 250,
      activeEmployees: 198,
      averageOrderValue: 2022,
      popularItems: [
        { itemId: "item_1", itemName: "Rice and Curry", orderCount: 456, revenue: 205200 },
        { itemId: "item_2", itemName: "Kottu Roti", orderCount: 234, revenue: 88920 },
        { itemId: "item_3", itemName: "String Hoppers", orderCount: 189, revenue: 60480 },
        { itemId: "item_4", itemName: "King Coconut", orderCount: 367, revenue: 44040 }
      ],
      loanMetrics: {
        totalLoans: 45,
        totalLoanAmount: 675000,
        repaidLoans: 32,
        defaultedLoans: 2,
        averageLoanAmount: 15000
      },
      walletMetrics: {
        totalWalletBalance: 4680000,
        totalTopUps: 1200000,
        totalSpending: 2520000,
        averageBalance: 23636
      }
    }
  }

  // Mock time series data
  const timeSeriesData = [
    { date: '2024-01', orders: 89, revenue: 180000, employees: 45 },
    { date: '2024-02', orders: 112, revenue: 226000, employees: 52 },
    { date: '2024-03', orders: 134, revenue: 271000, employees: 61 },
    { date: '2024-04', orders: 156, revenue: 315000, employees: 68 },
    { date: '2024-05', orders: 178, revenue: 360000, employees: 74 },
    { date: '2024-06', orders: 201, revenue: 406000, employees: 81 },
    { date: '2024-07', orders: 223, revenue: 451000, employees: 87 },
    { date: '2024-08', orders: 245, revenue: 495000, employees: 92 },
    { date: '2024-09', orders: 267, revenue: 540000, employees: 98 },
    { date: '2024-10', orders: 289, revenue: 584000, employees: 103 },
    { date: '2024-11', orders: 312, revenue: 631000, employees: 109 },
    { date: '2024-12', orders: 334, revenue: 675000, employees: 115 }
  ]

  const paymentMethodData = [
    { name: 'Wallet', value: 65, count: 810, color: '#8884d8' },
    { name: 'Loan', value: 20, count: 249, color: '#82ca9d' },
    { name: 'Cash', value: 10, count: 125, color: '#ffc658' },
    { name: 'Card', value: 5, count: 63, color: '#ff7300' }
  ]

  const departmentData = [
    { department: 'Engineering', orders: 456, revenue: 921000, employees: 78 },
    { department: 'Marketing', orders: 234, revenue: 473000, employees: 45 },
    { department: 'HR', orders: 189, revenue: 382000, employees: 32 },
    { department: 'Finance', orders: 156, revenue: 315000, employees: 28 },
    { department: 'Operations', orders: 212, revenue: 429000, employees: 35 }
  ]

  useEffect(() => {
    // Simulate API call
    const fetchAnalytics = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setAnalytics(mockAnalytics)
      setIsLoading(false)
    }

    fetchAnalytics()
  }, [selectedPeriod])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded animate-pulse mb-2" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time insights into your meal program performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.metrics.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.metrics.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.metrics.activeEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((analytics.metrics.activeEmployees / analytics.metrics.totalEmployees) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(analytics.metrics.averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="wallets">Wallets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `Rs. ${(value / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Popular Items */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Menu Items</CardTitle>
              <CardDescription>Top performing items this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.metrics.popularItems.map((item, index) => (
                  <div key={item.itemId} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{item.itemName}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.orderCount} orders
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(item.revenue)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(item.revenue / item.orderCount)} avg
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Department</CardTitle>
                <CardDescription>Department-wise revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis tickFormatter={(value) => `Rs. ${(value / 1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Orders vs Revenue</CardTitle>
                <CardDescription>Correlation between orders and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="orders" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Engagement</CardTitle>
                <CardDescription>Employee participation metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Users</span>
                    <span className="font-medium">
                      {analytics.metrics.activeEmployees} / {analytics.metrics.totalEmployees}
                    </span>
                  </div>
                  <Progress 
                    value={(analytics.metrics.activeEmployees / analytics.metrics.totalEmployees) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Engagement Rate</span>
                    <span className="font-medium">
                      {Math.round((analytics.metrics.activeEmployees / analytics.metrics.totalEmployees) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(analytics.metrics.activeEmployees / analytics.metrics.totalEmployees) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(analytics.metrics.totalOrders / analytics.metrics.activeEmployees)}
                    </div>
                    <div className="text-sm text-muted-foreground">Orders per Employee</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/10 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">
                      {formatCurrency(analytics.metrics.totalRevenue / analytics.metrics.activeEmployees)}
                    </div>
                    <div className="text-sm text-muted-foreground">Revenue per Employee</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Orders by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.metrics.loanMetrics.totalLoans}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(analytics.metrics.loanMetrics.totalLoanAmount)} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Repaid Loans</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {analytics.metrics.loanMetrics.repaidLoans}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((analytics.metrics.loanMetrics.repaidLoans / analytics.metrics.loanMetrics.totalLoans) * 100)}% success rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Defaulted Loans</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {analytics.metrics.loanMetrics.defaultedLoans}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((analytics.metrics.loanMetrics.defaultedLoans / analytics.metrics.loanMetrics.totalLoans) * 100)}% default rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Loan Amount</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analytics.metrics.loanMetrics.averageLoanAmount)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Per loan
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wallets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Wallet Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analytics.metrics.walletMetrics.totalWalletBalance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all employees
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Top-ups</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analytics.metrics.walletMetrics.totalTopUps)}
                </div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analytics.metrics.walletMetrics.totalSpending)}
                </div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Balance</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analytics.metrics.walletMetrics.averageBalance)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Per employee
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
