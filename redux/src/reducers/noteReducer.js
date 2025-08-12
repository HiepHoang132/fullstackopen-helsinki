import {createSelector} from "@reduxjs/toolkit";

const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            // return state.concat(action.payload)
            return [...state, action.payload]
        case 'TOGGLE_IMPORTANCE': {
            const id = action.payload.id
            const noteToChange = state.find(note => note.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => note.id !== id ? note : changedNote)
        }
        default:
            return state
    }
}

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: {id}
    }
}

const selectNotes = state => state.note

export const selectImportantNotes = createSelector(
    [selectNotes],
    notes => notes.filter(n => n.important)
)


export default noteReducer;