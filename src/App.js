import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { omit } from 'lodash'

import './App.css'

import BookSearch from './components/BookSearch'
import BookList from './components/BookList'
import { getAll, update } from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    currentlyReading: {},
    wantToRead: {},
    read: {}
  }

  addCurrentlyReading = (book) => {
    const shelf = 'currentlyReading'
    const updatedBook = {...book, shelf}
    update(book, shelf)
    this.addToLocalStorage(updatedBook)    
  }

  addWantToRead = (book) => {
    const shelf = 'wantToRead'
    const updatedBook = {...book, shelf}
    update(updatedBook, shelf)
    this.addToLocalStorage(updatedBook)
  }

  addRead = (book) => {
    const shelf = 'read'
    const updatedBook = {...book, shelf}
    update(updatedBook, shelf)
    this.addToLocalStorage(updatedBook)
  }

  removeFromShelves = (book, callback = () => { console.log(`removed ${book.title} from all shelves`)}) => {
    this.setState({
      currentlyReading: omit(this.state.currentlyReading, [book.id]),
      wantToRead: omit(this.state.wantToRead, [book.id]),
      read: omit(this.state.read, [book.id])
    }, callback)
  }

  /**
   * Books should always be only in one shelf.
   */
  removeFromLocalStorage = (shelf, book) => {
    if (book.shelf === 'none') return
    const updatedShelf = omit(this.state[shelf], [book.id])
    this.setState({ [shelf]: updatedShelf })
  }

  /**
   * We look up the shelf and pull out all books and add the new one.
   */ 
  addToLocalStorage = (book) => {
    const shelf = book.shelf;
    // first we remove the book from all shelves
    this.removeFromShelves(book, () => {
      console.log(`removed ${book.title} from all shelves`)
      const oldstate = {...this.state[shelf]}
      // then after the state is updated, we add the book to the new shelf
      this.setState({ [shelf]: {...oldstate, [book.id]: book} }, () => {
        console.log(`added ${book.title} to "${shelf}"`)
      })
    })
  }

  componentDidMount() {
    getAll().then(books => this.hydrateShelves(books));
  }

  hydrateShelves = (books) => {
    books.map(book => this.addToLocalStorage(book))
  }

  render() {
    const controls = {
      addCurrentlyReading: this.addCurrentlyReading,
      addWantToRead: this.addWantToRead,
      addRead: this.addRead,
      removeFromShelves: this.removeFromShelves
    };
    const shelves = {
      currentlyReading: Object.values(this.state.currentlyReading), 
      wantToRead: Object.values(this.state.wantToRead), 
      read: Object.values(this.state.read)
    }
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={() => (
            <BookList shelves={shelves} controls={controls}/>
          )} />
          <Route path="/search" render={() => <BookSearch shelves={shelves} controls={controls} />} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
