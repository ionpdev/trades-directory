import React from "react"

interface TradespersonGridProps {
  children: React.ReactNode
  className?: string
}

export const TradespersonGrid = ({
  children,
  className = "",
}: TradespersonGridProps) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {children}
    </div>
  )
}
