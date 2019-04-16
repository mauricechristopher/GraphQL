const express = require('express')
// One endpoint to rule them all
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema, // same as saying schema: schema... Thanks es6
  graphiql: true // provides the query string with a nice front end interface... thanks technology
}));

// This is how a query is made in graphiql! This is awesome because I can choose what information I want
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
