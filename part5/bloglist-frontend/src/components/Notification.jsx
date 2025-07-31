export default function Notification({message, success}){
    if(message === null){
        return
    }

    if(success){
        return (
            <div className="success">
                {message}
            </div>
        )
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}