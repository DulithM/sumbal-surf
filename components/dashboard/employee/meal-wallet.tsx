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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  History,
  Plus,
  Minus,
  Calculator,
  Calendar
} from "lucide-react"
import { formatCurrency, formatAmount, formatDate, formatRelativeTime, calculateMonthlyPayment, validateLoanAmount } from "@/lib/utils"
import Link from "next/link"
import type { Employee, Transaction, Loan, MenuItem } from "@/lib/types"

interface MealWalletProps {
  employee: Employee
}

export function MealWallet({ employee }: MealWalletProps) {
  const [loanAmount, setLoanAmount] = useState("")
  const [loanPurpose, setLoanPurpose] = useState<"meal" | "snack" | "catering" | "emergency">("meal")
  const [loanTerm, setLoanTerm] = useState("3")
  const [isLoanDialogOpen, setIsLoanDialogOpen] = useState(false)

  // Mock data - in real app, this would come from API
  const transactions: Transaction[] = [
    {
      id: "txn_1",
      employeeId: employee.id,
      companyId: employee.companyId,
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
      employeeId: employee.id,
      companyId: employee.companyId,
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
      employeeId: employee.id,
      companyId: employee.companyId,
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
      employeeId: employee.id,
      companyId: employee.companyId,
      amount: 5000,
      purpose: "meal",
      status: "disbursed",
      interestRate: 12,
      termMonths: 3,
      monthlyPayment: 1700,
      remainingBalance: 3400,
      disbursedAt: new Date("2024-12-10"),
      dueDate: new Date("2025-03-10"),
      createdAt: new Date("2025-07-15"),
      updatedAt: new Date("2025-08-03")
    }
  ]

  const menuItems: MenuItem[] = [
    {
      id: "item_1",
      name: "Rice and Curry",
      description: "Traditional Sri Lankan rice with mixed vegetable curry",
      price: 450,
      category: "lunch",
      isHealthy: true,
      isTraditional: true,
      isAvailable: true,
      allergens: ["gluten"],
      nutritionInfo: {
        calories: 650,
        protein: 25,
        carbs: 85,
        fat: 15
      },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "item_2",
      name: "Kottu Roti",
      description: "Chopped roti with vegetables and spices",
      price: 380,
      category: "lunch",
      isHealthy: false,
      isTraditional: true,
      isAvailable: true,
      allergens: ["gluten", "dairy"],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "item_3",
      name: "String Hoppers",
      description: "Steamed rice flour noodles with coconut sambol",
      price: 320,
      category: "lunch",
      isHealthy: true,
      isTraditional: true,
      isAvailable: true,
      allergens: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "item_4",
      name: "King Coconut",
      description: "Fresh king coconut water",
      price: 120,
      category: "beverage",
      isHealthy: true,
      isTraditional: true,
      isAvailable: true,
      allergens: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  const availableLoanAmount = employee.loanLimit - employee.outstandingLoan
  const monthlyPayment = loanAmount ? calculateMonthlyPayment(parseFloat(loanAmount), 12, parseInt(loanTerm)) : 0

  const handleLoanApplication = () => {
    const amount = parseFloat(loanAmount)
    const validation = validateLoanAmount(amount, employee.loanLimit, employee.outstandingLoan)
    
    if (!validation.isValid) {
      alert(validation.message)
      return
    }

    // In real app, this would call API
    console.log(`Applying for loan: Rs. ${amount} for ${loanPurpose}`)
    setIsLoanDialogOpen(false)
    setLoanAmount("")
  }

  const handleOrder = (item: MenuItem) => {
    if (employee.walletBalance < item.price) {
      alert("Insufficient wallet balance. Consider applying for a loan.")
      return
    }

    // In real app, this would call API
    console.log(`Ordering ${item.name} for Rs. ${item.price}`)
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
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(employee.walletBalance)}</div>
            <p className="text-xs text-muted-foreground">
              Available for meals
            </p>
            {employee.walletBalance < 2000 && (
              <Alert className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Low balance! Consider topping up or applying for a loan.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Loan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employee.outstandingLoan > 0 ? formatCurrency(employee.outstandingLoan) : "None"}
            </div>
            <p className="text-xs text-muted-foreground">
              {employee.outstandingLoan > 0 ? "To be deducted from salary" : "No active loans"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Loan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(availableLoanAmount)}</div>
            <p className="text-xs text-muted-foreground">
              Maximum loan limit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="menu" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menu">Menu & Order</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Menu</CardTitle>
              <CardDescription>
                Order healthy traditional Sri Lankan meals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <Card key={item.id} className="relative">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>{item.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">{formatCurrency(item.price)}</div>
                          <div className="flex gap-1 mt-1">
                            {item.isHealthy && (
                              <Badge variant="outline" className="text-xs">Healthy</Badge>
                            )}
                            {item.isTraditional && (
                              <Badge variant="outline" className="text-xs">Traditional</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {item.nutritionInfo && (
                        <div className="text-sm text-muted-foreground mb-4">
                          <div className="grid grid-cols-2 gap-2">
                            <span>Calories: {item.nutritionInfo.calories}</span>
                            <span>Protein: {item.nutritionInfo.protein}g</span>
                            <span>Carbs: {item.nutritionInfo.carbs}g</span>
                            <span>Fat: {item.nutritionInfo.fat}g</span>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {item.allergens.length > 0 && (
                            <span>Allergens: {item.allergens.join(", ")}</span>
                          )}
                        </div>
                        <Button 
                          asChild
                          disabled={!item.isAvailable || employee.walletBalance < item.price}
                          size="sm"
                        >
                          <Link href="/payment">
                            {employee.walletBalance < item.price ? "Insufficient Balance" : "Order Now"}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View your meal purchases and wallet activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{formatDate(transaction.createdAt, true)}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Apply for Loan</CardTitle>
                <CardDescription>
                  Get instant access to meal funds when you need them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loan-amount">Loan Amount (LKR)</Label>
                  <Input
                    id="loan-amount"
                    type="number"
                    placeholder="Enter amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    max={availableLoanAmount}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum: {formatCurrency(availableLoanAmount)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-purpose">Purpose</Label>
                  <Select value={loanPurpose} onValueChange={(value: any) => setLoanPurpose(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meal">Daily Meals</SelectItem>
                      <SelectItem value="snack">Snacks</SelectItem>
                      <SelectItem value="catering">Team Catering</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loan-term">Repayment Term (Months)</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="2">2 Months</SelectItem>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {loanAmount && (
                  <Alert>
                    <Calculator className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-1">
                        <div>Monthly Payment: {formatCurrency(monthlyPayment)}</div>
                        <div>Total Interest: {formatCurrency(monthlyPayment * parseInt(loanTerm) - parseFloat(loanAmount))}</div>
                        <div>Interest Rate: 12% per annum</div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  onClick={handleLoanApplication}
                  disabled={!loanAmount || parseFloat(loanAmount) <= 0}
                  className="w-full"
                >
                  Apply for Loan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Loans</CardTitle>
                <CardDescription>
                  Monitor your loan status and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loans.length > 0 ? (
                  <div className="space-y-4">
                    {loans.map((loan) => (
                      <div key={loan.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{formatCurrency(loan.amount)}</div>
                            <div className="text-sm text-muted-foreground">
                              {loan.purpose.charAt(0).toUpperCase() + loan.purpose.slice(1)} Loan
                            </div>
                          </div>
                          {getStatusBadge(loan.status)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Monthly Payment</div>
                            <div className="font-medium">{formatCurrency(loan.monthlyPayment)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Remaining</div>
                            <div className="font-medium">{formatCurrency(loan.remainingBalance)}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(((loan.amount - loan.remainingBalance) / loan.amount) * 100)}%</span>
                          </div>
                          <Progress 
                            value={((loan.amount - loan.remainingBalance) / loan.amount) * 100} 
                            className="h-2" 
                          />
                        </div>
                        
                        {loan.dueDate && (
                          <div className="text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Due: {formatDate(loan.dueDate)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No active loans</p>
                    <p className="text-sm">Apply for a loan when you need extra funds for meals</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Profile</CardTitle>
              <CardDescription>
                Your meal wallet and loan information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Employee ID</Label>
                    <p className="text-sm text-muted-foreground">{employee.employeeId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-muted-foreground">{employee.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Department</Label>
                    <p className="text-sm text-muted-foreground">{employee.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  
                  <div>
                    <Label className="text-sm font-medium">Loan Limit</Label>
                    <p className="text-sm text-muted-foreground">{formatCurrency(employee.loanLimit)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Joined Date</Label>
                    <p className="text-sm text-muted-foreground">{formatDate(employee.joinedAt)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Order</Label>
                    <p className="text-sm text-muted-foreground">
                      {employee.lastOrderAt ? formatRelativeTime(employee.lastOrderAt) : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
