import React, { Component } from 'react'
import { search } from '../../BooksAPI'
import Book from '../BookList/Bookshelf/Book'
import { debounce } from 'lodash';

class BookSearch extends Component {
    state = {
        books: [],
        query: '',
        emptyQuery: false
    }

    updateQuery = (event) => {
        const query = event.target.value;
        this.setState({ query }, () => this.fetchBooks())
    }

    /**
     * Fetch books from google api.
     * Make sure to limit requests to one in 300ms, to avoid
     * updating the books state in an arbitrary order.
     * @param query search term for fetching books
     */
    fetchBooks = debounce(() => {
        if (this.state.query === '') {
            this.setState({ books: [] })
        } else {
            search(this.state.query)
                .then(response => this.updateBooks(response))
                .catch(error => console.error(error))
        }
    }, 300)

    /**
     * Makes sure the books state is empty, when our API responds
     * with an empty query result.
     * @param books can be {error: "empty query" } or a list of books
     */
    updateBooks = (books) => {
        if (books.error === 'empty query') {
            this.setState({ books: [], emptyQuery: true })
        } else {
            this.setState({ books, emptyQuery: false })
        }
    }

    componentDidMount() {
        this.fetchBooks();
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={this.props.onClick}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input value={this.state.query} onChange={this.updateQuery} type="text" placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.emptyQuery ? <li>Sorry, could not find anything</li> : null}
                        {this.state.books.map(book => <li key={book.id}><Book {...book} /></li>)}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;