import React from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import { findSelection } from '../../BookList'

const Bookshelf = ({ title, books, shelves, controls }) => {
    const { addCurrentlyReading, addWantToRead, addRead } = controls;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                {books.length === 0 ? (
                    <p>There are no books on this shelf, yet. <Link to="/search">Add a book</Link></p>
                ) : (
                        <ol className="books-grid">
                            {books.map(book => (
                                <li key={book.id}>
                                    <Book {...book}
                                        selected={findSelection(book, shelves)}
                                        addCurrentlyReading={() => addCurrentlyReading(book)}
                                        addWantToRead={() => addWantToRead(book)}
                                        addRead={() => addRead(book)} />
                                </li>))
                            }
                        </ol>
                    )
                }
            </div>
        </div>
    );
};

export default Bookshelf;