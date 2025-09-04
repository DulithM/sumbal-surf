import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, Wallet, Settings, Download, DollarSign, Activity, UserPlus, BarChart3 } from "lucide-react"
import { CompanyNavigation } from "@/components/company-navigation"
import { EmployeeManagement } from "@/components/dashboard/company/employee-management"
import { DiscountManagement } from "@/components/dashboard/company/discount-management"
import { UsageAnalytics } from "@/components/dashboard/company/usage-analytics"
import { MealWalletManagement } from "@/components/dashboard/company/meal-wallet-management"
import { AnalyticsDashboard } from "@/components/dashboard/company/analytics-dashboard"
import { CorporateReporting } from "@/components/dashboard/company/corporate-reporting"

export default function CompanyDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyNavigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Company Dashboard</h1>
            <p className="text-muted-foreground">Manage your employee dining benefits program</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Employees
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary">+12</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. 2,520,000</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary">+18%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary">+5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. 4,680,000</div>
              <p className="text-xs text-muted-foreground">Available employee funds</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="wallets">Meal Wallets</TabsTrigger>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New employee joined</p>
                        <p className="text-xs text-muted-foreground">Sarah Johnson activated her account</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      2h ago
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Large order processed</p>
                        <p className="text-xs text-muted-foreground">Team lunch for 15 people - $340</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      5h ago
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Wallet topped up</p>
                        <p className="text-xs text-muted-foreground">Added $5,000 to company wallet</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      1d ago
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Usage Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Lunch Orders</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Dinner Orders</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Weekend Usage</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Group Orders</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <UserPlus className="w-6 h-6" />
                    <span className="text-sm">Add Employee</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Wallet className="w-6 h-6" />
                    <span className="text-sm">Top Up Wallet</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Settings className="w-6 h-6" />
                    <span className="text-sm">Adjust Discounts</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                    <Download className="w-6 h-6" />
                    <span className="text-sm">Export Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>

          <TabsContent value="wallets">
            <MealWalletManagement companyId="comp_1" />
          </TabsContent>

          <TabsContent value="discounts">
            <DiscountManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard companyId="comp_1" />
          </TabsContent>

          <TabsContent value="reports">
            <CorporateReporting companyId="comp_1" />
          </TabsContent>

          <TabsContent value="settings">
            <DiscountManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
