const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({course}) => {
    const {parts} = course

    return (
        <div>
            {parts.map((part, index) => (
                <Part key={index} part={part} />
            ))}
        </div>
    )
}

const Part = ({part}) => {
    const {name, exercises} = part
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Total = ({course}) => {
    const {parts} = course
    return (
        <p>
            Number of courses {parts.reduce((sum, part) => sum + part.exercises, 0)}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

export default App
