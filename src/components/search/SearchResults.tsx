import React from "react"
import {
  TradespersonCard,
  type TradespersonData,
} from "../tradesperson/TradespersonCard"
import { LoadingSpinner } from "../common/LoadingSpinner"
import { EmptyState } from "../common/EmptyState"
import { Search } from "lucide-react"

export interface SearchResultsData {
  id: string
  name: string
  trade?: string
  badges?: string[]
}

interface SearchResultsProps {
  tradespeople: SearchResultsData[]
  loading: boolean
  hasSearched: boolean
  onTradespersonClick?: (personId: string) => void
  emptyStateAction?: {
    label: string
    onClick: () => void
  }
}

export const SearchResults = ({
  tradespeople,
  loading,
  hasSearched,
  onTradespersonClick,
  emptyStateAction,
}: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (tradespeople.length === 0) {
    if (hasSearched) {
      return (
        <EmptyState
          icon={Search}
          title="No tradespeople found"
          description="No tradespeople found matching your criteria. Try adjusting your search terms."
          actionLabel={emptyStateAction?.label}
          onAction={emptyStateAction?.onClick}
        />
      )
    } else {
      return (
        <div className="text-center py-8">
          <LoadingSpinner />
        </div>
      )
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tradespeople.map((person) => {
        const tradespersonData: TradespersonData = {
          id: person.id,
          name: person.name,
          trade: person.trade,
          rating: 4.5,
          totalReviews: 0,
          badges: person.badges,
        }

        return (
          <TradespersonCard
            key={person.id}
            person={tradespersonData}
            onCardClick={onTradespersonClick}
            showContactButtons={true}
          />
        )
      })}
    </div>
  )
}
