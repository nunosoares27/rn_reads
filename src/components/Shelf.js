import React from "react";
import ChangeShelf from "./ChangeShelf";
import BookThumbnail from "../icons/BookThumbnail.png";

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
          {props.isLoading && <li className="loader" />}
          {!props.isLoading && props.books.length !== 0 ? (
            props.books.map(book => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url("${book.imageLinks
                            ? book.imageLinks.smallThumbnail
                            : BookThumbnail}")`
                        }}
                      />

                      <ChangeShelf
                        onChangeShelf={props.onChangeShelf}
                        book={book}
                      />
                    </div>
                    <a
                      className="book-title"
                      target="_blank"
                      href={book.previewLink}
                    >
                      {book.title}
                    </a>

                    <div className="book-authors">
                      {book.authors && book.authors.concat().join(" | ")}
                    </div>
                  </div>
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
