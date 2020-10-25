import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = (props) => (
    <button onClick = {props.handleClick}>
      {props.text}
    </button>
  )


const Anecdote = ({ selected, anecdotes }) => (
  <>
  {anecdotes[selected]}
  </>
)

const Votes =({ points, selected }) => {
  
  if(points[selected] === undefined){
    return (
      <>
      <br></br>
      has 0 votes
      <br></br>
      </>
    )
  } else{
    return(
      <>
      <br></br>
      has {points[selected]} votes
      <br></br>
      </>
    )
  }
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});
  

  const handleGoodClick = (num) => () => {
    let randomNum = Math.floor(Math.random()*num)
    setSelected(randomNum);
  }

  const handleVote = () => {
    let obj = {...points};
    if(points[selected] === undefined){
      obj[selected] = 1;
    } else{
      obj[selected] += 1;
    }
    setPoints(obj);
  }

  const maxNum = () => {
    const mostVotes = {
      max: 0,
      selected: 0
    }
    for(let i = 0; i < len; i++ ){
      if(points[i] === undefined){
        continue
      } else if(points[i] >= mostVotes.max){
        mostVotes.max = points[i];
        mostVotes.selected = i;
      } else{
        continue
      }
    }
      return mostVotes;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote selected = {selected} anecdotes = {anecdotes} />
      <Votes points = {points} selected = {selected}/>
      <Button text = "vote" handleClick ={handleVote}/>
      <Button text = "next anecdote" handleClick ={handleGoodClick(len)}/>
      <h2>Anecdote with the most votes</h2>
      <Anecdote selected = {maxNum().selected} anecdotes = {anecdotes} />
      <Votes points = {points} selected = {maxNum().selected}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];


const len = anecdotes.length

ReactDOM.render(
  <App anecdotes={anecdotes} />, document.getElementById('root')
);


