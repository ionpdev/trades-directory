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
