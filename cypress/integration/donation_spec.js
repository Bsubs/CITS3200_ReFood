const { wait } = require("@testing-library/user-event/dist/utils");

describe('Donation:', function() {
  beforeEach(function() {
      cy.visit('/');
      cy.get('[id=accept_terms_button]').click();
      cy.get('button').contains('Sign In').click();
      cy.get('[placeholder="Email"]').type('refood3200@gmail.com');
      cy.get('[placeholder="Password"]').type('Cits3200@');
      cy.get('button').contains('Sign in').click();
      cy.wait(5000);
  });

  // describe('Donation:', () => {
  //     it('allows a donor to donate food', () => {
  //         cy.visit('/donate');
  //         cy.get('[id^=donation-heading1').should('contain', 'What kind of food do you want to donate?');
  //         cy.get('ul li').contains('Frozen').click();
  //         cy.get('button').contains('Next').click();
  //         cy.get('[id^=donation-heading1').should('contain', 'Food Donation Details');
  //         cy.contains('Food Item(s)').parent('div').within(() =>{
  //           cy.get('input').type('Steaks')
  //         });
  //         cy.contains('Quantity/Volume of Food').parent('div').within(() =>{
  //           cy.get('input').type('2 pieces (300g ea)')
  //         });
  //         cy.contains('Food Description').parent('div').within(() =>{
  //           cy.get('textarea').type('Fresh Ribeye Steak')
  //         });
  //         cy.contains('Transport Requirements').parent('div').within(() =>{
  //           cy.get('textarea').type('No additional requirements')
  //         });
  //         cy.scrollTo('bottom')
  //         cy.wait(300);
  //         cy.contains('Pick-up By').parent('div').within(() =>{
  //           cy.get('div:first').click()
  //           cy.contains('14').click();
  //         });
  //         cy.contains('Start').parent('div').within(() =>{
  //           cy.get('div:first').click()
  //           cy.get('ul').contains('11:00').click()
  //         });
  //         cy.contains('End').parent('div').within(() =>{
  //           cy.get('div:first').click()
  //           cy.get('ul').contains('11:45').click()
  //         });
  //         // cy.contains('Submit').click();
  //         // cy.wait(500);
  //         cy.scrollTo('top');
  //         cy.wait(300);
  //         cy.get('Button').contains('Open modal').click();
  //         cy.get('[id^=modal-modal-title]').should('contain', 'Donation Successful');
  //         cy.get('[id^=modal-modal-description]').should('contain', 'Press ok to return to the orders page');
  //         cy.get('a[href*="/orders"]').click()    
  //     });
  // });

  //   describe('View Donation:', () => {
  //     it('allows a donor to view their donations', () => {
  //         cy.visit('/orders');
  //         cy.get('[id^=in_progress_orders_header').should('contain', 'In Progress');
  //         cy.contains('Steaks').parent('div').within(() =>{
  //           cy.get('[class^=productName]').should('contain', 'Steaks');
  //           cy.get('[class^=productDescription]').should('contain', 'Fresh Ribeye Steak');
  //           cy.get('[class^=bottom_info]').click();
  //         });
  //         cy.get('[class^=productName]').should('contain', 'Steaks');
  //         cy.get('[class^=productDescription]').should('contain', 'Fresh Ribeye Steak');
  //         cy.get('[id^=individual_product_pickupby]').should('contain', '2022-11-13');
  //         cy.get('[id^=individual_product_transport_requirements]').should('contain', 'No additional requirements');
  //     });
  // });

  describe('Edit Donation:', () => {
    it('allows a donor edit their donations', () => {
        cy.visit('/orders');
        cy.get('[id^=in_progress_orders_header').should('contain', 'In Progress');
        cy.contains('Steaks').parent('div').within(() =>{
          cy.get('[class^=bottom_info]').click();
        });
        cy.scrollTo('bottom');
        cy.wait(300);
        cy.contains('Edit Donation').click();
        cy.get('ul li').contains('Eggs').click();
        cy.get('button').contains('Next').click();
        cy.contains('Food Item(s)').parent('div').within(() =>{
          cy.get('input').type('Fresh Eggs')
        });
        cy.contains('Quantity/Volume of Food').parent('div').within(() =>{
          cy.get('input').type('Half a dozen eggs')
        });
        cy.contains('Food Description').parent('div').within(() =>{
          cy.get('textarea').type('Uncooked eggs')
        });
        cy.contains('Transport Requirements').parent('div').within(() =>{
          cy.get('textarea').type('Bring a box')
        });
        cy.scrollTo('bottom')
        cy.wait(300);
        cy.get('[id^=pick-up_by_input]').click({force:true})
        cy.contains('14').click();
        cy.contains('Start').parent('div').within(() =>{
          cy.get('div:first').click()
          cy.get('ul').contains('11:00').click()
        });
        cy.contains('End').parent('div').within(() =>{
          cy.get('div:first').click()
          cy.get('ul').contains('11:45').click()
        });
        cy.contains('Preview').click();
        cy.contains('Submit').click();
        cy.visit('/orders');
        
    });
  });

});