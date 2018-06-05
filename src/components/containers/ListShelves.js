import React from "react";
import { Link } from "react-router-dom";
import BOOK_SHELVES from "../utils/BOOKSHELVS";
import filterBookByShelf from "../utils/FILTERBOOKS";
import Shelf from "../Shelf";

const ListShelves = (props) =>  {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
            {props.isLoading && <li className="loader" />}
            
            {!props.isLoading && BOOK_SHELVES.map(shelf => {
            return (
              <Shelf 
              isLoading={props.loading}
               onChangeShelf={props.onChangeShelf}
                key={shelf.name}
                shelfName={shelf.displayName}
                books={filterBookByShelf(props.books, shelf.name)}
              />
            );
          }) }
          
        </div>

        <div className="open-search">
          <Link to="/search">Add Book</Link>
        </div>
      </div>
    );
}

export default ListShelves;
