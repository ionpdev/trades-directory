import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, DollarSign, Star, Calendar } from "lucide-react"

interface WorkHistoryStatsProps {
  totalJobs: number
  totalSpent: number
  averageRating: number
  averageJobCost: number
  className?: string
}

export function WorkHistoryStats({
  totalJobs,
  totalSpent,
  averageRating,
  averageJobCost,
  className = "",
}: WorkHistoryStatsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">
                {totalJobs}
              </div>
              <div className="text-sm text-muted-foreground">
                Jobs Completed
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-blue-600">
                £{totalSpent}
              </div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-purple-600">
                £{Math.round(averageJobCost)}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Job Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
