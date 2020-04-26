describe("List of stations", () => {
  it("Loads", () => {
    cy.visit("/");
    cy.contains("Bysykkelstativer");
  });

  describe("Filters the list", () => {
    it("Show matches", () => {
      cy.visit("/");
      cy.findByLabelText("Finn ditt stativ").type("Arkaden");
      cy.contains("Arkaden Nord");
      cy.contains("Arkaden Sør");
      cy.contains("Akersgata").should("not.exist");
    });

    it("Show message for no matches", () => {
      cy.visit("/");
      const noMatchName = "This station does not exist";
      cy.findByLabelText("Finn ditt stativ").type(noMatchName);
      cy.contains(`Fant ingen stativ for «${noMatchName}»`);
    });
  });
});
