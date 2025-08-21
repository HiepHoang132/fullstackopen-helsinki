import {configureStore} from "@reduxjs/toolkit";
import anecdoteReducer, {setAnecdotes} from "./src/reducers/anecdoteReducer.js";
import filterReducer from "./src/reducers/filterReducer.js";
import notificationReducer from "./src/reducers/notificationReducer.js";
import anecdoteService from "./src/services/anecdotes.js"

const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

anecdoteService.getAll()
    .then(anecdotes =>
        store.dispatch(setAnecdotes(anecdotes))
    )

export default store