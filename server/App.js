const express = require('express')
// One endpoint to rule them all
const graphqlHTTP = require('express-graphql')

const app = express()

app.use('/graphql', graphqlHTTP({
  
}));

app.listen(4242, () => {
  console.log('Listening on port 4242 ;)')
});
