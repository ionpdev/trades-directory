import type { Metadata } from "next"
import ClientProviders from "./client"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "Trades Directory - Find Trusted Local Tradespeople",
    template: "%s | Trades Directory",
  },
  description:
    "Find and hire verified local tradespeople including plumbers, electricians, carpenters, and more. Read reviews, compare quotes, and book trusted professionals in your area.",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}

export default RootLayout
