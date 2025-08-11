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

    const store = configureStore({
        reducer: {
            counter: countReducer
        }
    })

    store.subscribe(() => {
        const storeNow = store.getState()
        console.log(storeNow)
    })

    return (
        <>
            <Provider store={store}>
                <Counter/>
            </Provider>
        </>
    )
}

export default App
