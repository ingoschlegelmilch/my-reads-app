import React from 'react'
import Book from './Book'

const Bookshelf = ({ title, books, onEmptyShelf }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            {books.length === 0 ? (
                <span>There are no books on this shelf, yet. <a onClick={() => onEmptyShelf()}>Add a book</a></span>
            ) : (
                    <ol className="books-grid">
                        {books.map(book => <li><Book {...book} /></li>)}
                    </ol>
                )
            }
        </div>
    </div>
);

export default Bookshelf;