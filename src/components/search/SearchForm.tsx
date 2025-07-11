import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface SearchFormData {
  trade: string
  postcode: string
  customTrade: string
  customPostcode: string
}

interface SearchFormProps {
  searchData: SearchFormData
  tradeTypes: string[]
  postcodes: string[]
  onDataChange: (data: SearchFormData) => void
  onSearch: () => void
  onClear: () => void
  isSearchDisabled: boolean
}

export const SearchForm = ({
  searchData,
  tradeTypes,
  postcodes,
  onDataChange,
  onSearch,
  onClear,
  isSearchDisabled,
}: SearchFormProps) => {
  const { trade, postcode, customTrade, customPostcode } = searchData

  const updateData = (updates: Partial<SearchFormData>) => {
    onDataChange({ ...searchData, ...updates })
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="trade">Trade</Label>
              <Select
                value={trade}
                onValueChange={(value) => {
                  updateData({
                    trade: value,
                    // If a specific trade is selected, we populate the custom input
                    customTrade:
                      value !== "all" && value !== "custom"
                        ? value
                        : customTrade,
                  })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trades</SelectItem>
                  <SelectItem value="custom">Custom Trade</SelectItem>
                  {tradeTypes.map((tradeType) => (
                    <SelectItem key={tradeType} value={tradeType.toLowerCase()}>
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
                onChange={(e) => updateData({ customTrade: e.target.value })}
                className={
                  trade !== "all" && trade !== "custom" ? "bg-muted/50" : ""
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="postcode">Postcode</Label>
              <Select
                value={postcode}
                onValueChange={(value) => {
                  updateData({
                    postcode: value,
                    // If a specific postcode is selected, we populate the custom input
                    customPostcode:
                      value !== "all" && value !== "custom"
                        ? value
                        : customPostcode,
                  })
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
                onChange={(e) => updateData({ customPostcode: e.target.value })}
                className={
                  postcode !== "all" && postcode !== "custom"
                    ? "bg-muted/50"
                    : ""
                }
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={onSearch}
            className="min-w-[120px]"
            disabled={isSearchDisabled}
          >
            Search
          </Button>
          <Button variant="outline" onClick={onClear} className="min-w-[120px]">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
