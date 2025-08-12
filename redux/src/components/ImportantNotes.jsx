import {useSelector} from "react-redux";
import {selectImportantNotes} from "../reducers/noteReducer.js";

const ImportantNotes = () => {
    const importantNotes = useSelector(selectImportantNotes)

    return (
        <ul>
            {importantNotes.map(note => (
                <li key={note.id}>
                    {note.content} <strong>{note.important ? 'important' : ''}</strong>
                </li>
            ))}
        </ul>
    )
}

export default ImportantNotes