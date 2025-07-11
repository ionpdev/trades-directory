import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Heart, MapPin } from "lucide-react"
import { StarRating } from "../common/StarRating"

export interface TradespersonProfileData {
  id: string
  name: string
  trade: string
  experience: string
  rating: number
  totalReviews: number
  verified: boolean
  description: string
  badges?: string[]
  serviceAreas?: string[]
}

interface TradespersonProfileProps {
  tradesperson: TradespersonProfileData
  isUserFavorite: boolean
  onFavoriteToggle: () => void
  showFavoriteButton?: boolean
}

export const TradespersonProfile = ({
  tradesperson,
  isUserFavorite,
  onFavoriteToggle,
  showFavoriteButton = true,
}: TradespersonProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-3xl">{tradesperson.name}</CardTitle>
              {tradesperson.verified && (
                <CheckCircle className="w-6 h-6 text-blue-500" />
              )}
            </div>
            <p className="text-lg text-muted-foreground capitalize">
              {tradesperson.trade} • {tradesperson.experience} experience
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <StarRating rating={Math.floor(tradesperson.rating)} />
                <span className="font-semibold">
                  {tradesperson.rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">
                  ({tradesperson.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
          {showFavoriteButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFavoriteToggle}
              className="ml-2"
            >
              <Heart
                className={`w-5 h-5 ${
                  isUserFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {tradesperson.badges && tradesperson.badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tradesperson.badges.map((badge: string) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-muted-foreground leading-relaxed">
            {tradesperson.description}
          </p>
        </div>

        {tradesperson.serviceAreas && tradesperson.serviceAreas.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {tradesperson.serviceAreas.map((area: string) => (
                <Badge key={area} variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
