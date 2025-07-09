import { gql } from "@apollo/client";

export const GET_ALL_TRADESPEOPLE = gql`
  query GetTradespeople {
    tradespeople {
      id
      name
      rating
      badges
    }
  }
`;

export const GET_TRADESPEOPLE_BY_SEARCH = gql`
  query GetTradespeopleByTypeAndPostcode($trade: String!, $postcode: String!) {
    tradespeople(trade: $trade, postcode: $postcode) {
      id
      name
      rating
      badges
    }
  }
`;
