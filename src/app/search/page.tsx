"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GET_ALL_TRADESPEOPLE,
  GET_TRADESPEOPLE_BY_SEARCH,
} from "@/lib/apollo/queries";
import { useQueryOnMSWReady, useLazyQueryWithMSW } from "@/hooks/useMSWQuery";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  "Painter",
  "Carpenter",
  "Handyman",
  "Gas Engineer",
  "Roofer",
  "Kitchen Fitter",
  "Bathroom Fitter",
  "Locksmith",
  "Flooring Specialist",
  "Cleaner",
  "Gardener",
  "Tree Surgeon",
  "Tiler",
  "HVAC Engineer",
  "Appliance Repair",
  "Fencing Contractor",
  "Landscaper",
].sort();

// Common postcodes for the dropdown
const postcodes = [
  "E1A",
  "E2A",
  "SW1A",
  "SW2A",
  "SW3A",
  "SW5A",
  "SW10A",
  "N1A",
  "N5A",
  "N8A",
  "N12A",
  "NW1A",
  "NW3A",
  "NW6A",
  "NW10A",
  "SE1A",
  "SE5A",
  "SE10A",
  "SE15A",
  "W1A",
  "W2A",
  "W4A",
  "W8A",
  "W11A",
  "W14A",
  "EC1A",
  "EC1B",
  "EC2A",
  "EC3A",
  "EC4A",
  "WC1A",
  "WC1B",
  "WC2A",
  "BR1A",
  "BR3A",
  "CR0A",
  "CR2",
].sort();

