import React from 'react';

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

  export default PersonForm;
  