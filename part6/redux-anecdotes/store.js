import {configureStore} from "@reduxjs/toolkit";
import anecdoteReducer from "./src/reducers/anecdoteReducer.js";
import filterReducer from "./src/reducers/filterReducer.js";
import notificationReducer from "./src/reducers/notificationReducer.js";

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

export default store