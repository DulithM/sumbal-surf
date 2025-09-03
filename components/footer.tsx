import { Waves, MapPin, Clock, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const footerSections = [
    {
      title: "Restaurant",
      links: [
        { label: "Menu", href: "#menu" },
        { label: "About Us", href: "#about" },
        { label: "Group Orders", href: "#business" },
        { label: "Order Now", href: "/order" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Breakfast Specials", href: "#menu" },
        { label: "Delivery Service", href: "#business" },
        { label: "Corporate Orders", href: "#business" },
        { label: "Contact", href: "#about" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "Twitter", href: "#" },
        { label: "Reviews", href: "#" },
      ],
    },
  ]

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4 flex flex-col justify-center items-center min-h-[120px]">
            <div className="flex flex-col items-center space-y-3">
              <Image 
                src="/Sumbal Surf Logo.png" 
                alt="Sumbal Surf - Havelock Logo" 
                width={64} 
                height={64} 
                className="h-16 w-auto border-2 border-white rounded-lg"
              />
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-semibold">{section.title}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="hover:text-[#26c175] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Restaurant Info */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
              <MapPin className="w-5 h-5 text-[#26c175] flex-shrink-0" />
              <div>
                <p className="font-medium">Square Hub, Havelock Road</p>
                <p className="text-sm opacity-80">Colombo 05, Sri Lanka</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
              <Clock className="w-5 h-5 text-[#26c175] flex-shrink-0" />
              <div>
                <p className="font-medium">Open Daily</p>
                <p className="text-sm opacity-80">10:00 AM - 9:00 PM</p>
                <p className="text-xs opacity-60">Breakfast: 10:00 AM - 12:00 PM</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
              <Phone className="w-5 h-5 text-[#26c175] flex-shrink-0" />
              <div>
                <p className="font-medium">Order & Delivery</p>
                <p className="text-sm opacity-80">Available through delivery apps</p>
                <p className="text-xs opacity-60">රු0 delivery fee for new customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
