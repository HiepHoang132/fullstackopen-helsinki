import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notify: (state, action) => action.payload,
        clear: () => ""
    }
})

let timeoutId

export const setNotification = (message, seconds) => {
    return dispatch => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }

        dispatch(notify(message))
        timeoutId = setTimeout(() => {
            dispatch(clear())
        }, seconds * 1000)
    }
}

export const {notify, clear} = notificationSlice.actions

export default notificationSlice.reducer