"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Calendar,
  DollarSign,
} from "lucide-react"

export default function WorkHistoryPage() {
  const router = useRouter()

  const completedWork = [
    {
      id: 1,
      title: "Garden Fence Repair",
      tradesperson: "Michael Johnson",
      trade: "Carpenter",
      completedDate: "2024-12-28",
      duration: "3 days",
      cost: 450,
      rating: 5,
      review: "Excellent work, very professional and completed on time.",
      category: "Garden/Outdoor",
    },
    {
      id: 2,
      title: "Roof Inspection",
      tradesperson: "David Brown",
      trade: "Roofer",
      completedDate: "2024-12-20",
      duration: "1 day",
      cost: 150,
      rating: 4,
      review: "Thorough inspection with detailed report provided.",
      category: "Maintenance",
    },
    {
      id: 3,
      title: "Bathroom Tile Repair",
      tradesperson: "Sarah Mitchell",
      trade: "Tiler",
      completedDate: "2024-12-15",
      duration: "2 days",
      cost: 320,
      rating: 5,
      review: "Perfect job matching existing tiles. Highly recommended.",
      category: "Home Repairs",
    },
    {
      id: 4,
      title: "Kitchen Sink Installation",
      tradesperson: "James Wilson",
      trade: "Plumber",
      completedDate: "2024-12-10",
      duration: "1 day",
      cost: 280,
      rating: 4,
      review: "Good work, though took a bit longer than expected.",
      category: "Home Repairs",
    },
    {
      id: 5,
      title: "Living Room Paint",
      tradesperson: "Emma Thompson",
      trade: "Painter",
      completedDate: "2024-12-05",
      duration: "2 days",
      cost: 380,
      rating: 5,
      review: "Beautiful finish, very neat and tidy work.",
      category: "Home Repairs",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Home Repairs":
        return "bg-blue-100 text-blue-800"
      case "Garden/Outdoor":
        return "bg-green-100 text-green-800"
      case "Maintenance":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalSpent = completedWork.reduce((sum, work) => sum + work.cost, 0)
  const averageRating =
    completedWork.reduce((sum, work) => sum + work.rating, 0) /
    completedWork.length

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
          <h1 className="text-3xl font-bold">Work History</h1>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {completedWork.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jobs Completed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    £{totalSpent}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Spent
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Rating
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    £{Math.round(totalSpent / completedWork.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Avg. Job Cost
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Work History List */}
        <div className="space-y-6">
          {completedWork.map((work) => (
            <Card key={work.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{work.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {work.tradesperson} - {work.trade}
                    </p>
                  </div>
                  <Badge className={getCategoryColor(work.category)}>
                    {work.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          Completed: {work.completedDate}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Duration: {work.duration}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Cost: £{work.cost}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm">Rating:</span>
                      <div className="flex items-center gap-1">
                        {renderStars(work.rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({work.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Your Review:
                      </div>
                      <div className="text-sm text-muted-foreground italic">
                        &quot;{work.review}&quot;
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Contact Again
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
  )
}
