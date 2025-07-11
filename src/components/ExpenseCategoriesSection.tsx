import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { monthlyExpenses } from "@/constants"

const ExpenseCategoriesSection = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyExpenses.map((expense, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{expense.category}</span>
                <span className="text-sm font-bold">£{expense.amount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${expense.color}`}
                  style={{ width: `${expense.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ExpenseCategoriesSection
