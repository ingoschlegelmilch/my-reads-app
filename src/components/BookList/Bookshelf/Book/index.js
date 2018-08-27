import React from 'react'

const Book = ({ title, authors, imageLinks, addCurrentlyReading, addWantToRead, addRead }) => {
    const move = (shelf) => {
        switch (shelf) {
            case 'currentlyReading':
                return addCurrentlyReading();
            case 'wantToRead':
                return addWantToRead();
            case 'read':
                return addRead();
            default: console.error(shelf);
        }
    }
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={(e) => move(e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.join(", ")}</div>
        </div>
    );
};

export default Book;