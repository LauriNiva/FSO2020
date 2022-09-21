describe('Blogg app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users',
      {
        name: 'Lauri Niva',
        username: 'niva',
        password: 'salasana'
      });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in');
    cy.get('button').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type('niva');
      cy.get('input[name="Password"]').type('salasana');
      cy.get('button').contains('login').click();

      cy.contains('Lauri Niva logged in');

    });

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('niva');
      cy.get('input[name="Password"]').type('väärä');
      cy.get('button').contains('login').click();

      cy.get('.notification-error')
        .should('contain', 'Error: wrong username or password!')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.loginAUser();
    });

    it('A blog can be created', function () {
      cy.contains('Create').click();
      cy.get('input[name="title"]').type('Test Blog');
      cy.get('input[name="author"]').type('Tester Doe');
      cy.get('input[name="url"]').type('testblog.com');
      cy.get('button[type="submit"]').contains('Create').click();

      cy.get('div[class="blog"]').contains('Test Blog');
      cy.get('div[class="blog"]').contains('Tester Doe');

    });

    it('A blog can be liked', function () {
      cy.createBlog({ title: 'Test Blog', author: 'Tester Doe', url: 'testblog.com' });

      cy.contains('View').click();
      cy.contains('Like').click();
      cy.contains('Likes: 1');

    });

    it('Own blog can be deleted', function() {
      cy.createBlog({ title: 'Test Blog', author: 'Tester Doe', url: 'testblog.com' });

      cy.contains('View').click();
      cy.contains('Remove').click();

      cy.get('.notification-message')
        .should('contain', 'Blog Test Blog deleted!');

    });

    it('Not own blog cant be deleted', function() {
      cy.request('POST', 'http://localhost:3001/api/users',
        {
          name: 'John Doe',
          username: 'john',
          password: 'salasana2'
        });
      cy.createBlog({ title: 'Test Blog', author: 'Tester Doe', url: 'testblog.com' });
      cy.contains('logout').click();

      cy.get('input[name="Username"]').type('john');
      cy.get('input[name="Password"]').type('salasana2');
      cy.get('button').contains('login').click();

      cy.contains('View').click();
      cy.get('button').contains('Remove').should('not.exist');

    });
  });

  it.only('Blogs sort correctly with likes', function() {
    cy.loginAUser();

    cy.createBlog({ title: 'Test Blog with second most likes', author: 'Tester Doe', url: 'testblog.com' });
    cy.createBlog({ title: 'Test Blog with most likes', author: 'Tester Doe', url: 'testblog.com' });
    cy.createBlog({ title: 'Test Blog 3', author: 'Tester Doe', url: 'testblog.com' });

    cy.get('.blog').contains('Test Blog with most likes').parent().contains('View').click()
      .parent().contains('Like').click();
    cy.get('.blog').contains('Test Blog with second most likes').parent().contains('View').click()
      .parent().contains('Like').click();
    cy.get('.blog').contains('Test Blog with most likes').parent().contains('Like').click();

    cy.get('.blog').eq(0).should('contain', 'Test Blog with most likes');
    cy.get('.blog').eq(1).should('contain', 'Test Blog with second most likes');


  });

});