const { wait } = require("@testing-library/user-event/dist/utils");

describe('Donation:', function() {
  beforeEach(function() {
      cy.visit('/');
      cy.get('[id=accept_terms_button]').click();
      cy.get('button').contains('Sign In').click();
      cy.get('[placeholder="Email"]').type('refood3201@gmail.com');
      cy.get('[placeholder="Password"]').type('Cits3200@');
      cy.get('button').contains('Sign in').click();
      cy.wait(5000);
  });

  describe('Colllector:', () => {
      it('allows a NFP to view active donations', () => {
          cy.visit('/listpage');
          
      });
  });


});