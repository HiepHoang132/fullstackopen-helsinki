import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import personService from "./services/persons.js"

import Persons from "./components/Persons.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [filteredName, setFilteredName] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [style, setStyle] = useState({})

    const notificationStyles = {
        success: {
            color: "forestgreen",
            border: "solid forestgreen 4px"
        },
        error: {
            color: "red",
            border: "solid red 4px"
        }
    }

    useEffect(() => {
        personService
            .getAll()
            .then(persons => setPersons(persons))
    }, []);

    const isAdded = (persons, newName) => (
        persons.some(person => person.name.toLowerCase().trim() === newName.toLowerCase().trim())
    )

    const resetForm = () => {
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        const name = (event.target.value).toLowerCase()

        setShowAll(name === '')
        setFilteredName(name)
    }

    const showNotification = (message, type = 'success') =>{
        setStyle(notificationStyles[type])
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 4000)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const personExists = isAdded(persons, newName)

        if(personExists){
            const confirmed = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
            if(!confirmed) return

            const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
            const updatedPerson = {
                ...existingPerson,
                number: newNumber
            }

            personService
                .update(updatedPerson.id, updatedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(p => p.id === updatedPerson.id ? returnedPerson : p))
                    showNotification(`Changed ${newName}'s number`)
                })
                .catch(() => {
                    showNotification(`Information of ${updatedPerson.name} has already been removed from server`, "error")
                    setPersons(persons.filter(p => p.id !== updatedPerson.id))
                })

            resetForm()
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        personService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                showNotification(`Added ${newName}`)
                resetForm()
            }).catch(error => {
                showNotification(error.response.data.error, "error")
        })
    }

    const handleDelete = (id, name) => {
        if(!confirm(`Delete ${name} ?`)) return

        personService
            .remove(id)
            .then(() => {
                setPersons(persons.filter(p => p.id !== id))
                showNotification(`Deleted ${name}`)
            })
            .catch(error => {
                console.log("Failed to delete:", error)
                showNotification(`Could not delete ${name}. It may already have been removed.`, "error")
                setPersons(persons.filter(p => p.id !== id))
            })
    }

    const personsToShow = showAll
        ? persons
        : persons.filter(p => p.name.toLowerCase().includes(filteredName.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} style={style}/>
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
            <Persons persons={personsToShow} handleDelete={handleDelete}/>
        </div>
    )
}

export default App