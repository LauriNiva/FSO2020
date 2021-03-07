import React from 'react'

const Header = (props) => {
    return <h2>{props.course.name}</h2>
}

const Content = ({ course }) => {

    const content = course.parts.map(part => <Part key={part.id} part={part} />);

    return (
        <div>
            {content}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = ({ course }) => {
    let totalNumber = course.parts.reduce((accumulator, current) => {
        return accumulator + current.exercises;
    }, 0);

    return <p>Total number of exercises {totalNumber}</p>;
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

export default Course