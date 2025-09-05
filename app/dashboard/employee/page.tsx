import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Wallet, ShoppingCart, History, TrendingUp, Star, Plus } from "lucide-react"
import { EmployeeNavigation } from "@/components/employee-navigation"
import { MenuBrowser } from "@/components/dashboard/employee/menu-browser"
import { TransactionHistory } from "@/components/dashboard/employee/transaction-history"
import { EmployeeProfile } from "@/components/dashboard/employee/employee-profile"
import { MealWallet } from "@/components/dashboard/employee/meal-wallet"
import Link from "next/link"

export default function EmployeeDashboardPage() {
  // Mock employee data - in real app, this would come from API
  const employee = {
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
    createdAt: new Date("2025-07-15"),
    updatedAt: new Date("2025-08-03")
  }

  return (
    <div className="min-h-screen bg-background">
      <EmployeeNavigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Meal Wallet</h1>
            <p className="text-muted-foreground">Welcome back, {employee.name}! Manage your meal benefits and loans.</p>
          </div>
          <Button size="sm" asChild>
            <Link href="/payment">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order Now
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <MealWallet employee={employee} />
      </div>
    </div>
  )
}
