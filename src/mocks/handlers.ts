import { graphql } from "msw";

export const handlers = [
  graphql.query("GetTradespeople", (req, res, ctx) => {
    console.log("[MSW] Intercepted GetTradespeople");

    return res(
      ctx.data({
        tradespeople: [
          {
            id: "1",
            name: "Jane Electrician",
            rating: 4.9,
            badges: ["Verified"],
          },
          {
            id: "2",
            name: "Mike Plumber",
            rating: 4.5,
            badges: ["Insured"],
          },
          {
            id: "3",
            name: "Laura Builder",
            rating: 4.8,
            badges: [],
          },
        ],
      })
    );
  }),
  graphql.query("GetTradespeopleByTypeAndPostcode", (req, res, ctx) => {
    const { trade, postcode } = req.variables; // ✅ this is correct

    console.log("[MSW] Received variables:", trade, postcode);

    return res(
      ctx.data({
        tradespeople: [
          {
            id: "1",
            name: `${trade} Specialist - Jane`,
            rating: 4.9,
            badges: ["Verified"],
          },
          {
            id: "2",
            name: `${trade} Pro - Mike`,
            rating: 4.7,
            badges: ["Insured"],
          },
        ],
      })
    );
  }),
];
