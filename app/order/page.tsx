import { OrderSystem } from "@/components/order-system"
import { Navigation } from "@/components/navigation"

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Order from Sumbal Surf - Havelock</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Order authentic Sri Lankan breakfast and get it delivered to your door. 
            Perfect for individuals, families, and group orders.
          </p>
        </div>

        <OrderSystem />
      </div>
    </div>
  )
}
