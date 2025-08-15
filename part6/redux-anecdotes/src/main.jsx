import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App'
import {configureStore} from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import filterReducer from "./reducers/filterReducer.js";

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        filter: filterReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
)