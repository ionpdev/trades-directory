import React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  value: string | number
  label: string
  color?: "green" | "blue" | "purple" | "yellow" | "red" | "gray"
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

const colorClasses = {
  green: "text-green-600",
  blue: "text-blue-600",
  purple: "text-purple-600",
  yellow: "text-yellow-600",
  red: "text-red-600",
  gray: "text-gray-600",
}

export const StatCard = ({
  value,
  label,
  color = "gray",
  icon: Icon,
  className = "",
}: StatCardProps) => {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-2xl font-bold ${colorClasses[color]}`}>
              {value}
            </div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
          {Icon && (
            <Icon className={`w-6 h-6 ${colorClasses[color]} opacity-60`} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
