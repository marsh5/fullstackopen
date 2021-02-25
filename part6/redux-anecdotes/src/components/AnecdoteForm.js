import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

function AnecdoteForm() {
    const dispatch = useDispatch()

    const addAnecdote = async (ev) => {
        ev.preventDefault();
        const content = ev.target.anecdote.value;
        ev.target.anecdote.value = '';
        let response = await anecdoteService.createNew(content);
        dispatch(createAnecdote(response))
        dispatch(showNotification(`Created Anecodote! ${content}`))
        setTimeout(()=> {
          dispatch(showNotification(''))
        }, 4000)
      }

    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
            <div><input name="anecdote"/></div>
            <button type="submit">create</button>
        </form> 
    </>
    )
}

export default AnecdoteForm
