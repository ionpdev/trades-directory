import { gql } from "@apollo/client"

export const GET_ALL_TRADESPEOPLE = gql`
  query GetTradespeople {
    tradespeople {
      id
      name
      rating
      badges
    }
  }
`

export const GET_TRADESPEOPLE_BY_SEARCH = gql`
  query GetTradespeopleByTypeAndPostcode($trade: String!, $postcode: String!) {
    tradespeople(trade: $trade, postcode: $postcode) {
      id
      name
      rating
      badges
    }
  }
`

export const GET_TRADESPERSON_BY_ID = gql`
  query GetTradesperson($id: String!) {
    tradesperson(id: $id) {
      id
      name
      rating
      badges
      trade
      experience
      postcode
      description
      contactInfo {
        phone
        email
        website
      }
      portfolio {
        id
        title
        imageUrl
        description
      }
      serviceAreas
      pricing {
        calloutFee
        hourlyRate
        minimumCharge
      }
      availability {
        nextAvailable
        workingHours
        emergency
      }
      reviews {
        id
        customerName
        rating
        comment
        date
        jobType
      }
      totalReviews
      responseTime
      verified
    }
  }
`
