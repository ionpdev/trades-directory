import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, DollarSign, TrendingUp, CheckCircle } from "lucide-react"

interface WorkProgressStatsProps {
  totalProjects: number
  totalBudget: number
  totalSpent: number
  averageProgress: number
  className?: string
}

export const WorkProgressStats = ({
  totalProjects,
  totalBudget,
  totalSpent,
  averageProgress,
  className = "",
}: WorkProgressStatsProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {totalProjects}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Projects
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
                £{totalBudget}
              </div>
              <div className="text-sm text-muted-foreground">Total Budget</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-600">
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
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.round(averageProgress)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg. Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
