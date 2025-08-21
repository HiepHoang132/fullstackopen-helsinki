import {configureStore} from "@reduxjs/toolkit";
import noteReducer from "./src/reducers/noteReducer.js";
import countReducer from "./src/reducers/countReducer.js";
import filterReducer from "./src/reducers/filterReducer.js";

const store = configureStore({
    reducer: {
        note: noteReducer,
        count: countReducer,
        filter: filterReducer
    }
})

export default store