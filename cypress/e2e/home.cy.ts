describe("Landing Page", () => {
  it("loads and displays hero text", () => {
    cy.visit("/");
    cy.contains("Search for tradespeople");
  });
});
