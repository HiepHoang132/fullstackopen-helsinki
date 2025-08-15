import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from "./App.jsx";
import {Provider} from "react-redux";
import noteReducer from "./reducers/noteReducer.js";
import {configureStore} from "@reduxjs/toolkit";
import countReducer from "./reducers/countReducer.js";
import filterReducer from "./reducers/filterReducer.js";

const store = configureStore({
    reducer: {
        note: noteReducer,
        count: countReducer,
        filter: filterReducer
    }
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>,
)
