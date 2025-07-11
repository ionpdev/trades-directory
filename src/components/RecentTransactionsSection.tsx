import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentTransactions } from "@/constants"

const RecentTransactionsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.tradesperson}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">£{transaction.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentTransactionsSection
