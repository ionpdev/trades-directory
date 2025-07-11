import React from "react"

interface StatsGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

const gridColsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-1 md:grid-cols-3 lg:grid-cols-6",
}

export const StatsGrid = ({
  children,
  columns = 4,
  className = "",
}: StatsGridProps) => {
  return (
    <div className={`grid ${gridColsClasses[columns]} gap-4 ${className}`}>
      {children}
    </div>
  )
}
