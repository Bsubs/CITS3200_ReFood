describe('Authenticator:', function() {
  beforeEach(function() {
      cy.visit('/');
  });
  describe('Sign In:', () => {
      it('allows a user to signin and signout', () => {
          cy.get('[id=accept_terms_button]').click();
          cy.get('button').contains('Sign In').click();
          cy.get('[placeholder="Email"]').type('refood3200@gmail.com');
          cy.get('[placeholder="Password"]').type('Cits3200@');
          cy.get('button').contains('Sign in').click();
          cy.wait(5000);
          cy.get('a[href*="inbox"]').click();
          cy.get('button').contains('Sign out').click();
      });
  });
});
