import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import Counter from "./components/Counter.jsx";

function App() {
    const countReducer = (state = 0, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            case 'ZERO':
                return 0
            default:
                return state
        }
    }

    const noteReducer = (state = [], action) => {
        switch (action.type) {
            case 'NEW_NOTE':
                // return state.concat(action.payload)
                return [...state, action.payload]
            default:
                return state
        }
    }

    const store = configureStore({
        reducer: {
            counter: countReducer,
            note: noteReducer
        }
    })

    store.subscribe(() => {
        const storeNow = store.getState()
        console.log(storeNow)
    })

    store.dispatch({
        type: 'NEW_NOTE',
        payload: {
            content: 'the app state is in redux store',
            important: true,
            id: 1
        }
    })

    store.dispatch({
        type: 'NEW_NOTE',
        payload: {
            content: 'state changes are made with actions',
            important: false,
            id: 2
        }
    })

    return (
        <>
            <Provider store={store}>
                <Counter/>
            </Provider>
            <div>
                {store.getState().note.map(note => (
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                    </li>
                ))}
            </div>
        </>
    )
}

export default App
