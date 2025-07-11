import { type WorkProgressData } from "@/components"
import {
  type DashboardCardData,
  type WorkItemData,
  type ActivityItemData,
  type AlertItemData,
  type FinancialData,
  type ExpenseCategoryData,
} from "@/components"
import {
  Shield,
  Star,
  Clock,
  CheckCircle,
  Wrench,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  Home as HomeIcon,
  Heart,
  Calendar,
  MessageCircle,
  User,
} from "lucide-react"

// Popular trades for quick access
export const popularTrades = [
  { name: "Electrician", icon: Zap, count: "50+" },
  { name: "Plumber", icon: Droplets, count: "40+" },
  { name: "Builder", icon: Hammer, count: "30+" },
  { name: "Painter", icon: Paintbrush, count: "25+" },
  { name: "Carpenter", icon: Wrench, count: "20+" },
  { name: "Handyman", icon: HomeIcon, count: "35+" },
]

// Trust indicators
export const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All tradespeople are background checked and verified",
  },
  {
    icon: Star,
    title: "Customer Reviews",
    description: "Real reviews from verified customers",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Get quotes within hours, not days",
  },
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description: "Work backed by our quality guarantee",
  },
]

export const monthlyExpenses = [
  {
    category: "Home Repairs",
    amount: 800,
    percentage: 64,
    color: "bg-blue-500",
  },
  {
    category: "Garden/Outdoor",
    amount: 300,
    percentage: 24,
    color: "bg-green-500",
  },
  {
    category: "Maintenance",
    amount: 150,
    percentage: 12,
    color: "bg-purple-500",
  },
]

export const recentTransactions = [
  {
    date: "2025-01-08",
    description: "Kitchen Electrical Work",
    amount: 450,
    tradesperson: "Sarah Mitchell",
  },
  {
    date: "2025-01-05",
    description: "Bathroom Plumbing",
    amount: 350,
    tradesperson: "James Wilson",
  },
  {
    date: "2025-01-03",
    description: "Garden Fence Repair",
    amount: 200,
    tradesperson: "Michael Johnson",
  },
]

export const potentialClients = [
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

export const completedWork = [
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

export const workInProgress: WorkProgressData[] = [
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
]

export const workInProgressItems: WorkItemData[] = [
  {
    title: "Kitchen Renovation",
    tradesperson: "Sarah Mitchell",
    profession: "Electrician",
    date: "Due: Jan 15, 2025",
    status: "in-progress",
  },
  {
    title: "Bathroom Fitting",
    tradesperson: "James Wilson",
    profession: "Plumber",
    date: "Due: Jan 20, 2025",
    status: "in-progress",
  },
]

export const completedWorkItems: WorkItemData[] = [
  {
    title: "Garden Fence Repair",
    tradesperson: "Michael Johnson",
    profession: "Carpenter",
    date: "Completed: Dec 28, 2024",
    status: "completed",
  },
  {
    title: "Roof Inspection",
    tradesperson: "David Brown",
    profession: "Roofer",
    date: "Completed: Dec 20, 2024",
    status: "completed",
  },
]

export const potentialClientItems: WorkItemData[] = [
  {
    title: "Emma Thompson - Tiling",
    tradesperson: "Interested in",
    profession: "Tiling",
    date: "Budget: £500-800",
    status: "potential",
  },
  {
    title: "Robert Davis - Painting",
    tradesperson: "Interested in",
    profession: "Painting",
    date: "Budget: £300-500",
    status: "potential",
  },
]

export const alertsData: AlertItemData[] = [
  {
    title: "Payment Due",
    description: "Kitchen renovation invoice due in 3 days",
    type: "error",
  },
  {
    title: "Budget Alert",
    description: "You've used 80% of your monthly budget",
    type: "warning",
  },
  {
    title: "New Message",
    description: "Sarah Mitchell sent you a project update",
    type: "info",
  },
  {
    title: "Work Complete",
    description: "Bathroom fitting has been completed",
    type: "success",
  },
]

export const financialData: FinancialData = {
  monthlyBudget: 2500,
  spentThisMonth: 1250,
  remaining: 1250,
  currency: "£",
}

export const expenseCategories: ExpenseCategoryData[] = [
  {
    name: "Home Repairs",
    amount: 800,
    color: "bg-blue-500",
  },
  {
    name: "Garden/Outdoor",
    amount: 300,
    color: "bg-green-500",
  },
  {
    name: "Maintenance",
    amount: 150,
    color: "bg-purple-500",
  },
]

export const dashboardCards: DashboardCardData[] = [
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

export const recentActivityItems: ActivityItemData[] = [
  {
    title: "Added to favorites",
    description: "You saved Sarah Mitchell (Electrician) to your favorites",
    icon: Heart,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Left a review",
    description: "You rated Michael Johnson (Carpenter) 5 stars",
    icon: Star,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Profile updated",
    description: "You updated your profile information",
    icon: User,
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
]

// Common trade types for the dropdown
export const tradeTypes = [
  "Electrician",
  "Plumber",
  "Builder",
  "Painter",
  "Carpenter",
  "Handyman",
  "Gas Engineer",
  "Roofer",
  "Kitchen Fitter",
  "Bathroom Fitter",
  "Locksmith",
  "Flooring Specialist",
  "Cleaner",
  "Gardener",
  "Tree Surgeon",
  "Tiler",
  "HVAC Engineer",
  "Appliance Repair",
  "Fencing Contractor",
  "Landscaper",
].sort()

// Common postcodes for the dropdown
export const postcodes = [
  "E1A",
  "E2A",
  "SW1A",
  "SW2A",
  "SW3A",
  "SW5A",
  "SW10A",
  "N1A",
  "N5A",
  "N8A",
  "N12A",
  "NW1A",
  "NW3A",
  "NW6A",
  "NW10A",
  "SE1A",
  "SE5A",
  "SE10A",
  "SE15A",
  "W1A",
  "W2A",
  "W4A",
  "W8A",
  "W11A",
  "W14A",
  "EC1A",
  "EC1B",
  "EC2A",
  "EC3A",
  "EC4A",
  "WC1A",
  "WC1B",
  "WC2A",
  "BR1A",
  "BR3A",
  "CR0A",
  "CR2",
].sort()
