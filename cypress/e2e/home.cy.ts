describe("Trades Directory E2E Tests", () => {
  it("loads home page and displays main heading", () => {
    cy.visit("/");
    cy.contains("Find Trusted Tradespeople Near You");
  });

  it("loads search page and displays main header", () => {
    cy.visit("/search");
    cy.contains("Find Trusted Tradespeople");
  });

  it("loads tradesperson details page and displays profile", () => {
    // Visit a specific tradesperson (Sarah Mitchell - ID 1)
    cy.visit("/tradesperson/1");
    cy.contains("Sarah Mitchell");
    cy.contains("electrician");
  });
});
