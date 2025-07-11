"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { popularTrades } from "@/constants"

const PopularTradesSection = () => {
  const router = useRouter()

  const handleTradeClick = (tradeName: string) => {
    router.push(`/search?trade=${tradeName.toLowerCase()}`)
  }

  return (
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
  )
}

export default PopularTradesSection
