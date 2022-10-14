const { wait } = require("@testing-library/user-event/dist/utils");

describe('Donation:', function() {
  beforeEach(function() {
      cy.visit('/');
  });

  describe('Donation:', () => {
      it('allows a donor to donate food', () => {
          cy.get('[id=accept_terms_button]').click();
          cy.get('button').contains('Sign In').click();
          cy.get('[placeholder="Email"]').type('refood3200@gmail.com');
          cy.get('[placeholder="Password"]').type('Cits3200@');
          cy.get('button').contains('Sign in').click();
          cy.wait(5000);
          cy.visit('/donate');
          cy.get('ul li').contains('Frozen').click();
          cy.get('button').contains('Next').click();
          cy.contains('Food Item(s)').parent('div').within(() =>{
            cy.get('input').type('Steaks')
          });
          cy.contains('Quantity/Volume of Food').parent('div').within(() =>{
            cy.get('input').type('2 pieces (300g ea)')
          });
          cy.contains('Food Description').parent('div').within(() =>{
            cy.get('textarea').type('Fresh Ribeye Steak')
          });
          cy.contains('Transport Requirements').parent('div').within(() =>{
            cy.get('textarea').type('No additional requirements')
          });
          cy.scrollTo('bottom')
          cy.wait(300);
          cy.contains('Pick-up By').parent('div').within(() =>{
            cy.get('div:first').click()
            cy.contains('14').click();
          });
          cy.contains('Start').parent('div').within(() =>{
            cy.get('div:first').click()
            cy.get('ul').contains('11:00').click()
          });
          cy.contains('End').parent('div').within(() =>{
            cy.get('div:first').click()
            cy.get('ul').contains('11:45').click()
          });
          //cy.get('button').contains('Sign out').click();
      });
  });

});