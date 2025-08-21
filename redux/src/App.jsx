import Counter from "./components/Counter.jsx";
import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import VisibilityFilter from "./components/VisibilityFilter.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeNotes} from "./reducers/noteReducer.js";

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeNotes())
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
