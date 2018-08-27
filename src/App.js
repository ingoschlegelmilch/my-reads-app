import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'
import { omit } from 'lodash'

import BookSearch from './components/BookSearch'
import BookList from './components/BookList'

class BooksApp extends React.Component {
  state = {
    currentlyReading: {},
    wantToRead: {},
    read: {}
  }

  persist = (currentlyReading, wantToRead, read) => {
    localStorage.setItem("currentlyReading", JSON.stringify(currentlyReading));
    localStorage.setItem("wantToRead", JSON.stringify(wantToRead));
    localStorage.setItem("read", JSON.stringify(read));

    this.setState({ currentlyReading, wantToRead, read })
  }

  addCurrentlyReading = (book) => {
    const currentlyReading = { ...this.state.currentlyReading, [book.id]: book }
    const wantToRead = omit(this.state.wantToRead, [book.id]);
    const read = omit(this.state.read, [book.id]);

    this.persist(currentlyReading, wantToRead, read)
  }

  addWantToRead = (book) => {
    const currentlyReading = omit(this.state.currentlyReading, [book.id]);
    const wantToRead = { ...this.state.wantToRead, [book.id]: book }
    const read = omit(this.state.read, [book.id]);

    this.persist(currentlyReading, wantToRead, read);
  }

  addRead = (book) => {
    const currentlyReading = omit(this.state.currentlyReading, [book.id]);
    const wantToRead = omit(this.state.wantToRead, [book.id]);
    const read = { ...this.state.read, [book.id]: book };

    this.persist(currentlyReading, wantToRead, read);
  }

  componentDidMount() {
    const currentlyReading = JSON.parse(localStorage.getItem('currentlyReading') || "{}");
    const wantToRead = JSON.parse(localStorage.getItem('wantToRead') || "{}");
    const read = JSON.parse(localStorage.getItem('read') || "{}");

    this.setState({ currentlyReading, wantToRead, read })
  }

  render() {
    const controls = {
      addCurrentlyReading: this.addCurrentlyReading,
      addWantToRead: this.addWantToRead,
      addRead: this.addRead
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
