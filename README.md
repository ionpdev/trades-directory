# TradesDirectory - Learning Demo Project

A modern, scalable trades directory application built with Next.js 15, TypeScript, and GraphQL. This demo showcases features to be used during a tech interview, including tradesperson search, user authentication, project management, and financial tracking.

## Features

### **Core Search & Discovery**

- Advanced search with dropdown selections and custom input
- Tradesperson profiles with ratings, badges, and contact information
- Responsive grid layout with detailed cards
- Real-time search functionality

### **Authentication System**

- User registration and login with bcrypt password hashing
- Role-based access control (customer/tradesperson)
- Protected routes and session management
- localStorage-based session persistence

### **User Dashboard**

- **Financial Management**: Budget tracking, expense categorization, spending overview
- **Project Management**: Work in progress tracking, completed projects history
- **Lead Management**: Potential client tracking and relationship management
- **Quick Actions**: Schedule projects, add expenses, find tradespeople
- **Alerts & Notifications**: Payment reminders, budget alerts, work updates

### **User Engagement**

- Favorites system for saving preferred tradespeople
- Review and rating system
- User profile management
- Activity tracking and history

### **Modern UI/UX**

- Built with Tailwind CSS and Radix UI components
- Responsive design for mobile and desktop
- Dark/light theme support
- Smooth animations and transitions
- Accessibility-first approach

### **Testing & Development**

- Mock Service Worker (MSW) for API mocking
- Unit tests with Vitest and React Testing Library
- E2E tests with Cypress
- Storybook for component development
- TypeScript for type safety

## Contributing

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone
cd trades-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing

```bash
npm run test         # Run unit tests (Vitest)
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Open Cypress for E2E testing
```

### Storybook

```bash
npm run storybook       # Start Storybook dev server on port 5000
npm run build-storybook # Build Storybook for production
```

## Project Structure

```
src/
── app/                        # Next.js App Router pages
   ── auth/                    # Authentication pages
   ── dashboard/               # User dashboard and subpages
   ── search/                  # Search functionality
   ── tradesperson/            # Tradesperson detail pages
── components/                 # Reusable UI components
   ── ui/                      # Base UI components (shadcn/ui)
   ── Navigation.tsx           # Main navigation
   ── /.....                   # Many reusable components
── contexts/                   # React contexts
   ── AuthContext.tsx          # Authentication state
   ── FavoritesContext.tsx     # Favorites management
   ── MSWContext.tsx           # MSW integration
── hooks/                      # Custom React hooks
── lib/                        # Utilities and configurations
   ── apollo/                  # GraphQL client and queries
   ── auth.ts                  # Authentication service
── mocks/                      # MSW mock definitions
── stories/                    # Storybook stories
── styles/                     # Global styles
── types/                      # TypeScript type definitions
```

## Technology Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Apollo Client** - GraphQL client with caching

### UI Components

- **Shadcn ui** - UI components
- **Tailwindcss** - CSS framework
- **Lucide React** - Icons

### Testing & Development

- **Vitest** - Fast unit testing framework
- **Cypress** - End-to-end testing
- **Storybook** - Component development environment
- **MSW** - API mocking for development and testing

### Authentication & Security

- **bcryptjs** - Password hashing
- **Custom auth service** - Session management
- **Protected routes** - Route-based access control

## Key Features Demo

### 1. Search Functionality

- Navigate to `/search` or use the search form on the homepage
- Try different trade types and postcodes
- Experience both dropdown selection and custom input

### 2. User Authentication

- Sign up for a new account at `/auth/signup`
- Sign in with existing credentials at `/auth/signin`
- Explore the dashboard at `/dashboard`

### 3. Dashboard Features

- **Budget Management**: Track expenses and manage budgets
- **Work Progress**: Monitor ongoing projects
- **Lead Management**: Handle potential client inquiries
- **Work History**: Review completed projects

### 4. Tradesperson Profiles

- Click on any tradesperson card to view detailed profile
- Add/remove from favorites (requires login)
- View ratings, badges, and contact information

## Mock Data & APIs

This application uses **Mock Service Worker (MSW)** to simulate a real backend:

- **GraphQL API**: Mock queries for tradespeople, search, and user data
- **Authentication**: In-memory user storage with bcrypt hashing
- **Favorites**: localStorage-based persistence

The mock system is production-ready and can be easily replaced with real API endpoints.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI or prepare infra for GCP
npm i -g vercel

# Deploy
vercel
```

---

**Demo Application** - Built to showcase modern web development practices and scalable architecture patterns for CT technical interview.
