import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

export interface QuickActionData {
  label: string
  icon: LucideIcon
  onClick: () => void
}

interface QuickActionsProps {
  title: string
  titleIcon?: LucideIcon
  actions: QuickActionData[]
}

export const QuickActions = ({
  title,
  titleIcon: TitleIcon,
  actions,
}: QuickActionsProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {TitleIcon && <TitleIcon className="w-5 h-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex items-center gap-2"
              onClick={action.onClick}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
