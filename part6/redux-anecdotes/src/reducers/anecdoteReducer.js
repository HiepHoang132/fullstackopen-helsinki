import {createSelector, createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js"

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        setAnecdotes(state, action) {
            return action.payload
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        updateAnecdote(state, action) {
            const updatedAnecdote = action.payload
            return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
        }
    }
})

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create({
            content: content,
            votes: 0
        })
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const vote = (id) => {
    return async (dispatch, getState) => {
        const anecdote = await getState().anecdote.find(a => a.id === id)
        const votedAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        const changedAnecdote = await anecdoteService.vote(id, votedAnecdote)
        dispatch(updateAnecdote(changedAnecdote))
    }
}

export const sortAnecdote = createSelector(
    state => state.anecdote,
    anecdotes => [...anecdotes].sort((a, b) => b.votes - a.votes)
)

export const {setAnecdotes, appendAnecdote, updateAnecdote} = anecdoteSlice.actions

export default anecdoteSlice.reducer