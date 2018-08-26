import React from 'react'
import Bookshelf from './Bookshelf'

const BookList = ({ currentlyReading, wantToRead, read, onSearch }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <Bookshelf title="Currently Reading" books={currentlyReading} onEmptyShelf={onSearch} />
                <Bookshelf title="Want to read" books={wantToRead} />
                <Bookshelf title="Read" books={read} />
            </div>
        </div>
        <div className="open-search">
            <a onClick={() => onSearch()}>Add a book</a>
        </div>
    </div>
)

export default BookList