"use client"

import { useRouter } from "next/navigation"
import { completedWork } from "@/constants"
import { getCategoryColor } from "@/utils"
import {
  PageHeader,
  BackButton,
  WorkHistoryCard,
  WorkHistoryStats,
  type WorkHistoryData,
} from "@/components"

const WorkHistoryPage = () => {
  const router = useRouter()

  const workHistory: WorkHistoryData[] = completedWork

  const totalSpent = completedWork.reduce((sum, work) => sum + work.cost, 0)
  const averageRating =
    completedWork.reduce((sum, work) => sum + work.rating, 0) /
    completedWork.length
  const averageJobCost = totalSpent / completedWork.length

  const handleContactAgain = (workId: string | number) => {
    console.log("Contact again for work:", workId)
  }

  const handleViewDetails = (workId: string | number) => {
    console.log("View details for work:", workId)
    router.push(`/dashboard/work-history/${workId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <PageHeader
          title="Work History"
          description="Review your completed projects and past work experiences"
        >
          <BackButton label="Back to Dashboard" />
        </PageHeader>
        <WorkHistoryStats
          totalJobs={completedWork.length}
          totalSpent={totalSpent}
          averageRating={averageRating}
          averageJobCost={averageJobCost}
          className="mb-8"
        />
        <div className="space-y-6">
          {workHistory.map((work) => (
            <WorkHistoryCard
              key={work.id}
              work={work}
              onContactAgain={handleContactAgain}
              onViewDetails={handleViewDetails}
              getCategoryColor={getCategoryColor}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkHistoryPage
