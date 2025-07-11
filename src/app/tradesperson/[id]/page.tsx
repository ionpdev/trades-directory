"use client"

import { useParams, useRouter } from "next/navigation"
import { useLazyQueryWithMSW } from "@/hooks/useMSWQuery"
import { GET_TRADESPERSON_BY_ID } from "@/lib/apollo/queries"
import { useAuth } from "@/contexts/AuthContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import {
  TradespersonProfile,
  ContactCard,
  AvailabilityCard,
  PricingCard,
  PortfolioSection,
  ReviewsSection,
  FullPageLoading,
  EmptyState,
  BackButton,
} from "@/components"
import { Search } from "lucide-react"
import type {
  GetTradespersonResponse,
  GetTradespersonVariables,
} from "@/types/graphql"
import { useEffect, useCallback } from "react"

const TradespersonPage = () => {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const id = params?.id as string

  const [fetchTradesperson, { data, loading, error }] = useLazyQueryWithMSW<
    GetTradespersonResponse,
    GetTradespersonVariables
  >(GET_TRADESPERSON_BY_ID)

  const fetchTradespersonWithId = useCallback(() => {
    if (id) {
      fetchTradesperson({ variables: { id } })
    }
  }, [id, fetchTradesperson])

  useEffect(() => {
    fetchTradespersonWithId()
  }, [fetchTradespersonWithId])

  if (loading) {
    return <FullPageLoading />
  }

  if (error || !data?.tradesperson) {
    return (
      <div className="bg-background">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <BackButton onClick={() => router.push("/search")} />
          <EmptyState
            icon={Search}
            title="Tradesperson Not Found"
            description="The tradesperson you're looking for doesn't exist or has been removed."
            actionLabel="Back to Search"
            onAction={() => router.push("/search")}
          />
        </div>
      </div>
    )
  }

  const tradesperson = data.tradesperson
  const isUserFavorite = isFavorite(id)

  const handleFavoriteToggle = () => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    if (isUserFavorite) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
        <BackButton onClick={() => router.push("/search")} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TradespersonProfile
              tradesperson={{
                id: tradesperson.id,
                name: tradesperson.name,
                trade: tradesperson.trade || "",
                experience: tradesperson.experience || "",
                rating: tradesperson.rating,
                totalReviews: tradesperson.totalReviews || 0,
                verified: tradesperson.verified || false,
                description: tradesperson.description || "",
                badges: tradesperson.badges,
                serviceAreas: tradesperson.serviceAreas,
              }}
              isUserFavorite={isUserFavorite}
              onFavoriteToggle={handleFavoriteToggle}
              showFavoriteButton={!!user}
            />
          </div>

          <div className="space-y-6">
            {tradesperson.contactInfo && (
              <ContactCard
                contactInfo={tradesperson.contactInfo}
                onCallClick={() => {
                  console.log("Phone number clicked")
                }}
                onMessageClick={() => {
                  console.log("Send message clicked")
                }}
              />
            )}

            {tradesperson.availability && (
              <AvailabilityCard
                availability={tradesperson.availability}
                responseTime={
                  tradesperson.responseTime || "Usually responds within 1 hour"
                }
              />
            )}

            {tradesperson.pricing && (
              <PricingCard pricing={tradesperson.pricing} />
            )}
          </div>
        </div>

        {tradesperson.portfolio && (
          <PortfolioSection portfolio={tradesperson.portfolio} />
        )}

        {tradesperson.reviews && (
          <ReviewsSection reviews={tradesperson.reviews} />
        )}
      </div>
    </div>
  )
}

export default TradespersonPage
