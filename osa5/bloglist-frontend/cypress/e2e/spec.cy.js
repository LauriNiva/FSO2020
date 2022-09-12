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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login',
        {
          username: 'niva',
          password: 'salasana'
        }
      ).then(({ body }) => {
        window.localStorage.setItem('loggedUser', JSON.stringify(body));
        cy.visit('http://localhost:3000');
      });
    });

    it('A blog can be created', function() {
      cy.contains('Create').click();
      cy.get('input[name="title"]').type('Test Blog');
      cy.get('input[name="author"]').type('Tester Doe');
      cy.get('input[name="url"]').type('testblog.com');
      cy.get('button[type="submit"]').contains('Create').click();

      cy.get('div[class="blog"]').contains('Test Blog');
      cy.get('div[class="blog"]').contains('Tester Doe');



    });
  });

});