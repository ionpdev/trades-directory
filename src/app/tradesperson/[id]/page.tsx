"use client";

import { useParams, useRouter } from "next/navigation";
import { useLazyQueryWithMSW } from "@/hooks/useMSWQuery";
import { GET_TRADESPERSON_BY_ID } from "@/lib/apollo/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  Globe,
  Clock,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";
import type {
  GetTradespersonResponse,
  GetTradespersonVariables,
} from "@/types/graphql";
import { useEffect, useCallback } from "react";

export default function TradespersonPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [fetchTradesperson, { data, loading, error }] = useLazyQueryWithMSW<
    GetTradespersonResponse,
    GetTradespersonVariables
  >(GET_TRADESPERSON_BY_ID);

  const fetchTradespersonWithId = useCallback(() => {
    if (id) {
      fetchTradesperson({ variables: { id } });
    }
  }, [id, fetchTradesperson]);

  useEffect(() => {
    fetchTradespersonWithId();
  }, [fetchTradespersonWithId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="flex flex-col justify-center items-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-4 border-transparent border-b-primary/30 rounded-full animate-spin absolute top-0 animate-pulse"></div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-foreground">
                Loading profile...
              </p>
              <p className="text-sm text-muted-foreground">
                Getting tradesperson details
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.tradesperson) {
    return (
      <div className="bg-background">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Tradesperson Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The tradesperson you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Button onClick={() => router.push("/search")}>
              Back to Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tradesperson = data.tradesperson;

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-3xl">
                        {tradesperson.name}
                      </CardTitle>
                      {tradesperson.verified && (
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground capitalize">
                      {tradesperson.trade} • {tradesperson.experience}{" "}
                      experience
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(tradesperson.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">
                          {tradesperson.rating.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">
                          ({tradesperson.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {tradesperson.badges?.map((badge: string) => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {tradesperson.description}
                  </p>
                </div>

                {/* Service Areas */}
                <div>
                  <h3 className="font-semibold mb-2">Service Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {tradesperson.serviceAreas?.map((area: string) => (
                      <Badge key={area} variant="outline">
                        <MapPin className="w-3 h-3 mr-1" />
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact & Availability Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>{tradesperson.contactInfo?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">
                    {tradesperson.contactInfo?.email}
                  </span>
                </div>
                {tradesperson.contactInfo?.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">
                      {tradesperson.contactInfo.website}
                    </span>
                  </div>
                )}
                <div className="pt-4">
                  <Button className="w-full" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full mt-2">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="font-medium">
                    Next available: {tradesperson.availability?.nextAvailable}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tradesperson.availability?.workingHours}
                </p>
                {tradesperson.availability?.emergency && (
                  <Badge variant="destructive">Emergency Available</Badge>
                )}
                <p className="text-xs text-muted-foreground">
                  {tradesperson.responseTime}
                </p>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Call-out fee:</span>
                  <span className="font-medium">
                    £{tradesperson.pricing?.calloutFee}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hourly rate:</span>
                  <span className="font-medium">
                    £{tradesperson.pricing?.hourlyRate}/hr
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum charge:</span>
                  <span className="font-medium">
                    £{tradesperson.pricing?.minimumCharge}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio Section */}
        {tradesperson.portfolio && tradesperson.portfolio.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Work</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tradesperson.portfolio.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">
                        Portfolio Image
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews Section */}
        {tradesperson.reviews && tradesperson.reviews.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {tradesperson.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium">
                          {review.customerName}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {review.jobType}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
