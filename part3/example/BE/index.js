require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Note = require("./models/note");

const app = express()

app.use(express.json())
app.use(express.static('dist'))

app.use(morgan('tiny'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    const id = request.params.id

    Note.findById(id).then(note => {
        if(!note){
            return response
                .status(404)
                .send({error:`No found note with that id ${id}`})
        }

        return response.json(note)
    }).catch(error => next(error))
})

app.post('/api/notes', (req, res, next) => {
    const {content, important}= req.body

    const note = new Note({
        content: content,
        important: important || false,
    })

   note.save().then(newNote => {
       res.json(newNote)
   }).catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    const {content, important} = req.body

    Note.findById(id).then(note => {
        if(!note) return res.status(404).end()

        note.content = content
        note.important = important

        return note.save().then(updatedNote => {
            res.json(updatedNote)
        })
    }).catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndDelete(id).then(() =>{
        return res.status(204).end()
    }).catch(error => next(error))
})

/*
* Middleware for handling requests to unknown endpoints.
* This should be placed after all other routes to catch 404 errors.
* */
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({error: "malformatted id"})
    } else if(error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})