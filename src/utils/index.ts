export const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-green-100 text-green-800"
    case "Contacted":
      return "bg-blue-100 text-blue-800"
    case "Quote Sent":
      return "bg-purple-100 text-purple-800"
    case "Negotiating":
      return "bg-yellow-100 text-yellow-800"
    case "Closed":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "High":
      return "bg-red-100 text-red-800"
    case "Medium":
      return "bg-yellow-100 text-yellow-800"
    case "Low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Home Repairs":
      return "bg-blue-100 text-blue-800"
    case "Garden/Outdoor":
      return "bg-green-100 text-green-800"
    case "Maintenance":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getAlertColor = (type: string) => {
  switch (type) {
    case "error":
      return { dot: "bg-red-500", text: "text-red-700" }
    case "warning":
      return { dot: "bg-yellow-500", text: "text-yellow-700" }
    case "info":
      return { dot: "bg-blue-500", text: "text-blue-700" }
    case "success":
      return { dot: "bg-green-500", text: "text-green-700" }
    default:
      return { dot: "bg-gray-500", text: "text-gray-700" }
  }
}
