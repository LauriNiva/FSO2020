import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from './NewBlogForm';

test('New blog is created', async () => {
  // luo fn() handleNewBlog
  const handleNewBlog = jest.fn();
  // renderöi NewBlogForm
  const { container } = render(<NewBlogForm handleNewBlog={handleNewBlog} />);
  // etsi kentät
  const titleField = container.querySelector('input[name="title"]');
  //author
  const authorField = container.querySelector('input[name="author"]');
  //url
  const urlField = container.querySelector('input[name="url"]');
  // lisää data kenttiin
  const user = userEvent.setup();

  await user.type(titleField, 'Test Title');
  await user.type(authorField, 'Test Author');
  await user.type(urlField, 'testurl.com');

  // etsi nappi

  const button = screen.getByText('Create');

  // paina nappia
  await user.click(button);

  // lue handleNewBlog saama olio

  expect(handleNewBlog.mock.calls).toHaveLength(1);

  expect(handleNewBlog.mock.calls[0][0].title).toBe('Test Title');
  expect(handleNewBlog.mock.calls[0][0].author).toBe('Test Author');
  expect(handleNewBlog.mock.calls[0][0].url).toBe('testurl.com');
});
