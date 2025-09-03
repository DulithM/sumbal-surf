import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, BarChart3, PieChart, Calendar, Users, DollarSign, Clock } from "lucide-react"

export function UsageAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Usage Analytics</h2>
        <p className="text-muted-foreground">Detailed insights into your employee dining program</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-secondary" />
              <span className="text-secondary">+12%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34.20</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-secondary" />
              <span className="text-secondary">+8%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12-2 PM</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>67% of daily orders</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1 text-secondary" />
              <span className="text-secondary">+0.2</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Popular Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Popular Menu Items</span>
            </CardTitle>
            <CardDescription>Most ordered items by your employees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Surf & Turf Bowl</p>
                    <p className="text-sm text-muted-foreground">234 orders</p>
                  </div>
                </div>
                <Badge variant="secondary">18.7%</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-secondary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Coastal Fish Tacos</p>
                    <p className="text-sm text-muted-foreground">189 orders</p>
                  </div>
                </div>
                <Badge variant="outline">15.2%</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Ocean Breeze Salad</p>
                    <p className="text-sm text-muted-foreground">156 orders</p>
                  </div>
                </div>
                <Badge variant="outline">12.5%</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Grilled Mahi Sandwich</p>
                    <p className="text-sm text-muted-foreground">143 orders</p>
                  </div>
                </div>
                <Badge variant="outline">11.5%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Usage by Department</span>
            </CardTitle>
            <CardDescription>Which departments use the benefits most</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Engineering</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
                <p className="text-xs text-muted-foreground">67 employees, $2,340 spent</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sales</span>
                  <span className="font-medium">76%</span>
                </div>
                <Progress value={76} className="h-2" />
                <p className="text-xs text-muted-foreground">45 employees, $1,890 spent</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Marketing</span>
                  <span className="font-medium">82%</span>
                </div>
                <Progress value={82} className="h-2" />
                <p className="text-xs text-muted-foreground">23 employees, $980 spent</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>HR</span>
                  <span className="font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
                <p className="text-xs text-muted-foreground">8 employees, $420 spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time-based Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Usage Patterns</span>
            </CardTitle>
            <CardDescription>When your employees dine most frequently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Daily Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monday</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tuesday</span>
                    <span>19%</span>
                  </div>
                  <Progress value={19} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Wednesday</span>
                    <span>18%</span>
                  </div>
                  <Progress value={18} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Thursday</span>
                    <span>21%</span>
                  </div>
                  <Progress value={21} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Friday</span>
                    <span>19%</span>
                  </div>
                  <Progress value={19} className="h-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Savings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Cost Analysis</span>
            </CardTitle>
            <CardDescription>Employee savings and program ROI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-secondary/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Employee Savings</span>
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary">$12,450</div>
                <p className="text-xs text-muted-foreground">Total saved this month</p>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Program Cost</span>
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">$8,420</div>
                <p className="text-xs text-muted-foreground">Company contribution</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">ROI</span>
                  <TrendingUp className="w-4 h-4 text-foreground" />
                </div>
                <div className="text-2xl font-bold">148%</div>
                <p className="text-xs text-muted-foreground">Employee satisfaction value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
