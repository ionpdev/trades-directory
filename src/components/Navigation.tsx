"use client"

import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Home, Search, User, LogIn, UserPlus } from "lucide-react"

const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                TD
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">
              TradesDirectory - Demo for CT
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/")}
              className="flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Button>
            <Button
              variant={pathname === "/search" ? "default" : "ghost"}
              size="sm"
              onClick={() => router.push("/search")}
              className="flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>

            {/* Authentication Section */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.name}
                </span>
                <Button
                  variant={pathname === "/dashboard" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => router.push("/dashboard")}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                  className="text-muted-foreground"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/auth/signin")}
                  className="flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push("/auth/signup")}
                  className="flex items-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
