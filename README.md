# TradesDirectory - Learning Demo Project

Trades directory application built with Next.js 15, TypeScript, and GraphQL.

### Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and is just the best prog lang
- **Tailwind CSS + Shadcn UI** - Utility-first CSS framework + SHADCN UI Components
- **Apollo Client** - GraphQL client with caching
- **Vitest** - Fast unit testing framework
- **Cypress** - End-to-end testing
- **Storybook** - Component development environment
- **MSW** - API mocking for development and testing

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

### Contributing & Installation

- Node.js 20+
- npm, yarn, pnpm, or bun

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
