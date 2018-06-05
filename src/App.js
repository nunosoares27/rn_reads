import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, Switch } from "react-router-dom";

import Search from './components/containers/Search';
import ListShelves from './components/containers/ListShelves';
import Page404 from './components/Page404';

class App extends Component {
      constructor(props){
    super(props);
    this.state = {
      books: [],
      loading: true,
    }
    this.onChangeShelf = this.onChangeShelf.bind(this);
  }
   onChangeShelf(book, shelf, message){
    if (!shelf) return;
    BooksAPI.update(book, shelf).then(() => {
      this.setState(currentState => ({
        books: [
          ...currentState.books.filter(sb => sb.id !== book.id),
          {
            ...book,
            shelf
          }
        ]
      }));
      alert(message);
    });
  }
  componentDidMount(){
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books,
        loading: false
      }));
    });
    
  }
    render(){
      return (
      <div className="app">
       <Switch>
         <Route exact path="/" render={() => (
              <ListShelves 
                onChangeShelf={this.onChangeShelf}
                books={this.state.books}
                isLoading={this.state.loading}
              /> ) } />
         <Route path="/search" render={() => ( <Search 
            books={this.state.books}
             onChangeShelf={this.onChangeShelf}
         /> ) } />
         <Route component={Page404} />
       </Switch>
      </div>
    );
    }
}

export default App
