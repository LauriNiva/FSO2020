Cypress.Commands.add('createBlog', () => {
  cy.request(
    {
      method: 'POST',
      url: 'http://localhost:3001/api/blogs',
      body :{ title: 'Test Blog', author: 'Tester Doe', url: 'testblog.com' },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
      }
    }
  );
  cy.visit('http://localhost:3000');
});