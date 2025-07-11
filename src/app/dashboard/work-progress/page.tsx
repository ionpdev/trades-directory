"use client"

import { useRouter } from "next/navigation"
import {
  PageHeader,
  BackButton,
  WorkProgressCard,
  WorkProgressStats,
} from "@/components"
import { workInProgress } from "@/constants"

export default function WorkProgressPage() {
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Started":
        return "bg-green-100 text-green-800"
      case "Delayed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // some demo statistics
  const totalProjects = workInProgress.length
  const totalBudget = workInProgress.reduce((sum, work) => sum + work.budget, 0)
  const totalSpent = workInProgress.reduce((sum, work) => sum + work.spent, 0)
  const averageProgress =
    workInProgress.reduce((sum, work) => sum + work.progress, 0) / totalProjects

  const handleContact = (workId: string | number) => {
    console.log("Contact for work:", workId)
  }

  const handleViewDetails = (workId: string | number) => {
    console.log("View details for work:", workId)
    router.push(`/dashboard/work-progress/${workId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <PageHeader
          title="Work In Progress"
          description="Track your ongoing projects and their completion status"
        >
          <BackButton label="Back to Dashboard" />
        </PageHeader>

        <WorkProgressStats
          totalProjects={totalProjects}
          totalBudget={totalBudget}
          totalSpent={totalSpent}
          averageProgress={averageProgress}
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-6">
          {workInProgress.map((work) => (
            <WorkProgressCard
              key={work.id}
              work={work}
              onContact={handleContact}
              onViewDetails={handleViewDetails}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
