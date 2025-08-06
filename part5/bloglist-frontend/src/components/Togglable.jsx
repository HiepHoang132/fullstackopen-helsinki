import {useState} from "react";

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}
    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}>create new blog</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>
        </>

    )
}

export default Togglable