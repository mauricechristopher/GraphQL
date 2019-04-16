import React, { Component } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'     // need this to inject any received data into react

// components
import BookList from './components/BookList'
import AddBook from './components/AddBook'

const client = new ApolloClient({                 // setup Apollo Client
  uri: 'http://localhost:4242/graphql'            // endpoint to make queries to
})

class App extends Component {
  render() {              //  |
    return (              // \/ this is how you get the data from the endpoint

      <ApolloProvider client={client}>

        <div id="main">
          <h1>Reading List</h1>
          <BookList />
          <AddBook />
        </div>

      </ApolloProvider>
    );
  }
}

export default App;
