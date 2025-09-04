"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Users, Waves, ArrowLeft, Wallet } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EmployeeLoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Demo login - any email/password will work
      await login("employee@company.com", "password", "employee")
      router.push("/dashboard/employee")
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
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <CardTitle className="text-2xl">Employee Login</CardTitle>
            <CardDescription>Access your dining benefits and digital wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee-email">Email Address</Label>
                <Input id="employee-email" type="email" placeholder="your.email@company.com" defaultValue="employee@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" defaultValue="password" required />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Demo: Use any credentials</span>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Access My Benefits"}
              </Button>
            </form>

            <Separator />

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">New employee? Get started with your company code</p>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/auth/employee/signup">Create Employee Account</Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Company administrator?{" "}
                <Link href="/auth/company/login" className="text-primary hover:underline">
                  Company Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Preview */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Wallet className="w-4 h-4 text-secondary" />
                <h3 className="font-semibold text-sm">Your Benefits</h3>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Exclusive employee discounts</li>
                <li>• Digital wallet for easy payments</li>
                <li>• Track your savings and usage</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
