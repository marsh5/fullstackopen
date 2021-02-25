

const anecdoteReducer = (state = [], action) => {

  switch(action.type){
    case 'VOTE': {
      const id = action.data.id;    
      const anecdoteToChange = state.find(el => el.id === id);
      const votes = anecdoteToChange.votes + 1;
      const changedAnecdote = {
        ...anecdoteToChange, votes
      }
      const stateCopy = state.map(el => el.id !== id ? el : changedAnecdote)
      return stateCopy.sort((a,b) => b.votes - a.votes)
    }
    case 'INIT_ANECDOTES': {
      return action.data.sort((a,b) => b.votes - a.votes)
    }
    case 'NEW_ANECDOTE': {
      return [...state, action.data]
    }
    default:
      return state
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const voteForAnecdote = id => {
  return{
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = anecdote => {
  return{
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export default anecdoteReducer