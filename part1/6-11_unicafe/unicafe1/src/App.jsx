import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({statistics, feedbacks}) =>
    feedbacks === 0
        ? <p>No feedback given</p>
        :
            <table>
                <tbody>
                    {statistics.map((s, i) => (
                        <StatisticLine key={i} text={s.text} value={s.value} />
                    ))}
                </tbody>
            </table>

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const [feedbacks, setFeedbacks] = useState(0)
    const [positive, setPositive] = useState(0)
    const [total, setTotal] = useState(0)

    const setGoodValue = () => {
        setGood(good + 1)
        setFeedbacks(feedbacks + 1)
        setPositive(positive + 1)
        setTotal(total + 1)
    }

    const setNeutralValue = () => {
        setNeutral(neutral+ 1)
        setFeedbacks(feedbacks + 1)
    }

    const setBadValue = () => {
        setBad(bad + 1)
        setFeedbacks(feedbacks + 1)
        setTotal(total - 1)
    }

    return (
        <div>
            <Display text={"give feedback"}/>
            <Button onClick={setGoodValue} text={"good"}/>
            <Button onClick={setNeutralValue} text={"neutral"}/>
            <Button onClick={setBadValue} text={"bad"}/>

            <Display text={"statistics"}/>
            <Statistics statistics={[
                {text: "good", value: good},
                {text: "neutral", value: neutral},
                {text: "bad", value: bad},
                {text: "all", value: feedbacks},
                {text: "average", value: total / feedbacks},
                {text: "positive", value: positive / feedbacks * 100 + ' %'}
            ]} feedbacks={feedbacks}/>
        </div>
    )
}

export default App