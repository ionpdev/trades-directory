"use client"

import { useRouter } from "next/navigation"
import { Users, MessageSquare, FileText, DollarSign } from "lucide-react"
import { potentialClients } from "@/constants"
import { getStatusColor, getUrgencyColor } from "@/utils"
import {
  PageHeader,
  BackButton,
  LeadCard,
  StatCard,
  StatsGrid,
  type LeadData,
} from "@/components"

const LeadsPage = () => {
  const router = useRouter()

  const leads: LeadData[] = potentialClients

  const handleContactClient = (leadId: string | number) => {
    console.log("Contact client:", leadId)
  }

  const handleSendQuote = (leadId: string | number) => {
    console.log("Send quote:", leadId)
  }

  const handleViewDetails = (leadId: string | number) => {
    console.log("View details:", leadId)
    router.push(`/dashboard/leads/${leadId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <PageHeader
          title="Potential Clients & Leads"
          description="Manage your incoming leads and potential business opportunities"
        >
          <BackButton label="Back to Dashboard" />
        </PageHeader>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onContactClient={handleContactClient}
              onSendQuote={handleSendQuote}
              onViewDetails={handleViewDetails}
              getStatusColor={getStatusColor}
              getUrgencyColor={getUrgencyColor}
            />
          ))}
        </div>

        <StatsGrid columns={4}>
          <StatCard value={4} label="Total Leads" color="green" icon={Users} />
          <StatCard
            value={2}
            label="Active Negotiations"
            color="blue"
            icon={MessageSquare}
          />
          <StatCard
            value={1}
            label="Quotes Sent"
            color="purple"
            icon={FileText}
          />
          <StatCard
            value="£1,450"
            label="Potential Revenue"
            color="yellow"
            icon={DollarSign}
          />
        </StatsGrid>
      </div>
    </div>
  )
}

export default LeadsPage
