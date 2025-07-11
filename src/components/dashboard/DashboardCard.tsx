import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

export interface DashboardCardData {
  title: string
  description: string
  icon: LucideIcon
  count: string
  href: string
}

interface DashboardCardProps {
  card: DashboardCardData
  onClick: (href: string) => void
}

export const DashboardCard = ({ card, onClick }: DashboardCardProps) => {
  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(card.href)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <card.icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.count}</div>
        <p className="text-xs text-muted-foreground">{card.description}</p>
      </CardContent>
    </Card>
  )
}
