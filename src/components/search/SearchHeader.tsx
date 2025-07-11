import React from "react"

interface SearchHeaderProps {
  title?: string
  description?: string
  className?: string
}

export const SearchHeader = ({
  title = "Find Trusted Tradespeople",
  description = "Search for skilled professionals in your area",
  className = "",
}: SearchHeaderProps) => {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
