"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Percent, Plus, Edit } from "lucide-react"

interface DiscountRule {
  id: string
  name: string
  type: "percentage" | "fixed" | "bogo"
  value: number
  conditions: {
    minAmount?: number
    maxAmount?: number
    timeStart?: string
    timeEnd?: string
    daysOfWeek?: number[]
    minPeople?: number
    categories?: string[]
  }
  startDate: Date
  endDate?: Date
  isActive: boolean
  usageCount: number
  maxUsage?: number
}

const mockDiscountRules: DiscountRule[] = [
  {
    id: "1",
    name: "Standard Employee Discount",
    type: "percentage",
    value: 15,
    conditions: {},
    startDate: new Date("2024-01-01"),
    isActive: true,
    usageCount: 1247,
  },
  {
    id: "2",
    name: "Lunch Hour Bonus",
    type: "percentage",
    value: 25,
    conditions: {
      timeStart: "11:00",
      timeEnd: "14:00",
      daysOfWeek: [1, 2, 3, 4, 5],
    },
    startDate: new Date("2024-01-01"),
    isActive: true,
    usageCount: 456,
  },
  {
    id: "3",
    name: "Group Order Special",
    type: "percentage",
    value: 30,
    conditions: {
      minPeople: 5,
      minAmount: 100,
    },
    startDate: new Date("2024-01-01"),
    isActive: true,
    usageCount: 89,
  },
]

export function DiscountManagement() {
  const [discountRules, setDiscountRules] = useState<DiscountRule[]>(mockDiscountRules)
  const [isCreating, setIsCreating] = useState(false)
  const [editingRule, setEditingRule] = useState<DiscountRule | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Discount Management</h2>
          <p className="text-muted-foreground">Create and manage discount rules for your employees</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Discount Rule
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Rules</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {discountRules
            .filter((rule) => rule.isActive)
            .map((rule) => (
              <DiscountRuleCard
                key={rule.id}
                rule={rule}
                onEdit={setEditingRule}
                onToggle={(id) => {
                  setDiscountRules((rules) => rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {discountRules
            .filter((rule) => !rule.isActive && rule.startDate > new Date())
            .map((rule) => (
              <DiscountRuleCard
                key={rule.id}
                rule={rule}
                onEdit={setEditingRule}
                onToggle={(id) => {
                  setDiscountRules((rules) => rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {discountRules
            .filter((rule) => rule.endDate && rule.endDate < new Date())
            .map((rule) => (
              <DiscountRuleCard
                key={rule.id}
                rule={rule}
                onEdit={setEditingRule}
                onToggle={(id) => {
                  setDiscountRules((rules) => rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
                }}
              />
            ))}
        </TabsContent>

        <TabsContent value="analytics">
          <DiscountAnalytics rules={discountRules} />
        </TabsContent>
      </Tabs>

      {/* Create/Edit Modal would go here */}
      {(isCreating || editingRule) && (
        <DiscountRuleForm
          rule={editingRule}
          onSave={(rule) => {
            if (editingRule) {
              setDiscountRules((rules) => rules.map((r) => (r.id === rule.id ? rule : r)))
            } else {
              setDiscountRules((rules) => [...rules, { ...rule, id: Date.now().toString() }])
            }
            setIsCreating(false)
            setEditingRule(null)
          }}
          onCancel={() => {
            setIsCreating(false)
            setEditingRule(null)
          }}
        />
      )}
    </div>
  )
}

function DiscountRuleCard({
  rule,
  onEdit,
  onToggle,
}: {
  rule: DiscountRule
  onEdit: (rule: DiscountRule) => void
  onToggle: (id: string) => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{rule.name}</CardTitle>
              <CardDescription>
                {rule.type === "percentage" ? `${rule.value}% off` : `$${rule.value} off`}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={rule.isActive ? "secondary" : "outline"}>{rule.isActive ? "Active" : "Inactive"}</Badge>
            <Button variant="ghost" size="sm" onClick={() => onEdit(rule)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium mb-2">Conditions</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              {rule.conditions.timeStart && (
                <p>
                  Time: {rule.conditions.timeStart} - {rule.conditions.timeEnd}
                </p>
              )}
              {rule.conditions.minPeople && <p>Min people: {rule.conditions.minPeople}</p>}
              {rule.conditions.minAmount && <p>Min amount: ${rule.conditions.minAmount}</p>}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Usage</p>
            <p className="text-2xl font-bold text-primary">{rule.usageCount}</p>
            <p className="text-xs text-muted-foreground">times used</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Status</p>
            <Switch checked={rule.isActive} onCheckedChange={() => onToggle(rule.id)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DiscountRuleForm({
  rule,
  onSave,
  onCancel,
}: {
  rule: DiscountRule | null
  onSave: (rule: DiscountRule) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<DiscountRule>>(
    rule || {
      name: "",
      type: "percentage",
      value: 0,
      conditions: {},
      startDate: new Date(),
      isActive: true,
      usageCount: 0,
    },
  )

  return (
    <Card className="fixed inset-4 z-50 overflow-auto">
      <CardHeader>
        <CardTitle>{rule ? "Edit" : "Create"} Discount Rule</CardTitle>
        <CardDescription>Configure the discount parameters and conditions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rule-name">Rule Name</Label>
              <Input
                id="rule-name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Lunch Hour Special"
              />
            </div>

            <div className="space-y-2">
              <Label>Discount Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "percentage" | "fixed" | "bogo") =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage Off</SelectItem>
                  <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                  <SelectItem value="bogo">Buy One Get One</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount-value">{formData.type === "percentage" ? "Percentage" : "Amount"}</Label>
              <Input
                id="discount-value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData((prev) => ({ ...prev, value: Number(e.target.value) }))}
                placeholder={formData.type === "percentage" ? "15" : "5.00"}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Time Restrictions</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  value={formData.conditions?.timeStart || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      conditions: { ...prev.conditions, timeStart: e.target.value },
                    }))
                  }
                />
                <Input
                  type="time"
                  value={formData.conditions?.timeEnd || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      conditions: { ...prev.conditions, timeEnd: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-amount">Minimum Order Amount</Label>
              <Input
                id="min-amount"
                type="number"
                value={formData.conditions?.minAmount || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conditions: { ...prev.conditions, minAmount: Number(e.target.value) },
                  }))
                }
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="min-people">Minimum People</Label>
              <Input
                id="min-people"
                type="number"
                value={formData.conditions?.minPeople || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conditions: { ...prev.conditions, minPeople: Number(e.target.value) },
                  }))
                }
                placeholder="1"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => onSave(formData as DiscountRule)}>{rule ? "Update" : "Create"} Rule</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function DiscountAnalytics({ rules }: { rules: DiscountRule[] }) {
  const totalUsage = rules.reduce((sum, rule) => sum + rule.usageCount, 0)
  const activeRules = rules.filter((rule) => rule.isActive).length

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{activeRules}</p>
              <p className="text-sm text-muted-foreground">Active Rules</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">{totalUsage}</p>
              <p className="text-sm text-muted-foreground">Total Usage</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold">$12,450</p>
              <p className="text-sm text-muted-foreground">Total Savings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">89%</p>
              <p className="text-sm text-muted-foreground">Usage Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Performance</CardTitle>
          <CardDescription>How each discount rule is performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{rule.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {rule.type === "percentage" ? `${rule.value}%` : `$${rule.value}`} discount
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{rule.usageCount}</p>
                  <p className="text-xs text-muted-foreground">uses</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
