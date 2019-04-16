import { gql } from 'apollo-boost'

// things are getting interesting...
const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

export{ getAuthorsQuery, getBooksQuery }
