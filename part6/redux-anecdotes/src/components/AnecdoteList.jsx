import {useDispatch, useSelector} from "react-redux";
import {sortAnecdote, voteAnecdote} from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(sortAnecdote)
    const filter = useSelector(state => state.filter)

    const visibleAnecdotes = filter === ''
        ? anecdotes
        : anecdotes.filter(a => a.content.includes(filter))

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <>
            {visibleAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList