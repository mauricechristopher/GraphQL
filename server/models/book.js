const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({ // all datatypes/properties a book will have
  name: String,
  genre: String,
  authorId: String
})

module.exports = mongoose.model('Book', bookSchema) // makes a model(collection) of books based on the bookSchema
