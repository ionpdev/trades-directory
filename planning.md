### **Architecture & Stack**

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS + SHADCN Components**
- **Apollo Client (with GraphQL)**
- **MSW**:
  - Mock GraphQL endpoints or REST APIs

---

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
| Login/Register | Store mock auth state in `localStorage`                         |
| Leave a Review | Persist to `localStorage`                                       |
| Favourites     | Mocked GraphQL mutation and query for favourites, store locally |

---

## Testing Strategy

| Layer          | Tool                         |
| -------------- | ---------------------------- |
| **Unit Tests** | Jest + React Testing Library |
| **E2E Tests**  | Cypress                      |
| **Storybook**  | Storybook                    |

Storybook to showcase reusable components with mocked GraphQL data, making the components previewable in isolation for quick prototype requirements.

---

## Deployment Ready

- App can be deployed on **Vercel**
- Use **GitHub Actions** for CI (test, lint, build)
- Future extension: point Apollo to real GCP GraphQL API by swapping base URL/env
