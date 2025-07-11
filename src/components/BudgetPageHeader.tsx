"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface BudgetPageHeaderProps {
  title: string
}

const BudgetPageHeader = ({ title }: BudgetPageHeaderProps) => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-4 mb-8">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Button>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  )
}

export default BudgetPageHeader
