import React from "react"

interface ProgressBarProps {
  progress: number
  label?: string
  color?: "blue" | "green" | "yellow" | "red" | "purple"
  size?: "sm" | "md" | "lg"
  showPercentage?: boolean
  className?: string
}

const colorClasses = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  red: "bg-red-600",
  purple: "bg-purple-600",
}

const sizeClasses = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
}

export const ProgressBar = ({
  progress,
  label = "Progress",
  color = "blue",
  size = "md",
  showPercentage = true,
  className = "",
}: ProgressBarProps) => {
  // keep progress between 0 and 100 max
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span>{label}</span>}
          {showPercentage && <span>{clampedProgress}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  )
}
