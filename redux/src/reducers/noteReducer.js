import {createSelector, createSlice} from "@reduxjs/toolkit";
import noteService from "../services/notes.js"

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        setNotes(state, action) {
            return action.payload
        },
        createNote(state, action) {
            state.push(action.payload)
        },
        updateNote(state, action) {
            const updatedNote = action.payload
            return state.map(note => note.id !== updatedNote.id ? note : updatedNote)
        }
    }
})

export const selectImportantNotes = createSelector(
    state => state.note,
    notes => notes.filter(n => n.important)
)

export const toggleNoteImportance = (id) => {
    return async (dispatch, getState) => {
        const note = getState().note.find(note => note.id === id)
        const changedNote = {...note, important: !note.important}
        await noteService.toggleImportance(id, changedNote)
        dispatch(updateNote(changedNote))
    }
}

export const {setNotes, createNote, updateNote} = noteSlice.actions
export default noteSlice.reducer