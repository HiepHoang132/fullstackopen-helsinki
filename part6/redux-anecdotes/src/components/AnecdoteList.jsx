import {useDispatch, useSelector} from "react-redux";
import {initializeAnecdotes, sortAnecdote, vote} from "../reducers/anecdoteReducer.js";
import {setNotification} from "../reducers/notificationReducer.js";
import {useEffect} from "react";

const AnecdoteList = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAnecdotes())
    },)

    const sorted = useSelector(sortAnecdote)
    const filter = useSelector(state => state.filter)

    const anecdotes = filter === ''
        ? sorted
        : sorted.filter(a => a.content.includes(filter))

    const voteAnecdote = (id, content) => {
        dispatch(vote(id))
        dispatch(setNotification(`you voted '${content}'`, 5))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList