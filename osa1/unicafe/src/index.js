import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// const Feedback = () => {
//   return <h2>Give Feedback Here</h2>
// }

const Statistics = ({ good, neutral, bad }) => {


  const total = good + neutral + bad;
  const avg = ((good * 1 + (bad * -1)) / total).toFixed(2);
  const positive = (good / total * 100).toFixed(2) + "%";

  if (total === 0) return (
    <div>
      <h2>Statistics</h2>
      <p>No feedback given yet</p>
    </div>

  )

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={avg} />
          <StatisticLine text="Positive" value={positive} />
        </tbody>
      </table>
    </div>

  );

}

const StatisticLine = ({ text, value }) => {
  return <tr><td>{text}</td><td>{value}</td></tr>
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)