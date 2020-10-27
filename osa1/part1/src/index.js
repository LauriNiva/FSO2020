import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) =>{
  return(
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>


  )

}

const App = () => {
  const nimi = "Pekka"
  const ika = 20

  return(
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={10+16} />
      <Hello name={nimi} age={ika} />
      <Hello age="2" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))