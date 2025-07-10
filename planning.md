### **Architecture & Stack**

- **Next.js (App Router)**: Best modern choice for React apps - allows routing, layouts, and server components if needed.
- **TypeScript**: Mandatory for maintainability and type safety in a team environment.
- **Tailwind CSS + SHADCN Components**: Great for rapid UI development and aligns with modern frontend stacks.
- **Apollo Client (with GraphQL)**: Ideal for mimicking how Checkatrade likely manages their real data. Offers cache, devtools, and strong TypeScript integration.
- **MSW**:
  - Mock GraphQL endpoints or REST APIs
  - Works with both unit tests and dev environments
  - Makes your app feel "real" with zero backend dependency

---

## Flow Coverage with Mocking

### Visitor Flow - **Fully Mockable**

| Feature        | How to Mock                                                  |
| -------------- | ------------------------------------------------------------ |
| Search Page    | Return a static list of tradespeople based on trade/postcode |
| Ratings/Badges | Include ratings and badge fields in mock GraphQL             |
| Detail Page    | Provide full mocked profile info via GraphQL mock            |
| Performance    | MSW responds instantly, feels like a real API                |

### Logged-in User Flow - **Fully Mockable**

| Feature        | How to Mock                                                     |
| -------------- | --------------------------------------------------------------- |
| Login/Register | Store mock auth state in a next-auth with mock adapter          |
| Leave a Review | Persist to local state or `localStorage`                        |
| Favourites     | Mocked GraphQL mutation and query for favourites, store locally |

Mocking will let us showcase _working flows_ without backend complexity.

---

## Testing Strategy

| Layer          | Tool                         |
| -------------- | ---------------------------- |
| **Unit Tests** | Jest + React Testing Library |
| **E2E Tests**  | Cypress                      |
| **Storybook**  | Storybook                    |

Storybook to showcase reusable components with mocked GraphQL data, making the components previewable in isolation.

---

## Deployment Ready

- App can be deployed on **Vercel**
- Use **GitHub Actions** for CI (test, lint, build)
- Future extension: point Apollo to real GCP GraphQL API by swapping base URL/env
