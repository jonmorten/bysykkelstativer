describe("Map of stations", () => {
  it("Loads", () => {
    cy.visit("/map");
    cy.contains("Bysykkelstativer");
    cy.contains("Se stativer som liste");
  });

  describe("Map markers", () => {
    it("Opens popup with info on click", () => {
      cy.visit("/map");
      cy.findByTestId("Arkaden Nord").click({ force: true });
      cy.contains("ledige sykler");
      cy.contains("ledige låser");
    });
  });
});
