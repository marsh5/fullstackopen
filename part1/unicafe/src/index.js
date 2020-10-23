import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick ={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({ text, value}) => (
 <tr>
   <td>{text} </td>
   <td>{value}</td>
 </tr>
)

const Statistics = ({ total, neutral, good, bad}) => {
    if (total === 0){
      return (
        <>
        <h2>statistics</h2>
        </>
      )
    }
    const average = () => total === 0 ? 0 : (good - bad) / total;
    const positive = `${(good / total) * 100} %`;
  
  return(
  <>
  <h2>statistics</h2>
  <table>
    <tbody>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={total}/>
      <Statistic text="average" value={average()}/>
      <Statistic text="positive" value={positive}/>
    </tbody>
  </table>
  </>

  )
}

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

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text = "good"/>
      <Button handleClick={handleNeutralClick} text = "neutral"/>
      <Button handleClick={handleBadClick} text = "bad"/>
      <Statistics total ={total} neutral = {neutral} good = {good} bad = {bad}/>

        
        
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
