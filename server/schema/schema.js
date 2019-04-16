const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLInt
} = graphql;

// dummy data
const books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
  { name: 'The Final Empire', genre: 'Fantasy', id:'2', authorId: '2' },
  { name: 'The Long Earth', genre: 'Sci-Fi', id:'3', authorId: '3' }
]

const authors = [
  { name: 'Pat ', age: 42, id: '1' },
  { name: 'John', age: 21, id: '2' },
  { name: 'Carl', age: 84, id: '3' }
]

//function that takes in an object and it's desired fields
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    // pretty straightforward
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) { // parent is equal to the book in this case
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    // pretty straightforward
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // defines the route to take into the graph/api
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } }, //Defines what arguments can be sent into book field with their types
      // looks like book(id: '123'){name genre} from the front-end
      resolve(parent, args) {
        // code to get data from the db / other source
        return _.find(books, { id: args.id }) // looks through books array and returns all items with the matching id
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id })
      }
    }
  }
})

// defining the schema to be called from the frontend
module.exports = new GraphQLSchema({
  query: RootQuery
});
