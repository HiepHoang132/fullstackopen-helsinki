import {useDispatch, useSelector} from "react-redux";

const Counter = () => {
    const value = useSelector(state => state.counter)
    const dispatch = useDispatch()

    return (
        <>
            <div>
                {value}
            </div>
            <div>
                <button onClick={() => dispatch({type: 'INCREMENT'})}>plus</button>
                <button onClick={() => dispatch({type: 'DECREMENT'})}>minus</button>
                <button onClick={() => dispatch({type: 'ZERO'})}>zero</button>
            </div>
        </>
    )
}

export default Counter