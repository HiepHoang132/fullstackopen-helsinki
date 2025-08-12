import {useDispatch, useSelector} from "react-redux";
import {decrement, increment, reset} from "../reducers/countReducer.js";

const Counter = () => {
    const value = useSelector(state => state.count)
    const dispatch = useDispatch()

    const plus = () => {
        dispatch(increment())
    }

    const minus = () => {
        dispatch(decrement())
    }

    const zero = () => {
        dispatch(reset())
    }

    return (
        <>
            <div>
                {value}
            </div>
            <div>
                <button onClick={plus}>plus</button>
                <button onClick={minus}>minus</button>
                <button onClick={zero}>zero</button>
            </div>
        </>
    )
}

export default Counter