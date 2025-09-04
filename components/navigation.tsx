"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Navigation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate position based on scroll - starts at bottom-4, smoothly moves to top-4
  const headerPosition = Math.max(4, Math.min(16, 16 - (scrollY * 0.02)))

  return (
    <header 
      className="fixed z-50 mx-4 sm:mx-6 lg:mx-8 left-0 right-0 transition-all duration-300 ease-out"
      style={{ 
        bottom: scrollY > 100 ? 'auto' : `${headerPosition}rem`,
        top: scrollY > 100 ? '1rem' : 'auto'
      }}
    >
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-2 border-[#26c175] rounded-2xl shadow-lg shadow-black/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Image 
                  src="/Sumbal Surf Logo.png" 
                  alt="Sumbal Surf - Havelock Logo" 
                  width={48} 
                  height={48} 
                  className="h-12 w-auto border-2 border-[#26c175] rounded-lg"
                />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-[#26c175] transition-colors font-medium">
                Home
              </Link>
              <Link href="#menu" className="text-foreground hover:text-[#26c175] transition-colors font-medium">
                Menu
              </Link>
              <Link href="#business" className="text-foreground hover:text-[#26c175] transition-colors font-medium">
                Group Orders
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild 
                className="text-foreground hover:text-[#26c175] hover:bg-transparent transition-colors font-medium"
              >
                <Link href="/auth/employee/login">Employee</Link>
              </Button>
              <Button 
                size="sm" 
                asChild 
                className="bg-[#26c175] text-white hover:bg-[#26c175]/90 shadow-sm font-medium"
              >
                <Link href="/auth/company/login">Corporate</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
