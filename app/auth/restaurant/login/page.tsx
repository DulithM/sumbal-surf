"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ChefHat, Waves, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RestaurantLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Demo login - any credentials will work
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/dashboard/restaurant")
    } catch (error) {
      console.error("Login failed:", error)
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

        {/* Login Card */}
        <Card>
          <CardHeader className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <ChefHat className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Restaurant Login</CardTitle>
            <CardDescription>Access your restaurant dashboard and manage orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="restaurant-email">Restaurant Email</Label>
                <Input 
                  id="restaurant-email" 
                  type="email" 
                  placeholder="restaurant@sumbalsurf.lk" 
                  defaultValue="restaurant@sumbalsurf.lk"
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password" 
                  defaultValue="password"
                  required 
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Demo: Use any credentials</span>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Access Restaurant Dashboard"}
              </Button>
            </form>

            <Separator />

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Don't have a restaurant account?</p>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/auth/restaurant/signup">Register Restaurant</Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Are you a company or employee?{" "}
                <Link href="/auth/company/login" className="text-primary hover:underline">
                  Company Login
                </Link>
                {" or "}
                <Link href="/auth/employee/login" className="text-primary hover:underline">
                  Employee Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Benefits Preview */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-sm">Restaurant Benefits</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Manage incoming orders in real-time</li>
                <li>• Update menu items and availability</li>
                <li>• Track order analytics and performance</li>
                <li>• Corporate meal program integration</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
