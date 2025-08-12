import {useDispatch, useSelector} from "react-redux";
import {sortAnecdote, voteAnecdote} from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
    const anecdotes = useSelector(sortAnecdote)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList