import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export interface AvailabilityInfo {
  nextAvailable: string
  workingHours: string
  emergency?: boolean
}

interface AvailabilityCardProps {
  availability: AvailabilityInfo
  responseTime: string
}

export const AvailabilityCard = ({
  availability,
  responseTime,
}: AvailabilityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-green-500" />
          <span className="font-medium">
            Next available: {availability.nextAvailable}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {availability.workingHours}
        </p>
        {availability.emergency && (
          <Badge variant="destructive">Emergency Available</Badge>
        )}
        <p className="text-xs text-muted-foreground">{responseTime}</p>
      </CardContent>
    </Card>
  )
}
