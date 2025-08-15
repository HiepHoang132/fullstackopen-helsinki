import Counter from "./components/Counter.jsx";
import NewNote from "./components/NewNote.jsx";
import Notes from "./components/Notes.jsx";
import VisibilityFilter from "./components/VisibilityFilter.jsx";

function App() {
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
