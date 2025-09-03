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

export default function EmployeeDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <EmployeeNavigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Dining Benefits</h1>
            <p className="text-muted-foreground">Welcome back, Sarah! Ready for some great food?</p>
          </div>
          <Button size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Order Now
          </Button>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="w-5 h-5 text-primary" />
                <span>Your Wallet</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-3xl font-bold text-primary">$127.50</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Monthly Limit</p>
                    <p className="text-lg font-semibold">$500.00</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Used this month</span>
                    <span>$372.50 / $500.00</span>
                  </div>
                  <Progress value={74.5} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 bg-secondary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Saved</p>
                    <p className="text-xl font-bold text-secondary">$89.20</p>
                  </div>
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Orders This Month</p>
                    <p className="text-xl font-bold text-primary">12</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span>Your Discounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Standard</p>
                    <p className="text-xs text-muted-foreground">All items</p>
                  </div>
                  <Badge variant="secondary">15%</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Lunch Bonus</p>
                    <p className="text-xs text-muted-foreground">11 AM - 2 PM</p>
                  </div>
                  <Badge variant="secondary">25%</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Group Order</p>
                    <p className="text-xs text-muted-foreground">5+ people</p>
                  </div>
                  <Badge variant="secondary">30%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Popular choices and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-sm">Order Lunch</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Star className="w-6 h-6" />
                <span className="text-sm">Favorites</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <History className="w-6 h-6" />
                <span className="text-sm">Reorder</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                <Plus className="w-6 h-6" />
                <span className="text-sm">Group Order</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <MenuBrowser />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Your Savings Summary</span>
                </CardTitle>
                <CardDescription>Track how much you've saved with your dining benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-secondary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">This Month</p>
                    <p className="text-3xl font-bold text-secondary">$89.20</p>
                    <p className="text-xs text-muted-foreground">From 12 orders</p>
                  </div>
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">This Year</p>
                    <p className="text-3xl font-bold text-primary">$1,247</p>
                    <p className="text-xs text-muted-foreground">From 89 orders</p>
                  </div>
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">All Time</p>
                    <p className="text-3xl font-bold">$2,156</p>
                    <p className="text-xs text-muted-foreground">Since joining</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Monthly Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">January 2024</span>
                      <span className="font-medium text-secondary">$156.40</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">February 2024</span>
                      <span className="font-medium text-secondary">$134.20</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">March 2024</span>
                      <span className="font-medium text-secondary">$89.20</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <EmployeeProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
