import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// const Feedback = () => {
//   return <h2>Give Feedback Here</h2>
// }

// const Statistics = () => {
//   return <h2>Statistics</h2>

// }

const Button = ({ name, handleClick }) => {
  return <button onClick={handleClick} >{name}</button>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <h2>Give Feedback Here</h2>
      <Button name="Good =)" handleClick={increaseGood} />
      <Button name="Neutral =/" handleClick={increaseNeutral} />
      <Button name="Bad =(" handleClick={increaseBad} />
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)