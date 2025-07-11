import "../src/styles/globals.css"
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "../src/lib/apollo/client"
import { AuthProvider } from "../src/contexts/AuthContext"
import type { Preview } from "@storybook/react"
import { handlers } from "../src/mocks/handlers"

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: /^on[A-Z].*/ },
  controls: { expanded: true },
  msw: {
    handlers,
  },
  nextjs: {
    appDirectory: true,
  },
}

export const decorators = [
  (Story) => (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Story />
      </AuthProvider>
    </ApolloProvider>
  ),
]