// Component that handles search params (needs to be wrapped in Suspense)
function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [trade, setTrade] = useState("all");
  const [postcode, setPostcode] = useState("all");
  const [customTrade, setCustomTrade] = useState("");
  const [customPostcode, setCustomPostcode] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Handle URL parameters from home page
  useEffect(() => {
    const tradeParam = searchParams.get("trade");
    const postcodeParam = searchParams.get("postcode");

    if (tradeParam) {
      // Check if it's a predefined trade type
      const isPredefindedTrade = tradeTypes.some(
        (t) => t.toLowerCase() === tradeParam.toLowerCase()
      );
      if (isPredefindedTrade) {
        setTrade(tradeParam.toLowerCase());
        setCustomTrade(tradeParam.toLowerCase());
      } else {
        setTrade("custom");
        setCustomTrade(tradeParam);
      }
    }

    if (postcodeParam) {
      // Check if it's a predefined postcode
      const isPredefinedPostcode = postcodes.some(
        (pc) => pc.toLowerCase() === postcodeParam.toLowerCase()
      );
      if (isPredefinedPostcode) {
        setPostcode(postcodeParam.toLowerCase());
        setCustomPostcode(postcodeParam.toLowerCase());
      } else {
        setPostcode("custom");
        setCustomPostcode(postcodeParam);
      }
    }

    // If we have parameters, automatically search
    if (tradeParam || postcodeParam) {
      setHasSearched(true);
    }
  }, [searchParams]);

  // Get all tradespeople with MSW ready check
  const [, allResult] =
    useQueryOnMSWReady<GetTradespeopleResponse>(GET_ALL_TRADESPEOPLE);
  const allData = allResult.data;
  const allLoading = allResult.loading;

  // Search query hook
  const [search, { data: searchData, loading: searchLoading }] =
    useLazyQueryWithMSW<
      GetTradespeopleResponse,
      GetTradespeopleBySearchVariables
    >(GET_TRADESPEOPLE_BY_SEARCH);

  // Auto-search when parameters change
  useEffect(() => {
    const searchTrade =
      trade === "all" ? customTrade : trade === "custom" ? customTrade : trade;
    const searchPostcode =
      postcode === "all"
        ? customPostcode
        : postcode === "custom"
        ? customPostcode
        : postcode;

    if (hasSearched && (searchTrade || searchPostcode)) {
      search({ variables: { trade: searchTrade, postcode: searchPostcode } });
    }
  }, [hasSearched, trade, postcode, customTrade, customPostcode, search]);

  const handleSearch = () => {
    const searchTrade =
      trade === "all" ? customTrade : trade === "custom" ? customTrade : trade;
    const searchPostcode =
      postcode === "all"
        ? customPostcode
        : postcode === "custom"
        ? customPostcode
        : postcode;

    if (searchTrade || searchPostcode) {
      setHasSearched(true);
      search({ variables: { trade: searchTrade, postcode: searchPostcode } });
    }
  };

  const handleClear = () => {
    setTrade("all");
    setPostcode("all");
    setCustomTrade("");
    setCustomPostcode("");
    setHasSearched(false);
  };

  // Helper function to check if search is disabled
  const isSearchDisabled = () => {
    const searchTrade =
      trade === "all" ? customTrade : trade === "custom" ? customTrade : trade;
    const searchPostcode =
      postcode === "all"
        ? customPostcode
        : postcode === "custom"
        ? customPostcode
        : postcode;
    return !searchTrade && !searchPostcode;
  };

  // Determine which data to show
  const dataToShow = hasSearched ? searchData : allData;
  const loadingToShow = hasSearched ? searchLoading : allLoading;
  const tradespeople = dataToShow?.tradespeople || [];

  return (
    <main className="bg-background">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Find Trusted Tradespeople
          </h1>
          <p className="text-muted-foreground">
            Search for skilled professionals in your area
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trade Selection */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="trade">Trade</Label>
                <Select
                  value={trade}
                  onValueChange={(value) => {
                    setTrade(value);
                    // If a specific trade is selected, populate the custom input
                    if (value !== "all" && value !== "custom") {
                      setCustomTrade(value);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Trades</SelectItem>
                    <SelectItem value="custom">Custom Trade</SelectItem>
                    {tradeTypes.map((tradeType) => (
                      <SelectItem
                        key={tradeType}
                        value={tradeType.toLowerCase()}
                      >
                        {tradeType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="customTrade">
                  {trade === "custom"
                    ? "Enter trade"
                    : trade === "all"
                    ? "Or enter custom trade"
                    : "Selected trade (you can modify)"}
                </Label>
                <Input
                  id="customTrade"
                  type="text"
                  placeholder="e.g., Solar Panel Installer"
                  value={customTrade}
                  onChange={(e) => setCustomTrade(e.target.value)}
                  className={
                    trade !== "all" && trade !== "custom" ? "bg-muted/50" : ""
                  }
                />
              </div>
            </div>

            {/* Postcode Selection */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="postcode">Postcode</Label>
                <Select
                  value={postcode}
                  onValueChange={(value) => {
                    setPostcode(value);
                    // If a specific postcode is selected, populate the custom input
                    if (value !== "all" && value !== "custom") {
                      setCustomPostcode(value);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a postcode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    <SelectItem value="custom">Custom Postcode</SelectItem>
                    {postcodes.map((pc) => (
                      <SelectItem key={pc} value={pc}>
                        {pc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="customPostcode">
                  {postcode === "custom"
                    ? "Enter postcode"
                    : postcode === "all"
                    ? "Or enter custom postcode"
                    : "Selected postcode (you can modify)"}
                </Label>
                <Input
                  id="customPostcode"
                  type="text"
                  placeholder="e.g., M1 1AA"
                  value={customPostcode}
                  onChange={(e) => setCustomPostcode(e.target.value)}
                  className={
                    postcode !== "all" && postcode !== "custom"
                      ? "bg-muted/50"
                      : ""
                  }
                />
              </div>
            </div>
          </div>

          {/* Search Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={handleSearch}
              className="min-w-[120px]"
              disabled={isSearchDisabled()}
            >
              Search
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              className="min-w-[120px]"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Results */}
        {loadingToShow ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Searching for tradespeople...</p>
          </div>
        ) : tradespeople.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {hasSearched
                ? "No tradespeople found matching your criteria."
                : "Loading tradespeople..."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradespeople.map((person: Tradesperson) => (
              <Card
                key={person.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/tradesperson/${person.id}`)}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{person.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {person.trade}
                        </p>
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

// Loading component for Suspense fallback
function SearchPageLoading() {
  return (
    <main className="bg-background">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading search page...</p>
        </div>
      </div>
    </main>
  );
}

// Main component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
