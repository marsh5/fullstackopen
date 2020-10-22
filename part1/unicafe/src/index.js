import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick ={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  }

  const average = () => total === 0 ? 0 : (good - bad) / total
  
  const positive = () => {
    if (total === 0){
      return '0 %'
    }
    const percentage = good / total;
    return `${percentage * 100} %`
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text = "good"/>
      <Button handleClick={handleNeutralClick} text = "neutral"/>
      <Button handleClick={handleBadClick} text = "bad"/>
      <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average()}</p>
        <p>positive {positive()}</p>
        
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
