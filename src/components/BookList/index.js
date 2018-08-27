import React from 'react'
import Bookshelf from './Bookshelf'

const BookList = ({ currentlyReading, wantToRead, read, onSearch, controls }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <Bookshelf title="Currently Reading"
                    controls={controls}
                    books={currentlyReading}
                    onEmptyShelf={onSearch} />
                <Bookshelf title="Want to read"
                    controls={controls}
                    books={wantToRead}
                    onEmptyShelf={onSearch} />
                <Bookshelf title="Read"
                    controls={controls}
                    books={read}
                    onEmptyShelf={onSearch} />
            </div>
        </div>
        <div className="open-search">
            <a onClick={() => onSearch()}>Add a book</a>
        </div>
    </div>

)

export default BookList