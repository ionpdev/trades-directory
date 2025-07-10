"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLazyQueryWithMSW } from "@/hooks/useMSWQuery";
import { GET_ALL_TRADESPEOPLE } from "@/lib/apollo/queries";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin, Phone } from "lucide-react";
import type { GetTradespeopleResponse } from "@/types/graphql";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const router = useRouter();

  const [fetchTradespeople, { data, loading }] = useLazyQueryWithMSW<
    GetTradespeopleResponse,
    Record<string, never>
  >(GET_ALL_TRADESPEOPLE);

  const fetchFavorites = useCallback(() => {
    if (favorites.length > 0) {
      fetchTradespeople({ variables: {} });
    }
  }, [favorites, fetchTradespeople]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const favoriteTradespeople =
    data?.tradespeople?.filter((tp) => favorites.includes(tp.id)) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Favorites
          </h1>
          <p className="text-gray-600">
            Tradespeople you&apos;ve saved for easy access
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <Card>
            <CardContent className="text-center py-16">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">
                Start browsing tradespeople and add them to your favorites!
              </p>
              <Button onClick={() => router.push("/search")}>
                Find Tradespeople
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTradespeople.map((person) => (
              <Card
                key={person.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/tradesperson/${person.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{person.name}</CardTitle>
                      <p className="text-sm text-muted-foreground capitalize">
                        {person.trade}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFavorite(person.id);
                      }}
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(person.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {person.rating} ({person.totalReviews} reviews)
                    </span>
                  </div>

                  {/* Postcode */}
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{person.postcode}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1">
                    {person.badges?.slice(0, 2).map((badge: string) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/tradesperson/${person.id}`);
                      }}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/tradesperson/${person.id}`);
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
