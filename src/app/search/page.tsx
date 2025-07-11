"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  GET_ALL_TRADESPEOPLE,
  GET_TRADESPEOPLE_BY_SEARCH,
} from "@/lib/apollo/queries"
import { useQueryOnMSWReady, useLazyQueryWithMSW } from "@/hooks/useMSWQuery"
import {
  SearchForm,
  SearchResults,
  SearchHeader,
  FullPageLoading,
  type SearchFormData,
  type SearchResultsData,
} from "@/components"
import type {
  GetTradespeopleResponse,
  GetTradespeopleBySearchVariables,
  Tradesperson,
} from "@/types/graphql"
import { tradeTypes, postcodes } from "@/constants"

const SearchPageContent = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [hasSearched, setHasSearched] = useState(false)

  // Search form state
  const [searchFormData, setSearchFormData] = useState<SearchFormData>({
    trade: "all",
    postcode: "all",
    customTrade: "",
    customPostcode: "",
  })

  // Handle URL parameters from home page
  useEffect(() => {
    const tradeParam = searchParams.get("trade")
    const postcodeParam = searchParams.get("postcode")

    if (!tradeParam && !postcodeParam) return

    setSearchFormData((prevData) => {
      const newFormData = { ...prevData }

      if (tradeParam) {
        // Check if it's a predefined trade type
        const isPredefinedTrade = tradeTypes.some(
          (t) => t.toLowerCase() === tradeParam.toLowerCase()
        )
        if (isPredefinedTrade) {
          newFormData.trade = tradeParam.toLowerCase()
          newFormData.customTrade = tradeParam.toLowerCase()
        } else {
          newFormData.trade = "custom"
          newFormData.customTrade = tradeParam
        }
      }

      if (postcodeParam) {
        // Check if it's a predefined postcode
        const isPredefinedPostcode = postcodes.some(
          (pc) => pc.toLowerCase() === postcodeParam.toLowerCase()
        )
        if (isPredefinedPostcode) {
          newFormData.postcode = postcodeParam.toLowerCase()
          newFormData.customPostcode = postcodeParam.toLowerCase()
        } else {
          newFormData.postcode = "custom"
          newFormData.customPostcode = postcodeParam
        }
      }

      return newFormData
    })

    // If we have parameters, automatically search
    if (tradeParam || postcodeParam) {
      setHasSearched(true)
    }
  }, [searchParams])

  // Get all tradespeople with MSW ready check
  const [, allResult] =
    useQueryOnMSWReady<GetTradespeopleResponse>(GET_ALL_TRADESPEOPLE)
  const allData = allResult.data
  const allLoading = allResult.loading

  // Search query hook
  const [search, { data: searchData, loading: searchLoading }] =
    useLazyQueryWithMSW<
      GetTradespeopleResponse,
      GetTradespeopleBySearchVariables
    >(GET_TRADESPEOPLE_BY_SEARCH)

  // Auto-search
  useEffect(() => {
    const searchTrade =
      searchFormData.trade === "all"
        ? searchFormData.customTrade
        : searchFormData.trade === "custom"
        ? searchFormData.customTrade
        : searchFormData.trade

    const searchPostcode =
      searchFormData.postcode === "all"
        ? searchFormData.customPostcode
        : searchFormData.postcode === "custom"
        ? searchFormData.customPostcode
        : searchFormData.postcode

    if (hasSearched && (searchTrade || searchPostcode)) {
      search({ variables: { trade: searchTrade, postcode: searchPostcode } })
    }
  }, [hasSearched, searchFormData, search])

  const handleSearch = () => {
    const searchTrade =
      searchFormData.trade === "all"
        ? searchFormData.customTrade
        : searchFormData.trade === "custom"
        ? searchFormData.customTrade
        : searchFormData.trade

    const searchPostcode =
      searchFormData.postcode === "all"
        ? searchFormData.customPostcode
        : searchFormData.postcode === "custom"
        ? searchFormData.customPostcode
        : searchFormData.postcode

    if (searchTrade || searchPostcode) {
      setHasSearched(true)
      search({ variables: { trade: searchTrade, postcode: searchPostcode } })
    }
  }

  const handleClear = () => {
    setSearchFormData({
      trade: "all",
      postcode: "all",
      customTrade: "",
      customPostcode: "",
    })
    setHasSearched(false)
  }

  const isSearchDisabled = () => {
    const searchTrade =
      searchFormData.trade === "all"
        ? searchFormData.customTrade
        : searchFormData.trade === "custom"
        ? searchFormData.customTrade
        : searchFormData.trade

    const searchPostcode =
      searchFormData.postcode === "all"
        ? searchFormData.customPostcode
        : searchFormData.postcode === "custom"
        ? searchFormData.customPostcode
        : searchFormData.postcode

    return !searchTrade && !searchPostcode
  }

  const dataToShow = hasSearched ? searchData : allData
  const loadingToShow = hasSearched ? searchLoading : allLoading
  const tradespeople = dataToShow?.tradespeople || []

  // a little bit of transformation of API data to match SearchResultsData interface
  const searchResultsData: SearchResultsData[] = tradespeople.map(
    (person: Tradesperson) => ({
      id: person.id,
      name: person.name,
      trade: person.trade,
      badges: person.badges,
    })
  )

  const handleTradespersonClick = (personId: string) => {
    router.push(`/tradesperson/${personId}`)
  }

  return (
    <main className="bg-background">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <SearchHeader />

        <SearchForm
          searchData={searchFormData}
          tradeTypes={tradeTypes}
          postcodes={postcodes}
          onDataChange={setSearchFormData}
          onSearch={handleSearch}
          onClear={handleClear}
          isSearchDisabled={isSearchDisabled()}
        />

        <SearchResults
          tradespeople={searchResultsData}
          loading={loadingToShow}
          hasSearched={hasSearched}
          onTradespersonClick={handleTradespersonClick}
          emptyStateAction={{
            label: "Clear Search",
            onClick: handleClear,
          }}
        />
      </div>
    </main>
  )
}

const SearchPageLoading = () => {
  return <FullPageLoading />
}

const SearchPage = () => {
  return (
    <Suspense fallback={<SearchPageLoading />}>
      <SearchPageContent />
    </Suspense>
  )
}

export default SearchPage
