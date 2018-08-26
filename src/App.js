import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import BookSearch from './components/BookSearch'
import BookList from './components/BookList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch onClick={() => this.setState({ showSearchPage: false })} />
        ) : (
            <BookList currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              onSearch={() => this.setState({ showSearchPage: true })}
            />)}
      </div>
    )
  }
}

export default BooksApp
