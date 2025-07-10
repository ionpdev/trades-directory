"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, DollarSign, TrendingUp, PieChart } from "lucide-react";

export default function BudgetPage() {
  const router = useRouter();

  const monthlyExpenses = [
    {
      category: "Home Repairs",
      amount: 800,
      percentage: 64,
      color: "bg-blue-500",
    },
    {
      category: "Garden/Outdoor",
      amount: 300,
      percentage: 24,
      color: "bg-green-500",
    },
    {
      category: "Maintenance",
      amount: 150,
      percentage: 12,
      color: "bg-purple-500",
    },
  ];

  const recentTransactions = [
    {
      date: "2025-01-08",
      description: "Kitchen Electrical Work",
      amount: 450,
      tradesperson: "Sarah Mitchell",
    },
    {
      date: "2025-01-05",
      description: "Bathroom Plumbing",
      amount: 350,
      tradesperson: "James Wilson",
    },
    {
      date: "2025-01-03",
      description: "Garden Fence Repair",
      amount: 200,
      tradesperson: "Michael Johnson",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Budget Management</h1>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Monthly Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">£2,500</div>
              <p className="text-sm text-muted-foreground">
                Set for January 2025
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Spent This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">£1,250</div>
              <p className="text-sm text-muted-foreground">
                50% of budget used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                Remaining
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">£1,250</div>
              <p className="text-sm text-muted-foreground">
                Available to spend
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Expense Categories */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyExpenses.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {expense.category}
                    </span>
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

        {/* Recent Transactions */}
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
      </div>
    </div>
  );
}
