import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut } from "lucide-react"

export interface UserData {
  name: string
  email: string
  role: string
}

interface UserHeaderProps {
  user: UserData
  onProfileClick: () => void
  onLogout: () => void
}

export const UserHeader = ({
  user,
  onProfileClick,
  onLogout,
}: UserHeaderProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <Badge
                variant={user.role === "customer" ? "secondary" : "default"}
              >
                {user.role}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onProfileClick}>
              <Settings className="w-4 h-4 mr-2" />
              Profile Settings
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
