import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl?: string
}

interface PortfolioSectionProps {
  portfolio: PortfolioItem[]
}

export const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  if (!portfolio || portfolio.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Work</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-muted-foreground">Portfolio Image</span>
                )}
              </div>
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
