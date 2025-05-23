import Header from "./Header.jsx";
import Content from "./Content.jsx";

const Course = ({courses}) => (
    courses.map((course, i) => {
        const {name, parts} = course
        const totalExercises = parts.reduce(
            (sum, currPart) =>
                sum + currPart.exercises,
            0
        )

        return (
            <div key={i}>
                <Header name={name}/>
                <Content parts={parts}/>
                <b>total of {totalExercises} exercises</b>
            </div>
        )
    })
)

export default Course