import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Star, Clock, Leaf } from "lucide-react"

const menuItems = [
  {
    id: 1,
    name: "Surf & Turf Bowl",
    description: "Grilled shrimp and steak over coconut rice with tropical salsa",
    price: 24.99,
    discountedPrice: 18.74,
    category: "Bowls",
    image: "/surf-and-turf-bowl.jpg",
    badges: ["Popular", "Protein Rich"],
    prepTime: "15-20 min",
  },
  {
    id: 2,
    name: "Coastal Fish Tacos",
    description: "Fresh mahi-mahi with cabbage slaw and chipotle crema",
    price: 18.99,
    discountedPrice: 14.24,
    category: "Tacos",
    image: "/fish-tacos-coastal.jpg",
    badges: ["Spicy", "Fresh Catch"],
    prepTime: "10-15 min",
  },
  {
    id: 3,
    name: "Ocean Breeze Salad",
    description: "Mixed greens with grilled salmon, avocado, and citrus vinaigrette",
    price: 16.99,
    discountedPrice: 12.74,
    category: "Salads",
    image: "/salmon-salad-ocean.jpg",
    badges: ["Healthy", "Gluten Free"],
    prepTime: "8-12 min",
  },
  {
    id: 4,
    name: "Grilled Mahi Sandwich",
    description: "Blackened mahi-mahi with lettuce, tomato, and surf sauce",
    price: 19.99,
    discountedPrice: 14.99,
    category: "Sandwiches",
    image: "/mahi-sandwich-grilled.jpg",
    badges: ["Signature"],
    prepTime: "12-18 min",
  },
  {
    id: 5,
    name: "Coconut Shrimp Curry",
    description: "Jumbo shrimp in coconut curry sauce with jasmine rice",
    price: 22.99,
    discountedPrice: 17.24,
    category: "Curries",
    image: "/coconut-shrimp-curry.jpg",
    badges: ["Spicy", "Coconut"],
    prepTime: "18-25 min",
  },
  {
    id: 6,
    name: "Poke Paradise Bowl",
    description: "Fresh ahi tuna poke with edamame, cucumber, and sriracha mayo",
    price: 21.99,
    discountedPrice: 16.49,
    category: "Bowls",
    image: "/poke-bowl-ahi-tuna.jpg",
    badges: ["Raw", "Healthy"],
    prepTime: "5-10 min",
  },
]

export function MenuBrowser() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Menu</h2>
          <p className="text-muted-foreground">Fresh surf-inspired dishes with your employee discount</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          15% Employee Discount Applied
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search menu items..." className="pl-10" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                All
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Bowls
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Tacos
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Salads
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Sandwiches
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="sm" className="bg-background/80 backdrop-blur">
                  <Star className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription className="text-sm mt-1">{item.description}</CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                {item.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-secondary">${item.discountedPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">${item.price}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {item.prepTime}
                </div>
              </div>

              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Special Offers */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span>Today's Special Offers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold mb-2">Lunch Hour Bonus</h4>
              <p className="text-sm text-muted-foreground mb-2">Extra 10% off all bowls between 11 AM - 2 PM</p>
              <Badge variant="secondary">25% Total Discount</Badge>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold mb-2">Group Order Special</h4>
              <p className="text-sm text-muted-foreground mb-2">Order for 5+ colleagues and save an additional 15%</p>
              <Badge variant="secondary">30% Total Discount</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
