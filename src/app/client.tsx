"use client"

import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "@/lib/apollo/client"
import { MSWProvider } from "@/contexts/MSWContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { FavoritesProvider } from "@/contexts/FavoritesContext"
import Navigation from "@/components/Navigation"
import Breadcrumb from "@/components/Breadcrumb"

interface ClientProvidersProps {
  children: React.ReactNode
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <MSWProvider>
      <AuthProvider>
        <FavoritesProvider>
          <ApolloProvider client={apolloClient}>
            <Navigation />
            <Breadcrumb />
            <main className="min-h-screen">{children}</main>
          </ApolloProvider>
        </FavoritesProvider>
      </AuthProvider>
    </MSWProvider>
  )
}

export default ClientProviders
