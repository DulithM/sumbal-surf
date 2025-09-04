"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { 
  ChefHat, 
  Clock, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  ShoppingCart,
  Utensils
} from "lucide-react"
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils"
import { RestaurantNavigation } from "@/components/restaurant-navigation"
import type { Order, MenuItem, Employee } from "@/lib/types"

export default function RestaurantDashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false)

  // Mock restaurant data
  const restaurantInfo = {
    name: "Sumbal Surf Restaurant",
    location: "123 Havelock Road, Colombo 05",
    phone: "+94 11 234 5678",
    email: "orders@sumbalsurf.lk",
    rating: 4.8,
    totalOrders: 1247,
    todayOrders: 45,
    pendingOrders: 8,
    completedOrders: 37
  }

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD001",
      employeeId: "emp_1",
      companyId: "comp_1",
      items: [
        {
          id: "item_1",
          name: "Rice and Curry",
          description: "Traditional Sri Lankan rice with mixed vegetable curry",
          price: 450,
          quantity: 2,
          category: "lunch",
          isHealthy: true,
          isTraditional: true,
          allergens: ["gluten"]
        }
      ],
      subtotal: 900,
      discount: 135,
      subsidy: 153,
      total: 612,
      paymentMethod: "wallet",
      status: "pending",
      orderType: "pickup",
      scheduledTime: new Date("2024-12-15T12:30:00"),
      notes: "Extra spicy",
      createdAt: new Date("2024-12-15T12:00:00"),
      updatedAt: new Date("2024-12-15T12:00:00")
    },
    {
      id: "ORD002",
      employeeId: "emp_2",
      companyId: "comp_1",
      items: [
        {
          id: "item_2",
          name: "Kottu Roti",
          description: "Chopped roti with vegetables and spices",
          price: 380,
          quantity: 1,
          category: "lunch",
          isHealthy: false,
          isTraditional: true,
          allergens: ["gluten", "dairy"]
        },
        {
          id: "item_4",
          name: "King Coconut",
          description: "Fresh king coconut water",
          price: 120,
          quantity: 1,
          category: "beverage",
          isHealthy: true,
          isTraditional: true,
          allergens: []
        }
      ],
      subtotal: 500,
      discount: 75,
      subsidy: 85,
      total: 340,
      paymentMethod: "loan",
      status: "preparing",
      orderType: "delivery",
      deliveryAddress: "Tech Solutions Lanka, Havelock Road",
      createdAt: new Date("2024-12-15T11:45:00"),
      updatedAt: new Date("2024-12-15T11:50:00")
    }
  ]

  // Mock menu items
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
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-12-15")
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
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-12-15")
    },
    {
      id: "item_3",
      name: "String Hoppers",
      description: "Steamed rice flour noodles with coconut sambol",
      price: 320,
      category: "lunch",
      isHealthy: true,
      isTraditional: true,
      isAvailable: false,
      allergens: [],
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-12-15")
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
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-12-15")
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      confirmed: { variant: "default" as const, icon: CheckCircle, color: "text-blue-600" },
      preparing: { variant: "default" as const, icon: ChefHat, color: "text-orange-600" },
      ready: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      delivered: { variant: "outline" as const, icon: CheckCircle, color: "text-green-600" },
      cancelled: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" }
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

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In real app, this would call API
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  const toggleMenuItemAvailability = (itemId: string) => {
    // In real app, this would call API
    console.log(`Toggling availability for item ${itemId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <RestaurantNavigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Restaurant Dashboard</h1>
            <p className="text-muted-foreground">Manage orders, menu, and restaurant operations</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Today's Schedule
            </Button>
            <Button size="sm" onClick={() => setIsAddingMenuItem(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{restaurantInfo.todayOrders}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{restaurantInfo.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                Need attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{restaurantInfo.completedOrders}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((restaurantInfo.completedOrders / restaurantInfo.todayOrders) * 100)}% completion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Restaurant Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{restaurantInfo.rating}</div>
              <p className="text-xs text-muted-foreground">
                Based on customer reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Restaurant Info</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  Manage incoming orders and track preparation status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Order Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">Employee Order</div>
                            <div className="text-sm text-muted-foreground">
                              {order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <div key={item.id} className="text-sm">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(order.total)}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>{formatRelativeTime(order.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select 
                              value={order.status} 
                              onValueChange={(value) => updateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="preparing">Preparing</SelectItem>
                                <SelectItem value="ready">Ready</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Menu Management</CardTitle>
                <CardDescription>
                  Manage your restaurant menu items and availability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems.map((item) => (
                    <Card key={item.id} className="relative">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={item.isAvailable}
                              onCheckedChange={() => toggleMenuItemAvailability(item.id)}
                            />
                            <Badge variant={item.isAvailable ? "default" : "secondary"}>
                              {item.isAvailable ? "Available" : "Unavailable"}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Price</span>
                            <span className="font-medium">{formatCurrency(item.price)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Category</span>
                            <Badge variant="outline">
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </Badge>
                          </div>

                          <div className="flex gap-1">
                            {item.isHealthy && (
                              <Badge variant="outline" className="text-xs">Healthy</Badge>
                            )}
                            {item.isTraditional && (
                              <Badge variant="outline" className="text-xs">Traditional</Badge>
                            )}
                          </div>

                          {item.nutritionInfo && (
                            <div className="text-sm text-muted-foreground">
                              <div className="grid grid-cols-2 gap-2">
                                <span>Calories: {item.nutritionInfo.calories}</span>
                                <span>Protein: {item.nutritionInfo.protein}g</span>
                              </div>
                            </div>
                          )}

                          {item.allergens.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                              <span>Allergens: {item.allergens.join(", ")}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Items</CardTitle>
                  <CardDescription>Best selling items this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rice and Curry</span>
                      <span className="font-medium">45 orders</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Kottu Roti</span>
                      <span className="font-medium">32 orders</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">King Coconut</span>
                      <span className="font-medium">28 orders</span>
                    </div>
                    <Progress value={52} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Current order status breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Completed</span>
                      <span className="font-medium">37 orders</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Preparing</span>
                      <span className="font-medium">5 orders</span>
                    </div>
                    <Progress value={11} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending</span>
                      <span className="font-medium">3 orders</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Information</CardTitle>
                <CardDescription>
                  Manage your restaurant details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="restaurant-name">Restaurant Name</Label>
                      <Input 
                        id="restaurant-name" 
                        defaultValue={restaurantInfo.name}
                        placeholder="Enter restaurant name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="location" 
                          defaultValue={restaurantInfo.location}
                          placeholder="Enter restaurant address"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          defaultValue={restaurantInfo.phone}
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          type="email"
                          defaultValue={restaurantInfo.email}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Restaurant Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Describe your restaurant and specialties"
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="operating-hours">Operating Hours</Label>
                      <Input 
                        id="operating-hours" 
                        defaultValue="7:00 AM - 10:00 PM"
                        placeholder="Enter operating hours"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delivery-radius">Delivery Radius (km)</Label>
                      <Input 
                        id="delivery-radius" 
                        type="number"
                        defaultValue="5"
                        placeholder="Enter delivery radius"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
