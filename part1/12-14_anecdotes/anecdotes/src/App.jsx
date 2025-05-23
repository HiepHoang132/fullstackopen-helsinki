import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({anecdote, votes}) => (
    <>
        {anecdote}
        <div>
            has {votes} {votes <= 1 ? "vote" : "votes"}
        </div>
    </>
)

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
    const [maxIndex, setMaxIndex] = useState(0)

    const generateRandom = () => {
        const random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)
    }

    const voteAnecdotes = () => {
        const copy = [...votes]
        copy[selected]+=1
        setVotes(copy)
        getMostVotes(copy)
    }

    const getMostVotes = (copy) => {
        const indexOfMax = copy.reduce((maxI, currVal, currI) => (
            currVal > copy[maxI] ? currI : maxI
        ), 0)

        setMaxIndex(indexOfMax)
    }

    return (
        <>
            <Display text={"Anecdote of the day"}/>
            <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>

            <div>
                <Button onClick={voteAnecdotes} text={"vote"}/>
                <Button onClick={generateRandom} text={"next anecdote"}/>
            </div>

            <Display text={"Anecdote with the most votes"}/>
            <Anecdote anecdote={anecdotes[maxIndex]} votes={votes[maxIndex]}/>
        </>
    )
}

export default App