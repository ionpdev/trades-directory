import React from "react"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export const PageHeader = ({
  title,
  description,
  className = "",
  children,
}: PageHeaderProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 mb-8 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        {children && <div className="ml-4">{children}</div>}
      </div>
    </div>
  )
}
