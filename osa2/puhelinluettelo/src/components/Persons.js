import React from 'react';


const Persons = ({ persons, deleteItem }) => {
    return <ul>
        {persons.map(person =>
            <li className="person" key={person.name}>
                {person.name} {person.number}
                <button className="deletebutton" onClick={() => deleteItem(person.id)}>-</button>
            </li>)}
    </ul>
};

export default Persons;