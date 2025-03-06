context("Google Search test", () => {
  before(() => {
      // Start the Evinced engine
      cy.evStart();
  });

  after(() => {
      // Conclude the scan, print issues to cy.log with logIssues and print the report JSON object to browser's console
      cy.evStop({ logIssues: true }).should((report) => {
          console.log(JSON.stringify(report, null, 2));
      });
  });
  describe('Google Search check for Google Title', () => {
    it('visit google', () => {
      cy.addLabel({
        environment: 'Sandbox',
      });
      cy.visit('https://www.google.com')
      cy.get('.lnXdpd')
    })
  })
});