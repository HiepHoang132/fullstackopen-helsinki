import {createSelector, createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js"

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        vote(state, action) {
            const id = action.payload
            return state.map(a => a.id !== id ? a : {...a, votes: a.votes + 1})
        },
        add(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const sortAnecdote = createSelector(
    state => state.anecdote,
    anecdotes => [...anecdotes].sort((a, b) => b.votes - a.votes)
)

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create({
            content: content,
            votes: 0
        })
        dispatch(add(newAnecdote))
    }
}

export const {vote, add, setAnecdotes} = anecdoteSlice.actions

export default anecdoteSlice.reducer