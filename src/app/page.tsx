"use client"

import HeroSection from "@/components/HeroSection"
import PopularTradesSection from "@/components/PopularTradesSection"
import TrustFeaturesSection from "@/components/TrustFeaturesSection"
import CTASection from "@/components/CTASection"
import FooterSection from "@/components/FooterSection"

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/30">
      <HeroSection />
      <PopularTradesSection />
      <TrustFeaturesSection />
      <CTASection />
      <FooterSection />
    </div>
  )
}
