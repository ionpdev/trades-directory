import { http, HttpResponse } from "msw"
import { mockTradespeople } from "./db_mocked"

interface GraphQLRequest {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

function filterTradespeople(trade?: string, postcode?: string) {
  let filtered = [...mockTradespeople]

  if (trade) {
    const searchTrade = trade.toLowerCase().trim()
    filtered = filtered.filter(
      (person) =>
        person.trade.toLowerCase().includes(searchTrade) ||
        person.name.toLowerCase().includes(searchTrade)
    )
  }

  if (postcode) {
    const searchPostcode = postcode.toLowerCase().trim().replace(/\s+/g, "")
    filtered = filtered.filter((person) =>
      person.postcode.toLowerCase().includes(searchPostcode)
    )
  }

  return filtered.sort((a, b) => b.rating - a.rating)
}

export const handlers = [
  http.post("/api/graphql", async ({ request }) => {
    const body = (await request.json()) as GraphQLRequest
    const { variables, operationName } = body

    console.log("[MSW] Intercepted GraphQL request:", operationName)
    console.log("[MSW] Variables:", variables)

    // Handle GetTradespeople query (all tradespeople)
    if (operationName === "GetTradespeople") {
      const allTradespeople = mockTradespeople
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 25)
        .map((person) => ({
          id: person.id,
          name: person.name,
          rating: person.rating,
          badges: person.badges,
        }))

      return HttpResponse.json({
        data: {
          tradespeople: allTradespeople,
        },
      })
    }

    // Handle GetTradespeopleByTypeAndPostcode query (filtered search)
    if (operationName === "GetTradespeopleByTypeAndPostcode") {
      const { trade, postcode } = variables as {
        trade?: string
        postcode?: string
      }

      const filteredTradespeople = filterTradespeople(trade, postcode)
        .slice(0, 25)
        .map((person) => ({
          id: person.id,
          name: person.name,
          rating: person.rating,
          badges: person.badges,
        }))

      return HttpResponse.json({
        data: {
          tradespeople: filteredTradespeople,
        },
      })
    }

    // Handle GetTradesperson query (individual tradesperson)
    if (operationName === "GetTradesperson") {
      const { id } = variables as { id: string }

      const tradesperson = mockTradespeople.find((person) => person.id === id)

      if (!tradesperson) {
        return HttpResponse.json({
          errors: [{ message: `Tradesperson with id ${id} not found` }],
        })
      }

      return HttpResponse.json({
        data: {
          tradesperson,
        },
      })
    }

    // Default response for unhandled queries
    return HttpResponse.json({
      errors: [{ message: `Unhandled GraphQL operation: ${operationName}` }],
    })
  }),
]
