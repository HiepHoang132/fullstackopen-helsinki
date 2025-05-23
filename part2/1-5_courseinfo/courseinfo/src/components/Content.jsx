import Part from "./Part.jsx";

const Content = ({parts}) => (
    parts.map((p, i) =>
        <Part key={i} name={p.name} exercises={p.exercises} />
    )
)

export default Content;