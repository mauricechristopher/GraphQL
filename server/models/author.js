const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({ // all datatypes/properties an author will have
  name: String,
  age: Number
})

module.exports = mongoose.model('Author', authorSchema) // makes a model(collection) of authors based on the authorSchema
