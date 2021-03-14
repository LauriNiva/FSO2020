import React, { useState, useEffect } from 'react';
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numberService from "./services/numbers";
import Notification from './components/Notification';



const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [notificationMessage, setNotificationMessage] = useState(null);

    useEffect(() => {
        numberService
            .getAll()
            .then(initialNumbers => {
                setPersons(initialNumbers);
            });
    }, []);

    const deleteItem = (id) => {
        const name = persons.find(person => person.id === id).name;
        if (window.confirm(`Do you want to delete ${name}?`)) {
            numberService.deleteItem(id)
                .then(response => {
                    console.log(response);
                    showNotification(`Deleted ${name}`, 2000);
                    setPersons(persons.filter(person => person.id !== id));
                    setNewName("");
                    setNewNumber("");
                });

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
                showNotification(`Added ${newNumber.name}`, 2000);
            });

    };

    const showNotification = (message, time) => {
        setNotificationMessage(message);
        setTimeout(() => {
            setNotificationMessage(null);
        }, time);
    };

    const updateNumber = () => {
        const person = persons.find(person => person.name === newName);
        const updatedObject = { ...person, number: newNumber };
        numberService
            .updateNumber(person.id, updatedObject)
            .then(response => {
                setPersons(persons.map(person =>
                    person.id !== updatedObject.id ? person : response));
                showNotification(`Updated number for ${updatedObject.name}`, 2000);
            }
            )

    };

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
    );


    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notificationMessage} />
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