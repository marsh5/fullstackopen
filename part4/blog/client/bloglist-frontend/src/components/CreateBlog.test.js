import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import CreateBlog from './CreateBlog';

describe('CreateBlog', () =>{

    test('<CreateBlog /> calls the event handler it received as props with the right details when a new blog is created ', () => {
        const createNew = jest.fn();
        const component = render(
            <CreateBlog createNew={createNew} />
        )

        const title = component.container.querySelector('#title');
        const author = component.container.querySelector('#author');
        const url = component.container.querySelector('#url');
        const form = component.container.querySelector('form');

        fireEvent.change(title, {
            target: { value: 'Truck Reviews' } 
        })
        fireEvent.change(author, {
            target: { value: 'James Smith' } 
        })
        fireEvent.change(url, {
            target: { value: 'jsmith.com' } 
        })
        fireEvent.submit(form);

        expect(createNew.mock.calls).toHaveLength(1);
        expect(createNew.mock.calls[0][1]).toBe('James Smith')
    })


})