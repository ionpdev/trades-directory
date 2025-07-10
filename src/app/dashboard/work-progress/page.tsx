"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Phone, Mail } from "lucide-react";

export default function WorkProgressPage() {
  const router = useRouter();

  const workInProgress = [
    {
      id: 1,
      title: "Kitchen Renovation",
      tradesperson: "Sarah Mitchell",
      trade: "Electrician",
      startDate: "2025-01-05",
      dueDate: "2025-01-15",
      progress: 60,
      status: "In Progress",
      budget: 1200,
      spent: 720,
      phone: "07123 456 789",
      email: "sarah.mitchell@email.com",
      lastUpdate: "2025-01-08",
    },
    {
      id: 2,
      title: "Bathroom Fitting",
      tradesperson: "James Wilson",
      trade: "Plumber",
      startDate: "2025-01-03",
      dueDate: "2025-01-20",
      progress: 35,
      status: "In Progress",
      budget: 800,
      spent: 280,
      phone: "07987 654 321",
      email: "james.wilson@email.com",
      lastUpdate: "2025-01-07",
    },
    {
      id: 3,
      title: "Garden Landscaping",
      tradesperson: "Emma Thompson",
      trade: "Landscaper",
      startDate: "2025-01-10",
      dueDate: "2025-01-25",
      progress: 15,
      status: "Started",
      budget: 600,
      spent: 90,
      phone: "07555 123 456",
      email: "emma.thompson@email.com",
      lastUpdate: "2025-01-09",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Started":
        return "bg-green-100 text-green-800";
      case "Delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
          <h1 className="text-3xl font-bold">Work In Progress</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {workInProgress.map((work) => (
            <Card key={work.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{work.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {work.tradesperson} - {work.trade}
                    </p>
                  </div>
                  <Badge className={getStatusColor(work.status)}>
                    {work.status}
                  </Badge>
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
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion</span>
                          <span>{work.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${work.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">Budget: £{work.budget}</div>
                      <div className="text-sm">Spent: £{work.spent}</div>
                      <div className="text-sm">
                        Remaining: £{work.budget - work.spent}
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
                        Last Update: {work.lastUpdate}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Contact
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
      </div>
    </div>
  );
}
