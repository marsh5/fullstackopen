import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

function AnecdoteList() {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        const results = anecdotes.filter(el => el.content.toLowerCase().includes(filter.toLowerCase()))
        return results
    })
    const dispatch = useDispatch()
  
    const vote = (id, content) => {
      dispatch(voteForAnecdote(id))
      dispatch(showNotification(`You voted for ${content}`))
      setTimeout(()=> {
          dispatch(showNotification(''))
      }, 4000)
    }


    return (
    <>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
        </div>
    )}
    </>
    )
}

export default AnecdoteList
