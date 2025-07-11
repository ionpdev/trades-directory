import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign } from "lucide-react"
import { StarRating } from "../common/StarRating"

export interface WorkHistoryData {
  id: string | number
  title: string
  tradesperson: string
  trade: string
  category: string
  completedDate: string
  duration: string
  cost: number
  rating: number
  review: string
}

interface WorkHistoryCardProps {
  work: WorkHistoryData
  onContactAgain?: (workId: string | number) => void
  onViewDetails?: (workId: string | number) => void
  getCategoryColor?: (category: string) => string
  className?: string
}

export const WorkHistoryCard = ({
  work,
  onContactAgain,
  onViewDetails,
  getCategoryColor = () => "",
  className = "",
}: WorkHistoryCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{work.title}</CardTitle>
            <p className="text-muted-foreground mt-1">
              {work.tradesperson} - {work.trade}
            </p>
          </div>
          <Badge className={getCategoryColor(work.category)}>
            {work.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Completed: {work.completedDate}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Duration: {work.duration}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Cost: £{work.cost}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Rating:</span>
              <StarRating rating={work.rating} showValue />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Your Review:</div>
              <div className="text-sm text-muted-foreground italic">
                &quot;{work.review}&quot;
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContactAgain?.(work.id)}
              >
                Contact Again
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails?.(work.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
