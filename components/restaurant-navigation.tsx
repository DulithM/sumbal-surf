"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Bell, Settings, LogOut, MapPin, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function RestaurantNavigation() {
  const router = useRouter()

  const handleLogout = () => {
    // In real app, this would clear auth state
    router.push("/")
  }

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src="/Sumbal Surf Logo.png" 
              alt="Sumbal Surf - Restaurant Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto border-2 border-primary rounded-lg"
            />
          </Link>

          <div className="flex items-center space-x-4">
            {/* Restaurant Info */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">4.8 Rating</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* Restaurant Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <ChefHat className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium">Sumbal Surf Restaurant</p>
                    <p className="text-xs text-muted-foreground">Havelock Road, Colombo</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Restaurant Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Restaurant Info</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Restaurant Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
