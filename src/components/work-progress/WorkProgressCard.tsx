import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Phone, Mail } from "lucide-react"
import { ProgressBar } from "../common/ProgressBar"

export interface WorkProgressData {
  id: string | number
  title: string
  tradesperson: string
  trade: string
  startDate: string
  dueDate: string
  progress: number
  status: string
  budget: number
  spent: number
  phone: string
  email: string
  lastUpdate: string
}

interface WorkProgressCardProps {
  work: WorkProgressData
  onContact?: (workId: string | number) => void
  onViewDetails?: (workId: string | number) => void
  getStatusColor?: (status: string) => string
  className?: string
}

export const WorkProgressCard = ({
  work,
  onContact,
  onViewDetails,
  getStatusColor = () => "",
  className = "",
}: WorkProgressCardProps) => {
  const remaining = work.budget - work.spent

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{work.title}</CardTitle>
            <p className="text-muted-foreground mt-1">
              {work.tradesperson} - {work.trade}
            </p>
          </div>
          <Badge className={getStatusColor(work.status)}>{work.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Timeline</span>
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                Started: {work.startDate}
              </div>
              <div className="text-sm text-muted-foreground ml-6">
                Due: {work.dueDate}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Progress</span>
              </div>
              <div className="ml-6">
                <ProgressBar
                  progress={work.progress}
                  label="Completion"
                  color="blue"
                  size="md"
                  showPercentage={true}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <strong>Budget:</strong> £{work.budget}
              </div>
              <div className="text-sm">
                <strong>Spent:</strong> £{work.spent}
              </div>
              <div className="text-sm">
                <strong>Remaining:</strong> £{remaining}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Contact Information</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{work.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{work.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <strong>Last Update:</strong> {work.lastUpdate}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onContact?.(work.id)}
              >
                Contact
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails?.(work.id)}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
