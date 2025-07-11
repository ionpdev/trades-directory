"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Shield,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Wrench,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Home as HomeIcon,
} from "lucide-react"

// Popular trades for quick access
const popularTrades = [
  { name: "Electrician", icon: Zap, count: "50+" },
  { name: "Plumber", icon: Droplets, count: "40+" },
  { name: "Builder", icon: Hammer, count: "30+" },
  { name: "Painter", icon: Paintbrush, count: "25+" },
  { name: "Carpenter", icon: Wrench, count: "20+" },
  { name: "Handyman", icon: HomeIcon, count: "35+" },
]

// Trust indicators
const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All tradespeople are background checked and verified",
  },
  {
    icon: Star,
    title: "Customer Reviews",
    description: "Real reviews from verified customers",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Get quotes within hours, not days",
  },
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description: "Work backed by our quality guarantee",
  },
]

export default function Home() {
  const router = useRouter()
  const [searchTrade, setSearchTrade] = useState("")
  const [searchPostcode, setSearchPostcode] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTrade) params.set("trade", searchTrade.toLowerCase())
    if (searchPostcode) params.set("postcode", searchPostcode)

    router.push(`/search?${params.toString()}`)
  }

  const handleTradeClick = (tradeName: string) => {
    router.push(`/search?trade=${tradeName.toLowerCase()}`)
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Find Trusted <span className="text-primary">Tradespeople</span> Near
            You
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Connect with verified, highly-rated professionals for all your home
            improvement needs. From emergency repairs to complete renovations.
          </p>

          {/* Search Form */}
          <Card className="max-w-2xl mx-auto p-6 shadow-lg">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Select value={searchTrade} onValueChange={setSearchTrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="What do you need?" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularTrades.map((trade) => (
                        <SelectItem
                          key={trade.name}
                          value={trade.name.toLowerCase()}
                        >
                          {trade.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input
                    placeholder="Enter your postcode"
                    value={searchPostcode}
                    onChange={(e) => setSearchPostcode(e.target.value)}
                  />
                </div>
              </div>
              <Button
                onClick={handleSearch}
                className="w-full h-12 text-lg"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Find Tradespeople
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Trades Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularTrades.map((trade) => (
              <Card
                key={trade.name}
                className="hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => handleTradeClick(trade.name)}
              >
                <CardContent className="p-6 text-center">
                  <trade.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2">{trade.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {trade.count} available
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of satisfied customers who found their perfect
            tradesperson through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push("/search")}
              className="h-12 px-8"
            >
              Browse All Trades
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">TradesDirectory</h3>
          <p className="text-muted-foreground mb-8">
            Your trusted platform for finding verified tradespeople across the
            UK.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
            © 2025 TradesDirectory. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
