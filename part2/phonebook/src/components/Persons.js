import React from 'react';

const Persons = ({ persons, filter, handleDelete}) =>{
    return(
      persons.map(el => {
      let x = el.name.toLowerCase()
      if(x.includes(filter.toLowerCase())){
       return(
         <div key={el.id}>{el.name} {el.number} <button onClick = {handleDelete} value={el.id}>delete</button></div>
         )} else{
           return null
         }
      }))
  }

  export default Persons;