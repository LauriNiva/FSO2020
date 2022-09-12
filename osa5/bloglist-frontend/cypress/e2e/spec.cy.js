describe('Blogg app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users',
      {
        name: 'Lauri Niva',
        username: 'niva',
        password: 'salasana'
      });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Log in');
    cy.get('button').contains('login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('niva');
      cy.get('input[name="Password"]').type('salasana');
      cy.get('button').contains('login').click();
      
      cy.contains('Lauri Niva logged in');
      
    });
    
    it('fails with wrong credentials', function(){
      cy.get('input[name="Username"]').type('niva');
      cy.get('input[name="Password"]').type('väärä');
      cy.get('button').contains('login').click();

      cy.get('.notification-error')
        .should('contain', 'Error: wrong username or password!')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

});