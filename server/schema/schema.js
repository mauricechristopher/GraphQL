const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id:'1' },
  { name: 'The Final Empire', genre: 'Fantasy', id:'2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id:'3' }
]

//function that takes in an object and it's desired fields
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // pretty straightforward
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // defines the route to take into the graph/api
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, //Defines what arguments can be sent into book field with their types
      // looks like book(id: '123'){name genre} from the front-end
      resolve(parent, args) {
        // code to get data from the db / other source
        return _.find(books, { id: args.id }) // looks through books array and returns all items with the matching id
      }
    }
  }
})

// defining the schema to be called from the frontend
module.exports = new GraphQLSchema({
  query: RootQuery
});
