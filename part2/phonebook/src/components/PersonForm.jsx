const PersonForm = (props) => {
    const addPerson = props.addPerson
    const handleNameChange = props.handleNameChange
    const handleNumberChange = props.handleNumberChange
    const newName = props.newName
    console.log("new name ",newName)
    const newNumber = props.newNumber
    console.log("new number",newNumber)
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    ); 
}

export default PersonForm;
