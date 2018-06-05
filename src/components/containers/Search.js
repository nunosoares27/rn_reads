import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import * as BooksAPI from './../../BooksAPI';
import ChangeShelf from "../ChangeShelf";
import BookThumbnail from "../../icons/BookThumbnail.png";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      isLoading: false,
      searchedBooks: []
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.mergeSearchResultWithBooks = this.mergeSearchResultWithBooks.bind(this);
  }

    updateQuery = query => {
    this.setState(() => ({
      query,
      isLoading: true
    }));
    if (!query) {
      this.setState(() => ({
        searchedBooks: [],
        isLoading: false
      }));
      return;
    }
    BooksAPI.search(query).then(books => {
      this.setState(currentState => ({
        searchedBooks:
          !currentState.query || !books || books.error  === "empty query"
            ? []
            : this.mergeSearchResultWithBooks(books),
        isLoading: false
      }));
    });
  };

  mergeSearchResultWithBooks = (searchResults, props) =>
    searchResults.map(res => {
      const book = this.props.books.find(dk => res.id === dk.id);
      if (book) res.shelf = book.shelf;
      return res;
    });

  render() {
    const { searchedBooks, isLoading } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {isLoading && <li className="loader" />}
            {!isLoading &&
              (searchedBooks.length === 0 ? (
                <li className="message">No Books found</li>
              ) : ( 
                searchedBooks.map(book => (
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
                        onChangeShelf={this.props.onChangeShelf} 
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
                ))
              ))}
          </ol>
        </div>
      </div>
    );
  
  }
}
export default Search;
