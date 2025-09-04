"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Download, 
  FileText, 
  Calendar as CalendarIcon, 
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  CreditCard,
  Wallet,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react"
import { formatCurrency, formatDate, formatAmount } from "@/lib/utils"
import { cn } from "@/lib/utils"
import type { Employee, Transaction, Loan, Order } from "@/lib/types"

interface CorporateReportingProps {
  companyId: string
}

export function CorporateReporting({ companyId }: CorporateReportingProps) {
  const [selectedReport, setSelectedReport] = useState<string>("monthly")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  })
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock data for reports
  const monthlyReport = {
    period: "December 2024",
    totalEmployees: 250,
    activeEmployees: 198,
    totalOrders: 1247,
    totalRevenue: 2520000,
    totalSpending: 2520000,
    totalTopUps: 1200000,
    totalLoans: 45,
    totalLoanAmount: 675000,
    repaidLoans: 32,
    defaultedLoans: 2,
    averageOrderValue: 2022,
    engagementRate: 79.2,
    topDepartments: [
      { department: "Engineering", orders: 456, revenue: 921000, employees: 78 },
      { department: "Marketing", orders: 234, revenue: 473000, employees: 45 },
      { department: "HR", orders: 189, revenue: 382000, employees: 32 },
      { department: "Finance", orders: 156, revenue: 315000, employees: 28 },
      { department: "Operations", orders: 212, revenue: 429000, employees: 35 }
    ],
    topItems: [
      { name: "Rice and Curry", orders: 456, revenue: 205200 },
      { name: "Kottu Roti", orders: 234, revenue: 88920 },
      { name: "String Hoppers", orders: 189, revenue: 60480 },
      { name: "King Coconut", orders: 367, revenue: 44040 }
    ],
    paymentMethods: [
      { method: "Wallet", count: 810, percentage: 65, amount: 1638000 },
      { method: "Loan", count: 249, percentage: 20, amount: 504000 },
      { method: "Cash", count: 125, percentage: 10, amount: 252000 },
      { method: "Card", count: 63, percentage: 5, amount: 126000 }
    ],
    loanMetrics: {
      totalDisbursed: 675000,
      totalRepaid: 540000,
      outstanding: 135000,
      averageLoanAmount: 15000,
      repaymentRate: 80
    }
  }

  const employeeReport = [
    {
      id: "emp_1",
      name: "Sarah Perera",
      department: "Engineering",
      employeeId: "EMP001",
      totalOrders: 23,
      totalSpending: 46500,
      walletBalance: 8500,
      outstandingLoan: 0,
      lastOrder: new Date("2024-12-15"),
      engagement: "High"
    },
    {
      id: "emp_2",
      name: "Rajesh Kumar",
      department: "Marketing",
      employeeId: "EMP002",
      totalOrders: 18,
      totalSpending: 36400,
      walletBalance: 3200,
      outstandingLoan: 5000,
      lastOrder: new Date("2024-12-14"),
      engagement: "Medium"
    },
    {
      id: "emp_3",
      name: "Priya Fernando",
      department: "HR",
      employeeId: "EMP003",
      totalOrders: 31,
      totalSpending: 62700,
      walletBalance: 12000,
      outstandingLoan: 0,
      lastOrder: new Date("2024-12-13"),
      engagement: "High"
    }
  ]

  const loanReport = [
    {
      id: "loan_1",
      employeeName: "Rajesh Kumar",
      employeeId: "EMP002",
      amount: 5000,
      purpose: "meal",
      status: "disbursed",
      disbursedDate: new Date("2024-12-10"),
      dueDate: new Date("2025-03-10"),
      monthlyPayment: 1700,
      remainingBalance: 3400,
      repayments: 1
    },
    {
      id: "loan_2",
      employeeName: "John Silva",
      employeeId: "EMP004",
      amount: 8000,
      purpose: "catering",
      status: "repaid",
      disbursedDate: new Date("2024-10-15"),
      dueDate: new Date("2024-12-15"),
      monthlyPayment: 2700,
      remainingBalance: 0,
      repayments: 3
    }
  ]

  const generateReport = async (reportType: string) => {
    setIsGenerating(true)
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would generate and download the report
    console.log(`Generating ${reportType} report for period:`, dateRange)
    
    setIsGenerating(false)
  }

  const getEngagementBadge = (engagement: string) => {
    const config = {
      High: { variant: "default" as const, color: "text-green-600" },
      Medium: { variant: "secondary" as const, color: "text-yellow-600" },
      Low: { variant: "destructive" as const, color: "text-red-600" }
    }
    
    const badgeConfig = config[engagement as keyof typeof config] || config.Medium
    
    return (
      <Badge variant={badgeConfig.variant} className={badgeConfig.color}>
        {engagement}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const config = {
      disbursed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      repaid: { variant: "outline" as const, icon: CheckCircle, color: "text-blue-600" },
      defaulted: { variant: "destructive" as const, icon: AlertTriangle, color: "text-red-600" },
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" }
    }
    
    const statusConfig = config[status as keyof typeof config] || config.pending
    const Icon = statusConfig.icon
    
    return (
      <Badge variant={statusConfig.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Corporate Reports</h2>
          <p className="text-muted-foreground">
            Generate comprehensive reports for your meal program
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to })
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button 
            size="sm" 
            onClick={() => generateReport(selectedReport)}
            disabled={isGenerating}
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Export Report"}
          </Button>
        </div>
      </div>

      {/* Report Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
          <CardDescription>Select the type of report to generate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant={selectedReport === "monthly" ? "default" : "outline"}
              onClick={() => setSelectedReport("monthly")}
              className="h-20 flex-col space-y-2"
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm">Monthly Summary</span>
            </Button>
            <Button
              variant={selectedReport === "employee" ? "default" : "outline"}
              onClick={() => setSelectedReport("employee")}
              className="h-20 flex-col space-y-2"
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Employee Report</span>
            </Button>
            <Button
              variant={selectedReport === "loan" ? "default" : "outline"}
              onClick={() => setSelectedReport("loan")}
              className="h-20 flex-col space-y-2"
            >
              <CreditCard className="w-6 h-6" />
              <span className="text-sm">Loan Report</span>
            </Button>
            <Button
              variant={selectedReport === "financial" ? "default" : "outline"}
              onClick={() => setSelectedReport("financial")}
              className="h-20 flex-col space-y-2"
            >
              <DollarSign className="w-6 h-6" />
              <span className="text-sm">Financial Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <Tabs defaultValue="summary" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {selectedReport === "monthly" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(monthlyReport.totalRevenue)}</div>
                    <p className="text-xs text-muted-foreground">
                      {monthlyReport.totalOrders} orders
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{monthlyReport.activeEmployees}</div>
                    <p className="text-xs text-muted-foreground">
                      {monthlyReport.engagementRate}% engagement
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{monthlyReport.totalLoans}</div>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(monthlyReport.totalLoanAmount)} disbursed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(monthlyReport.averageOrderValue)}</div>
                    <p className="text-xs text-muted-foreground">
                      Per order
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Departments */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Departments</CardTitle>
                  <CardDescription>Revenue and order metrics by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Employees</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Avg per Employee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyReport.topDepartments.map((dept) => (
                        <TableRow key={dept.department}>
                          <TableCell className="font-medium">{dept.department}</TableCell>
                          <TableCell>{dept.employees}</TableCell>
                          <TableCell>{dept.orders}</TableCell>
                          <TableCell>{formatCurrency(dept.revenue)}</TableCell>
                          <TableCell>{formatCurrency(dept.revenue / dept.employees)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedReport === "employee" && (
            <Card>
              <CardHeader>
                <CardTitle>Employee Performance Report</CardTitle>
                <CardDescription>Individual employee meal program participation</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spending</TableHead>
                      <TableHead>Wallet Balance</TableHead>
                      <TableHead>Outstanding Loan</TableHead>
                      <TableHead>Engagement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employeeReport.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.employeeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.totalOrders}</TableCell>
                        <TableCell>{formatCurrency(employee.totalSpending)}</TableCell>
                        <TableCell>{formatCurrency(employee.walletBalance)}</TableCell>
                        <TableCell>
                          {employee.outstandingLoan > 0 ? (
                            <span className="text-red-600 font-medium">
                              {formatCurrency(employee.outstandingLoan)}
                            </span>
                          ) : (
                            <span className="text-green-600">None</span>
                          )}
                        </TableCell>
                        <TableCell>{getEngagementBadge(employee.engagement)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {selectedReport === "loan" && (
            <div className="space-y-6">
              {/* Loan Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Disbursed</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(monthlyReport.loanMetrics.totalDisbursed)}</div>
                    <p className="text-xs text-muted-foreground">
                      All time
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Repaid</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(monthlyReport.loanMetrics.totalRepaid)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {monthlyReport.loanMetrics.repaymentRate}% repayment rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatCurrency(monthlyReport.loanMetrics.outstanding)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      To be collected
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
                      {formatCurrency(monthlyReport.loanMetrics.averageLoanAmount)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Per loan
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Loan Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Individual loan status and repayment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Disbursed</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Remaining</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loanReport.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{loan.employeeName}</div>
                              <div className="text-sm text-muted-foreground">{loan.employeeId}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(loan.amount)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {loan.purpose.charAt(0).toUpperCase() + loan.purpose.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(loan.status)}</TableCell>
                          <TableCell>{formatDate(loan.disbursedDate)}</TableCell>
                          <TableCell>{formatDate(loan.dueDate)}</TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(loan.remainingBalance)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Report Data</CardTitle>
              <CardDescription>Comprehensive breakdown of all metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Payment Methods */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Payment Method Distribution</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyReport.paymentMethods.map((method) => (
                        <TableRow key={method.method}>
                          <TableCell className="font-medium">{method.method}</TableCell>
                          <TableCell>{method.count}</TableCell>
                          <TableCell>{method.percentage}%</TableCell>
                          <TableCell>{formatCurrency(method.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Top Items */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Popular Menu Items</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Avg Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyReport.topItems.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.orders}</TableCell>
                          <TableCell>{formatCurrency(item.revenue)}</TableCell>
                          <TableCell>{formatCurrency(item.revenue / item.orders)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>Key insights and trends from your meal program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Insights</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">High Engagement</span>
                      </div>
                      <p className="text-sm text-green-700">
                        {monthlyReport.engagementRate}% of employees are actively using the meal program
                      </p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Strong Revenue</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Average order value of {formatCurrency(monthlyReport.averageOrderValue)} shows healthy spending
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-orange-800">Loan Performance</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        {monthlyReport.loanMetrics.repaymentRate}% repayment rate indicates good loan management
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recommendations</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-2">Increase Engagement</h4>
                      <p className="text-sm text-gray-600">
                        Consider offering incentives to the {monthlyReport.totalEmployees - monthlyReport.activeEmployees} inactive employees
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-2">Optimize Menu</h4>
                      <p className="text-sm text-gray-600">
                        Rice and Curry is your top performer - consider expanding similar traditional options
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h4 className="font-medium mb-2">Loan Management</h4>
                      <p className="text-sm text-gray-600">
                        Monitor the {monthlyReport.defaultedLoans} defaulted loans and consider adjusting terms
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Choose your preferred export format and options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <FileText className="w-6 h-6" />
                    <span>PDF Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <BarChart3 className="w-6 h-6" />
                    <span>Excel Spreadsheet</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <PieChart className="w-6 h-6" />
                    <span>CSV Data</span>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Export Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="include-charts">Include Charts</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="include-details">Include Detailed Data</Label>
                      <Select defaultValue="yes">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Generate & Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
