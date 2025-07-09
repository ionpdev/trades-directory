export interface Tradesperson {
  id: string;
  name: string;
  rating: number;
  badges: string[];
}

export interface GetTradespeopleResponse {
  tradespeople: Tradesperson[];
}

export interface GetTradespeopleBySearchVariables {
  trade: string;
  postcode: string;
}
