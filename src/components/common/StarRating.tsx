import React from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  className = "",
}: StarRatingProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
          }`}
        />
      ))}
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">
          ({rating}/{maxRating})
        </span>
      )}
    </div>
  )
}
