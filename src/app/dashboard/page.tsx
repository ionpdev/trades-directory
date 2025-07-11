"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Settings,
  Heart,
  Star,
  Calendar,
  MessageCircle,
  LogOut,
  DollarSign,
  TrendingUp,
  Briefcase,
  Clock,
  CheckCircle,
  UserCheck,
  AlertCircle,
  PieChart,
  BarChart3,
  Wallet,
} from "lucide-react"

export default function DashboardPage() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const dashboardCards = [
    {
      title: "Favorites",
      description: "Your saved tradespeople",
      icon: Heart,
      count: "3",
      href: "/dashboard/favorites",
    },
    {
      title: "Reviews",
      description: "Your reviews and ratings",
      icon: Star,
      count: "2",
      href: "/dashboard/reviews",
    },
    {
      title: "Messages",
      description: "Your conversations",
      icon: MessageCircle,
      count: "1",
      href: "/dashboard/messages",
    },
    {
      title: "Bookings",
      description: "Your appointments",
      icon: Calendar,
      count: "0",
      href: "/dashboard/bookings",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <Badge
                  variant={user.role === "customer" ? "secondary" : "default"}
                >
                  {user.role}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard/profile")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card) => (
            <Card
              key={card.title}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(card.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.count}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Financial Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Monthly Budget</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">
                    £2,500
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      Spent This Month
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    £1,250
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Remaining</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">
                    £1,250
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Budget Progress</span>
                    <span>50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Home Repairs</span>
                  </div>
                  <span className="text-sm font-medium">£800</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Garden/Outdoor</span>
                  </div>
                  <span className="text-sm font-medium">£300</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Maintenance</span>
                  </div>
                  <span className="text-sm font-medium">£150</span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/dashboard/budget")}
                  >
                    View Detailed Budget
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Work Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Work In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Kitchen Renovation</p>
                    <p className="text-xs text-muted-foreground">
                      Sarah Mitchell - Electrician
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: Jan 15, 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Bathroom Fitting</p>
                    <p className="text-xs text-muted-foreground">
                      James Wilson - Plumber
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due: Jan 20, 2025
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push("/dashboard/work-progress")}
                  >
                    View All Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Completed Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Garden Fence Repair</p>
                    <p className="text-xs text-muted-foreground">
                      Michael Johnson - Carpenter
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Completed: Dec 28, 2024
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Roof Inspection</p>
                    <p className="text-xs text-muted-foreground">
                      David Brown - Roofer
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Completed: Dec 20, 2024
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push("/dashboard/work-history")}
                  >
                    View Work History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Potential Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Emma Thompson</p>
                    <p className="text-xs text-muted-foreground">
                      Interested in: Tiling
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Budget: £500-800
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Robert Davis</p>
                    <p className="text-xs text-muted-foreground">
                      Interested in: Painting
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Budget: £300-500
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push("/dashboard/leads")}
                  >
                    Manage Leads
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/dashboard/new-project")}
              >
                <Calendar className="w-4 h-4" />
                Schedule New Project
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/dashboard/budget/add")}
              >
                <DollarSign className="w-4 h-4" />
                Add Expense
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => router.push("/search")}
              >
                <User className="w-4 h-4" />
                Find Tradespeople
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Added to favorites</p>
                    <p className="text-xs text-muted-foreground">
                      You saved Sarah Mitchell (Electrician) to your favorites
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Left a review</p>
                    <p className="text-xs text-muted-foreground">
                      You rated Michael Johnson (Carpenter) 5 stars
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile updated</p>
                    <p className="text-xs text-muted-foreground">
                      You updated your profile information
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Payment Due
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Kitchen renovation invoice due in 3 days
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-yellow-700">
                      Budget Alert
                    </p>
                    <p className="text-xs text-muted-foreground">
                      You&apos;ve used 80% of your monthly budget
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      New Message
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sarah Mitchell sent you a project update
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-green-700">
                      Work Complete
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Bathroom fitting has been completed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
