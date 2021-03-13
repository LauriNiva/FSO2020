import React from 'react';


const Persons = ({ persons, deleteItem }) => {
    return <ul>
        {persons.map(person =>
            <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deleteItem(person.id)}>-</button>
            </li>)}
    </ul>
};

export default Persons;