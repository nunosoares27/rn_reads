import React from "react";
import Book from "./Book";

const Shelf = props => {
  return (
    <div className="bookshelf" key={props.keys}>
      <h2
        className="bookshelf-title"
        style={{ width: "100%", textAlign: "center" }}
      >
        {props.shelfName}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.isLoading && (
            <div>
              <li className="loader" />
              <h1 className="loadText">Content is Loading</h1>
            </div>
          )}
          {!props.isLoading && props.books.length !== 0 ? (
            props.books.map(book => {
              return (
                <li key={book.id}>
                  <Book book={book} onChangeShelf={props.onChangeShelf} />
                </li>
              );
            })
          ) : (
            <li className="message">There are no books in this shelf</li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
