import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ filter, handleFilter }) => {

  return(
    <div>
      filter shown with<input value={filter} onChange = {handleFilter}/>
    </div>
  )
}

const PersonForm = ({ addRecord, newName, newNumber, handleNameChange, handleNumberChange }) => {

  return(
    <form onSubmit={addRecord}>
    <div>
      name: <input value={newName} onChange ={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange ={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({ persons, filter}) =>{
  return(
    persons.map(el => {
    let x = el.name.toLowerCase()
    if(x.includes(filter.toLowerCase())){
     return(
       <div key={el.id}>{el.name} {el.number}</div>
       )} else{
         return null
       }
      
      }))
}

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter] = useState('');

  useEffect(()=> {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response.data);
      setPersons(response.data);
    })
  },[]);

  const addRecord = (event) => {
    event.preventDefault();
    if(persons.filter((cur)=> cur.name.toLowerCase() === newName.toLowerCase()).length !== 0){
      alert(`${newName} is already added to the phonebook`);
      setNewName('');
      return
    }
    
    const newObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newObj));
    setNewNumber('');
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (ev) => {
    setNewNumber(ev.target.value);
  }

  const handleFilter =(ev) => {
    setFilter(ev.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilter = {handleFilter} />
        
      <h2>Add a new</h2>

      <PersonForm 
      addRecord = {addRecord} 
      newName = {newName} 
      newNumber = {newNumber}
      handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange}/>
    
      <h2>Numbers</h2>
       <div>
       <Persons persons = {persons} filter = {filter}/>
       </div>
    </div>
  )
}

export default App
