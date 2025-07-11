"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useLazyQueryWithMSW } from "@/hooks/useMSWQuery"
import { GET_ALL_TRADESPEOPLE } from "@/lib/apollo/queries"
import { useRouter } from "next/navigation"
import { useEffect, useCallback } from "react"
import { Heart } from "lucide-react"
import {
  PageHeader,
  EmptyState,
  LoadingSpinner,
  FullPageLoading,
  TradespersonCard,
  TradespersonGrid,
  type TradespersonData,
} from "@/components"
import type { GetTradespeopleResponse } from "@/types/graphql"

const FavoritesPage = () => {
  const { user, loading: authLoading } = useAuth()
  const { favorites, removeFavorite } = useFavorites()
  const router = useRouter()

  const [fetchTradespeople, { data, loading }] = useLazyQueryWithMSW<
    GetTradespeopleResponse,
    Record<string, never>
  >(GET_ALL_TRADESPEOPLE)

  const fetchFavorites = useCallback(() => {
    if (favorites.length > 0) {
      fetchTradespeople({ variables: {} })
    }
  }, [favorites, fetchTradespeople])

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  if (authLoading || !user) {
    return <FullPageLoading />
  }

  const favoriteTradespeople: TradespersonData[] =
    data?.tradespeople?.filter((tp) => favorites.includes(tp.id)) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <PageHeader
          title="Your Favorites"
          description="Tradespeople you've saved for easy access"
        />

        {loading ? (
          <LoadingSpinner message="Loading your favorites..." />
        ) : favorites.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="Start browsing tradespeople and add them to your favorites!"
            actionLabel="Find Tradespeople"
            onAction={() => router.push("/search")}
          />
        ) : (
          <TradespersonGrid>
            {favoriteTradespeople.map((person) => (
              <TradespersonCard
                key={person.id}
                person={person}
                isFavorite={true}
                onFavoriteToggle={(personId) => removeFavorite(personId)}
                showContactButtons={true}
              />
            ))}
          </TradespersonGrid>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
