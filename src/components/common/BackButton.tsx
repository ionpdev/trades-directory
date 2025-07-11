import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  label?: string
  onClick?: () => void
  className?: string
}

export const BackButton = ({
  label = "Back",
  onClick,
  className = "",
}: BackButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}
