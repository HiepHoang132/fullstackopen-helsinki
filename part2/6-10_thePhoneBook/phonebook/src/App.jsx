import { useState } from 'react'
import Filter from "./components/Filter.jsx";

import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [filteredName, setFilteredName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()

        if(isAdded(persons, newName)){
            alert(`${newName} is already added to phonebook`)
            setNewName('')
            setNewNumber('')
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
    }

    const isAdded = (persons, newName) => (
        persons.some(person => person.name.toLowerCase().trim() === newName.toLowerCase().trim())
    )

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        const name = (event.target.value).toLowerCase()

        if(name === ''){
            setShowAll(true)
            return
        }

        setShowAll(false)
        setFilteredName(name)
    }

    const personsToShow = showAll
        ? persons
        : persons.filter(p => p.name.toLowerCase().includes(filteredName.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter onChange={handleFilter}/>

            <h3>Add a new</h3>
            <PersonForm
                onSubmit={addPerson}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handlePhoneChange={handlePhoneChange}
            />

            <h3>Numbers</h3>
            <Persons persons={personsToShow}/>
        </div>
    )
}

export default App