import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

function AnecdoteList() {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if(anecdotes.length === 0) return anecdotes
        const results = anecdotes.filter(el => el.content.toLowerCase().includes(filter.toLowerCase()))
        return results
    })
    const dispatch = useDispatch()
  
    const vote = async (anecdote) => {
      let res = await anecdoteService.updateVote(anecdote)
      dispatch(voteForAnecdote(res.id))
      dispatch(showNotification(`You voted for ${anecdote.content}`))
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
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )}
    </>
    )
}

export default AnecdoteList
