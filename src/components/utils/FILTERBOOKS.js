const filterBookByShelf = (books, shelf) =>
  books.filter(book => book.shelf === shelf);
export default filterBookByShelf;
