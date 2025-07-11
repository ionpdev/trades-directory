import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAlertColor } from "@/utils"

export interface AlertItemData {
  title: string
  description: string
  type: "error" | "warning" | "info" | "success"
}

interface AlertsFeedProps {
  title: string
  titleIcon?: React.ReactNode
  alerts: AlertItemData[]
}

export const AlertsFeed = ({ title, titleIcon, alerts }: AlertsFeedProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {titleIcon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const colors = getAlertColor(alert.type)
            return (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 ${colors.dot} rounded-full mt-2`}
                ></div>
                <div>
                  <p className={`text-sm font-medium ${colors.text}`}>
                    {alert.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {alert.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
