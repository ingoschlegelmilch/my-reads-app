import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { omit } from 'lodash'

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
    currentlyReading: {},
    wantToRead: {},
    read: {}
  }

  addCurrentlyReading = (book) => {
    this.setState({
      currentlyReading: { ...this.state.currentlyReading, [book.id]: book },
      wantToRead: omit(this.state.wantToRead, [book.id]),
      read: omit(this.state.read, [book.id]),
    })
  }

  addWantToRead = (book) => {
    this.setState({
      currentlyReading: omit(this.state.currentlyReading, [book.id]),
      wantToRead: { ...this.state.wantToRead, [book.id]: book },
      read: omit(this.state.read, [book.id])
    })
  }

  addRead = (book) => {
    this.setState({
      currentlyReading: omit(this.state.currentlyReading, [book.id]),
      wantToRead: omit(this.state.wantToRead, [book.id]),
      read: { ...this.state.read, [book.id]: book }
    })
  }

  render() {
    const controls = {
      addCurrentlyReading: this.addCurrentlyReading,
      addWantToRead: this.addWantToRead,
      addRead: this.addRead
    };
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch
            controls={controls}
            onClick={() => this.setState({ showSearchPage: false })} />
        ) : (
            <BookList
              controls={controls}
              currentlyReading={Object.values(this.state.currentlyReading)}
              wantToRead={Object.values(this.state.wantToRead)}
              read={Object.values(this.state.read)}
              onSearch={() => this.setState({ showSearchPage: true })}
            />)}
      </div>
    )
  }
}

export default BooksApp
