import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { MenuSection } from "@/components/home/menu-section"
import { BusinessSolutions } from "@/components/home/business-solutions"
import { RestaurantInfo } from "@/components/home/restaurant-info"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <MenuSection />
      <BusinessSolutions />
      <Footer />
    </div>
  )
}
