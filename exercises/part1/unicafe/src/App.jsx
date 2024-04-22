import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const positive = (good / (good + neutral + bad)) * 100 + '%'

  if (good + bad + neutral === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={good + neutral + bad} />
          <StatisticLine text='Average' value={(good + bad * -1) / (good + neutral + bad)} />
          <StatisticLine text='Positive' value={positive} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ text, onClick}) => <button onClick={onClick}>{text}</button>

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
    
      <Statistics good={good} neutral={neutral} bad={bad} />
    
    </>
  )
}

export default App
