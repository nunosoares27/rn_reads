import React from "react";
import ChangeShelf from "./ChangeShelf";
import BookThumbnail from "../icons/BookThumbnail.png";

const Book = ({ book, onChangeShelf }) => {
  return (
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

        <ChangeShelf onChangeShelf={onChangeShelf} book={book} />
      </div>
      <a className="book-title" target="_blank" href={book.previewLink}>
        {book.title}
      </a>

      <div className="book-authors">
        {book.authors && book.authors.concat().join(" | ")}
      </div>
    </div>
  );
};
export default Book;
