import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Waves, Clock, MapPin, Phone, UtensilsCrossed } from "lucide-react"

export function RestaurantInfo() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">About Sumbal Surf - Havelock</h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Located in the heart of Colombo at Square Hub, Sumbal Surf - Havelock brings authentic Sri Lankan 
                breakfast culture to life. Our menu features traditional keeri samba rice with dhal curry, signature 
                kottapol sumbal, and perfectly roasted paan with various curries. We specialize in healthy, 
                protein-rich breakfast options that celebrate the rich flavors of Sri Lankan cuisine.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <CardTitle className="text-lg">Customer Rating</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-yellow-500">4.6</span>
                      <span className="text-sm text-muted-foreground">(1,000+ reviews)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Consistently rated for authentic flavors and quality ingredients
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Our Specialties</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Traditional Breakfast Rice</li>
                    <li>• Roast Paan with Curries</li>
                    <li>• Protein-Rich Omelettes</li>
                    <li>• Authentic Sri Lankan Beverages</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span>10:00 AM - 9:00 PM</span>
                </div>
                <div className="pt-2">
                  <div className="bg-orange-50 p-2 rounded text-orange-800 text-xs">
                    <strong>Breakfast:</strong> 10:00 AM – 12:00 PM
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Location</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  Square Hub, Havelock Road
                  <br />
                  Colombo 05, Sri Lanka
                </p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>Order through delivery apps</p>
                <p>Group orders available</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  Order Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#26c175]/10 border-[#26c175]/20">
              <CardHeader>
                <CardTitle className="text-[#26c175] text-sm">
                  🚚 Delivery Available
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-[#26c175]">
                <p>Get authentic Sri Lankan breakfast delivered to your door</p>
                <p className="mt-1 font-medium">රු0 delivery fee for new customers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
