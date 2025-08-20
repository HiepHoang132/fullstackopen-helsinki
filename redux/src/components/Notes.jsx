import {useDispatch, useSelector} from "react-redux";
import {toggleNoteImportance} from "../reducers/noteReducer.js";

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({filter, note}) => {
        if (filter === 'ALL') {
            return note
        }
        return filter === 'IMPORTANT'
            ? note.filter(n => n.important)
            : note.filter(n => !n.important)
    })

    const toggleImportance = (id) => {
        dispatch(toggleNoteImportance(id))
    }

    return (
        <ul>
            {notes.map(note =>
                <li key={note.id} onClick={() => toggleImportance(note.id)}>
                    {note.content} <strong>{note.important ? 'important' : ''}</strong>
                </li>
            )}
        </ul>
    )
}

export default Notes