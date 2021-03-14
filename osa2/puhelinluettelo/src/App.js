import React, { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numberService from "./services/numbers";


const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState("");
    const [nameFilter, setNameFilter] = useState("");

    useEffect(() => {
        numberService
            .getAll()
            .then(initialNumbers => {
                setPersons(initialNumbers);
            });
    }, []);

    const deleteItem = (id) => {
        if (window.confirm(`Do you want to delete ${persons.find(person => person.id === id).name}?`)) {
            numberService.deleteItem(id);
            setPersons(persons.filter(person => person.id !== id));
        };
    };


    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleFilterChange = (e) => {
        setNameFilter(e.target.value);
    };

    const addName = (e) => {
        e.preventDefault();

        if (persons.find(person => person.name === newName)) {
            if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
                updateNumber();
                return;
            } else {
                setNewName("");
                setNewNumber("");
                return;
            }
        };

        const newObject = {
            name: newName,
            number: newNumber
        };

        numberService
            .create(newObject)
            .then(newNumber => {
                setPersons(persons.concat(newNumber));
                setNewName("");
                setNewNumber("");
            });

    };

    const updateNumber = () => {
        const person = persons.find(person => person.name === newName);
        const updatedObject = { ...person, number: newNumber };
        numberService
        .updateNumber(person.id, updatedObject)
        .then(response =>{
            setPersons(persons.map(person => person.id !== updatedObject.id ? person : response))
        })

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

            <Persons persons={personsToShow} deleteItem={deleteItem} />
        </div>
    )

}

export default App