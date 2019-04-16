const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType,
        GraphQLString,
        GraphQLID,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull                    // blocks the ability from not passing in required values
} = graphql;

// dummy data
// const books = [
//   { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'Hitchhikers guide', genre: 'Fantasy', id: '42', authorId: '42' },
//   { name: 'A book', genre: 'Fantasy', id: '1', authorId: '4' },
//   { name: 'Answer to the universe', genre: 'Fantasy', id: '442', authorId: '42' },
//   { name: 'The Final Empire', genre: 'Fantasy', id:'2', authorId: '2' },
//   { name: 'The Long Earth', genre: 'Sci-Fi', id:'3', authorId: '3' }
// ]
//
// const authors = [
//   { name: 'Pat ', age: 42, id: '1' },
//   { name: 'John', age: 21, id: '2' },
//   { name: 'Carl', age: 84, id: '3' },
//   { name: 'A genius', age: 42, id: '42'}
// ]

const BookType = new GraphQLObjectType({  // function that takes in an object and it's desired fields
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {             // parent is equal to the book in this case
        // return _.find(authors, { id: parent.authorId })
        return Author.findById(parent.authorId)
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({                        // needs to be function so it can be called before it's declared
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),    // creates a list of books since one author can have multiple books
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id })
      return Book.find({ authorId: parent.id })    // looks through books array for any books with same id as the parent
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
                                          // defines the route to take into the graph/api
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },  // Defines what arguments can be sent into book field with their types
                                          // looks like book(id: '123'){name genre} from the front-end
      resolve(parent, args) {
                                          // code to get data from the db / other source
                                          // return _.find(books, { id: args.id }) // looks through books array and returns all items with the matching id
      return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
                                          // return _.find(authors, { id: args.id })
      return Author.findById(args.id)
      }
    },
    books: {                              // returns entire list of books... this is super useful
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({})              // return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({})              // return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({   // changes the datums
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()               // saves new instance to mongo and returns to frontend :O
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({      // defining the schema to be called from the frontend
  query: RootQuery,
  mutation: Mutation
});
