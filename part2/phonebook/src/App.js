import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Notification from './components/Notifcation';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null);

  useEffect(()=> {
      personService.getPersons()
      .then(data => {
        setPersons(data);
      })
      
  },[]);

  const addRecord = (event) => {
    event.preventDefault();
    const person = persons.filter((cur)=> cur.name.toLowerCase() === newName.toLowerCase());
    if(person.length !== 0){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const id = person[0].id;
        const changedPerson = { ...person[0], number: newNumber}
        console.log(id);
        personService.update(id, changedPerson)
        .then(data => {
          setPersons(persons.map(el => el.id === id ? data : el))
          setErrorMessage(`${changedPerson.name}'s number has changed`);
          setTimeout(()=> {
            setErrorMessage(null)
        }, 5000)
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setErrorMessage(`Information of ${changedPerson.name} has already been removed from the server`);
          setTimeout(()=> {
            setErrorMessage(null)
            }, 5000)
        })
          return
        }else{
          return
        }
      }
      const newObj = {
        name: newName,
        number: newNumber
      }
        personService.create(newObj)
          .then(data=> {
            setPersons(persons.concat(data));
            setNewNumber('');
            setNewName('');
            setErrorMessage(`${data.name} has been added`);
          setTimeout(()=> {
            setErrorMessage(null)
        }, 5000)
        })
    }

    const handleDelete = (event) => {
      const id = parseInt(event.target.value);
      const curPer = persons.find(cur => cur.id === id);

      if(window.confirm(`Delete ${curPer.name}?`)){
        personService.deletePerson(id, curPer)
      .then(setPersons(persons.filter(cur => cur.id !== id)))
      .catch(error => {
        setErrorMessage(
          `Information of ${curPer.name} has already been removed from the server`
        )
        setTimeout(()=> {
          setErrorMessage(null)
      }, 5000)
      
    }
    )}
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

      <Notification message={errorMessage} />
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
       <Persons persons = {persons} filter = {filter} handleDelete = {handleDelete}/>
       </div>
    </div>
  )
}

export default App
