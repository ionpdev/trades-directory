import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Phone } from "lucide-react"
import { StarRating } from "../common/StarRating"

export interface TradespersonData {
  id: string
  name: string
  trade?: string
  rating: number
  totalReviews?: number
  postcode?: string
  badges?: string[]
}

interface TradespersonCardProps {
  person: TradespersonData
  isFavorite?: boolean
  onFavoriteToggle?: (personId: string) => void
  showContactButtons?: boolean
  onCardClick?: (personId: string) => void
  className?: string
}

export const TradespersonCard = ({
  person,
  isFavorite = false,
  onFavoriteToggle,
  showContactButtons = true,
  onCardClick,
  className = "",
}: TradespersonCardProps) => {
  const router = useRouter()

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(person.id)
    } else {
      router.push(`/tradesperson/${person.id}`)
    }
  }

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/tradesperson/${person.id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onFavoriteToggle) {
      onFavoriteToggle(person.id)
    }
  }

  return (
    <Card
      className={`hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{person.name}</CardTitle>
            {person.trade && (
              <p className="text-sm text-muted-foreground capitalize">
                {person.trade}
              </p>
            )}
          </div>
          {onFavoriteToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <StarRating rating={Math.floor(person.rating)} />
          <span className="text-sm text-muted-foreground">
            {person.rating} ({person.totalReviews || 0} reviews)
          </span>
        </div>

        {person.postcode && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{person.postcode}</span>
          </div>
        )}

        {person.badges && person.badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {person.badges.slice(0, 2).map((badge: string) => (
              <Badge key={badge} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {showContactButtons && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1" onClick={handleContactClick}>
              <Phone className="w-4 h-4 mr-1" />
              Contact
            </Button>
            <Button size="sm" variant="outline" onClick={handleContactClick}>
              View Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
