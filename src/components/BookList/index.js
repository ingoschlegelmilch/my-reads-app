import React from 'react'
import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

const findSelection = (book, shelves) => {
    const { currentlyReading, wantToRead, read} = shelves;
    if (currentlyReading.find((reading) => reading.id === book.id)) return "currentlyReading"
    if (wantToRead.find((reading) => reading.id === book.id)) return "wantToRead"
    if (read.find((reading) => reading.id === book.id)) return "read"        
    return 'none';
}

const BookList = ({ shelves, controls }) => {
    const { currentlyReading, wantToRead, read } = shelves
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf title="Currently Reading"
                        shelves={shelves}
                        controls={controls}
                        books={currentlyReading} />
                    <Bookshelf title="Want to read"
                        shelves={shelves}
                        controls={controls}
                        books={wantToRead} />
                    <Bookshelf title="Read"
                        shelves={shelves}
                        controls={controls}
                        books={read} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}

export { findSelection };
export default BookList