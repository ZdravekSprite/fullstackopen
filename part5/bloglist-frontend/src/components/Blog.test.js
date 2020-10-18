import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component

beforeEach(() => {
  const user = {
    username: 'root'
  }

  window.localStorage.setItem(
    'loggedNoteappUser', JSON.stringify(user)
  )

  const blog = {
    title: 'Type wars Robert C. Martin',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 15,
    user: 1
  }

  component = render(<Blog blog={blog} />)
})

test('renders content', () => {
  const div = component.container.querySelector('.blog_view')
  expect(div).toHaveTextContent('Type wars Robert C. Martin')
  expect(div).toHaveTextContent('Robert C. Martin')
  expect(div).not.toHaveTextContent('http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html')
  expect(div).not.toHaveTextContent('15')
})

test('after clicking the button', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blog_hide')
  expect(div).not.toHaveStyle('display: none')
})

test('like button is clicked twice', () => {
  const mockHandler = jest.fn()

  const component = render(
    <button onClick={mockHandler}>like</button>
  )

  const likeButton = component.getAllByText('like')[1]

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})