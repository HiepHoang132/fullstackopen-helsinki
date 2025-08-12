import {useDispatch, useSelector} from "react-redux";
import {toggleImportanceOf} from "../reducers/noteReducer.js";

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(state => state.note)

    const toggleImportance = (id) => {
        dispatch(toggleImportanceOf(id))
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