import React from 'react'
import Bookshelf from './Bookshelf'

const BookList = ({ currentlyReading, wantToRead, read, onSearch, addCurrentlyReading, addWantToRead, addRead }) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <Bookshelf title="Currently Reading"
                    addCurrentlyReading={addCurrentlyReading}
                    addRead={addRead}
                    addWantToRead={addWantToRead}
                    books={currentlyReading}
                    onEmptyShelf={onSearch} />
                <Bookshelf title="Want to read"
                    addCurrentlyReading={addCurrentlyReading}
                    addRead={addRead}
                    addWantToRead={addWantToRead}
                    books={wantToRead}
                    onEmptyShelf={onSearch} />
                <Bookshelf title="Read"
                    addCurrentlyReading={addCurrentlyReading}
                    addRead={addRead}
                    addWantToRead={addWantToRead}
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