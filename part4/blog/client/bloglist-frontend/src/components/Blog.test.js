import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog.js', ()=> {
    let component;
    const blog ={
        title: 'Cherries Are Good',
        author: 'Bob Vance',
        url: 'cherries.com',
        likes: 5
    }

    beforeEach(() => {
        // const mockHandler = jest.fn()
        component = render(
            <Blog blog={blog}  />
        )
    })

    test('blog renders title and author but not url or likes', () => {
        expect(
            component.container).toHaveTextContent('Cherries Are Good')

        expect(
            component.container).toHaveTextContent('Bob Vance')

        expect
            (component.container).not.toHaveTextContent('cherries.com')
    })

    test('clicking the button shows url', () => {
        
          const button = component.getByText('view')
          fireEvent.click(button)
        
          expect(component.container).toHaveTextContent('cherries.com')
    })

    // test('if like button is clicked twice, event handler is called twice', () => {
    //     const button = component.getByText('view')
    //     fireEvent.click(button)

    //     const likeButton = component.getByText('like')
    //     fireEvent.click(likeButton);
    //     fireEvent.click(likeButton);

    // })
    

})