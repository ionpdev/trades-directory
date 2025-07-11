import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Globe } from "lucide-react"

export interface ContactInfo {
  phone: string
  email: string
  website?: string
}

interface ContactCardProps {
  contactInfo: ContactInfo
  onCallClick?: () => void
  onMessageClick?: () => void
}

export const ContactCard = ({
  contactInfo,
  onCallClick,
  onMessageClick,
}: ContactCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <span>{contactInfo.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm">{contactInfo.email}</span>
        </div>
        {contactInfo.website && (
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm">{contactInfo.website}</span>
          </div>
        )}
        <div className="pt-4">
          <Button className="w-full" size="lg" onClick={onCallClick}>
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={onMessageClick}
          >
            Send Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
