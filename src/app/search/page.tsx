"use client";

import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_ALL_TRADESPEOPLE,
  GET_TRADESPEOPLE_BY_SEARCH,
} from "@/lib/apollo/queries";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SearchPage() {
  const [trade, setTrade] = useState("");
  const [postcode, setPostcode] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [loadAll, { data: allData, loading: allLoading }] =
    useLazyQuery(GET_ALL_TRADESPEOPLE);
  const [search, { data: searchData, loading: searchLoading }] = useLazyQuery(
    GET_TRADESPEOPLE_BY_SEARCH
  );

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleSearch = () => {
    if (trade && postcode) {
      setHasSearched(true);
      search({ variables: { trade, postcode } });
    }
  };

  const tradespeople = hasSearched
    ? searchData?.tradespeople || []
    : allData?.tradespeople || [];

  const isLoading = hasSearched ? searchLoading : allLoading;

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Find Trusted Tradespeople</h1>
          <p className="text-muted-foreground">
            Search by trade type and postcode
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="trade">Trade type</Label>
            <Input
              id="trade"
              placeholder="e.g. Electrician"
              value={trade}
              onChange={(e) => setTrade(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              placeholder="e.g. W1A 1AA"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full">
          Search
        </Button>

        {isLoading && (
          <p className="text-center text-muted-foreground mt-6 animate-pulse">
            Loading results…
          </p>
        )}

        {!isLoading && tradespeople.length === 0 && (
          <p className="text-center text-muted-foreground mt-6">
            No tradespeople found.
          </p>
        )}

        <div className="space-y-4">
          {tradespeople.map((person) => (
            <Card key={person.id}>
              <CardContent className="py-4 space-y-2">
                <h3 className="text-lg font-semibold">{person.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ⭐ {person.rating.toFixed(1)} rating
                </p>
                <div className="flex flex-wrap gap-2">
                  {person.badges?.map((badge: string) => (
                    <Badge key={badge} variant="outline">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
