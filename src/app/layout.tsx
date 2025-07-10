"use client";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo/client";
import { MSWProvider } from "@/contexts/MSWContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { MSWStatus } from "@/components/MSWStatus";
import { Navigation } from "@/components/Navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MSWProvider>
          <AuthProvider>
            <FavoritesProvider>
              <ApolloProvider client={apolloClient}>
                <Navigation />
                <Breadcrumb />
                <main className="min-h-screen">{children}</main>
                <MSWStatus />
              </ApolloProvider>
            </FavoritesProvider>
          </AuthProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
