import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';


describe('<Blog />', () => {


  beforeEach(() => {
    const testUser = { name: 'Testname' };
    const testBlog = { title: 'Test Blog', author: 'Test Author', url: 'testurl.com', likes: 3, user: testUser };

    render(<Blog blog={testBlog} user={testUser} />);

  });




  test('Blog renders title and author, but not url and likes', async () => {
    screen.getByText('Test Blog');
    screen.getByText('Test Author');

    const url = screen.queryByText('testurl.com');
    expect(url).toBeNull();
    const likesContainer = screen.queryByText('Likes: ', { exact: false });
    expect(likesContainer).toBeNull();

  });

  test('Blog renders url and likes after the View-button is pressed', async () => {

    const user = userEvent.setup();

    const button = screen.getByText('View');

    await user.click(button);
    screen.debug();
    screen.getByText('testurl.com');
    const likes = screen.queryByText('Likes: ', { exact: false });
    expect(likes).not.toBeNull();
  });

});