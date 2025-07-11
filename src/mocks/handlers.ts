import { http, HttpResponse } from "msw"

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
  operationName?: string;
}

// Mock database of tradespeople with comprehensive data
const mockTradespeople = [
  // Electricians
  {
    id: "1",
    name: "Sarah Mitchell",
    trade: "electrician",
    rating: 4.9,
    badges: ["Verified", "Insured", "Emergency Available"],
    postcode: "SW1A",
    experience: "15 years",
    description:
      "Experienced electrician specializing in residential and commercial electrical work. Available for emergency callouts 24/7. Fully qualified and insured with excellent customer service record.",
    contactInfo: {
      phone: "020 7123 4567",
      email: "sarah@mitchell-electrical.co.uk",
      website: "www.mitchell-electrical.co.uk",
    },
    portfolio: [
      {
        id: "p1-1",
        title: "Complete House Rewiring - Victorian Property",
        imageUrl: "/images/portfolio/electrical-1.jpg",
        description:
          "Full rewiring of 4-bedroom Victorian house including modern consumer unit and smart lighting.",
      },
      {
        id: "p1-2",
        title: "Smart Home Installation",
        imageUrl: "/images/portfolio/electrical-2.jpg",
        description:
          "Installation of smart switches, automated lighting, and home security system.",
      },
    ],
    serviceAreas: ["SW1A", "SW1B", "SW2", "SW3", "SW4", "W1A", "W1B"],
    pricing: {
      calloutFee: 45,
      hourlyRate: 65,
      minimumCharge: 90,
    },
    availability: {
      nextAvailable: "Today",
      workingHours: "Mon-Fri 8AM-6PM, Sat 9AM-4PM",
      emergency: true,
    },
    reviews: [
      {
        id: "r1-1",
        customerName: "John Smith",
        rating: 5,
        comment:
          "Excellent work! Sarah rewired our entire house efficiently and professionally. Very tidy and explained everything clearly.",
        date: "2024-12-15",
        jobType: "House Rewiring",
      },
      {
        id: "r1-2",
        customerName: "Emma Davis",
        rating: 5,
        comment:
          "Emergency callout for power outage. Sarah arrived within 2 hours and fixed the issue quickly. Highly recommend!",
        date: "2024-12-10",
        jobType: "Emergency Repair",
      },
    ],
    totalReviews: 127,
    responseTime: "Usually responds within 2 hours",
    verified: true,
  },
  {
    id: "2",
    name: "James Thompson",
    trade: "electrician",
    rating: 4.7,
    badges: ["Certified", "Background Checked"],
    postcode: "W1A",
    experience: "8 years",
    description:
      "Qualified electrician with expertise in residential electrical installations and repairs. Known for reliable service and competitive pricing.",
    contactInfo: {
      phone: "020 7234 5678",
      email: "james@thompsonelectric.com",
    },
    portfolio: [
      {
        id: "p2-1",
        title: "Kitchen Electrical Installation",
        imageUrl: "/images/portfolio/electrical-3.jpg",
        description:
          "Complete electrical setup for modern kitchen including appliance connections and under-cabinet lighting.",
      },
    ],
    serviceAreas: ["W1A", "W1B", "WC1", "WC2", "EC1"],
    pricing: {
      calloutFee: 40,
      hourlyRate: 58,
      minimumCharge: 80,
    },
    availability: {
      nextAvailable: "Tomorrow",
      workingHours: "Mon-Sat 7AM-7PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r2-1",
        customerName: "Lisa Wilson",
        rating: 5,
        comment:
          "James did a fantastic job installing new sockets and lights in our kitchen. Very professional and clean work.",
        date: "2024-12-08",
        jobType: "Kitchen Installation",
      },
    ],
    totalReviews: 89,
    responseTime: "Usually responds within 4 hours",
    verified: true,
  },
  // Plumbers
  {
    id: "4",
    name: "David Wilson",
    trade: "plumber",
    rating: 4.6,
    badges: ["Licensed", "Emergency Service", "Boiler Specialist"],
    postcode: "SW1A",
    experience: "20 years",
    description:
      "Experienced plumber and heating engineer with 20 years in the trade. Specializing in boiler installations, central heating, and emergency plumbing repairs.",
    contactInfo: {
      phone: "020 7345 6789",
      email: "david@wilsonplumbing.co.uk",
      website: "www.wilsonplumbing.co.uk",
    },
    portfolio: [
      {
        id: "p4-1",
        title: "Bathroom Suite Installation",
        imageUrl: "/images/portfolio/plumbing-1.jpg",
        description:
          "Complete bathroom renovation including new suite, tiling, and modern fixtures.",
      },
      {
        id: "p4-2",
        title: "Boiler Replacement",
        imageUrl: "/images/portfolio/plumbing-2.jpg",
        description:
          "Installation of new Worcester Bosch boiler with full system upgrade.",
      },
    ],
    serviceAreas: ["SW1A", "SW1B", "SW2", "SW3", "W1A"],
    pricing: {
      calloutFee: 50,
      hourlyRate: 70,
      minimumCharge: 95,
    },
    availability: {
      nextAvailable: "This Week",
      workingHours: "Mon-Fri 8AM-5PM, Emergency 24/7",
      emergency: true,
    },
    reviews: [
      {
        id: "r4-1",
        customerName: "Sarah Brown",
        rating: 5,
        comment:
          "David installed our new boiler and the service was exceptional. Very knowledgeable and explained everything thoroughly.",
        date: "2024-12-12",
        jobType: "Boiler Installation",
      },
    ],
    totalReviews: 156,
    responseTime: "Usually responds within 1 hour",
    verified: true,
  },
  // Builders
  {
    id: "7",
    name: "Robert Davis",
    trade: "builder",
    rating: 4.7,
    badges: ["Project Manager", "Insured", "Extensions Specialist"],
    postcode: "SW1A",
    experience: "25 years",
    description:
      "Established building contractor with extensive experience in home extensions, renovations, and general construction. Project management from design to completion.",
    contactInfo: {
      phone: "020 7456 7890",
      email: "robert@davisbuilding.co.uk",
      website: "www.davisbuilding.co.uk",
    },
    portfolio: [
      {
        id: "p7-1",
        title: "Two-Story House Extension",
        imageUrl: "/images/portfolio/building-1.jpg",
        description:
          "Complete two-story rear extension adding kitchen and bedroom with ensuite.",
      },
      {
        id: "p7-2",
        title: "Loft Conversion",
        imageUrl: "/images/portfolio/building-2.jpg",
        description:
          "Loft conversion creating master bedroom with ensuite and storage.",
      },
    ],
    serviceAreas: ["SW1A", "SW1B", "SW2", "SW3", "SW4", "SW5"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 45,
      minimumCharge: 200,
    },
    availability: {
      nextAvailable: "Next Month",
      workingHours: "Mon-Fri 8AM-5PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r7-1",
        customerName: "Michael Johnson",
        rating: 5,
        comment:
          "Robert and his team did an amazing job on our extension. Professional, reliable, and excellent quality work throughout.",
        date: "2024-11-28",
        jobType: "House Extension",
      },
    ],
    totalReviews: 203,
    responseTime: "Usually responds within 1 day",
    verified: true,
  },
  // Carpenter
  {
    id: "3",
    name: "Michael Woods",
    trade: "carpenter",
    rating: 4.8,
    badges: ["Certified", "Insured", "Bespoke Work"],
    postcode: "N1A",
    experience: "12 years",
    description:
      "Master carpenter specializing in bespoke furniture, fitted wardrobes, and kitchen installations. Passionate about traditional craftsmanship with modern techniques.",
    contactInfo: {
      phone: "020 7567 8901",
      email: "mike@woodscarpentry.co.uk",
      website: "www.woodscarpentry.co.uk",
    },
    portfolio: [
      {
        id: "p3-1",
        title: "Bespoke Kitchen Installation",
        imageUrl: "/images/portfolio/carpentry-1.jpg",
        description:
          "Custom-built kitchen with hand-crafted cabinets and breakfast bar.",
      },
      {
        id: "p3-2",
        title: "Fitted Wardrobes",
        imageUrl: "/images/portfolio/carpentry-2.jpg",
        description:
          "Floor-to-ceiling wardrobes with sliding doors and internal organization.",
      },
    ],
    serviceAreas: ["N1A", "N1B", "N2", "N3", "NW1", "NW2"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 55,
      minimumCharge: 150,
    },
    availability: {
      nextAvailable: "Next Week",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-3PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r3-1",
        customerName: "Anna Thompson",
        rating: 5,
        comment:
          "Michael created beautiful bespoke wardrobes for our bedroom. The craftsmanship is exceptional and the attention to detail is amazing.",
        date: "2024-12-01",
        jobType: "Fitted Wardrobes",
      },
    ],
    totalReviews: 74,
    responseTime: "Usually responds within 6 hours",
    verified: true,
  },
  // Gas Engineer
  {
    id: "5",
    name: "Peter O'Connor",
    trade: "gas engineer",
    rating: 4.7,
    badges: ["Gas Safe Registered", "Emergency Service", "Boiler Expert"],
    postcode: "E1A",
    experience: "18 years",
    description:
      "Gas Safe registered engineer with expertise in boiler servicing, repairs, and installations. Available for emergency gas work 24/7.",
    contactInfo: {
      phone: "020 7789 0123",
      email: "peter@oconnorgas.co.uk",
    },
    portfolio: [
      {
        id: "p5-1",
        title: "Boiler Installation & System Upgrade",
        imageUrl: "/images/portfolio/gas-1.jpg",
        description:
          "New combi boiler installation with full central heating system upgrade.",
      },
    ],
    serviceAreas: ["E1A", "E1B", "E2", "E3", "E14", "E15"],
    pricing: {
      calloutFee: 60,
      hourlyRate: 75,
      minimumCharge: 100,
    },
    availability: {
      nextAvailable: "Today",
      workingHours: "Mon-Fri 8AM-6PM, Emergency 24/7",
      emergency: true,
    },
    reviews: [
      {
        id: "r5-1",
        customerName: "David Lee",
        rating: 5,
        comment:
          "Peter fixed our boiler on a Sunday evening. Very professional and reasonably priced for emergency work.",
        date: "2024-12-05",
        jobType: "Emergency Boiler Repair",
      },
    ],
    totalReviews: 112,
    responseTime: "Usually responds within 1 hour",
    verified: true,
  },
  // Painter & Decorator
  {
    id: "6",
    name: "Lisa Chen",
    trade: "painter",
    rating: 4.6,
    badges: ["Insured", "Eco-Friendly", "Interior Specialist"],
    postcode: "SE1A",
    experience: "10 years",
    description:
      "Professional painter and decorator specializing in interior work. Using eco-friendly paints and materials. Expertise in period property restoration.",
    contactInfo: {
      phone: "020 7890 1234",
      email: "lisa@chendecorating.co.uk",
    },
    portfolio: [
      {
        id: "p6-1",
        title: "Victorian House Interior",
        imageUrl: "/images/portfolio/painting-1.jpg",
        description:
          "Complete interior painting of Victorian terraced house including period features.",
      },
    ],
    serviceAreas: ["SE1A", "SE1B", "SE2", "SE3", "SE4", "SE5"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 40,
      minimumCharge: 120,
    },
    availability: {
      nextAvailable: "This Week",
      workingHours: "Mon-Fri 9AM-5PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r6-1",
        customerName: "James Wilson",
        rating: 5,
        comment:
          "Lisa did an excellent job painting our living room. Very tidy and professional work.",
        date: "2024-11-30",
        jobType: "Interior Painting",
      },
    ],
    totalReviews: 67,
    responseTime: "Usually responds within 4 hours",
    verified: true,
  },
  // Tiler
  {
    id: "8",
    name: "Giuseppe Romano",
    trade: "tiler",
    rating: 4.9,
    badges: ["Master Craftsman", "Verified", "Natural Stone Specialist"],
    postcode: "W2A",
    experience: "22 years",
    description:
      "Master tiler with over 20 years experience. Specializing in natural stone, marble, and ceramic tiling. Bathroom and kitchen installations.",
    contactInfo: {
      phone: "020 7901 2345",
      email: "giuseppe@romanotiling.co.uk",
      website: "www.romanotiling.co.uk",
    },
    portfolio: [
      {
        id: "p8-1",
        title: "Luxury Bathroom Suite",
        imageUrl: "/images/portfolio/tiling-1.jpg",
        description:
          "Marble bathroom installation with underfloor heating and custom shower enclosure.",
      },
      {
        id: "p8-2",
        title: "Kitchen Backsplash",
        imageUrl: "/images/portfolio/tiling-2.jpg",
        description:
          "Handmade ceramic tile backsplash with intricate mosaic patterns.",
      },
    ],
    serviceAreas: ["W2A", "W2B", "W3", "W4", "W5", "W6"],
    pricing: {
      calloutFee: 50,
      hourlyRate: 60,
      minimumCharge: 180,
    },
    availability: {
      nextAvailable: "Next Month",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-2PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r8-1",
        customerName: "Sophie Martin",
        rating: 5,
        comment:
          "Giuseppe transformed our bathroom with beautiful marble tiles. The craftsmanship is outstanding.",
        date: "2024-11-25",
        jobType: "Bathroom Tiling",
      },
    ],
    totalReviews: 145,
    responseTime: "Usually responds within 2 days",
    verified: true,
  },
  // Roofer
  {
    id: "9",
    name: "Tom Harrison",
    trade: "roofer",
    rating: 4.5,
    badges: ["Insured", "Storm Damage", "Flat Roof Expert"],
    postcode: "NW3A",
    experience: "16 years",
    description:
      "Professional roofer specializing in repairs, maintenance, and new installations. Experienced with all roof types including slate, tile, and flat roofs.",
    contactInfo: {
      phone: "020 7012 3456",
      email: "tom@harrisonroofing.co.uk",
    },
    portfolio: [
      {
        id: "p9-1",
        title: "Victorian Slate Roof Restoration",
        imageUrl: "/images/portfolio/roofing-1.jpg",
        description:
          "Complete restoration of Victorian slate roof with new guttering and fascias.",
      },
    ],
    serviceAreas: ["NW3A", "NW3B", "NW4", "NW5", "NW6", "NW7"],
    pricing: {
      calloutFee: 75,
      hourlyRate: 50,
      minimumCharge: 150,
    },
    availability: {
      nextAvailable: "This Week",
      workingHours: "Mon-Fri 7AM-6PM, Sat 8AM-4PM",
      emergency: true,
    },
    reviews: [
      {
        id: "r9-1",
        customerName: "Robert Clark",
        rating: 4,
        comment:
          "Tom fixed our leaking roof quickly and efficiently. Good value for money.",
        date: "2024-12-03",
        jobType: "Roof Repair",
      },
    ],
    totalReviews: 98,
    responseTime: "Usually responds within 3 hours",
    verified: true,
  },
  // Gardener/Landscaper
  {
    id: "10",
    name: "Emma Green",
    trade: "gardener",
    rating: 4.7,
    badges: ["RHS Qualified", "Eco-Friendly", "Design Specialist"],
    postcode: "SW5A",
    experience: "14 years",
    description:
      "RHS qualified gardener and landscape designer. Specializing in sustainable gardens, lawn care, and garden maintenance. Passionate about creating beautiful outdoor spaces.",
    contactInfo: {
      phone: "020 7123 4567",
      email: "emma@greengardening.co.uk",
      website: "www.greengardening.co.uk",
    },
    portfolio: [
      {
        id: "p10-1",
        title: "Contemporary Garden Design",
        imageUrl: "/images/portfolio/garden-1.jpg",
        description:
          "Modern garden design with raised beds, water feature, and outdoor seating area.",
      },
    ],
    serviceAreas: ["SW5A", "SW5B", "SW6", "SW7", "SW8", "SW9"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 35,
      minimumCharge: 100,
    },
    availability: {
      nextAvailable: "Next Week",
      workingHours: "Mon-Fri 8AM-4PM, Sat 9AM-3PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r10-1",
        customerName: "Helen Davies",
        rating: 5,
        comment:
          "Emma transformed our garden completely. Her design skills are exceptional and the maintenance service is excellent.",
        date: "2024-11-20",
        jobType: "Garden Design",
      },
    ],
    totalReviews: 89,
    responseTime: "Usually responds within 8 hours",
    verified: true,
  },
  // Locksmith
  {
    id: "11",
    name: "Kevin Murphy",
    trade: "locksmith",
    rating: 4.8,
    badges: ["24/7 Emergency", "Verified", "Security Expert"],
    postcode: "EC1A",
    experience: "11 years",
    description:
      "Professional locksmith providing 24/7 emergency lockout services. Specialist in high-security locks, CCTV installation, and home security systems.",
    contactInfo: {
      phone: "020 7234 5678",
      email: "kevin@murphylocks.co.uk",
    },
    portfolio: [
      {
        id: "p11-1",
        title: "Home Security System Installation",
        imageUrl: "/images/portfolio/security-1.jpg",
        description:
          "Complete home security system with smart locks, CCTV, and alarm system.",
      },
    ],
    serviceAreas: ["EC1A", "EC1B", "EC2", "EC3", "WC1", "WC2"],
    pricing: {
      calloutFee: 80,
      hourlyRate: 70,
      minimumCharge: 120,
    },
    availability: {
      nextAvailable: "Today",
      workingHours: "24/7 Emergency Service",
      emergency: true,
    },
    reviews: [
      {
        id: "r11-1",
        customerName: "Sarah Johnson",
        rating: 5,
        comment:
          "Kevin helped us when we were locked out at midnight. Very professional and quick response.",
        date: "2024-12-07",
        jobType: "Emergency Lockout",
      },
    ],
    totalReviews: 156,
    responseTime: "Usually responds within 30 minutes",
    verified: true,
  },
  // Flooring Specialist
  {
    id: "12",
    name: "Daniel Foster",
    trade: "flooring specialist",
    rating: 4.6,
    badges: ["Insured", "Hardwood Expert", "Underfloor Heating"],
    postcode: "SW10A",
    experience: "13 years",
    description:
      "Specialist in all types of flooring installation including hardwood, laminate, vinyl, and carpet. Expert in underfloor heating systems.",
    contactInfo: {
      phone: "020 7345 6789",
      email: "daniel@fosterflooring.co.uk",
      website: "www.fosterflooring.co.uk",
    },
    portfolio: [
      {
        id: "p12-1",
        title: "Engineered Oak Flooring",
        imageUrl: "/images/portfolio/flooring-1.jpg",
        description:
          "Premium engineered oak flooring installation with underfloor heating throughout ground floor.",
      },
    ],
    serviceAreas: ["SW10A", "SW10B", "SW11", "SW12", "SW13", "SW14"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 45,
      minimumCharge: 200,
    },
    availability: {
      nextAvailable: "Next Week",
      workingHours: "Mon-Fri 8AM-5PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r12-1",
        customerName: "Mark Thompson",
        rating: 5,
        comment:
          "Daniel installed beautiful oak floors throughout our house. Excellent workmanship and very tidy.",
        date: "2024-11-18",
        jobType: "Hardwood Installation",
      },
    ],
    totalReviews: 91,
    responseTime: "Usually responds within 1 day",
    verified: true,
  },
  // Plasterer
  {
    id: "13",
    name: "Antonio Silva",
    trade: "plasterer",
    rating: 4.7,
    badges: ["Venetian Plaster", "Verified", "Restoration Expert"],
    postcode: "E2A",
    experience: "19 years",
    description:
      "Master plasterer specializing in traditional lime plaster, Venetian plaster, and period property restoration. Skilled in both repair and new work.",
    contactInfo: {
      phone: "020 7456 7890",
      email: "antonio@silvaplaster.co.uk",
    },
    portfolio: [
      {
        id: "p13-1",
        title: "Period Property Restoration",
        imageUrl: "/images/portfolio/plaster-1.jpg",
        description:
          "Georgian house restoration using traditional lime plaster and horsehair techniques.",
      },
    ],
    serviceAreas: ["E2A", "E2B", "E3", "E4", "E5", "E6"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 50,
      minimumCharge: 150,
    },
    availability: {
      nextAvailable: "This Week",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-3PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r13-1",
        customerName: "Catherine Brown",
        rating: 5,
        comment:
          "Antonio restored the original plaster in our Victorian house. His expertise in period properties is exceptional.",
        date: "2024-11-15",
        jobType: "Restoration Work",
      },
    ],
    totalReviews: 78,
    responseTime: "Usually responds within 6 hours",
    verified: true,
  },
  // Window Cleaner
  {
    id: "14",
    name: "Steve Rogers",
    trade: "window cleaner",
    rating: 4.4,
    badges: ["Insured", "Reach & Wash", "Commercial"],
    postcode: "N4A",
    experience: "8 years",
    description:
      "Professional window cleaning service for residential and commercial properties. Using pure water reach and wash system for streak-free results.",
    contactInfo: {
      phone: "020 7567 8901",
      email: "steve@crystalcleanwindows.co.uk",
    },
    portfolio: [
      {
        id: "p14-1",
        title: "Office Block Window Cleaning",
        imageUrl: "/images/portfolio/windows-1.jpg",
        description:
          "Regular commercial window cleaning service for 4-story office building.",
      },
    ],
    serviceAreas: ["N4A", "N4B", "N5", "N6", "N7", "N8"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 25,
      minimumCharge: 40,
    },
    availability: {
      nextAvailable: "Tomorrow",
      workingHours: "Mon-Fri 8AM-4PM, Sat 9AM-3PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r14-1",
        customerName: "Julie Adams",
        rating: 4,
        comment:
          "Steve does a good job cleaning our windows monthly. Reliable and reasonably priced.",
        date: "2024-12-01",
        jobType: "Window Cleaning",
      },
    ],
    totalReviews: 234,
    responseTime: "Usually responds within 1 day",
    verified: true,
  },
  // Handyman
  {
    id: "15",
    name: "Chris Taylor",
    trade: "handyman",
    rating: 4.5,
    badges: ["Multi-skilled", "Insured", "Same Day Service"],
    postcode: "SW15A",
    experience: "9 years",
    description:
      "Multi-skilled handyman for all types of repairs and maintenance. From furniture assembly to minor electrical work, plumbing repairs, and general maintenance.",
    contactInfo: {
      phone: "020 7678 9012",
      email: "chris@taylormaintenance.co.uk",
    },
    portfolio: [
      {
        id: "p15-1",
        title: "Home Maintenance Package",
        imageUrl: "/images/portfolio/handyman-1.jpg",
        description:
          "Complete home maintenance including repairs, painting, and general fixes.",
      },
    ],
    serviceAreas: ["SW15A", "SW15B", "SW16", "SW17", "SW18", "SW19"],
    pricing: {
      calloutFee: 35,
      hourlyRate: 40,
      minimumCharge: 75,
    },
    availability: {
      nextAvailable: "Today",
      workingHours: "Mon-Fri 8AM-6PM, Sat 9AM-4PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r15-1",
        customerName: "Peter Wilson",
        rating: 4,
        comment:
          "Chris fixed several issues around the house in one visit. Very handy and efficient.",
        date: "2024-12-04",
        jobType: "General Repairs",
      },
    ],
    totalReviews: 167,
    responseTime: "Usually responds within 2 hours",
    verified: true,
  },
  // Decorator/Wallpaper Specialist
  {
    id: "16",
    name: "Rachel Green",
    trade: "decorator",
    rating: 4.8,
    badges: ["Wallpaper Expert", "Period Properties", "Insured"],
    postcode: "W8A",
    experience: "12 years",
    description:
      "Professional decorator specializing in wallpaper hanging, period property decoration, and high-end interior finishes. Attention to detail is my priority.",
    contactInfo: {
      phone: "020 7789 0123",
      email: "rachel@greendecorating.co.uk",
    },
    portfolio: [
      {
        id: "p16-1",
        title: "Designer Wallpaper Installation",
        imageUrl: "/images/portfolio/wallpaper-1.jpg",
        description:
          "Hand-printed wallpaper installation in Georgian townhouse dining room.",
      },
    ],
    serviceAreas: ["W8A", "W8B", "W9", "W10", "W11", "W12"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 45,
      minimumCharge: 180,
    },
    availability: {
      nextAvailable: "Next Week",
      workingHours: "Mon-Fri 9AM-5PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r16-1",
        customerName: "Amanda Foster",
        rating: 5,
        comment:
          "Rachel hung expensive wallpaper in our dining room perfectly. Her attention to detail is incredible.",
        date: "2024-11-22",
        jobType: "Wallpaper Hanging",
      },
    ],
    totalReviews: 56,
    responseTime: "Usually responds within 12 hours",
    verified: true,
  },
  // Heating Engineer
  {
    id: "17",
    name: "Alan Roberts",
    trade: "heating engineer",
    rating: 4.6,
    badges: ["Gas Safe", "Renewable Energy", "Emergency Service"],
    postcode: "SE10A",
    experience: "17 years",
    description:
      "Heating engineer specializing in central heating systems, heat pumps, and renewable energy solutions. Gas Safe registered with emergency callout service.",
    contactInfo: {
      phone: "020 7890 1234",
      email: "alan@robertsheating.co.uk",
      website: "www.robertsheating.co.uk",
    },
    portfolio: [
      {
        id: "p17-1",
        title: "Air Source Heat Pump Installation",
        imageUrl: "/images/portfolio/heating-1.jpg",
        description:
          "Complete air source heat pump system installation with underfloor heating.",
      },
    ],
    serviceAreas: ["SE10A", "SE10B", "SE11", "SE12", "SE13", "SE14"],
    pricing: {
      calloutFee: 70,
      hourlyRate: 65,
      minimumCharge: 120,
    },
    availability: {
      nextAvailable: "This Week",
      workingHours: "Mon-Fri 8AM-6PM, Emergency 24/7",
      emergency: true,
    },
    reviews: [
      {
        id: "r17-1",
        customerName: "Simon Wright",
        rating: 5,
        comment:
          "Alan installed our new heat pump system. Very knowledgeable about renewable energy and excellent service.",
        date: "2024-11-10",
        jobType: "Heat Pump Installation",
      },
    ],
    totalReviews: 102,
    responseTime: "Usually responds within 2 hours",
    verified: true,
  },
  // Appliance Repair Specialist
  {
    id: "18",
    name: "Mohammed Hassan",
    trade: "appliance repair",
    rating: 4.7,
    badges: ["Multi-brand", "Same Day", "Warranty Work"],
    postcode: "NW10A",
    experience: "14 years",
    description:
      "Appliance repair specialist for all major brands. Washing machines, dishwashers, ovens, and refrigerators. Same-day service available with genuine parts.",
    contactInfo: {
      phone: "020 7901 2345",
      email: "mohammed@hassanrepairs.co.uk",
    },
    portfolio: [
      {
        id: "p18-1",
        title: "Kitchen Appliance Maintenance",
        imageUrl: "/images/portfolio/appliance-1.jpg",
        description:
          "Complete kitchen appliance service including oven, dishwasher, and refrigerator repairs.",
      },
    ],
    serviceAreas: ["NW10A", "NW10B", "NW11", "NW12", "W3", "W4"],
    pricing: {
      calloutFee: 45,
      hourlyRate: 55,
      minimumCharge: 85,
    },
    availability: {
      nextAvailable: "Today",
      workingHours: "Mon-Fri 8AM-7PM, Sat 9AM-5PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r18-1",
        customerName: "Lisa Chen",
        rating: 5,
        comment:
          "Mohammed fixed our washing machine the same day. Very professional and reasonable prices.",
        date: "2024-12-06",
        jobType: "Washing Machine Repair",
      },
    ],
    totalReviews: 189,
    responseTime: "Usually responds within 1 hour",
    verified: true,
  },
  // Bathroom Fitter
  {
    id: "19",
    name: "Jason Clarke",
    trade: "bathroom fitter",
    rating: 4.8,
    badges: ["Complete Bathrooms", "Wetroom Specialist", "Insured"],
    postcode: "SW20A",
    experience: "16 years",
    description:
      "Complete bathroom installation service from design to completion. Specialist in wetrooms, disabled access bathrooms, and luxury bathroom suites.",
    contactInfo: {
      phone: "020 7012 3456",
      email: "jason@clarkebathrooms.co.uk",
      website: "www.clarkebathrooms.co.uk",
    },
    portfolio: [
      {
        id: "p19-1",
        title: "Luxury Bathroom Suite",
        imageUrl: "/images/portfolio/bathroom-1.jpg",
        description:
          "Complete luxury bathroom installation with walk-in shower, underfloor heating, and premium fixtures.",
      },
      {
        id: "p19-2",
        title: "Wetroom Conversion",
        imageUrl: "/images/portfolio/bathroom-2.jpg",
        description:
          "Conversion of standard bathroom to fully tiled wetroom with glass screen.",
      },
    ],
    serviceAreas: ["SW20A", "SW20B", "SW21", "SW22", "CR0", "CR2"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 50,
      minimumCharge: 300,
    },
    availability: {
      nextAvailable: "Next Month",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-2PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r19-1",
        customerName: "Karen Mitchell",
        rating: 5,
        comment:
          "Jason completely transformed our bathroom. The wetroom is absolutely perfect and the work was completed on time.",
        date: "2024-10-28",
        jobType: "Bathroom Installation",
      },
    ],
    totalReviews: 87,
    responseTime: "Usually responds within 1 day",
    verified: true,
  },
  // Kitchen Fitter
  {
    id: "20",
    name: "Paul Anderson",
    trade: "kitchen fitter",
    rating: 4.9,
    badges: ["Design & Install", "German Kitchens", "Project Management"],
    postcode: "SE22A",
    experience: "20 years",
    description:
      "Complete kitchen design and installation service. Specialist in German kitchen brands and bespoke solutions. Full project management from design to completion.",
    contactInfo: {
      phone: "020 7123 4567",
      email: "paul@andersonkitchens.co.uk",
      website: "www.andersonkitchens.co.uk",
    },
    portfolio: [
      {
        id: "p20-1",
        title: "Contemporary German Kitchen",
        imageUrl: "/images/portfolio/kitchen-1.jpg",
        description:
          "Modern German kitchen installation with island, integrated appliances, and granite worktops.",
      },
      {
        id: "p20-2",
        title: "Period Property Kitchen",
        imageUrl: "/images/portfolio/kitchen-2.jpg",
        description:
          "Traditional kitchen design sympathetic to Victorian property with modern functionality.",
      },
    ],
    serviceAreas: ["SE22A", "SE22B", "SE23", "SE24", "SE25", "SE26"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 55,
      minimumCharge: 500,
    },
    availability: {
      nextAvailable: "Next Month",
      workingHours: "Mon-Fri 8AM-5PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r20-1",
        customerName: "Jennifer Taylor",
        rating: 5,
        comment:
          "Paul designed and installed our dream kitchen. The attention to detail and quality of work is outstanding.",
        date: "2024-10-15",
        jobType: "Kitchen Installation",
      },
    ],
    totalReviews: 94,
    responseTime: "Usually responds within 2 days",
    verified: true,
  },
  // Driveway Specialist
  {
    id: "21",
    name: "Gary Phillips",
    trade: "driveway specialist",
    rating: 4.4,
    badges: ["Block Paving", "Resin Bound", "Drainage"],
    postcode: "HA1A",
    experience: "18 years",
    description:
      "Driveway and patio specialist offering block paving, resin bound surfaces, and tarmac driveways. Including drainage solutions and garden walls.",
    contactInfo: {
      phone: "020 7234 5678",
      email: "gary@phillipsdriveways.co.uk",
    },
    portfolio: [
      {
        id: "p21-1",
        title: "Block Paving Driveway",
        imageUrl: "/images/portfolio/driveway-1.jpg",
        description:
          "Complete block paving driveway with decorative border and proper drainage system.",
      },
    ],
    serviceAreas: ["HA1A", "HA1B", "HA2", "HA3", "HA4", "HA5"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 40,
      minimumCharge: 250,
    },
    availability: {
      nextAvailable: "Next Week",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-3PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r21-1",
        customerName: "Michael Jones",
        rating: 4,
        comment:
          "Gary laid a new block paving driveway for us. Good workmanship and fair pricing.",
        date: "2024-11-05",
        jobType: "Driveway Installation",
      },
    ],
    totalReviews: 134,
    responseTime: "Usually responds within 1 day",
    verified: true,
  },
  // Pest Control Specialist
  {
    id: "22",
    name: "Stuart Campbell",
    trade: "pest control",
    rating: 4.6,
    badges: ["Licensed", "Eco-Friendly", "Emergency Service"],
    postcode: "BR1A",
    experience: "11 years",
    description:
      "Professional pest control service for residential and commercial properties. Licensed for all types of pest control including rodents, insects, and birds.",
    contactInfo: {
      phone: "020 7345 6789",
      email: "stuart@campbellpestcontrol.co.uk",
    },
    portfolio: [
      {
        id: "p22-1",
        title: "Restaurant Pest Management",
        imageUrl: "/images/portfolio/pest-1.jpg",
        description:
          "Complete pest management program for commercial restaurant including monitoring and prevention.",
      },
    ],
    serviceAreas: ["BR1A", "BR1B", "BR2", "BR3", "BR4", "BR5"],
    pricing: {
      calloutFee: 60,
      hourlyRate: 65,
      minimumCharge: 95,
    },
    availability: {
      nextAvailable: "Today",
      workingHours: "Mon-Fri 8AM-6PM, Emergency 24/7",
      emergency: true,
    },
    reviews: [
      {
        id: "r22-1",
        customerName: "Rachel Green",
        rating: 5,
        comment:
          "Stuart sorted out our wasp problem quickly and professionally. Very knowledgeable and effective treatment.",
        date: "2024-12-02",
        jobType: "Wasp Treatment",
      },
    ],
    totalReviews: 178,
    responseTime: "Usually responds within 2 hours",
    verified: true,
  },
  // Carpet Fitter
  {
    id: "23",
    name: "Derek Johnson",
    trade: "carpet fitter",
    rating: 4.5,
    badges: ["All Flooring Types", "Insured", "Free Estimates"],
    postcode: "DA1A",
    experience: "25 years",
    description:
      "Experienced carpet fitter with 25 years in the trade. Specializing in all types of carpet installation, vinyl, and laminate flooring. Free estimates provided.",
    contactInfo: {
      phone: "020 7456 7890",
      email: "derek@johnsoncarpets.co.uk",
    },
    portfolio: [
      {
        id: "p23-1",
        title: "Stair Carpet Installation",
        imageUrl: "/images/portfolio/carpet-1.jpg",
        description:
          "Stair carpet installation with matching landing areas and quality underlay.",
      },
    ],
    serviceAreas: ["DA1A", "DA1B", "DA2", "DA3", "DA4", "DA5"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 35,
      minimumCharge: 120,
    },
    availability: {
      nextAvailable: "This Week",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-3PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r23-1",
        customerName: "Patricia Williams",
        rating: 4,
        comment:
          "Derek fitted carpets throughout our house. Good workmanship and very reasonably priced.",
        date: "2024-11-28",
        jobType: "Carpet Installation",
      },
    ],
    totalReviews: 201,
    responseTime: "Usually responds within 4 hours",
    verified: true,
  },
  // Chimney Sweep
  {
    id: "24",
    name: "William Stone",
    trade: "chimney sweep",
    rating: 4.7,
    badges: ["Traditional Methods", "CCTV Inspection", "Insured"],
    postcode: "TN1A",
    experience: "30 years",
    description:
      "Traditional chimney sweep with 30 years experience. Offering chimney cleaning, CCTV inspections, and flue repairs. Covering all types of chimneys and wood burners.",
    contactInfo: {
      phone: "020 7567 8901",
      email: "william@stonechimneysweep.co.uk",
    },
    portfolio: [
      {
        id: "p24-1",
        title: "Victorian Chimney Restoration",
        imageUrl: "/images/portfolio/chimney-1.jpg",
        description:
          "Complete Victorian chimney restoration including repointing and cowl installation.",
      },
    ],
    serviceAreas: ["TN1A", "TN1B", "TN2", "TN3", "TN4", "BR1A"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 45,
      minimumCharge: 80,
    },
    availability: {
      nextAvailable: "Next Week",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-2PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r24-1",
        customerName: "Geoffrey Harris",
        rating: 5,
        comment:
          "William cleaned our chimney thoroughly and provided excellent advice about maintenance. Very professional service.",
        date: "2024-11-12",
        jobType: "Chimney Cleaning",
      },
    ],
    totalReviews: 267,
    responseTime: "Usually responds within 1 day",
    verified: true,
  },
  // Fence Installer
  {
    id: "25",
    name: "Mark Stevens",
    trade: "fence installer",
    rating: 4.3,
    badges: ["All Fence Types", "Tree Surgery", "Insured"],
    postcode: "KT1A",
    experience: "15 years",
    description:
      "Professional fence installation and tree surgery service. Specializing in all types of fencing including close board, panel, and decorative fencing. Also tree removal and maintenance.",
    contactInfo: {
      phone: "020 7678 9012",
      email: "mark@stevensfencing.co.uk",
    },
    portfolio: [
      {
        id: "p25-1",
        title: "Garden Boundary Fencing",
        imageUrl: "/images/portfolio/fence-1.jpg",
        description:
          "Complete garden boundary fencing with close board panels and concrete posts.",
      },
    ],
    serviceAreas: ["KT1A", "KT1B", "KT2", "KT3", "KT4", "KT5"],
    pricing: {
      calloutFee: 0,
      hourlyRate: 40,
      minimumCharge: 200,
    },
    availability: {
      nextAvailable: "Next Week",
      workingHours: "Mon-Fri 8AM-5PM, Sat 9AM-4PM",
      emergency: false,
    },
    reviews: [
      {
        id: "r25-1",
        customerName: "Susan Baker",
        rating: 4,
        comment:
          "Mark installed new fencing along our garden boundary. Solid workmanship and completed on schedule.",
        date: "2024-11-08",
        jobType: "Fence Installation",
      },
    ],
    totalReviews: 156,
    responseTime: "Usually responds within 8 hours",
    verified: true,
  },
]

