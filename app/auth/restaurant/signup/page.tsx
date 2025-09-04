"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ChefHat, Waves, ArrowLeft, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RestaurantSignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Demo signup - simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push("/dashboard/restaurant")
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <Waves className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Sumbal Surf</span>
          </div>
        </div>

        {/* Signup Card */}
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <ChefHat className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Register Restaurant</CardTitle>
            <CardDescription>Join Sumbal Surf's corporate meal program</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurant-name">Restaurant Name</Label>
                <Input 
                  id="restaurant-name" 
                  placeholder="Enter restaurant name"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="owner-name">Owner/Manager Name</Label>
                <Input 
                  id="owner-name" 
                  placeholder="Enter owner/manager name"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-email">Restaurant Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="restaurant-email" 
                    type="email"
                    placeholder="restaurant@example.com"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-phone">Phone Number</Label>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="restaurant-phone" 
                    placeholder="+94 11 234 5678"
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="restaurant-address">Restaurant Address</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Textarea 
                    id="restaurant-address" 
                    placeholder="Enter complete restaurant address"
                    rows={3}
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cuisine-type">Cuisine Type</Label>
                <Input 
                  id="cuisine-type" 
                  placeholder="e.g., Sri Lankan, Traditional, Healthy"
                  defaultValue="Sri Lankan Traditional"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  placeholder="Create a secure password"
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder="Confirm your password"
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register Restaurant"}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have a restaurant account?{" "}
                <Link href="/auth/restaurant/login" className="text-primary hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Preview */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-sm">Restaurant Benefits</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Access to corporate meal programs</li>
                <li>• Real-time order management system</li>
                <li>• Analytics and performance tracking</li>
                <li>• Marketing support and promotion</li>
                <li>• Flexible payment options</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
