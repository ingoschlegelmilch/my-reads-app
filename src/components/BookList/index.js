import React from 'react'
import Bookshelf from './Bookshelf'

const BookList = ({ books, onSearch }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <Bookshelf title="Currently Reading" books={books} />
                <Bookshelf title="Want to read" books={books} />
                <Bookshelf title="Read" books={books} />
            </div>
        </div>
        <div className="open-search">
            <a onClick={() => onSearch()}>Add a book</a>
        </div>
    </div>
)

export default BookList