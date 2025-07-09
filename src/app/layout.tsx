"use client";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo/client";
import { MSWProvider } from "@/contexts/MSWContext";
import { MSWStatus } from "@/components/MSWStatus";
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
          <ApolloProvider client={apolloClient}>
            {children}
            <MSWStatus />
          </ApolloProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
