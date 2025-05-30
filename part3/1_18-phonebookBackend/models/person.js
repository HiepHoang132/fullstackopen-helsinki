const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log("Connecting to", url)
mongoose.connect(url).then(() => {
    console.log("Connected to MongoDB")
}).catch(error => {
    console.error("Error connecting to MongoDB:", error.message)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person