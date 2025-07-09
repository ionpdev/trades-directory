import "../src/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../src/lib/apollo/client";
import type { Preview } from "@storybook/react";
import { handlers } from "../src/mocks/handlers";

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: /^on[A-Z].*/ },
  controls: { expanded: true },
  msw: {
    handlers,
  },
};

export const decorators = [
  (Story) => (
    <ApolloProvider client={apolloClient}>
      <Story />
    </ApolloProvider>
  ),
];
