import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

export interface ExpenseCategoryData {
  name: string
  amount: number
  color: string
}

interface ExpenseBreakdownProps {
  categories: ExpenseCategoryData[]
  currency: string
  onViewDetailedBudget: () => void
}

export const ExpenseBreakdown = ({
  categories,
  currency,
  onViewDetailedBudget,
}: ExpenseBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Expense Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-sm font-medium">
                {currency}
                {category.amount.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={onViewDetailedBudget}
            >
              View Detailed Budget
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
