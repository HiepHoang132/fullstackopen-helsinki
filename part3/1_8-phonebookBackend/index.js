require('dotenv').config()

const express = require('express')
const morgan = require('morgan');
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

// Custom token to get request body
morgan.token('body', req => {
     return JSON.stringify(req.body)
})

// Custom format which includes the request body
const morganFormat = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(morganFormat))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        const body = `
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date().toString()}</p>
        `
        res.send(body)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id

    Person.findById(id).then(person => {
        if(person){
            return res.json(person)
        }

        res.statusMessage = `Not found person with id ${id} `
        res.status(404).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const {name, number} = body

    if(!body || Object.keys(body).length === 0){
        return res.status(400).json({
            error: "name and body missing"
        })
    }

    if(!name){
        return res.status(400).json({
            error: "name missing"
        })
    }

    if(!number){
        return res.status(400).json({
            error: "number missing"
        })
    }

    // 3.6
    const existingPerson = persons.find(p => p.name.toLowerCase().trim() === name.toLowerCase().trim())

    if(existingPerson){
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        ...body,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})

const port = process.env.PORT || 3001
app.listen(port)
console.log(`Server running on port ${port}`)