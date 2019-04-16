const express = require('express')
// One endpoint to rule them all
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// allow requests from different servers
app.use(cors())


// connect to database
mongoose.connect('mongodb+srv://dummy:dummy@graphql-practice-bbrrx.mongodb.net/test?retryWrites=true')
// once connection is open, fire function below
mongoose.connection.once('open', () => {
  console.log('connected to the databasin')
})


app.use('/graphql', graphqlHTTP({
  schema, // same as saying schema: schema... Thanks es6
  graphiql: true // provides the query string with a nice front end interface... thanks technology
}));

// This is how a query is made in graphiql! This is awesome because I can choose the information I want to fetch
// {
//   book(id: "1") {
//     name
//     genre
//     id
//   }
// }

app.listen(4242, () => {
  console.log('Listening on port 4242 ;)')
});
