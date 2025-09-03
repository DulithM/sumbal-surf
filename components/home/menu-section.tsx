import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const menuCategories = [
  {
    name: "Breakfast Rice",
    startingPrice: "590 LKR",
    items: [
      {
        name: "Breakfast Rice - Boiled Egg",
        price: "590.00",
        description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with 2 boiled eggs."
      },
      {
        name: "Breakfast Rice - Omelette",
        price: "590.00",
        description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with 2 egg Omelette."
      },
      {
        name: "Breakfast Rice - Bullseye",
        price: "590.00",
        description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with 2 egg bullseye."
      },
      {
        name: "Breakfast Rice - Sprats Bedum",
        price: "690.00",
        description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with Sprats Bedum"
      },
      {
        name: "Breakfast Rice - Karawala Bedum",
        price: "690.00",
        description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with tempered karawala",
        popular: true
      },
      {
        name: "Breakfast Rice - Fried Bockwurst",
        price: "690.00",
        description: "Keeri samba rice with Dhal curry, Signature kottapol sumbal, Soya meat accompanied with a fried jumbo sausage"
      }
    ]
  },
  {
    name: "Roast Paan with Curries",
    startingPrice: "590 LKR",
    items: [
      {
        name: "Roast paan with Dhal & Kottapol Sumbal",
        price: "590.00",
        description: "Roasted bread with dhal curry and our signature kottapol sumbal"
      },
      {
        name: "Roast Paan with Dhal & Seeni Sumbal",
        price: "590.00",
        description: "Roasted paan with dhal curry and seeni sumbal portion"
      },
      {
        name: "Roast Paan with Dhal & Sprats",
        price: "690.00",
        description: "Roasted paan (bread) with creamy dhal curry and tempered sprats bedum portion"
      },
      {
        name: "Roast paan with Dhal and Karawala Bedum",
        price: "690.00",
        description: "Roasted paan (bread) with creamy dhal curry and karawala bedum (dry fish) portion."
      },
      {
        name: "Roast Paan with Dhal & Omelette",
        price: "690.00",
        description: "Roasted paan (bread) with creamy dhal curry and 2 egg omelette"
      }
    ]
  },
  {
    name: "Breakfast Omelettes",
    startingPrice: "490 LKR",
    items: [
      {
        name: "Classic Omelette (for a healthy breakfast 🏌️)",
        price: "490.00",
        description: "4 egg omelette with onions, tomatoes and green chilies. Filled with lots of proteins and everyone's favorite."
      },
      {
        name: "Cheese Omelette (Kids favorite 💕)",
        price: "590.00",
        description: "4 egg omelette make using onions, tomatoes, green chilies and filled with cheese. Usually moms buy this for their kids and they love it."
      },
      {
        name: "Chicken Omelette (Gym lover's favorite 🏋️♂️)",
        price: "890.00",
        description: "4 egg omelette mixed with onions, tomatoes, green chilies and 100g of well cooked minced chicken sumbal"
      },
      {
        name: "Chicken & Cheese Omelette",
        price: "990.00",
        description: "4 egg omelette mixed with onions, tomatoes, green chilies, 100g of well cooked minced chicken sumbal and filled with cheese"
      }
    ]
  },
  {
    name: "Roast Paan Sandwiches",
    startingPrice: "390 LKR",
    items: [
      {
        name: "Butter & Sumbal Roast Paan Sandwich",
        price: "390.00",
        description: "Perfectly roasted bread filled with butter and our signature kottapol sumbal. This contains baby shrimps"
      },
      {
        name: "Butter & Seeni Sumbal Roast Paan Sandwich",
        price: "390.00",
        description: "Perfectly roasted bread using butter and filled with Seeni sumbal."
      },
      {
        name: "Sumbal & Cheese Roast Paan Sandwich",
        price: "450.00",
        description: "Perfectly roasted paan using butter and filled with cheese and our signature kottapol sumbal"
      },
      {
        name: "Sumbal & Sprats Roast Paan Sandwich",
        price: "490.00",
        description: "Perfectly roasted bread using butter and filled with our signature kottapol sumbal and sprats bedum."
      },
      {
        name: "Chicken & Cheese Roast Paan Sandwich",
        price: "690.00",
        description: "Perfectly roasted paan using butter and filled with our chicken sumbal and cheese"
      },
      {
        name: "Chicken & Sumbal Roast Paan Sandwich",
        price: "690.00",
        description: "Perfectly roasted paan using butter and filled with our favorite chicken sumbal and kottapol sumbal."
      }
    ]
  },
  {
    name: "Hot Beverages",
    startingPrice: "290 LKR",
    items: [
      {
        name: "Ceylon Plain Tea",
        price: "290.00",
        description: "Classic sri lankan plain tea"
      },
      {
        name: "Milk Tea",
        price: "390.00",
        description: "Classic sri lankan milk tea"
      },
      {
        name: "Milk Coffee",
        price: "390.00",
        description: "Classic Sri Lankan milk coffee"
      },
      {
        name: "Black Coffee",
        price: "390.00",
        description: "Classic Sri Lankan black coffee"
      },
      {
        name: "Cinnamon Milk Tea",
        price: "490.00",
        description: "Aromatic cinnamon-infused milk tea"
      },
      {
        name: "Hot Chocolate",
        price: "490.00",
        description: "Rich and creamy hot chocolate"
      }
    ]
  },
  {
    name: "Refreshers",
    startingPrice: "150 LKR",
    items: [
      {
        name: "Chocolate Milkshake (most popular)",
        price: "590.00",
        description: "330ml rich chocolate milkshake"
      },
      {
        name: "Strawberry Milkshake",
        price: "590.00",
        description: "330ml fresh strawberry milkshake"
      },
      {
        name: "Vanilla Milkshake",
        price: "590.00",
        description: "330ml smooth vanilla milkshake"
      },
      {
        name: "Kalo Shake",
        price: "590.00",
        description: "330ml traditional kalo shake"
      },
      {
        name: "Iced Coffee",
        price: "590.00",
        description: "330ml refreshing iced coffee"
      },
      {
        name: "Water Bottle",
        price: "150.00",
        description: "500ml purified water"
      }
    ]
  }
]

export function MenuSection() {
  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover authentic Sri Lankan breakfast delights, from traditional rice and curry to refreshing beverages
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search in Sumbal Surf - Havelock..." 
              className="pl-10 text-lg py-3"
            />
          </div>
        </div>

        {/* Menu Categories */}
        <div className="space-y-16">
          {menuCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-lg text-muted-foreground">
                  Starting from {category.startingPrice}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg leading-tight">
                            {item.name}
                          </CardTitle>
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
                        <span className="text-xl font-bold text-primary">
                          LKR {item.price}
                        </span>
                      </div>

                      <Button className="w-full bg-[#26c175] hover:bg-[#26c175]/90">
                        Add to Order
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Order?
          </h3>
          <p className="text-muted-foreground mb-6">
            Get authentic Sri Lankan breakfast delivered to your door
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#26c175] hover:bg-[#26c175]/90 text-white px-8 py-3">
              Order Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              View Full Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
