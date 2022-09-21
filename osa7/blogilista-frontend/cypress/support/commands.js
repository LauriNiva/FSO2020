Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request(
    {
      method: 'POST',
      url: 'http://localhost:3001/api/blogs',
      body: { title, author, url },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
      }
    }
  );
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('loginAUser', () => {
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