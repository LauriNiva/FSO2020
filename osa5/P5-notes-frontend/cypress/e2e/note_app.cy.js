describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021');
  });

  it('user can log in', function() {
    cy.contains('Log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();

    cy.contains('Matti Luukkainen logged in');
  });

  describe('when logged in', function() {

    beforeEach(function() {
      cy.contains('Log in').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
    });

    it('a new note can be created', function() {
      cy.contains('New note').click();
      cy.get('input').type('a note created by cypress');
      cy.contains('Save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function() {
      beforeEach(function () {
        cy.contains('New note').click();
        cy.get('input').type('another note cypress');
        cy.contains('Save').click();
      });

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click();

        cy.contains('another note cypress')
          .contains('make not important');
      });
    });

  });
});