// Helper function to filter tradespeople by trade and postcode
function filterTradespeople(trade?: string, postcode?: string) {
  let filtered = [...mockTradespeople]

  if (trade) {
    const searchTrade = trade.toLowerCase().trim()
    filtered = filtered.filter(
      (person) =>
        person.trade.toLowerCase().includes(searchTrade) ||
        person.name.toLowerCase().includes(searchTrade)
    )
  }

  if (postcode) {
    const searchPostcode = postcode.toLowerCase().trim().replace(/\s+/g, "")
    filtered = filtered.filter((person) =>
      person.postcode.toLowerCase().includes(searchPostcode)
    )
  }

  // Sort by rating (highest first)
  return filtered.sort((a, b) => b.rating - a.rating)
}

export const handlers = [
  http.post("/api/graphql", async ({ request }) => {
    const body = (await request.json()) as GraphQLRequest
    const { variables, operationName } = body

    console.log("[MSW] Intercepted GraphQL request:", operationName)
    console.log("[MSW] Variables:", variables)

    // Handle GetTradespeople query (all tradespeople)
    if (operationName === "GetTradespeople") {
      const allTradespeople = mockTradespeople
        .sort((a, b) => b.rating - a.rating) // Sort by rating
        .slice(0, 25) // Show all 25 tradespeople
        .map((person) => ({
          id: person.id,
          name: person.name,
          rating: person.rating,
          badges: person.badges,
        }))

      return HttpResponse.json({
        data: {
          tradespeople: allTradespeople,
        },
      })
    }

    // Handle GetTradespeopleByTypeAndPostcode query (filtered search)
    if (operationName === "GetTradespeopleByTypeAndPostcode") {
      const { trade, postcode } = variables as {
        trade?: string;
        postcode?: string;
      }

      const filteredTradespeople = filterTradespeople(trade, postcode)
        .slice(0, 25) // Show all matching results
        .map((person) => ({
          id: person.id,
          name: person.name,
          rating: person.rating,
          badges: person.badges,
        }))

      return HttpResponse.json({
        data: {
          tradespeople: filteredTradespeople,
        },
      })
    }

    // Handle GetTradesperson query (individual tradesperson)
    if (operationName === "GetTradesperson") {
      const { id } = variables as { id: string }

      const tradesperson = mockTradespeople.find((person) => person.id === id)

      if (!tradesperson) {
        return HttpResponse.json({
          errors: [{ message: `Tradesperson with id ${id} not found` }],
        })
      }

      return HttpResponse.json({
        data: {
          tradesperson,
        },
      })
    }

    // Default response for unhandled queries
    return HttpResponse.json({
      errors: [{ message: `Unhandled GraphQL operation: ${operationName}` }],
    })
  }),
]
