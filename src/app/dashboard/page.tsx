"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  DashboardCard,
  UserHeader,
  WorkManagementCard,
  ActivityFeed,
  AlertsFeed,
  QuickActions,
  FinancialOverview,
  ExpenseBreakdown,
  FullPageLoading,
  type QuickActionData,
} from "@/components"
import {
  Calendar,
  Clock,
  CheckCircle,
  UserCheck,
  AlertCircle,
  Briefcase,
  DollarSign,
  User,
} from "lucide-react"
import {
  alertsData,
  completedWorkItems,
  dashboardCards,
  expenseCategories,
  financialData,
  potentialClientItems,
  recentActivityItems,
  workInProgressItems,
} from "@/constants"

const DashboardPage = () => {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  if (loading) {
    return <FullPageLoading />
  }

  if (!user) {
    return <></>
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleDashboardCardClick = (href: string) => {
    router.push(href)
  }

  const quickActions: QuickActionData[] = [
    {
      label: "Schedule New Project",
      icon: Calendar,
      onClick: () => router.push("/dashboard/new-project"),
    },
    {
      label: "Add Expense",
      icon: DollarSign,
      onClick: () => router.push("/dashboard/budget/add"),
    },
    {
      label: "Find Tradespeople",
      icon: User,
      onClick: () => router.push("/search"),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <UserHeader
          user={{
            name: user.name,
            email: user.email,
            role: user.role,
          }}
          onProfileClick={() => router.push("/dashboard/profile")}
          onLogout={handleLogout}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.title}
              card={card}
              onClick={handleDashboardCardClick}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <FinancialOverview data={financialData} />
          <ExpenseBreakdown
            categories={expenseCategories}
            currency="£"
            onViewDetailedBudget={() => router.push("/dashboard/budget")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <WorkManagementCard
            title="Work In Progress"
            icon={Clock}
            iconColor="text-orange-600"
            items={workInProgressItems}
            buttonText="View All Progress"
            onButtonClick={() => router.push("/dashboard/work-progress")}
          />

          <WorkManagementCard
            title="Completed Work"
            icon={CheckCircle}
            iconColor="text-green-600"
            items={completedWorkItems}
            buttonText="View Work History"
            onButtonClick={() => router.push("/dashboard/work-history")}
          />

          <WorkManagementCard
            title="Potential Clients"
            icon={UserCheck}
            iconColor="text-blue-600"
            items={potentialClientItems}
            buttonText="Manage Leads"
            onButtonClick={() => router.push("/dashboard/leads")}
          />
        </div>

        <QuickActions
          title="Quick Actions"
          titleIcon={Briefcase}
          actions={quickActions}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed title="Recent Activity" items={recentActivityItems} />

          <AlertsFeed
            title="Alerts & Notifications"
            titleIcon={<AlertCircle className="w-5 h-5" />}
            alerts={alertsData}
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
