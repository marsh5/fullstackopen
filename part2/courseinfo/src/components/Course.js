import React from 'react';

const Course = ({ course }) => {
    return (
      <div>
        <Header key ={course.id} name = {course.name}/>
        {course.parts.map(el =>
          <Content key = {el.id} name = {el.name} exercises = {el.exercises} />
        )}
        <Total parts = {course.parts}/>
      </div>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Total = ({ parts }) => { 
    const sum = parts.reduce((acc, cur) => {
      return acc + cur.exercises;
    }, 0)
  
    return(
      <h4>Number of exercises {sum}</h4>
    ) 
  }
  
  const Content = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>    
    )
  }

export default Course