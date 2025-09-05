import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Waves } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-[#053b00] relative min-h-screen">
        <div className="absolute inset-0 bg-white" style={{ clipPath: 'inset(35% 0 0 0)' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Dishes positioned at the top with proper spacing */}
          <div className="flex justify-center items-center pt-24 pb-16">
            <div className="relative flex items-center gap-20 lg:gap-32 xl:gap-40">
              {/* Rice and curry box - positioned to the left */}
              <div className="relative z-20">
                <img
                  src="/rice-curry-box.png"
                  alt="Sri Lankan Rice and Curry Takeout Box"
                  className="w-64 lg:w-72 xl:w-80 h-auto drop-shadow-xl transform rotate-12"
                />
              </div>
              {/* Rice and curry plate - main focal point */}
              <div className="relative z-20">
                <img
                  src="/rice-curry-plate.png"
                  alt="Traditional Sri Lankan Rice and Curry Plate"
                  className="w-96 lg:w-[28rem] xl:w-[32rem] h-auto drop-shadow-2xl"
                />
              </div>
              {/* Mango juice - refreshing beverage */}
              <div className="relative z-20">
                <img
                  src="/mango-juice.png"
                  alt="Fresh Mango Juice"
                  className="w-64 lg:w-72 xl:w-80 h-auto drop-shadow-xl transform -rotate-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ripped paper covering the dishes partially - touching both corners */}
        <div className="absolute left-0 right-0 bottom-160 z-20">
          <img 
            src="/ripped-paper.png" 
            alt="" 
            className="w-full h-auto" 
            style={{ filter: "brightness(0) invert(1)" }} 
          />
        </div>

        {/* Text content positioned on top of the ripped paper with perfect spacing */}
        <div className="relative z-30 text-center space-y-10 pb-24 pt-32">
          <div className="space-y-8">
            <Badge variant="secondary" className="w-fit bg-[#26c175] text-white border-none mx-auto shadow-lg px-6 py-2">
              <Waves className="w-4 h-4 mr-2" />
              Authentic Sri Lankan Cuisine
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1a1a1a] text-balance leading-tight drop-shadow-lg px-4">
              Ceylon Taste
              <span className="text-[#26c175] block font-serif italic text-3xl sm:text-4xl lg:text-5xl mt-3 drop-shadow-lg">Rice & Curry</span>
            </h1>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a1a1a] tracking-wider drop-shadow-lg">SUMBAL SURF</div>
            <p className="text-base sm:text-lg text-[#2a2a2a] text-pretty max-w-3xl mx-auto font-medium drop-shadow-md px-6 leading-relaxed">
              Experience authentic Sri Lankan flavors with our traditional rice and curry dishes. Fresh ingredients,
              bold spices, and corporate dining solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Button size="lg" asChild className="text-lg px-10 py-6 bg-[#26c175] hover:bg-[#26c175]/90 text-white shadow-lg font-semibold">
              <Link href="/payment">
                Order Now
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white bg-white/95 shadow-lg font-semibold"
            >
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
