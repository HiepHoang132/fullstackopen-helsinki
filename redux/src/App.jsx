import Counter from "./components/Counter.jsx";
import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import VisibilityFilter from "./components/VisibilityFilter.jsx";
import noteService from "./services/notes.js"
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setNotes} from "./reducers/noteReducer.js";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        noteService.getAll().then(notes => dispatch(setNotes(notes)))
    },);
    
    return (
        <div>
            <Counter/>
            <VisibilityFilter/>
            <NewNote/>
            <Notes/>
        </div>
    )
}

export default App
