import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

export interface ActivityItemData {
  title: string
  description: string
  icon: LucideIcon
  iconBgColor: string
  iconColor: string
}

interface ActivityFeedProps {
  title: string
  items: ActivityItemData[]
}

export const ActivityFeed = ({ title, items }: ActivityFeedProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div
                className={`w-8 h-8 ${item.iconBgColor} rounded-full flex items-center justify-center`}
              >
                <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
