import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

export interface WorkItemData {
  title: string
  tradesperson: string
  profession: string
  date: string
  status?: "in-progress" | "completed" | "potential"
}

interface WorkManagementCardProps {
  title: string
  icon: LucideIcon
  iconColor: string
  items: WorkItemData[]
  buttonText: string
  onButtonClick: () => void
  onItemClick?: (item: WorkItemData) => void
}

export const WorkManagementCard = ({
  title,
  icon: Icon,
  iconColor,
  items,
  buttonText,
  onButtonClick,
  onItemClick,
}: WorkManagementCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "in-progress":
        return "bg-orange-500"
      case "completed":
        return "bg-green-500"
      case "potential":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                onItemClick ? "cursor-pointer hover:bg-gray-50 p-2 rounded" : ""
              }`}
              onClick={() => onItemClick?.(item)}
            >
              <div
                className={`w-2 h-2 ${getStatusColor(
                  item.status
                )} rounded-full mt-2`}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.tradesperson} - {item.profession}
                </p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t">
            <button
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={onButtonClick}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
