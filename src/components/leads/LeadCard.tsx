import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Phone, Mail, MapPin, DollarSign } from "lucide-react"

export interface LeadData {
  id: string | number
  name: string
  interestedIn: string
  status: string
  urgency: string
  phone: string
  email: string
  location: string
  budget: string
  description: string
  enquiryDate: string
}

interface LeadCardProps {
  lead: LeadData
  onContactClient?: (leadId: string | number) => void
  onSendQuote?: (leadId: string | number) => void
  onViewDetails?: (leadId: string | number) => void
  getStatusColor?: (status: string) => string
  getUrgencyColor?: (urgency: string) => string
  className?: string
}

export const LeadCard = ({
  lead,
  onContactClient,
  onSendQuote,
  onViewDetails,
  getStatusColor = () => "",
  getUrgencyColor = () => "",
  className = "",
}: LeadCardProps) => {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{lead.name}</CardTitle>
            <p className="text-muted-foreground mt-1">
              Interested in: {lead.interestedIn}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
            <Badge className={getUrgencyColor(lead.urgency)}>
              {lead.urgency}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Contact Information</span>
              </div>
              <div className="ml-6 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{lead.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{lead.location}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Budget Range</span>
              </div>
              <div className="ml-6">
                <span className="text-sm">{lead.budget}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Project Description</div>
              <div className="text-sm text-muted-foreground">
                {lead.description}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <strong>Enquiry Date:</strong> {lead.enquiryDate}
              </div>
              <div className="text-sm">
                <strong>Urgency:</strong> {lead.urgency}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={() => onContactClient?.(lead.id)}>
                Contact Client
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onSendQuote?.(lead.id)}
              >
                Send Quote
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onViewDetails?.(lead.id)}
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
