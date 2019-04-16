import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'


class BookList extends Component {
  displayBooks() {
    let data = this.props.data
    if(data.loading) {
      return( <div> Loading books...</div> )
    } else {
      return data.books.map(book => {                       // .map iterates array and launches function for each item
        return(
          <li key={ book.id }>{ book.name }</li>            // needs a key so react knows what it is
        )
      })
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
//              ^ binds this ^    to this ^
