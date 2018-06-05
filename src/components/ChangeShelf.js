import React from "react";
import BOOK_SHELVES from "./utils/BOOKSHELVS";

const ChangeShelf = (props, book, onChangeShelf) => {
    let message = "Moved with success";
  return (
     
    <div className="book-shelf-changer">
      <select defaultValue={ props.book.shelf || "none"}
      onChange={e => props.onChangeShelf(props.book, e.target.value, message)}
      >
        <option disabled>
          Move to...
        </option>
         {BOOK_SHELVES.map(shelf => (
        <option key={shelf.name} value={shelf.name}>
          {shelf.displayName}
        </option>
      ))}
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default ChangeShelf;
