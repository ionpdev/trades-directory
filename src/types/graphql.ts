export interface Tradesperson {
  id: string
  name: string
  rating: number
  badges: string[]
  // Detail page fields
  trade?: string
  experience?: string
  postcode?: string
  description?: string
  contactInfo?: {
    phone: string
    email: string
    website?: string
  }
  portfolio?: {
    id: string
    title: string
    imageUrl: string
    description: string
  }[]
  serviceAreas?: string[]
  pricing?: {
    calloutFee: number
    hourlyRate: number
    minimumCharge: number
  }
  availability?: {
    nextAvailable: string
    workingHours: string
    emergency: boolean
  }
  reviews?: {
    id: string
    customerName: string
    rating: number
    comment: string
    date: string
    jobType: string
  }[]
  totalReviews?: number
  responseTime?: string
  verified?: boolean
}

export interface GetTradespeopleResponse {
  tradespeople: Tradesperson[]
}

export interface GetTradespeopleBySearchVariables {
  trade: string
  postcode: string
}

export interface GetTradespersonResponse {
  tradesperson: Tradesperson
}

export interface GetTradespersonVariables {
  id: string
}
