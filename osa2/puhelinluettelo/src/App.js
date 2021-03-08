import React, { useState } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState("");
    const [nameFilter, setNameFilter] = useState("");


    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    const handleFilterChange = (e) => {
        setNameFilter(e.target.value);
    }

    const addName = (e) => {
        e.preventDefault();

        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already in the phonebook`);
            setNewName("");
            setNewNumber("");
            return;
        }

        const newObject = {
            name: newName,
            number: newNumber
        };
        setPersons(persons.concat(newObject));

        setNewName("");
        setNewNumber("");
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
    );


    return (
        <div>
            <h1>Phonebook</h1>
            <Filter value={nameFilter} onChangeHandler={handleFilterChange} />

            <h2>Add a new</h2>

            <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
             newNumber={newNumber} handleNumberChange={handleNumberChange} />

            <h2>Numbers</h2>

            <Persons persons={personsToShow} />
        </div>
    )

}

export default App