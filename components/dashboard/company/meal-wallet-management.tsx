"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Wallet, 
  Plus, 
  Minus, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  CreditCard,
  History
} from "lucide-react"
import { formatCurrency, formatAmount, formatDate, formatRelativeTime } from "@/lib/utils"
import type { Employee, Transaction, Loan } from "@/lib/types"

interface MealWalletManagementProps {
  companyId: string
}

export function MealWalletManagement({ companyId }: MealWalletManagementProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [topUpAmount, setTopUpAmount] = useState("")
  const [isTopUpDialogOpen, setIsTopUpDialogOpen] = useState(false)

  // Mock data - in real app, this would come from API
  const employees: Employee[] = [
    {
      id: "emp_1",
      companyId: "comp_1",
      employeeId: "EMP001",
      name: "Sarah Perera",
      email: "sarah.perera@company.com",
      phone: "+94771234567",
      department: "Engineering",
      position: "Software Engineer",
      salary: 120000,
      walletBalance: 8500,
      loanLimit: 15000,
      outstandingLoan: 0,
      isActive: true,
      joinedAt: new Date("2024-01-15"),
      lastOrderAt: new Date("2024-12-15"),
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-12-15")
    },
    {
      id: "emp_2",
      companyId: "comp_1",
      employeeId: "EMP002",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@company.com",
      phone: "+94771234568",
      department: "Marketing",
      position: "Marketing Manager",
      salary: 95000,
      walletBalance: 3200,
      loanLimit: 12000,
      outstandingLoan: 5000,
      isActive: true,
      joinedAt: new Date("2024-02-01"),
      lastOrderAt: new Date("2024-12-14"),
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-12-14")
    },
    {
      id: "emp_3",
      companyId: "comp_1",
      employeeId: "EMP003",
      name: "Priya Fernando",
      email: "priya.fernando@company.com",
      phone: "+94771234569",
      department: "HR",
      position: "HR Specialist",
      salary: 80000,
      walletBalance: 12000,
      loanLimit: 10000,
      outstandingLoan: 0,
      isActive: true,
      joinedAt: new Date("2024-03-10"),
      lastOrderAt: new Date("2024-12-13"),
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-12-13")
    }
  ]

  const transactions: Transaction[] = [
    {
      id: "txn_1",
      employeeId: "emp_1",
      companyId: "comp_1",
      type: "meal_purchase",
      amount: 450,
      description: "Rice and Curry Lunch",
      orderId: "ORD001",
      paymentMethod: "wallet",
      status: "completed",
      createdAt: new Date("2024-12-15T12:30:00"),
      updatedAt: new Date("2024-12-15T12:30:00")
    },
    {
      id: "txn_2",
      employeeId: "emp_1",
      companyId: "comp_1",
      type: "wallet_topup",
      amount: 5000,
      description: "Monthly allowance top-up",
      paymentMethod: "wallet",
      status: "completed",
      createdAt: new Date("2024-12-01T09:00:00"),
      updatedAt: new Date("2024-12-01T09:00:00")
    },
    {
      id: "txn_3",
      employeeId: "emp_2",
      companyId: "comp_1",
      type: "loan_disbursement",
      amount: 5000,
      description: "Emergency meal loan",
      loanId: "loan_1",
      paymentMethod: "loan",
      status: "completed",
      createdAt: new Date("2024-12-10T14:20:00"),
      updatedAt: new Date("2024-12-10T14:20:00")
    }
  ]

  const loans: Loan[] = [
    {
      id: "loan_1",
      employeeId: "emp_2",
      companyId: "comp_1",
      amount: 5000,
      purpose: "meal",
      status: "disbursed",
      interestRate: 12,
      termMonths: 3,
      monthlyPayment: 1700,
      remainingBalance: 3400,
      disbursedAt: new Date("2024-12-10"),
      dueDate: new Date("2025-03-10"),
      createdAt: new Date("2024-12-10"),
      updatedAt: new Date("2024-12-15")
    }
  ]

  const totalWalletBalance = employees.reduce((sum, emp) => sum + emp.walletBalance, 0)
  const totalOutstandingLoans = employees.reduce((sum, emp) => sum + emp.outstandingLoan, 0)
  const activeEmployees = employees.filter(emp => emp.isActive).length
  const lowBalanceEmployees = employees.filter(emp => emp.walletBalance < 2000).length

  const handleTopUp = () => {
    if (!selectedEmployee || !topUpAmount) return
    
    const amount = parseFloat(topUpAmount)
    if (amount <= 0) return
    
    // In real app, this would call API
    console.log(`Topping up ${selectedEmployee.name} with Rs. ${amount}`)
    setIsTopUpDialogOpen(false)
    setTopUpAmount("")
    setSelectedEmployee(null)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      failed: { variant: "destructive" as const, icon: AlertTriangle, color: "text-red-600" },
      disbursed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      repaid: { variant: "outline" as const, icon: CheckCircle, color: "text-blue-600" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalWalletBalance)}</div>
            <p className="text-xs text-muted-foreground">
              Across {activeEmployees} active employees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Loans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalOutstandingLoans)}</div>
            <p className="text-xs text-muted-foreground">
              {loans.filter(loan => loan.status === 'disbursed').length} active loans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Balance Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowBalanceEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Employees with balance &lt; Rs. 2,000
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalWalletBalance / activeEmployees)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per active employee
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">Employee Wallets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Wallet Management</CardTitle>
              <CardDescription>
                Manage employee meal wallets, top-ups, and loan limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Wallet Balance</TableHead>
                    <TableHead>Outstanding Loan</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {employee.employeeId}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {formatCurrency(employee.walletBalance)}
                          </span>
                          {employee.walletBalance < 2000 && (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {employee.outstandingLoan > 0 ? (
                          <span className="text-red-600 font-medium">
                            {formatCurrency(employee.outstandingLoan)}
                          </span>
                        ) : (
                          <span className="text-green-600">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {employee.lastOrderAt ? formatRelativeTime(employee.lastOrderAt) : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.isActive ? "default" : "secondary"}>
                          {employee.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog open={isTopUpDialogOpen && selectedEmployee?.id === employee.id} onOpenChange={(open) => {
                            if (open) {
                              setSelectedEmployee(employee)
                              setIsTopUpDialogOpen(true)
                            } else {
                              setIsTopUpDialogOpen(false)
                              setSelectedEmployee(null)
                            }
                          }}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Plus className="w-4 h-4 mr-1" />
                                Top Up
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Top Up Wallet</DialogTitle>
                                <DialogDescription>
                                  Add funds to {employee.name}'s meal wallet
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="amount">Amount (LKR)</Label>
                                  <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    value={topUpAmount}
                                    onChange={(e) => setTopUpAmount(e.target.value)}
                                  />
                                </div>
                                <Alert>
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertDescription>
                                    Current balance: {formatCurrency(employee.walletBalance)}
                                  </AlertDescription>
                                </Alert>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsTopUpDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleTopUp}>
                                  Top Up Wallet
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all wallet transactions and loan activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => {
                    const employee = employees.find(emp => emp.id === transaction.employeeId)
                    return (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.createdAt, true)}</TableCell>
                        <TableCell>{employee?.name || 'Unknown'}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {transaction.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Management</CardTitle>
              <CardDescription>
                Monitor employee loans and repayment status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Monthly Payment</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loans.map((loan) => {
                    const employee = employees.find(emp => emp.id === loan.employeeId)
                    return (
                      <TableRow key={loan.id}>
                        <TableCell>{employee?.name || 'Unknown'}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(loan.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {loan.purpose.charAt(0).toUpperCase() + loan.purpose.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(loan.status)}</TableCell>
                        <TableCell>{formatCurrency(loan.monthlyPayment)}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(loan.remainingBalance)}
                        </TableCell>
                        <TableCell>
                          {loan.dueDate ? formatDate(loan.dueDate) : 'N/A'}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Usage Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>High Balance (&gt; Rs. 5,000)</span>
                    <span className="font-medium">
                      {employees.filter(emp => emp.walletBalance > 5000).length}
                    </span>
                  </div>
                  <Progress 
                    value={(employees.filter(emp => emp.walletBalance > 5000).length / employees.length) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Medium Balance (Rs. 2,000 - 5,000)</span>
                    <span className="font-medium">
                      {employees.filter(emp => emp.walletBalance >= 2000 && emp.walletBalance <= 5000).length}
                    </span>
                  </div>
                  <Progress 
                    value={(employees.filter(emp => emp.walletBalance >= 2000 && emp.walletBalance <= 5000).length / employees.length) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Low Balance (&lt; Rs. 2,000)</span>
                    <span className="font-medium">
                      {employees.filter(emp => emp.walletBalance < 2000).length}
                    </span>
                  </div>
                  <Progress 
                    value={(employees.filter(emp => emp.walletBalance < 2000).length / employees.length) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {loans.filter(loan => loan.status === 'repaid').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Repaid Loans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {loans.filter(loan => loan.status === 'disbursed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Loans</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Loan Amount</span>
                    <span className="font-medium">
                      {formatCurrency(loans.reduce((sum, loan) => sum + loan.amount, 0) / loans.length || 0)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Outstanding</span>
                    <span className="font-medium text-red-600">
                      {formatCurrency(loans.reduce((sum, loan) => sum + loan.remainingBalance, 0))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
