import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = ({course}) => {

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

const Total = ({course}) => {
  let totalNumber = course.parts.reduce((accumulator, current) => {
    return accumulator + current.exercises;
  },0);

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


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))