"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Percent, Users, Clock, Check, Search } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  description: string
  popular?: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

interface DiscountRule {
  id: string
  name: string
  type: "percentage" | "fixed"
  value: number
  conditions: {
    minAmount?: number
    timeStart?: string
    timeEnd?: string
    minPeople?: number
  }
}

const menuItems: MenuItem[] = [
  // Breakfast Rice
  {
    id: "br1",
    name: "Breakfast Rice - Boiled Egg",
    price: 590,
    category: "Breakfast Rice",
    description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with 2 boiled eggs."
  },
  {
    id: "br2",
    name: "Breakfast Rice - Omelette",
    price: 590,
    category: "Breakfast Rice",
    description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with 2 egg Omelette."
  },
  {
    id: "br3",
    name: "Breakfast Rice - Bullseye",
    price: 590,
    category: "Breakfast Rice",
    description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with 2 egg bullseye."
  },
  {
    id: "br4",
    name: "Breakfast Rice - Sprats Bedum",
    price: 690,
    category: "Breakfast Rice",
    description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with Sprats Bedum"
  },
  {
    id: "br5",
    name: "Breakfast Rice - Karawala Bedum",
    price: 690,
    category: "Breakfast Rice",
    description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with tempered karawala",
    popular: true
  },
  {
    id: "br6",
    name: "Breakfast Rice - Fried Bockwurst",
    price: 690,
    category: "Breakfast Rice",
    description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with a fried jumbo sausage"
  },
  // Roast Paan with Curries
  {
    id: "rpc1",
    name: "Roast paan with Dhal & Kottapol Sumbal",
    price: 590,
    category: "Roast Paan with Curries",
    description: "Roasted bread with dhal curry and our signature kottapol sumbal"
  },
  {
    id: "rpc2",
    name: "Roast Paan with Dhal & Seeni Sumbal",
    price: 590,
    category: "Roast Paan with Curries",
    description: "Roasted paan with dhal curry and seeni sumbal portion"
  },
  {
    id: "rpc3",
    name: "Roast Paan with Dhal & Sprats",
    price: 690,
    category: "Roast Paan with Curries",
    description: "Roasted paan (bread) with creamy dhal curry and tempered sprats bedum portion"
  },
  {
    id: "rpc4",
    name: "Roast paan with Dhal and Karawala Bedum",
    price: 690,
    category: "Roast Paan with Curries",
    description: "Roasted paan (bread) with creamy dhal curry and karawala bedum (dry fish) portion."
  },
  {
    id: "rpc5",
    name: "Roast Paan with Dhal & Omelette",
    price: 690,
    category: "Roast Paan with Curries",
    description: "Roasted paan (bread) with creamy dhal curry and 2 egg omelette"
  },
  // Breakfast Omelettes
  {
    id: "bo1",
    name: "Classic Omelette (for a healthy breakfast 🏌️)",
    price: 490,
    category: "Breakfast Omelettes",
    description: "4 egg omelette with onions, tomatoes and green chilies. Filled with lots of proteins and everyone's favorite."
  },
  {
    id: "bo2",
    name: "Cheese Omelette (Kids favorite 💕)",
    price: 590,
    category: "Breakfast Omelettes",
    description: "4 egg omelette make using onions, tomatoes, green chilies and filled with cheese. Usually moms buy this for their kids and they love it."
  },
  {
    id: "bo3",
    name: "Chicken Omelette (Gym lover's favorite 🏋️♂️)",
    price: 890,
    category: "Breakfast Omelettes",
    description: "4 egg omelette mixed with onions, tomatoes, green chilies and 100g of well cooked minced chicken sumbal"
  },
  {
    id: "bo4",
    name: "Chicken & Cheese Omelette",
    price: 990,
    category: "Breakfast Omelettes",
    description: "4 egg omelette mixed with onions, tomatoes, green chilies, 100g of well cooked minced chicken sumbal and filled with cheese"
  },
  // Roast Paan Sandwiches
  {
    id: "rps1",
    name: "Butter & Sumbal Roast Paan Sandwich",
    price: 390,
    category: "Roast Paan Sandwiches",
    description: "Perfectly roasted bread filled with butter and our signature kottapol sumbal. This contains baby shrimps"
  },
  {
    id: "rps2",
    name: "Butter & Seeni Sumbal Roast Paan Sandwich",
    price: 390,
    category: "Roast Paan Sandwiches",
    description: "Perfectly roasted bread using butter and filled with Seeni sumbal."
  },
  {
    id: "rps3",
    name: "Sumbal & Cheese Roast Paan Sandwich",
    price: 450,
    category: "Roast Paan Sandwiches",
    description: "Perfectly roasted paan using butter and filled with cheese and our signature kottapol sumbal"
  },
  {
    id: "rps4",
    name: "Sumbal & Sprats Roast Paan Sandwich",
    price: 490,
    category: "Roast Paan Sandwiches",
    description: "Perfectly roasted bread using butter and filled with our signature kottapol sumbal and sprats bedum."
  },
  {
    id: "rps5",
    name: "Chicken & Cheese Roast Paan Sandwich",
    price: 690,
    category: "Roast Paan Sandwiches",
    description: "Perfectly roasted paan using butter and filled with our chicken sumbal and cheese"
  },
  {
    id: "rps6",
    name: "Chicken & Sumbal Roast Paan Sandwich",
    price: 690,
    category: "Roast Paan Sandwiches",
    description: "Perfectly roasted paan using butter and filled with our favorite chicken sumbal and kottapol sumbal."
  },
  // Hot Beverages
  {
    id: "hb1",
    name: "Ceylon Plain Tea",
    price: 290,
    category: "Hot Beverages",
    description: "Classic sri lankan plain tea"
  },
  {
    id: "hb2",
    name: "Milk Tea",
    price: 390,
    category: "Hot Beverages",
    description: "Classic sri lankan milk tea"
  },
  {
    id: "hb3",
    name: "Milk Coffee",
    price: 390,
    category: "Hot Beverages",
    description: "Classic Sri Lankan milk coffee"
  },
  {
    id: "hb4",
    name: "Black Coffee",
    price: 390,
    category: "Hot Beverages",
    description: "Classic Sri Lankan black coffee"
  },
  {
    id: "hb5",
    name: "Cinnamon Milk Tea",
    price: 490,
    category: "Hot Beverages",
    description: "Aromatic cinnamon-infused milk tea"
  },
  {
    id: "hb6",
    name: "Hot Chocolate",
    price: 490,
    category: "Hot Beverages",
    description: "Rich and creamy hot chocolate"
  },
  // Refreshers
  {
    id: "ref1",
    name: "Chocolate Milkshake (most popular)",
    price: 590,
    category: "Refreshers",
    description: "330ml rich chocolate milkshake"
  },
  {
    id: "ref2",
    name: "Strawberry Milkshake",
    price: 590,
    category: "Refreshers",
    description: "330ml fresh strawberry milkshake"
  },
  {
    id: "ref3",
    name: "Vanilla Milkshake",
    price: 590,
    category: "Refreshers",
    description: "330ml smooth vanilla milkshake"
  },
  {
    id: "ref4",
    name: "Kalo Shake",
    price: 590,
    category: "Refreshers",
    description: "330ml traditional kalo shake"
  },
  {
    id: "ref5",
    name: "Iced Coffee",
    price: 590,
    category: "Refreshers",
    description: "330ml refreshing iced coffee"
  },
  {
    id: "ref6",
    name: "Water Bottle",
    price: 150,
    category: "Refreshers",
    description: "500ml purified water"
  }
]

