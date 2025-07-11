"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  DollarSign,
} from "lucide-react"

export default function LeadsPage() {
  const router = useRouter()

  const potentialClients = [
    {
      id: 1,
      name: "Emma Thompson",
      email: "emma.thompson@email.com",
      phone: "07123 456 789",
      location: "London, SW1A",
      interestedIn: "Tiling",
      budget: "£500-800",
      urgency: "High",
      enquiryDate: "2025-01-08",
      status: "New",
      description: "Need bathroom tiling work completed by end of month",
    },
    {
      id: 2,
      name: "Robert Davis",
      email: "robert.davis@email.com",
      phone: "07987 654 321",
      location: "London, N1A",
      interestedIn: "Painting",
      budget: "£300-500",
      urgency: "Medium",
      enquiryDate: "2025-01-07",
      status: "Contacted",
      description: "Looking for interior painting of living room and bedroom",
    },
    {
      id: 3,
      name: "Lisa Johnson",
      email: "lisa.johnson@email.com",
      phone: "07555 123 456",
      location: "London, W1A",
      interestedIn: "Electrical Work",
      budget: "£200-400",
      urgency: "Low",
      enquiryDate: "2025-01-06",
      status: "Quote Sent",
      description: "Additional power outlets needed in home office",
    },
    {
      id: 4,
      name: "Mark Wilson",
      email: "mark.wilson@email.com",
      phone: "07444 789 123",
      location: "London, EC1A",
      interestedIn: "Plumbing",
      budget: "£150-300",
      urgency: "High",
      enquiryDate: "2025-01-05",
      status: "Negotiating",
      description: "Leaking tap repair and bathroom sink replacement",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-green-100 text-green-800"
      case "Contacted":
        return "bg-blue-100 text-blue-800"
      case "Quote Sent":
        return "bg-purple-100 text-purple-800"
      case "Negotiating":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Potential Clients & Leads</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {potentialClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{client.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      Interested in: {client.interestedIn}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                    <Badge className={getUrgencyColor(client.urgency)}>
                      {client.urgency}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Contact Information
                        </span>
                      </div>
                      <div className="ml-6 space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{client.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Budget Range
                        </span>
                      </div>
                      <div className="ml-6">
                        <span className="text-sm">{client.budget}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">
                        Project Description
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {client.description}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <strong>Enquiry Date:</strong> {client.enquiryDate}
                      </div>
                      <div className="text-sm">
                        <strong>Urgency:</strong> {client.urgency}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm">Contact Client</Button>
                      <Button size="sm" variant="outline">
                        Send Quote
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-muted-foreground">
                Active Negotiations
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">1</div>
              <div className="text-sm text-muted-foreground">Quotes Sent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">£1,450</div>
              <div className="text-sm text-muted-foreground">
                Potential Revenue
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
