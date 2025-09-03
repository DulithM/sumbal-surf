import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Users, Truck, Clock, Star } from "lucide-react"

export function BusinessSolutions() {
  const benefits = [
    {
      title: "Group Orders",
      description: "Perfect for office breakfast meetings and team events",
    },
    {
      title: "Fast Delivery",
      description: "Quick delivery to your office or home location",
    },
    {
      title: "Fresh Daily",
      description: "All dishes prepared fresh every morning",
    },
  ]

  return (
    <section id="business" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit bg-[#26c175]/10 text-[#26c175] border-[#26c175]/20">
                <Users className="w-4 h-4 mr-2" />
                Group Orders & Delivery
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
                Perfect for
                <span className="text-[#26c175] block">Office Breakfast</span>
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Order authentic Sri Lankan breakfast for your team with our group order service. 
                Perfect for morning meetings, office events, or simply treating your colleagues 
                to delicious traditional cuisine.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#26c175] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 bg-[#26c175] hover:bg-[#26c175]/90">
                Order for Group
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-white shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Group Order Benefits</h3>
                  <Badge variant="secondary" className="bg-[#26c175]/20 text-[#26c175]">
                    Special Rates
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <span className="font-medium">Breakfast Hours</span>
                    <span className="text-lg font-bold text-orange-600">10:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Customer Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-green-600">4.6</span>
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Delivery</span>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">Available</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#26c175]/10 p-4 rounded-lg border border-[#26c175]/20">
                  <p className="text-sm text-[#26c175] font-medium">
                    🎯 <strong>Popular Choice:</strong> Breakfast Rice with Karawala Bedum
                  </p>
                  <p className="text-xs text-[#26c175] mt-1">
                    LKR 690.00 - Keeri samba rice with dhal curry and tempered karawala
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
