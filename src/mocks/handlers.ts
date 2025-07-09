import { http, HttpResponse } from "msw";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
  operationName?: string;
}

// Mock database of tradespeople with realistic data
const mockTradespeople = [
  // Electricians
  {
    id: "1",
    name: "Sarah Mitchell",
    trade: "electrician",
    rating: 4.9,
    badges: ["Verified", "Insured", "Emergency Available"],
    postcode: "SW1A",
    experience: "15 years",
  },
  {
    id: "2",
    name: "James Thompson",
    trade: "electrician",
    rating: 4.7,
    badges: ["Certified", "Background Checked"],
    postcode: "W1A",
    experience: "8 years",
  },
  {
    id: "3",
    name: "Emma Richardson",
    trade: "electrician",
    rating: 4.8,
    badges: ["Verified", "Smart Home Specialist"],
    postcode: "E1",
    experience: "12 years",
  },

  // Plumbers
  {
    id: "4",
    name: "David Wilson",
    trade: "plumber",
    rating: 4.6,
    badges: ["Licensed", "Emergency Service", "Boiler Specialist"],
    postcode: "SW1A",
    experience: "20 years",
  },
  {
    id: "5",
    name: "Lisa Chen",
    trade: "plumber",
    rating: 4.8,
    badges: ["Verified", "Eco-Friendly", "Bathroom Specialist"],
    postcode: "N1",
    experience: "10 years",
  },
  {
    id: "6",
    name: "Michael Brown",
    trade: "plumber",
    rating: 4.5,
    badges: ["Insured", "Heating Engineer"],
    postcode: "SE1",
    experience: "14 years",
  },

  // Builders/Contractors
  {
    id: "7",
    name: "Robert Davis",
    trade: "builder",
    rating: 4.7,
    badges: ["Project Manager", "Insured", "Extensions Specialist"],
    postcode: "SW1A",
    experience: "25 years",
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    trade: "builder",
    rating: 4.9,
    badges: ["Verified", "Eco Builder", "Renovation Expert"],
    postcode: "W1A",
    experience: "18 years",
  },
  {
    id: "9",
    name: "Andrew Taylor",
    trade: "builder",
    rating: 4.4,
    badges: ["Licensed", "Kitchen Specialist"],
    postcode: "E1",
    experience: "16 years",
  },

  // Painters
  {
    id: "10",
    name: "Sophie Anderson",
    trade: "painter",
    rating: 4.6,
    badges: ["Interior Design", "Eco-Paints", "Verified"],
    postcode: "N1",
    experience: "9 years",
  },
  {
    id: "11",
    name: "Mark Johnson",
    trade: "painter",
    rating: 4.8,
    badges: ["Exterior Specialist", "Insured"],
    postcode: "SE1",
    experience: "22 years",
  },

  // Carpenters
  {
    id: "12",
    name: "Helen White",
    trade: "carpenter",
    rating: 4.9,
    badges: ["Bespoke Furniture", "Verified", "Sustainable Wood"],
    postcode: "SW1A",
    experience: "14 years",
  },
  {
    id: "13",
    name: "Thomas Clark",
    trade: "carpenter",
    rating: 4.5,
    badges: ["Restoration Expert", "Antique Specialist"],
    postcode: "W1A",
    experience: "30 years",
  },

  // Gardeners/Landscapers
  {
    id: "14",
    name: "Rachel Green",
    trade: "gardener",
    rating: 4.7,
    badges: ["RHS Qualified", "Garden Design", "Organic"],
    postcode: "E1",
    experience: "11 years",
  },
  {
    id: "15",
    name: "Daniel Lewis",
    trade: "gardener",
    rating: 4.6,
    badges: ["Landscaping", "Tree Surgery", "Verified"],
    postcode: "N1",
    experience: "16 years",
  },

  // Roofers
  {
    id: "16",
    name: "Kevin Murphy",
    trade: "roofer",
    rating: 4.8,
    badges: ["Storm Damage", "Insured", "Solar Panel Install"],
    postcode: "SE1",
    experience: "19 years",
  },
  {
    id: "17",
    name: "Anna Roberts",
    trade: "roofer",
    rating: 4.4,
    badges: ["Flat Roof Specialist", "Verified"],
    postcode: "SW1A",
    experience: "13 years",
  },

  // Gas Engineers
  {
    id: "18",
    name: "Peter Adams",
    trade: "gas engineer",
    rating: 4.9,
    badges: ["Gas Safe Registered", "Boiler Install", "Emergency"],
    postcode: "W1A",
    experience: "21 years",
  },
  {
    id: "19",
    name: "Caroline Baker",
    trade: "gas engineer",
    rating: 4.7,
    badges: ["Heating Systems", "Verified", "Central Heating"],
    postcode: "E1",
    experience: "17 years",
  },
];

// Helper function to filter tradespeople by trade and postcode
function filterTradespeople(trade?: string, postcode?: string) {
  let filtered = [...mockTradespeople];

  if (trade) {
    const searchTrade = trade.toLowerCase().trim();
    filtered = filtered.filter(
      (person) =>
        person.trade.toLowerCase().includes(searchTrade) ||
        person.name.toLowerCase().includes(searchTrade)
    );
  }

  if (postcode) {
    const searchPostcode = postcode.toLowerCase().trim().replace(/\s+/g, "");
    filtered = filtered.filter((person) =>
      person.postcode.toLowerCase().includes(searchPostcode)
    );
  }

  // Sort by rating (highest first)
  return filtered.sort((a, b) => b.rating - a.rating);
}

export const handlers = [
  http.post("/api/graphql", async ({ request }) => {
    const body = (await request.json()) as GraphQLRequest;
    const { variables, operationName } = body;

    console.log("[MSW] Intercepted GraphQL request:", operationName);
    console.log("[MSW] Variables:", variables);

    // Handle GetTradespeople query (all tradespeople)
    if (operationName === "GetTradespeople") {
      const allTradespeople = mockTradespeople
        .sort((a, b) => b.rating - a.rating) // Sort by rating
        .slice(0, 12) // Limit to 12 for initial load
        .map((person) => ({
          id: person.id,
          name: person.name,
          rating: person.rating,
          badges: person.badges,
        }));

      return HttpResponse.json({
        data: {
          tradespeople: allTradespeople,
        },
      });
    }

    // Handle GetTradespeopleByTypeAndPostcode query (filtered search)
    if (operationName === "GetTradespeopleByTypeAndPostcode") {
      const { trade, postcode } = variables as {
        trade?: string;
        postcode?: string;
      };

      const filteredTradespeople = filterTradespeople(trade, postcode)
        .slice(0, 20) // Limit results
        .map((person) => ({
          id: person.id,
          name: person.name,
          rating: person.rating,
          badges: person.badges,
        }));

      return HttpResponse.json({
        data: {
          tradespeople: filteredTradespeople,
        },
      });
    }

    // Default response for unhandled queries
    return HttpResponse.json({
      errors: [{ message: `Unhandled GraphQL operation: ${operationName}` }],
    });
  }),
];
