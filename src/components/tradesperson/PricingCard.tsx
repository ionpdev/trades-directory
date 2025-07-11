import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface PricingInfo {
  calloutFee: number
  hourlyRate: number
  minimumCharge: number
}

interface PricingCardProps {
  pricing: PricingInfo
  currency?: string
}

export const PricingCard = ({ pricing, currency = "£" }: PricingCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Call-out fee:</span>
          <span className="font-medium">
            {currency}
            {pricing.calloutFee}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Hourly rate:</span>
          <span className="font-medium">
            {currency}
            {pricing.hourlyRate}/hr
          </span>
        </div>
        <div className="flex justify-between">
          <span>Minimum charge:</span>
          <span className="font-medium">
            {currency}
            {pricing.minimumCharge}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
