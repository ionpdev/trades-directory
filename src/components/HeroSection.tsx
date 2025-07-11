"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { popularTrades } from "@/constants"

const HeroSection = () => {
  const router = useRouter()
  const [searchTrade, setSearchTrade] = useState("")
  const [searchPostcode, setSearchPostcode] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchTrade) params.set("trade", searchTrade.toLowerCase())
    if (searchPostcode) params.set("postcode", searchPostcode)

    router.push(`/search?${params.toString()}`)
  }

  return (
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
  )
}

export default HeroSection
