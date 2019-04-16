const express = require('express')
// One endpoint to rule them all
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema // same as saying schema: schema... Thanks es6
}));

app.listen(4242, () => {
  console.log('Listening on port 4242 ;)')
});
