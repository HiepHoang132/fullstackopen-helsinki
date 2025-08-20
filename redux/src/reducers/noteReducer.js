import {createSelector, createSlice, current} from "@reduxjs/toolkit";

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({
                content: content,
                important: false,
                id: generateId()
            })
        },
        toggleImportanceOf(state, action) {
            console.log(current(state))
            const id = action.payload
            const noteToChange = state.find(note => note.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(note => note.id !== id ? note : changedNote)
        }
    }
})

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const selectImportantNotes = createSelector(
    state => state.note,
    notes => notes.filter(n => n.important)
)

export const {createNote, toggleImportanceOf} = noteSlice.actions
export default noteSlice.reducer