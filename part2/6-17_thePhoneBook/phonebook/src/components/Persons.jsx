const Persons = ({persons, handleDelete}) => (
    <>
        {persons.map(p =>
            <div key={p.id}>
                {p.name} {p.number}
                <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
            </div>

        )}
    </>
)

export default Persons;