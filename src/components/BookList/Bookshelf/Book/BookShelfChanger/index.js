import React from 'react'

const BookShelfChanger = (props) => {
    const testFn = (name, action, e, f) => console.log("move", e, f);
    return (
        <div className="book-shelf-changer">
            <select>
                <option value="move" disabled>Move to...</option>
                <option onClick={(e,f) => testFn('onClick', 'reading', e, f)} value="currentlyReading">Currently Reading</option>
                <option onClick={(e,f) => testFn('onClick', 'want to read', e, f)} value="wantToRead">Want to Read</option>
                <option onClick={(e,f) => testFn('onClick', 'read', e, f)} value="read">Read</option>
                <option onClick={(e,f) => testFn('onClick', 'none', e, f)} value="none">None</option>
            </select>
        </div>
    );
}

export default BookShelfChanger;
