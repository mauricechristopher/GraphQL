const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql;

//function that takes in an object and it's desired fields
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } }, //Defines what arguments can be sent into book field with their types
      // looks like book(id: '123'){name genre} from the front-end
      resolve(parent, args) {
        // code to get data from the db / other source
        
      }
    }
  }
})
