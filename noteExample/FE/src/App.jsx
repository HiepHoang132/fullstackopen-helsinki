import {useState, useEffect, useRef} from 'react'
import Note from './components/Note.jsx'
import noteService from "./services/notes.js"
import loginService from "./services/login.js"
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Togglable.jsx";
import NoteForm from "./components/NoteForm.jsx";

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const noteFormRef = useRef()

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
        if(loggedUserJson){
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, []);

    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({username, password})

            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        } catch (error){
            setErrorMessage("Wrong credentials")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedNoteAppUser')
    }

    const loginForm = () => {
       return (
           <Togglable buttonLabel='login'>
               <LoginForm
                   username={username}
                   password={password}
                   handleUsernameChange={({ target }) => setUsername(target.value)}
                   handlePasswordChange={({ target }) => setPassword(target.value)}
                   handleSubmit={handleLogin}
               />
           </Togglable>
       )
    }

    const noteForm = () => {
        return (
            <Togglable buttonLabel="new note" ref={noteFormRef}>
                <NoteForm createNote={addNote}/>
            </Togglable>
        )
    }

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(n => n.id === id ? returnedNote : n))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            {!user && loginForm()}
            {user && (
                <div>
                    {user.username} logged in
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                ))}
            </ul>
            {user && noteForm()}
            <Footer/>
        </div>
    )
}

export default App