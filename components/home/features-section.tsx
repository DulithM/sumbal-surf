import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, Clock, Truck, Star, Leaf, Coffee } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: UtensilsCrossed,
      title: "Authentic Sri Lankan",
      description: "Traditional keeri samba rice, dhal curry, and signature kottapol sumbal made with authentic recipes.",
      bgColor: "bg-[#26c175]/10",
      iconColor: "text-[#26c175]",
    },
    {
      icon: Clock,
      title: "Breakfast Specialists",
      description: "Dedicated breakfast hours from 10:00 AM to 12:00 PM with fresh, protein-rich morning options.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: Truck,
      title: "Delivery Service",
      description: "Get authentic Sri Lankan breakfast delivered to your door with zero delivery fees for new customers.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Star,
      title: "4.6 Star Rating",
      description: "Consistently rated by 1,000+ customers for quality, authenticity, and delicious flavors.",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Leaf,
      title: "Healthy Options",
      description: "Protein-rich omelettes, wholesome rice dishes, and nutritious ingredients for a healthy start.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Coffee,
      title: "Traditional Beverages",
      description: "Classic Ceylon tea, milk coffee, and refreshing milkshakes to complement your meal.",
      bgColor: "bg-brown-100",
      iconColor: "text-brown-600",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why Choose Sumbal Surf - Havelock?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Experience the authentic taste of Sri Lanka with our traditional breakfast specialties, 
            made fresh daily and delivered with care to your location.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div
                  className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