const discountRules: DiscountRule[] = [
  {
    id: "1",
    name: "New Customer Discount",
    type: "fixed",
    value: 100,
    conditions: {},
  },
  {
    id: "2",
    name: "Breakfast Hour Special",
    type: "percentage",
    value: 10,
    conditions: {
      timeStart: "10:00",
      timeEnd: "12:00",
    },
  },
  {
    id: "3",
    name: "Group Order Special",
    type: "percentage",
    value: 15,
    conditions: {
      minPeople: 5,
      minAmount: 2000,
    },
  },
]

const categories = ["All", "Breakfast Rice", "Roast Paan with Curries", "Breakfast Omelettes", "Roast Paan Sandwiches", "Hot Beverages", "Refreshers"]

export function OrderSystem() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [groupSize, setGroupSize] = useState(1)
  const [appliedDiscounts, setAppliedDiscounts] = useState<DiscountRule[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Calculate applicable discounts
  useEffect(() => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    const timeString = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`

    const applicable = discountRules.filter((rule) => {
      // Check time conditions
      if (rule.conditions.timeStart && rule.conditions.timeEnd) {
        if (timeString < rule.conditions.timeStart || timeString > rule.conditions.timeEnd) {
          return false
        }
      }

      // Check minimum amount
      if (rule.conditions.minAmount && subtotal < rule.conditions.minAmount) {
        return false
      }

      // Check minimum people
      if (rule.conditions.minPeople && groupSize < rule.conditions.minPeople) {
        return false
      }

      return true
    })

    setAppliedDiscounts(applicable)
  }, [subtotal, groupSize])

  const totalDiscount = appliedDiscounts.reduce((sum, discount) => {
    if (discount.type === "percentage") {
      return sum + (subtotal * discount.value) / 100
    }
    return sum + discount.value
  }, 0)

  const finalTotal = Math.max(0, subtotal - totalDiscount)

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Menu Items */}
      <div className="lg:col-span-2 space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Menu</CardTitle>
            <CardDescription>Search and browse our authentic Sri Lankan breakfast menu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search menu items..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-[#26c175]/10"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                    {item.popular && (
                      <Badge variant="secondary" className="mt-2 bg-orange-100 text-orange-800">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-4 min-h-[3rem]">
                  {item.description}
                </CardDescription>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-[#26c175]">
                    LKR {item.price.toFixed(2)}
                  </span>
                </div>

                <Button 
                  className="w-full bg-[#26c175] hover:bg-[#26c175]/90"
                  onClick={() => addToCart(item)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Order
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="space-y-6">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>LKR {subtotal.toFixed(2)}</span>
              </div>

              {appliedDiscounts.map((discount) => {
                const discountAmount =
                  discount.type === "percentage" ? (subtotal * discount.value) / 100 : discount.value
                return (
                  <div key={discount.id} className="flex justify-between text-[#26c175]">
                    <span className="flex items-center space-x-1">
                      <Percent className="w-3 h-3" />
                      <span className="text-sm">{discount.name}</span>
                    </span>
                    <span>-LKR {discountAmount.toFixed(2)}</span>
                  </div>
                )
              })}

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>LKR {finalTotal.toFixed(2)}</span>
              </div>

              {totalDiscount > 0 && (
                <div className="text-center p-2 bg-[#26c175]/10 rounded-lg">
                  <p className="text-sm font-medium text-[#26c175]">You saved LKR {totalDiscount.toFixed(2)}!</p>
                </div>
              )}
            </div>

            <Button className="w-full bg-[#26c175] hover:bg-[#26c175]/90" disabled={cart.length === 0}>
              Place Order
            </Button>
          </CardContent>
        </Card>

        {/* Order Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Configure your order to maximize discounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="group-size">Group Size</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setGroupSize(Math.max(1, groupSize - 1))}>
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  id="group-size"
                  type="number"
                  value={groupSize}
                  onChange={(e) => setGroupSize(Math.max(1, Number(e.target.value)))}
                  className="w-20 text-center"
                />
                <Button variant="outline" size="sm" onClick={() => setGroupSize(groupSize + 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Orders for 5+ people get additional group discounts</p>
            </div>

            {/* Available Discounts */}
            <div className="space-y-2">
              <Label>Available Discounts</Label>
              <div className="space-y-2">
                {discountRules.map((rule) => {
                  const isApplicable = appliedDiscounts.some((d) => d.id === rule.id)
                  const meetsConditions = (() => {
                    if (rule.conditions.minAmount && subtotal < rule.conditions.minAmount) return false
                    if (rule.conditions.minPeople && groupSize < rule.conditions.minPeople) return false
                    return true
                  })()

                  return (
                    <div
                      key={rule.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        isApplicable ? "bg-[#26c175]/10 border-[#26c175]" : "bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isApplicable && <Check className="w-4 h-4 text-[#26c175]" />}
                        <div>
                          <p className="font-medium text-sm">{rule.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {rule.type === "percentage" ? `${rule.value}%` : `LKR ${rule.value}`} off
                            {rule.conditions.minAmount && ` (min LKR ${rule.conditions.minAmount})`}
                            {rule.conditions.minPeople && ` (${rule.conditions.minPeople}+ people)`}
                            {rule.conditions.timeStart && ` (${rule.conditions.timeStart}-${rule.conditions.timeEnd})`}
                          </p>
                        </div>
                      </div>
                      <Badge variant={isApplicable ? "default" : "outline"} className={isApplicable ? "bg-[#26c175]" : ""}>
                        {isApplicable ? "Applied" : meetsConditions ? "Available" : "Not Met"}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cart Items */}
        {cart.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Your Order</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">LKR {item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Discount Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Maximize Your Savings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-2">
              <Users className="w-4 h-4 text-[#26c175] mt-0.5" />
              <div>
                <p className="text-sm font-medium">Group Orders</p>
                <p className="text-xs text-muted-foreground">Order with 5+ people for extra 15% off</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-[#26c175] mt-0.5" />
              <div>
                <p className="text-sm font-medium">Breakfast Hours</p>
                <p className="text-xs text-muted-foreground">Order between 10 AM - 12 PM for bonus discounts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
