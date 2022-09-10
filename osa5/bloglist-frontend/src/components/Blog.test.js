import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';


describe('<Blog />', () => {

  const testBlog = { title: 'Test Blog', author: 'Test Author', url: 'testurl.com' };

  render(<Blog blog={testBlog} />);

  test('Blog renders title and author, but not url and likes', async () => {
    screen.getByText('Test Blog');
    screen.getByText('Test Author');

    const url = screen.queryByText('testurl.com');
    expect(url).toBeNull();
    const likesContainer = screen.queryByText('Likes: ', { exact: false });
    expect(likesContainer).toBeNull();

  });
});