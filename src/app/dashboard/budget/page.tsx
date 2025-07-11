"use client"

import BudgetPageHeader from "@/components/BudgetPageHeader"
import BudgetOverviewSection from "@/components/BudgetOverviewSection"
import ExpenseCategoriesSection from "@/components/ExpenseCategoriesSection"
import RecentTransactionsSection from "@/components/RecentTransactionsSection"

const BudgetPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <BudgetPageHeader title="Budget Management" />
        <BudgetOverviewSection />
        <ExpenseCategoriesSection />
        <RecentTransactionsSection />
      </div>
    </div>
  )
}

export default BudgetPage
