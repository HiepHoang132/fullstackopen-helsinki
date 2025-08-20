import {useDispatch, useSelector} from "react-redux";
import {sortAnecdote, vote} from "../reducers/anecdoteReducer.js";
import {notifyWithTimeout} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const sorted = useSelector(sortAnecdote)
    const filter = useSelector(state => state.filter)

    const anecdotes = filter === ''
        ? sorted
        : sorted.filter(a => a.content.includes(filter))

    const dispatch = useDispatch()

    const voteAnecdote = (id, content) => {
        dispatch(vote(id))
        dispatch(notifyWithTimeout(`you voted '${content}'`, 5))
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