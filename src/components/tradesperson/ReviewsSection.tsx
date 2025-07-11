import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "../common/StarRating"

export interface ReviewData {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  jobType: string
}

interface ReviewsSectionProps {
  reviews: ReviewData[]
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  if (!reviews || reviews.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">{review.customerName}</span>
                  <Badge variant="outline" className="text-xs">
                    {review.jobType}
                  </Badge>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <span className="text-sm text-muted-foreground">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-muted-foreground">{review.comment}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
