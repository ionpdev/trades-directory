import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/common/ProgressBar"
import { DollarSign, TrendingUp, PieChart, Wallet } from "lucide-react"

export interface FinancialData {
  monthlyBudget: number
  spentThisMonth: number
  remaining: number
  currency: string
}

interface FinancialOverviewProps {
  data: FinancialData
}

export const FinancialOverview = ({ data }: FinancialOverviewProps) => {
  const spentPercentage = (data.spentThisMonth / data.monthlyBudget) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Financial Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Monthly Budget</span>
            </div>
            <span className="text-lg font-bold text-green-600">
              {data.currency}
              {data.monthlyBudget.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Spent This Month</span>
            </div>
            <span className="text-lg font-bold text-blue-600">
              {data.currency}
              {data.spentThisMonth.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium">Remaining</span>
            </div>
            <span className="text-lg font-bold text-purple-600">
              {data.currency}
              {data.remaining.toLocaleString()}
            </span>
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Budget Progress</span>
              <span>{Math.round(spentPercentage)}%</span>
            </div>
            <ProgressBar
              progress={spentPercentage}
              color="blue"
              size="sm"
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
