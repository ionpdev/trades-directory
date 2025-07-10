"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GET_ALL_TRADESPEOPLE,
  GET_TRADESPEOPLE_BY_SEARCH,
} from "@/lib/apollo/queries";
import { useQueryOnMSWReady, useLazyQueryWithMSW } from "@/hooks/useMSWQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  GetTradespeopleResponse,
  GetTradespeopleBySearchVariables,
  Tradesperson,
} from "@/types/graphql";

// Common trade types for the dropdown
const tradeTypes = [
  "Electrician",
  "Plumber",
  "Builder",
  "Carpenter",
  "Gas Engineer",
  "Painter",
  "Tiler",
  "Roofer",
  "Gardener",
  "Locksmith",
  "Flooring Specialist",
  "Plasterer",
  "Window Cleaner",
  "Handyman",
  "Decorator",
  "Heating Engineer",
  "Appliance Repair",
  "Bathroom Fitter",
  "Kitchen Fitter",
  "Driveway Specialist",
  "Pest Control",
  "Carpet Fitter",
  "Chimney Sweep",
  "Fence Installer",
];

// Common postcode areas in London and surrounding areas
const postcodeAreas = [
  "SW1A",
  "SW1B",
  "SW2",
  "SW3",
  "SW4",
  "SW5A",
  "SW5B",
  "SW6",
  "SW7",
  "SW8",
  "SW9",
  "SW10A",
  "SW10B",
  "SW11",
  "SW12",
  "SW13",
  "SW14",
  "SW15A",
  "SW15B",
  "SW16",
  "SW17",
  "SW18",
  "SW19",
  "SW20A",
  "SW20B",
  "SW21",
  "SW22",
  "W1A",
  "W1B",
  "W2A",
  "W2B",
  "W3",
  "W4",
  "W5",
  "W6",
  "W8A",
  "W8B",
  "W9",
  "W10",
  "W11",
  "W12",
  "E1A",
  "E1B",
  "E2A",
  "E2B",
  "E3",
  "E4",
  "E5",
  "E6",
  "E14",
  "E15",
  "N1A",
  "N1B",
  "N2",
  "N3",
  "N4A",
  "N4B",
  "N5",
  "N6",
  "N7",
  "N8",
  "SE1A",
  "SE1B",
  "SE2",
  "SE3",
  "SE4",
  "SE5",
  "SE10A",
  "SE10B",
  "SE11",
  "SE12",
  "SE13",
  "SE14",
  "SE22A",
  "SE22B",
  "SE23",
  "SE24",
  "SE25",
  "SE26",
  "NW1",
  "NW2",
  "NW3A",
  "NW3B",
  "NW4",
  "NW5",
  "NW6",
  "NW7",
  "NW10A",
  "NW10B",
  "NW11",
  "NW12",
  "EC1A",
  "EC1B",
  "EC2",
  "EC3",
  "WC1",
  "WC2",
  "HA1A",
  "HA1B",
  "HA2",
  "HA3",
  "HA4",
  "HA5",
  "BR1A",
  "BR1B",
  "BR2",
  "BR3",
  "BR4",
  "BR5",
  "DA1A",
  "DA1B",
  "DA2",
  "DA3",
  "DA4",
  "DA5",
  "TN1A",
  "TN1B",
  "TN2",
  "TN3",
  "TN4",
  "KT1A",
  "KT1B",
  "KT2",
  "KT3",
  "KT4",
  "KT5",
  "CR0",
  "CR2",
].sort();

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [trade, setTrade] = useState("");
  const [postcode, setPostcode] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Handle URL parameters from home page
  useEffect(() => {
    const tradeParam = searchParams.get("trade");
    const postcodeParam = searchParams.get("postcode");

    if (tradeParam) {
      setTrade(tradeParam);
    }
    if (postcodeParam) {
      setPostcode(postcodeParam);
    }

    // If we have parameters, automatically search
    if (tradeParam || postcodeParam) {
      setHasSearched(true);
    }
  }, [searchParams]);

  const [, { data: allData, loading: allLoading }] =
    useQueryOnMSWReady<GetTradespeopleResponse>(GET_ALL_TRADESPEOPLE);

  const [search, { data: searchData, loading: searchLoading }] =
    useLazyQueryWithMSW<
      GetTradespeopleResponse,
      GetTradespeopleBySearchVariables
    >(GET_TRADESPEOPLE_BY_SEARCH);

  // Trigger search when URL parameters are loaded
  useEffect(() => {
    if (hasSearched && (trade || postcode)) {
      search({ variables: { trade, postcode } });
    }
  }, [hasSearched, trade, postcode, search]);

  const handleSearch = () => {
    if (trade || postcode) {
      // Allow search with just trade OR just postcode
      setHasSearched(true);
      search({ variables: { trade, postcode } });
    }
  };

  const handleReset = () => {
    setTrade("");
    setPostcode("");
    setHasSearched(false);
  };

  const tradespeople = hasSearched
    ? searchData?.tradespeople || []
    : allData?.tradespeople || [];

  const isLoading = hasSearched ? searchLoading : allLoading;

  return (
    <main className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Find Trusted Tradespeople</h1>
          <p className="text-muted-foreground">
            {hasSearched
              ? `Found ${tradespeople.length} tradespeople`
              : "Browse all tradespeople or search by trade type and location"}
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-card p-6 rounded-lg border shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="trade">Trade Type</Label>
              <Select value={trade} onValueChange={setTrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a trade..." />
                </SelectTrigger>
                <SelectContent>
                  {tradeTypes.map((tradeType) => (
                    <SelectItem key={tradeType} value={tradeType.toLowerCase()}>
                      {tradeType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode Area</Label>
              <Select value={postcode} onValueChange={setPostcode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select area..." />
                </SelectTrigger>
                <SelectContent>
                  {postcodeAreas.map((area) => (
                    <SelectItem key={area} value={area.toLowerCase()}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={handleSearch} className="flex-1">
                Search
              </Button>
              {hasSearched && (
                <Button variant="outline" onClick={handleReset}>
                  View All
                </Button>
              )}
            </div>
          </div>

          {/* Alternative: Manual input */}
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-3">
              Or enter manually:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="e.g. Electrician, Builder..."
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                />
              </div>
              <div>
                <Input
                  placeholder="e.g. SW1A, W1A 1AA..."
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-4 border-transparent border-b-primary/30 rounded-full animate-spin absolute top-0 animate-pulse"></div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium text-foreground">
                Loading tradespeople...
              </p>
              <p className="text-sm text-muted-foreground">
                Finding the best professionals for you
              </p>
            </div>
          </div>
        )}

        {/* No Results - Only show when NOT loading */}
        {!isLoading && tradespeople.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {hasSearched ? "No matches found" : "No tradespeople available"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              {hasSearched
                ? "No tradespeople found for your search criteria. Try adjusting your filters or search terms."
                : "We're currently updating our database. Please check back soon."}
            </p>
            {hasSearched && (
              <Button variant="outline" onClick={handleReset}>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                View All Tradespeople
              </Button>
            )}
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && tradespeople.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradespeople.map((person: Tradesperson) => (
              <Card
                key={person.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/tradesperson/${person.id}`)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{person.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(person.rating)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {person.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        Available
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    {person.badges?.map((badge: string) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className="text-xs"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/tradesperson/${person.id}`);
                      }}
                    >
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
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
    </main>
  );
}
