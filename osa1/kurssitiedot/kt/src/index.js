import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {

  const content = props.course.parts.map(e => <Part part={e} />);
  console.log(content);
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

const Total = (props) => {
  let totalNumber = 0;
  props.course.parts.forEach(element => {
    totalNumber += element.exercises
  });

  return <p>Number of exercises {totalNumber}</p>;
}



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))