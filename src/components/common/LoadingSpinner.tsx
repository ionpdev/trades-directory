import React from "react"

type SpinnerSize = "sm" | "md" | "lg"

interface LoadingSpinnerProps {
  size?: SpinnerSize
  message?: string
  className?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
}

export const LoadingSpinner = ({
  size = "md",
  message,
  className = "",
}: LoadingSpinnerProps) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-primary mx-auto mb-4 ${sizeClasses[size]}`}
      />
      {message && <p className="text-muted-foreground">{message}</p>}
    </div>
  )
}

interface FullPageLoadingProps {
  message?: string
}

export const FullPageLoading = ({ message }: FullPageLoadingProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="md" message={message} />
    </div>
  )
}
