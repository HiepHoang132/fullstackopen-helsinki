import Counter from "./components/Counter.jsx";
import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import ImportantNotes from "./components/ImportantNotes.jsx";

function App() {
    return (
        <div>
            <Counter/>
            <NewNote/>
            <Notes/>
            <ImportantNotes/>
        </div>
    )
}

export default App
