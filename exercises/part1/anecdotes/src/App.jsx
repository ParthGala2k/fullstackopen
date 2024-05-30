import { useState } from 'react'

const Header = ({ headerName }) => <h2>{headerName}</h2>

const Anecdote = ({ text, numVotes }) => <p>{text}<br />::has {numVotes} votes</p>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const MaxVotes = ({ anecdotes, votes }) => {
  const highestVotes = Math.max(...votes)
  const winner = anecdotes[votes.findIndex((vote) => vote === highestVotes)]

  if (highestVotes === 0) {
    return (
      <p>No votes yet</p>
    )
  }
  return (
    <p>{winner}<br />::has {highestVotes} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const handleVotes = () => {
    const vote_copy = [...votes]
    vote_copy[selected] += 1
    setVotes(vote_copy)
  }

  return (
    <div>
      <Header headerName="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} numVotes={votes[selected]} />
      <Button onClick={handleVotes} text="Vote" />
      <Button onClick={() => {setSelected(randomInt(anecdotes.length))}} text="Next Anecdote" />
      <Header headerName="Anecdote with most votes" />
      <MaxVotes anecdotes={anecdotes} votes={votes} />

      {/* An implementation using reduce method to determine max votes */}
      {/* <p>{anecdotes[votes.reduce((acc, current, currentIndex) => (current > acc.largest ? { largest: current, largestIndex: currentIndex } : acc),
        {largest: votes[0], largestIndex: 0}).largestIndex]}<br />::has {Math.max(...votes)} votes</p> */}
    </div>
  )
}

export default App