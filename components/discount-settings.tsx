import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Percent, Clock, DollarSign, Users, Save, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function DiscountSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Discount Settings</h2>
        <p className="text-muted-foreground">Configure employee discount rates and spending limits</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          For advanced discount rules and conditions, use the{" "}
          <Button variant="link" className="p-0 h-auto">
            Discount Management
          </Button>{" "}
          tab to create custom rules with time restrictions, group requirements, and more.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Discount Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Percent className="w-5 h-5" />
              <span>Basic Discount Rates</span>
            </CardTitle>
            <CardDescription>Set simple discount percentages for common scenarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Standard Discount</Label>
                <div className="flex items-center space-x-4">
                  <Slider defaultValue={[15]} max={50} step={5} className="flex-1" />
                  <Badge variant="secondary">15%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Default discount for all employees</p>
              </div>

              <div className="space-y-2">
                <Label>Lunch Hours Bonus</Label>
                <div className="flex items-center space-x-4">
                  <Slider defaultValue={[25]} max={50} step={5} className="flex-1" />
                  <Badge variant="secondary">25%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">Additional discount during 11 AM - 2 PM</p>
              </div>

              <div className="space-y-2">
                <Label>Group Order Discount</Label>
                <div className="flex items-center space-x-4">
                  <Slider defaultValue={[30]} max={50} step={5} className="flex-1" />
                  <Badge variant="secondary">30%</Badge>
                </div>
                <p className="text-xs text-muted-foreground">For orders of 5+ people</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spending Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span>Spending Limits</span>
            </CardTitle>
            <CardDescription>Control employee spending with daily and monthly limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="daily-limit">Daily Limit per Employee</Label>
                <Input id="daily-limit" type="number" placeholder="50" defaultValue="50" />
                <p className="text-xs text-muted-foreground">Maximum amount an employee can spend per day</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-limit">Monthly Limit per Employee</Label>
                <Input id="monthly-limit" type="number" placeholder="500" defaultValue="500" />
                <p className="text-xs text-muted-foreground">Maximum amount an employee can spend per month</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-budget">Monthly Company Budget</Label>
                <Input id="company-budget" type="number" placeholder="10000" defaultValue="10000" />
                <p className="text-xs text-muted-foreground">Total budget allocated for employee dining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Time Restrictions</span>
            </CardTitle>
            <CardDescription>Set when employees can use their dining benefits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekend Access</Label>
                  <p className="text-xs text-muted-foreground">Allow benefit usage on weekends</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>After Hours Access</Label>
                  <p className="text-xs text-muted-foreground">Allow usage after 6 PM on weekdays</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Business Hours</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="time" defaultValue="09:00" />
                  <Input type="time" defaultValue="18:00" />
                </div>
                <p className="text-xs text-muted-foreground">Standard business hours for benefit usage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Programs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Special Programs</span>
            </CardTitle>
            <CardDescription>Configure special discount programs and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Birthday Bonus</Label>
                  <p className="text-xs text-muted-foreground">50% discount on employee birthdays</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Team Building Events</Label>
                  <p className="text-xs text-muted-foreground">Special rates for company events</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Employee Welcome</Label>
                  <p className="text-xs text-muted-foreground">Free meal for first-week employees</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
